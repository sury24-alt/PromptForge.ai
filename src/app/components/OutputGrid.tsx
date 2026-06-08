'use client';

import BlueprintCard from './BlueprintCard';
import { Sparkles } from 'lucide-react';

interface ExpertOutput {
  platform: string;
  optimized_prompt: string;
}

interface OutputGridProps {
  results: {
    chatgpt: ExpertOutput;
    claude: ExpertOutput;
    gemini: ExpertOutput;
  };
  compileDuration?: number;
  onCopyToast?: () => void;
}

export default function OutputGrid({ results, compileDuration, onCopyToast }: OutputGridProps) {
  const cards: { platform: 'ChatGPT' | 'Claude' | 'Gemini'; data: ExpertOutput; stagger: string }[] = [
    { platform: 'ChatGPT', data: results.chatgpt, stagger: 'stagger-1' },
    { platform: 'Claude', data: results.claude, stagger: 'stagger-2' },
    { platform: 'Gemini', data: results.gemini, stagger: 'stagger-3' },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-6">
      {/* Success banner - left aligned */}
      <div className="flex items-center justify-start mb-6 animate-fade-in">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/8 border border-emerald-500/15">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <p className="text-sm text-emerald-400/90 font-medium tracking-wide">
            3 optimized blueprints generated
            {compileDuration && (
              <span className="text-emerald-400/50 ml-1">
                in {compileDuration.toFixed(1)}s
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 3-column grid - left aligned */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <BlueprintCard
            key={card.platform}
            platform={card.platform}
            optimizedPrompt={card.data.optimized_prompt}
            animationClass={`animate-fade-in-up ${card.stagger}`}
            onCopy={onCopyToast}
          />
        ))}
      </div>
    </section>
  );
}
