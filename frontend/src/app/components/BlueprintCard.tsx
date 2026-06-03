'use client';

import { useState } from 'react';
import { Copy, Check, MessageSquare, Sparkles, Brain } from 'lucide-react';

interface BlueprintCardProps {
  platform: 'ChatGPT' | 'Claude' | 'Gemini';
  optimizedPrompt: string;
  animationClass?: string;
}

const platformConfig = {
  ChatGPT: {
    icon: MessageSquare,
    colorClass: 'card-chatgpt',
    accentColor: '#10a37f',
    badgeBg: 'rgba(16, 163, 127, 0.1)',
    badgeBorder: 'rgba(16, 163, 127, 0.25)',
    dotColor: 'bg-emerald-400',
    description: 'Markdown-structured with chain-of-thought',
  },
  Claude: {
    icon: Sparkles,
    colorClass: 'card-claude',
    accentColor: '#d97706',
    badgeBg: 'rgba(217, 119, 6, 0.1)',
    badgeBorder: 'rgba(217, 119, 6, 0.25)',
    dotColor: 'bg-amber-400',
    description: 'XML-tagged Anthropic architecture',
  },
  Gemini: {
    icon: Brain,
    colorClass: 'card-gemini',
    accentColor: '#4285f4',
    badgeBg: 'rgba(66, 133, 244, 0.1)',
    badgeBorder: 'rgba(66, 133, 244, 0.25)',
    dotColor: 'bg-blue-400',
    description: 'Context-anchored few-shot format',
  },
};

export default function BlueprintCard({ platform, optimizedPrompt, animationClass = '' }: BlueprintCardProps) {
  const [copied, setCopied] = useState(false);
  const config = platformConfig[platform];
  const Icon = config.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = optimizedPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`glass-card ${config.colorClass} ${animationClass} opacity-0 flex flex-col h-full`}
    >
      {/* Card Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Platform icon */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ background: config.badgeBg, border: `1px solid ${config.badgeBorder}` }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: config.accentColor }} />
            </div>

            {/* Platform name + status */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white/90">{platform}</h3>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
              </div>
              <p className="text-[11px] text-[#55556a] mt-0.5">{config.description}</p>
            </div>
          </div>

          {/* Copy button */}
          <button
            id={`copy-${platform.toLowerCase()}-btn`}
            className={`btn-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Subtle divider */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${config.accentColor}20, transparent)`,
          }}
        />
      </div>

      {/* Card Body — Prompt Output */}
      <div className="p-5 pt-4 flex-1 min-h-0">
        <div className="prompt-output">{optimizedPrompt}</div>
      </div>
    </div>
  );
}
