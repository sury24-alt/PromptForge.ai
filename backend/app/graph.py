from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from .nodes import chatgpt_expert, claude_expert, gemini_expert


class PromptForgeState(TypedDict):
    raw_idea: str
    chatgpt_output: str
    claude_output: str
    gemini_output: str


def build_graph() -> StateGraph:
    """Build and compile the PromptForge multi-agent graph."""
    builder = StateGraph(PromptForgeState)

    # Add the three expert nodes
    builder.add_node("chatgpt_expert", chatgpt_expert)
    builder.add_node("claude_expert", claude_expert)
    builder.add_node("gemini_expert", gemini_expert)

    # Fan-out: START -> all three experts (parallel execution)
    builder.add_edge(START, "chatgpt_expert")
    builder.add_edge(START, "claude_expert")
    builder.add_edge(START, "gemini_expert")

    # Fan-in: all three experts -> END
    builder.add_edge("chatgpt_expert", END)
    builder.add_edge("claude_expert", END)
    builder.add_edge("gemini_expert", END)

    return builder.compile()


# Pre-compile the graph at module level
promptforge_graph = build_graph()
