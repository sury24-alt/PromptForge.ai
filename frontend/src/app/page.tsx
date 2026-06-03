'use client';

import { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputGrid from './components/OutputGrid';
import LoadingState from './components/LoadingState';
import { AlertCircle } from 'lucide-react';

interface ExpertOutput {
  platform: string;
  optimized_prompt: string;
}

interface CompileResponse {
  chatgpt: ExpertOutput;
  claude: ExpertOutput;
  gemini: ExpertOutput;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [rawIdea, setRawIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CompileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompile = async () => {
    if (!rawIdea.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_URL}/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw_idea: rawIdea.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.detail || `Server responded with status ${response.status}`
        );
      }

      const data: CompileResponse = await response.json();
      setResults(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.';

      if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        setError(
          'Unable to connect to the PromptForge backend. Make sure the FastAPI server is running on port 8000.'
        );
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen pb-16">
      <Header />

      <InputPanel
        rawIdea={rawIdea}
        setRawIdea={setRawIdea}
        onCompile={handleCompile}
        isLoading={isLoading}
      />

      {/* Error state */}
      {error && (
        <div className="relative z-10 max-w-3xl mx-auto px-4 pb-4 animate-fade-in">
          <div className="glass-card p-4 border-red-500/20 bg-red-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-400">Compilation Failed</p>
                <p className="text-sm text-red-300/70 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && <LoadingState />}

      {/* Results */}
      {results && !isLoading && <OutputGrid results={results} />}

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 mt-8">
        <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />
        <p className="text-xs text-[#3a3a4a] tracking-wide">
          PromptForge AI — Multi-agent prompt compilation engine
        </p>
      </footer>
    </main>
  );
}
