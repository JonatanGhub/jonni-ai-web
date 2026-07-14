'use client';

/**
 * TerminalEasterEgg — oculto tras la tecla ` (backtick). Mini "sesión" de
 * terminal con líneas fijas (NO es un shell real, sin backend). Puro
 * front-end, deshabilitado si el foco está en un input/textarea.
 */

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const LINES_ES = [
  { prompt: 'whoami', output: 'jonatan@neonexai — Agentic Developer, CEO & Founder' },
  { prompt: 'cat manifiesto.txt', output: 'No vendo magia de IA — vendo sistemas que se pueden auditar, verificar y repetir.' },
  { prompt: 'ls proyectos/', output: 'neonexai.com  portal  open-source  webs-premium  voz-24-7' },
  { prompt: './contratar.sh', output: '→ neonexai.com' },
];

const LINES_EN = [
  { prompt: 'whoami', output: 'jonatan@neonexai — Agentic Developer, CEO & Founder' },
  { prompt: 'cat manifesto.txt', output: "I don't sell AI magic — I sell systems you can audit, verify and repeat." },
  { prompt: 'ls projects/', output: 'neonexai.com  portal  open-source  premium-sites  voice-24-7' },
  { prompt: './hire.sh', output: '→ neonexai.com' },
];

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('terminal');
  const lines = locale === 'es' ? LINES_ES : LINES_EN;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={t('label')}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-[4px] border border-[var(--color-line-strong)] bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#5f574f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5f574f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-copper)]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--color-ink-faint)]">jonni-ai — zsh</span>
        </div>
        <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
          {lines.map((line, i) => (
            <p
              key={i}
              className="opacity-0"
              style={{ animation: `terminal-line 0.4s ease forwards`, animationDelay: `${i * 0.35}s` }}
            >
              <span className="text-[var(--color-copper)]">$</span>{' '}
              <span className="text-[var(--color-ink)]">{line.prompt}</span>
              <br />
              <span className="text-[var(--color-ink-muted)]">{line.output}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
