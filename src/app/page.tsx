'use client';

import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputPanel from './components/InputPanel';
import OutputGrid from './components/OutputGrid';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';
import Toast from './components/Toast';
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

export default function Home() {
  const [rawIdea, setRawIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CompileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compileDuration, setCompileDuration] = useState<number | undefined>();
  const [toastVisible, setToastVisible] = useState(false);

  const handleCompile = async () => {
    if (!rawIdea.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResults(null);
    setCompileDuration(undefined);

    const startTime = performance.now();

    try {
      const response = await fetch('/api/compile', {
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
      const duration = (performance.now() - startTime) / 1000;
      setCompileDuration(duration);
      setResults(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.';

      if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToast = useCallback(() => {
    setToastVisible(true);
  }, []);

  const handleToastDone = useCallback(() => {
    setToastVisible(false);
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen pb-8">
        {/* Constellation Network Background Layer */}
        <div className="absolute top-0 right-0 w-[45%] h-[750px] pointer-events-none overflow-hidden select-none z-0 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="250" y1="100" x2="380" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            <line x1="380" y1="150" x2="480" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="380" y1="150" x2="420" y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            <line x1="250" y1="100" x2="300" y2="240" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="300" y1="240" x2="420" y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            <line x1="420" y1="280" x2="490" y2="220" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="300" y1="240" x2="220" y2="350" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="420" y1="280" x2="380" y2="420" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            <line x1="220" y1="350" x2="320" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="380" y1="420" x2="320" y2="480" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            <line x1="380" y1="420" x2="470" y2="380" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="320" y1="480" x2="260" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />
            <line x1="320" y1="480" x2="410" y2="580" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />

            <circle cx="250" cy="100" r="2" fill="rgba(139, 92, 246, 0.25)" />
            <circle cx="380" cy="150" r="2.5" fill="rgba(59, 130, 246, 0.3)" />
            <circle cx="480" cy="80" r="1.5" fill="rgba(6, 182, 212, 0.2)" />
            <circle cx="300" cy="240" r="2" fill="rgba(139, 92, 246, 0.2)" />
            <circle cx="420" cy="280" r="3" fill="rgba(6, 182, 212, 0.3)" />
            <circle cx="490" cy="220" r="2" fill="rgba(255, 255, 255, 0.15)" />
            <circle cx="220" cy="350" r="2.5" fill="rgba(139, 92, 246, 0.25)" />
            <circle cx="380" cy="420" r="2" fill="rgba(59, 130, 246, 0.3)" />
            <circle cx="470" cy="380" r="1.5" fill="rgba(255, 255, 255, 0.15)" />
            <circle cx="320" cy="480" r="3" fill="rgba(6, 182, 212, 0.3)" />
            <circle cx="260" cy="600" r="2" fill="rgba(139, 92, 246, 0.2)" />
            <circle cx="410" cy="580" r="2" fill="rgba(59, 130, 246, 0.2)" />
          </svg>
        </div>

        <HeroSection />

        <InputPanel
          rawIdea={rawIdea}
          setRawIdea={setRawIdea}
          onCompile={handleCompile}
          isLoading={isLoading}
        />

        {/* Error state */}
        {error && (
          <div className="relative z-10 max-w-[780px] mx-auto px-4 pb-4 animate-fade-in">
            <div className="glass-card p-4" style={{ borderColor: 'rgba(239, 68, 68, 0.15)', background: 'rgba(239, 68, 68, 0.04)' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-400">Compilation Failed</p>
                  <p className="text-sm text-red-300/60 mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {results && !isLoading && (
          <OutputGrid
            results={results}
            compileDuration={compileDuration}
            onCopyToast={handleCopyToast}
          />
        )}
      </main>

      <Footer />

      {/* Toast Notifications */}
      <Toast
        message="Copied to clipboard!"
        visible={toastVisible}
        onDone={handleToastDone}
      />
    </>
  );
}
