'use client';

import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10 pt-16 pb-6 text-center">
      {/* Ambient orb behind logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative inline-flex items-center gap-3 mb-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-lg animate-pulse-glow" />
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
            <Terminal className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="gradient-text">PromptForge</span>
          <span className="text-white/90 ml-1">AI</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-[15px] text-[#8a8a9a] font-light tracking-wide max-w-md mx-auto leading-relaxed">
        Compile your ideas into platform-optimized prompts
        <br />
        <span className="text-[13px] text-[#55556a]">
          Powered by multi-agent parallel processing
        </span>
      </p>

      {/* Subtle divider */}
      <div className="mt-10 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
