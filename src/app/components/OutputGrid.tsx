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

      {/* Bento Modern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Row 1: ChatGPT & Claude */}
        <div className="md:col-span-6 flex flex-col">
          <BlueprintCard
            platform="ChatGPT"
            optimizedPrompt={results.chatgpt.optimized_prompt}
            animationClass="animate-fade-in-up stagger-1"
            onCopy={onCopyToast}
          />
        </div>
        <div className="md:col-span-6 flex flex-col">
          <BlueprintCard
            platform="Claude"
            optimizedPrompt={results.claude.optimized_prompt}
            animationClass="animate-fade-in-up stagger-2"
            onCopy={onCopyToast}
          />
        </div>

        {/* Row 2: Gemini Full Width */}
        <div className="md:col-span-12">
          <BlueprintCard
            platform="Gemini"
            optimizedPrompt={results.gemini.optimized_prompt}
            animationClass="animate-fade-in-up stagger-3"
            onCopy={onCopyToast}
            isFullWidth={true}
          />
        </div>
      </div>
    </section>
  );
}
