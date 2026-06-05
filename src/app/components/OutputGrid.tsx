'use client';

import BlueprintCard from './BlueprintCard';

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
}

export default function OutputGrid({ results }: OutputGridProps) {
  const cards: { platform: 'ChatGPT' | 'Claude' | 'Gemini'; data: ExpertOutput; stagger: string }[] = [
    { platform: 'ChatGPT', data: results.chatgpt, stagger: 'stagger-1' },
    { platform: 'Claude', data: results.claude, stagger: 'stagger-2' },
    { platform: 'Gemini', data: results.gemini, stagger: 'stagger-3' },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      {/* Section header */}
      <div className="flex items-center justify-center mb-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-sm text-[#8a8a9a] font-medium tracking-wide">
            Compilation complete — 3 optimized blueprints generated
          </p>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <BlueprintCard
            key={card.platform}
            platform={card.platform}
            optimizedPrompt={card.data.optimized_prompt}
            animationClass={`animate-fade-in-up ${card.stagger}`}
          />
        ))}
      </div>
    </section>
  );
}
