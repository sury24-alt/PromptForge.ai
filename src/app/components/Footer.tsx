'use client';

import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400/50" />
            <span className="text-sm text-[#55556a]">
              PromptForge AI — Multi-agent prompt compilation engine
            </span>
          </div>

          {/* Attribution */}
          <span className="text-xs text-[#3a3a4a]">
            Built with Next.js & Groq
          </span>
        </div>
      </div>
    </footer>
  );
}
