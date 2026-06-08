'use client';

import { useState, useMemo } from 'react';
import { Copy, Check, MessageSquare, Sparkles, Brain } from 'lucide-react';

interface BlueprintCardProps {
  platform: 'ChatGPT' | 'Claude' | 'Gemini';
  optimizedPrompt: string;
  animationClass?: string;
  onCopy?: () => void;
}

const platformConfig = {
  ChatGPT: {
    icon: MessageSquare,
    colorClass: 'card-chatgpt',
    accentColor: '#10a37f',
    badgeBg: 'rgba(16, 163, 127, 0.08)',
    badgeBorder: 'rgba(16, 163, 127, 0.2)',
    dotColor: 'bg-emerald-400',
    description: 'Markdown-structured with chain-of-thought',
  },
  Claude: {
    icon: Sparkles,
    colorClass: 'card-claude',
    accentColor: '#d97706',
    badgeBg: 'rgba(217, 119, 6, 0.08)',
    badgeBorder: 'rgba(217, 119, 6, 0.2)',
    dotColor: 'bg-amber-400',
    description: 'XML-tagged Anthropic architecture',
  },
  Gemini: {
    icon: Brain,
    colorClass: 'card-gemini',
    accentColor: '#4285f4',
    badgeBg: 'rgba(66, 133, 244, 0.08)',
    badgeBorder: 'rgba(66, 133, 244, 0.2)',
    dotColor: 'bg-blue-400',
    description: 'Context-anchored few-shot format',
  },
};

function renderPreview(text: string): string {
  // Simple markdown-to-html rendering
  let html = text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // List items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p>')
    // Single newlines
    .replace(/\n/g, '<br/>');

  return `<p>${html}</p>`;
}

export default function BlueprintCard({ platform, optimizedPrompt, animationClass = '', onCopy }: BlueprintCardProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const config = platformConfig[platform];
  const Icon = config.icon;

  const wordCount = useMemo(() => {
    return optimizedPrompt.trim().split(/\s+/).length;
  }, [optimizedPrompt]);

  const previewHtml = useMemo(() => renderPreview(optimizedPrompt), [optimizedPrompt]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = optimizedPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      onCopy?.();
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
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: config.badgeBg, border: `1px solid ${config.badgeBorder}` }}
            >
              <Icon className="w-5 h-5" style={{ color: config.accentColor }} />
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

          {/* Word count badge */}
          <span className="text-[11px] text-[#55556a] font-mono bg-white/3 px-2 py-1 rounded-md">
            {wordCount} words
          </span>
        </div>

        {/* Tab bar + Copy */}
        <div className="flex items-center justify-between mt-2">
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`tab-btn ${activeTab === 'raw' ? 'active' : ''}`}
              onClick={() => setActiveTab('raw')}
            >
              Raw
            </button>
          </div>

          <button
            id={`copy-${platform.toLowerCase()}-btn`}
            className={`btn-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mt-3"
          style={{
            background: `linear-gradient(to right, transparent, ${config.accentColor}15, transparent)`,
          }}
        />
      </div>

      {/* Card Body */}
      <div className="p-5 pt-4 flex-1 min-h-0">
        {activeTab === 'preview' ? (
          <div
            className="prompt-preview"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : (
          <div className="prompt-output">{optimizedPrompt}</div>
        )}
      </div>
    </div>
  );
}
