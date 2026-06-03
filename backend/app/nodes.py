import os
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage
from .prompts import CHATGPT_EXPERT_PROMPT, CLAUDE_EXPERT_PROMPT, GEMINI_EXPERT_PROMPT


def get_llm():
    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        return ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            api_key=groq_key,
        )
        
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("Neither OPENAI_API_KEY nor GROQ_API_KEY environment variable is set. Please set one in your .env file.")
    return ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.7,
        api_key=api_key,
    )



async def chatgpt_expert(state: dict) -> dict:
    """Expert node that optimizes the raw idea for ChatGPT."""
    llm = get_llm()
    response = await llm.ainvoke([
        SystemMessage(content=CHATGPT_EXPERT_PROMPT),
        HumanMessage(content=f"Here is the raw idea to optimize:\n\n{state['raw_idea']}")
    ])
    return {"chatgpt_output": response.content}


async def claude_expert(state: dict) -> dict:
    """Expert node that optimizes the raw idea for Claude."""
    llm = get_llm()
    response = await llm.ainvoke([
        SystemMessage(content=CLAUDE_EXPERT_PROMPT),
        HumanMessage(content=f"Here is the raw idea to optimize:\n\n{state['raw_idea']}")
    ])
    return {"claude_output": response.content}


async def gemini_expert(state: dict) -> dict:
    """Expert node that optimizes the raw idea for Gemini."""
    llm = get_llm()
    response = await llm.ainvoke([
        SystemMessage(content=GEMINI_EXPERT_PROMPT),
        HumanMessage(content=f"Here is the raw idea to optimize:\n\n{state['raw_idea']}")
    ])
    return {"gemini_output": response.content}
