# PromptForge AI

A multi-agent prompt compilation engine that takes your raw ideas and generates **platform-optimized prompts** for ChatGPT, Claude, and Gemini simultaneously.

Built with **Next.js 16** (App Router + API Routes) and **Groq AI** (Llama 3.3 70B for fast inference).

🔗 **Live Demo**: [Deploy to Vercel →](#-deployment)

---

## 🏗️ Architecture

```
User Input → Next.js API Route (/api/compile)
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
  ChatGPT       Claude       Gemini
  Expert        Expert       Expert
  (Groq)        (Groq)       (Groq)
        ▼           ▼           ▼
        └───────────┼───────────┘
                    │
            Aggregated JSON → React UI
```

All three expert calls run **in parallel** using `Promise.all()`, so you get all three optimized prompts in the time it takes to generate one.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** with `npm`
- **Groq API Key** — [Get one free at groq.com](https://console.groq.com)

### 1. Clone & Install

```bash
git clone https://github.com/sury24-alt/PromptForge.ai.git
cd PromptForge.ai
npm install
```

### 2. Configure Environment

```bash
# Create your local environment file
cp .env.example .env.local

# Edit .env.local and add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run

```bash
npm run dev
```

Open **http://localhost:3000** — that's it! The API routes are built into the same app.

---

## 🧠 How It Works

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Next.js 16 (App Router) | React SPA with Tailwind CSS |
| **API** | Next.js API Routes | Serverless `/api/compile` endpoint |
| **LLM** | Groq (Llama 3.3 70B) | Powers all three expert nodes |
| **Icons** | Lucide React | Clean, consistent iconography |

### Expert Nodes

- **ChatGPT Expert**: Restructures your idea using markdown headings (`## Role`, `## Task`, `## Constraints`, etc.) with explicit chain-of-thought reasoning
- **Claude Expert**: Wraps instructions in XML tags (`<system_instructions>`, `<context>`, `<task>`) matching Anthropic's architectural training
- **Gemini Expert**: Uses direct context anchoring with few-shot input/output formatting placeholders

---

## 📁 Project Structure

```
PromptForge.ai/
├── src/
│   └── app/
│       ├── api/
│       │   ├── compile/
│       │   │   └── route.ts       # Main API — replaces entire Python backend
│       │   └── health/
│       │       └── route.ts       # Health check endpoint
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── InputPanel.tsx
│       │   ├── BlueprintCard.tsx
│       │   ├── LoadingState.tsx
│       │   └── OutputGrid.tsx
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.local                     # Your API key (gitignored)
├── .env.example                   # Template for new developers
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ | Your Groq API key for Llama 3.3 inference |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add `GROQ_API_KEY` in **Settings → Environment Variables**
4. Click **Deploy** — Vercel auto-detects Next.js

That's it! Your app will be live at `https://your-project.vercel.app`.

---

## 📝 API Reference

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{ "status": "healthy", "service": "PromptForge AI" }
```

### `POST /api/compile`
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
