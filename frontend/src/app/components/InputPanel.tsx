'use client';

import { Sparkles, Loader2 } from 'lucide-react';

interface InputPanelProps {
  rawIdea: string;
  setRawIdea: (value: string) => void;
  onCompile: () => void;
  isLoading: boolean;
}

export default function InputPanel({ rawIdea, setRawIdea, onCompile, isLoading }: InputPanelProps) {
  const charCount = rawIdea.length;
  const maxChars = 5000;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (rawIdea.trim() && !isLoading) {
        onCompile();
      }
    }
  };

  return (
    <section className="relative z-10 max-w-3xl mx-auto px-4 py-8">
      <div className="glass-card p-6 md:p-8">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <label htmlFor="raw-idea-input" className="text-sm font-medium text-[#8a8a9a] uppercase tracking-widest">
            Your Raw Idea
          </label>
        </div>

        {/* Textarea */}
        <textarea
          id="raw-idea-input"
          className="input-area"
          placeholder="Describe your idea here... e.g., 'I want an AI that helps me write better emails by analyzing tone, suggesting improvements, and adapting to different contexts like professional, casual, or follow-up messages...'"
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={maxChars}
          disabled={isLoading}
          rows={6}
        />

        {/* Footer: character count + compile button */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-4">
            <span className={`text-xs font-mono ${charCount > maxChars * 0.9 ? 'text-red-400' : 'text-[#55556a]'}`}>
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
            <span className="text-xs text-[#55556a] hidden sm:inline">
              Ctrl + Enter to compile
            </span>
          </div>

          <button
            id="compile-button"
            className="btn-compile flex items-center gap-2"
            onClick={onCompile}
            disabled={!rawIdea.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Compile
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
