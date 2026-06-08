import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PromptForge AI — Multi-Agent Prompt Compiler',
  description:
    'Transform your raw ideas into platform-optimized prompts for ChatGPT, Claude, and Gemini simultaneously. Powered by multi-agent parallel AI processing.',
  keywords: ['prompt engineering', 'AI prompts', 'ChatGPT', 'Claude', 'Gemini', 'LLM', 'prompt optimizer'],
  openGraph: {
    title: 'PromptForge AI — Multi-Agent Prompt Compiler',
    description:
      'Transform your raw ideas into platform-optimized prompts for ChatGPT, Claude, and Gemini simultaneously.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
