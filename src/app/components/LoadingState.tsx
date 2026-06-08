'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const steps = [
  { label: 'Analyzing your idea', color: '#8b5cf6' },
  { label: 'Generating ChatGPT prompt', color: '#10a37f' },
  { label: 'Generating Claude prompt', color: '#d97706' },
  { label: 'Generating Gemini prompt', color: '#4285f4' },
];

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const platforms = [
    { name: 'ChatGPT', color: '#10a37f', delay: 'stagger-1' },
    { name: 'Claude', color: '#d97706', delay: 'stagger-2' },
    { name: 'Gemini', color: '#4285f4', delay: 'stagger-3' },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="max-w-md mx-auto mb-10 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          <p className="text-sm text-[#9a9ab0] font-medium tracking-wide">
            Compiling across three expert agents
          </p>
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="loading-step"
              style={{
                opacity: i <= activeStep ? 1 : 0.3,
                transition: 'opacity 0.5s ease',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: step.color,
                  opacity: i === activeStep ? 1 : 0.5,
                  animation: i === activeStep ? 'pulse-glow 1.5s infinite' : 'none',
                }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: i <= activeStep ? '#9a9ab0' : '#55556a' }}
              >
                {step.label}
                {i === activeStep && (
                  <span className="inline-flex ml-1 gap-0.5">
                    <span className="loading-dot" style={{ width: 3, height: 3, backgroundColor: step.color }} />
                    <span className="loading-dot" style={{ width: 3, height: 3, backgroundColor: step.color }} />
                    <span className="loading-dot" style={{ width: 3, height: 3, backgroundColor: step.color }} />
                  </span>
                )}
              </span>
              {i < activeStep && (
                <span className="text-[10px] text-emerald-500/60 ml-auto">✓</span>
              )}
            </div>
          ))}
        </div>
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
                className="w-10 h-10 rounded-xl animate-shimmer"
                style={{ background: `${platform.color}08`, border: `1px solid ${platform.color}15` }}
              />
              <div className="space-y-2 flex-1">
                <div className="skeleton-line w-20" />
                <div className="skeleton-line w-32 h-2" />
              </div>
            </div>

            {/* Tab skeleton */}
            <div className="flex gap-2 mb-4">
              <div className="skeleton-line w-16 h-7 rounded-lg" />
              <div className="skeleton-line w-12 h-7 rounded-lg" />
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-4"
              style={{
                background: `linear-gradient(to right, transparent, ${platform.color}10, transparent)`,
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
