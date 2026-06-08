'use client';

import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputPanel from './components/InputPanel';
import OutputGrid from './components/OutputGrid';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';
import Toast from './components/Toast';
import BackgroundMesh from './components/BackgroundMesh';
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
        {/* Animated 3D Constellation Background */}
        <BackgroundMesh />

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
