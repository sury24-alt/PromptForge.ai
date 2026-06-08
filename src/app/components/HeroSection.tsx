'use client';

import { MessageSquare, Sparkles, Brain } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '160px',
        paddingBottom: '24px',
        textAlign: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {/* Headline */}
      <div style={{ position: 'relative' }}>
        <h1 
          style={{
            fontSize: '44px',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#ffffff',
          }}
        >
          Transform raw ideas into<br />
          <span className="gradient-text">platform-optimized prompts</span>
        </h1>

        <p 
          style={{
            marginTop: '20px',
            fontSize: '15px',
            color: '#9a9ab0',
            fontWeight: '300',
            lineHeight: '1.65',
            maxWidth: '550px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Powered by multi-agent AI — optimized for ChatGPT, Claude, and<br className="hidden sm:inline" />
          Gemini simultaneously
        </p>

        {/* Platform Badges */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(16, 163, 127, 0.2)',
              backgroundColor: 'rgba(16, 163, 127, 0.05)',
              color: '#10a37f',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            ChatGPT
          </div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(217, 119, 6, 0.2)',
              backgroundColor: 'rgba(217, 119, 6, 0.05)',
              color: '#d97706',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Claude
          </div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(66, 133, 244, 0.2)',
              backgroundColor: 'rgba(66, 133, 244, 0.05)',
              color: '#4285f4',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            <Brain className="w-3.5 h-3.5" />
            Gemini
          </div>
        </div>
      </div>
    </section>
  );
}
