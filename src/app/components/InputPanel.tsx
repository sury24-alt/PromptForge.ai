'use client';

import { useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface InputPanelProps {
  rawIdea: string;
  setRawIdea: (value: string) => void;
  onCompile: () => void;
  isLoading: boolean;
}

export default function InputPanel({ rawIdea, setRawIdea, onCompile, isLoading }: InputPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = rawIdea.length;
  const maxChars = 5000;
  const charPercent = Math.min((charCount / maxChars) * 100, 100);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    }
  }, [rawIdea]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (rawIdea.trim() && !isLoading) {
        onCompile();
      }
    }
  };

  return (
    <section className="relative z-10 px-4 py-6">
      <div className="chat-input-container">
        <textarea
          ref={textareaRef}
          id="raw-idea-input"
          className="chat-input-area"
          placeholder="Describe your idea... e.g., 'An AI assistant that helps write better emails by analyzing tone and suggesting improvements...'"
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={maxChars}
          disabled={isLoading}
          rows={1}
        />

        {/* Compile Button */}
        <button
          id="compile-button"
          className="btn-compile-circle"
          onClick={onCompile}
          disabled={!rawIdea.trim() || isLoading}
          title="Compile prompts (Ctrl+Enter)"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowUp className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-start gap-4 mt-3 mx-auto px-1" style={{ maxWidth: '780px' }}>
        <span className="text-[11px] font-mono text-[#55556a]">
          {charCount > 0 ? `${charCount} / ${maxChars}` : `0 / ${maxChars}`}
        </span>
        {/* Character progress bar */}
        <div className="w-24 h-0.5 bg-white/5 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${charPercent}%`,
              background: charPercent > 90 ? '#ef4444' : 'var(--gradient-main)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
