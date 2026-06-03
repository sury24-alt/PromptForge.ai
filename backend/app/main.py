from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables FIRST
load_dotenv(override=True)

from .schemas import CompileRequest, CompileResponse, ExpertOutput
from .graph import promptforge_graph

app = FastAPI(
    title="PromptForge AI",
    description="Multi-agent prompt compiler that generates platform-optimized prompts for ChatGPT, Claude, and Gemini.",
    version="1.0.0",
)

# CORS - allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "PromptForge AI"}


@app.post("/compile", response_model=CompileResponse)
async def compile_prompt(request: CompileRequest):
    """Compile a raw idea into optimized prompts for ChatGPT, Claude, and Gemini."""
    try:
        # Check for API key
        if not os.getenv("OPENAI_API_KEY") and not os.getenv("GROQ_API_KEY"):
            raise HTTPException(
                status_code=500,
                detail="Neither OPENAI_API_KEY nor GROQ_API_KEY environment variable is set."
            )

        # Invoke the LangGraph with the raw idea
        result = await promptforge_graph.ainvoke({
            "raw_idea": request.raw_idea,
            "chatgpt_output": "",
            "claude_output": "",
            "gemini_output": "",
        })

        return CompileResponse(
            chatgpt=ExpertOutput(
                platform="ChatGPT",
                optimized_prompt=result["chatgpt_output"]
            ),
            claude=ExpertOutput(
                platform="Claude",
                optimized_prompt=result["claude_output"]
            ),
            gemini=ExpertOutput(
                platform="Gemini",
                optimized_prompt=result["gemini_output"]
            ),
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
