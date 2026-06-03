# PromptForge AI

A multi-agent prompt compilation engine that takes your raw ideas and generates **platform-optimized prompts** for ChatGPT, Claude, and Gemini simultaneously.

Built with **LangGraph** (parallel multi-agent processing), **FastAPI** (async backend), and **Next.js 14** (premium dark-mode UI).

---

## 🏗️ Architecture

```
User Input → FastAPI → LangGraph State Engine
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
          ChatGPT       Claude       Gemini
          Expert        Expert       Expert
          Node          Node         Node
                ▼           ▼           ▼
                └───────────┼───────────┘
                            │
                    Aggregated JSON → Next.js UI
```

All three expert nodes run **in parallel**, so you get all three optimized prompts in the time it takes to generate one.

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** with `pip`
- **Node.js 18+** with `npm`
- **Groq API Key** (Recommended) or **OpenAI API Key**

### 1. Backend Setup

```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure your API keys
copy .env.example .env
# Edit .env and add either your GROQ_API_KEY or OPENAI_API_KEY

# Start the server
uvicorn app.main:app --reload --port 8000
```

The backend will be running at `http://localhost:8000`. You can test it at `http://localhost:8000/health`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (already done if you just initialized)
npm install

# Start the dev server
npm run dev
```

The frontend will be running at `http://localhost:3000`.

### 3. Use the App

1. Open `http://localhost:3000` in your browser
2. Type your raw idea into the text area
3. Click **Compile** (or press `Ctrl+Enter`)
4. Three optimized prompts appear — one for each platform
5. Click **Copy** to grab any prompt and paste it into the target platform

---

## 🧠 How It Works

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Orchestration** | LangGraph | Multi-agent state graph with parallel fan-out/fan-in |
| **LLM** | Groq (Llama-3.3-70b-versatile) / OpenAI (GPT-4o-mini) | Powers all three expert nodes |
| **API** | FastAPI + Uvicorn | Async HTTP endpoint with CORS |
| **Frontend** | Next.js 14 (App Router) | React-based SPA with Tailwind CSS |
| **Icons** | Lucide React | Clean, consistent iconography |

### Expert Nodes

- **ChatGPT Expert**: Restructures your idea using markdown headings (`## Role`, `## Task`, `## Constraints`, etc.) with explicit chain-of-thought reasoning
- **Claude Expert**: Wraps instructions in XML tags (`<system_instructions>`, `<context>`, `<task>`) matching Anthropic's architectural training
- **Gemini Expert**: Uses direct context anchoring with few-shot input/output formatting placeholders

---

## 📁 Project Structure

```
PromptForge AI/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI app, CORS, /compile endpoint
│   │   ├── graph.py          # LangGraph state machine
│   │   ├── nodes.py          # Expert node functions
│   │   ├── prompts.py        # System prompts for each expert
│   │   └── schemas.py        # Pydantic request/response models
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/app/
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Main workspace page
│   │   ├── globals.css        # Dark theme design system
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── InputPanel.tsx
│   │       ├── BlueprintCard.tsx
│   │       ├── LoadingState.tsx
│   │       └── OutputGrid.tsx
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ⚠️ | Your Groq API key (Used by default for fast, free llama-3.3 inference) |
| `OPENAI_API_KEY` | ⚠️ | Your OpenAI API key (Fallback if Groq isn't provided) |


### Frontend (optional)
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |

---

## 📝 API Reference

### `GET /health`
Health check endpoint.

**Response:**
```json
{ "status": "healthy", "service": "PromptForge AI" }
```

### `POST /compile`
Compile a raw idea into three optimized prompts.

**Request:**
```json
{ "raw_idea": "I want an AI that helps me write better emails..." }
```

**Response:**
```json
{
  "chatgpt": {
    "platform": "ChatGPT",
    "optimized_prompt": "## Role\n..."
  },
  "claude": {
    "platform": "Claude",
    "optimized_prompt": "<system_instructions>\n..."
  },
  "gemini": {
    "platform": "Gemini",
    "optimized_prompt": "**Persona:**\n..."
  }
}
```

---

## License

MIT
