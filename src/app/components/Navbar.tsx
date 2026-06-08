'use client';

import { useState, useEffect } from 'react';
import { Terminal, ExternalLink, Zap, Cpu, Layers } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(5, 5, 8, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      {/* Logo - Left */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/15 to-blue-500/15 border border-white/10">
            <Terminal className="w-4 h-4 text-purple-400" />
          </div>
        </div>
        <span className="text-sm font-extrabold tracking-wider uppercase text-white/90">
          PROMPTFORGE
        </span>
      </div>

      {/* Feature Pills - Center */}
      <div className="hidden md:flex items-center gap-2">
        <div className="feature-pill text-[10px] tracking-wider">
          <Zap className="w-3 h-3 text-purple-400" />
          MULTI-AGENT
        </div>
        <div className="feature-pill text-[10px] tracking-wider">
          <Cpu className="w-3 h-3 text-blue-400" />
          PARALLEL
        </div>
        <div className="feature-pill text-[10px] tracking-wider">
          <Layers className="w-3 h-3 text-cyan-400" />
          3 PLATFORMS
        </div>
      </div>

      {/* GitHub Link - Right */}
      <a
        href="https://github.com/sury24-alt/PromptForge.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#9a9ab0] hover:text-white transition-all duration-300"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">GitHub</span>
      </a>
    </nav>
  );
}
