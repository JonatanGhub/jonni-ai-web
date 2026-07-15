'use client';

/**
 * TerminalIntro — bloque de terminal animado arriba del todo de la página.
 * Elige uno de los 7 guiones al azar en cada visita (elección en cliente tras
 * el montaje para no desincronizar con el HTML del servidor) y revela sus
 * líneas escalonadas, igual que TerminalEasterEgg.
 */

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';
import { TERMINAL_SCRIPTS, type TerminalLine, type TerminalLineStyle } from '@/lib/terminal-scripts';

const STAGGER_S = 0.45;

const LINE_CLASS: Record<TerminalLineStyle, string> = {
  prompt: 'text-[var(--color-ink)]',
  tool: 'text-[var(--color-copper)]',
  result: 'pl-4 text-[var(--color-ink-muted)]',
  check: 'text-[var(--color-ink-muted)]',
  success: 'mt-1 text-[var(--color-copper-bright)] font-medium',
};

export function TerminalIntro() {
  const locale = useLocale();
  const reducedMotion = usePrefersReducedMotion();
  const [script, setScript] = useState<TerminalLine[] | null>(null);

  useEffect(() => {
    const scripts = TERMINAL_SCRIPTS[locale === 'en' ? 'en' : 'es'];
    setScript(scripts[Math.floor(Math.random() * scripts.length)]);
  }, [locale]);

  return (
    <div className="mx-auto max-w-2xl px-5 pt-28">
      <div
        className="overflow-hidden rounded-[4px] border border-[var(--color-line-strong)] bg-black shadow-lg"
        aria-hidden={script === null}
      >
        <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#5f574f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5f574f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-copper)]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--color-ink-faint)]">jonni-ai — claude</span>
        </div>
        <div className="min-h-[168px] px-5 py-5 font-mono text-[12.5px] leading-relaxed">
          {script?.map((line, i) => (
            <p
              key={i}
              className={reducedMotion ? undefined : 'opacity-0'}
              style={
                reducedMotion
                  ? undefined
                  : { animation: 'terminal-line 0.4s ease forwards', animationDelay: `${i * STAGGER_S}s` }
              }
            >
              <span className={LINE_CLASS[line.style]}>{line.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
