import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PromptForge AI — Multi-Agent Prompt Compiler',
  description:
    'Compile your raw ideas into platform-optimized prompts for ChatGPT, Claude, and Gemini simultaneously. Powered by a multi-agent parallel processing engine.',
  keywords: ['prompt engineering', 'AI prompts', 'ChatGPT', 'Claude', 'Gemini', 'LLM', 'prompt optimizer'],
  openGraph: {
    title: 'PromptForge AI — Multi-Agent Prompt Compiler',
    description:
      'Compile your raw ideas into platform-optimized prompts for ChatGPT, Claude, and Gemini simultaneously.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
