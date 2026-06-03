'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  const platforms = [
    { name: 'ChatGPT', color: '#10a37f', delay: 'stagger-1' },
    { name: 'Claude', color: '#d97706', delay: 'stagger-2' },
    { name: 'Gemini', color: '#4285f4', delay: 'stagger-3' },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      {/* Status message */}
      <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
        <p className="text-sm text-[#8a8a9a] font-medium tracking-wide">
          Compiling prompts across three expert agents
          <span className="animate-pulse-glow">...</span>
        </p>
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className={`glass-card p-5 opacity-0 animate-fade-in-up ${platform.delay}`}
          >
            {/* Header skeleton */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg animate-shimmer"
                style={{ background: `${platform.color}10`, border: `1px solid ${platform.color}20` }}
              />
              <div className="space-y-2 flex-1">
                <div className="skeleton-line w-20" />
                <div className="skeleton-line w-32 h-2" />
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-4"
              style={{
                background: `linear-gradient(to right, transparent, ${platform.color}15, transparent)`,
              }}
            />

            {/* Body skeleton lines */}
            <div className="space-y-3">
              <div className="skeleton-line w-full" />
              <div className="skeleton-line w-11/12" />
              <div className="skeleton-line w-9/12" />
              <div className="skeleton-line w-full" />
              <div className="skeleton-line w-10/12" />
              <div className="skeleton-line w-7/12" />
              <div className="skeleton-line w-full" />
              <div className="skeleton-line w-8/12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
