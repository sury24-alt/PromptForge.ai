from pydantic import BaseModel, Field


class CompileRequest(BaseModel):
    raw_idea: str = Field(..., min_length=1, max_length=5000, description="The raw, unorganized idea to compile into optimized prompts.")


class ExpertOutput(BaseModel):
    platform: str
    optimized_prompt: str


class CompileResponse(BaseModel):
    chatgpt: ExpertOutput
    claude: ExpertOutput
    gemini: ExpertOutput
