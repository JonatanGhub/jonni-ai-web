'use client';

/**
 * TerminalIntro — terminal "Símbolo del sistema" a ancho completo arriba del
 * todo de la página. Reproduce en directo (typewriter + spinner estilo Claude
 * Code con contador de tokens) uno de los guiones de terminal-scripts.ts y
 * rota al siguiente cada ~6s. Todo se anima en cliente tras el montaje; el
 * SSR solo pinta el marco (evita desincronizar la hidratación).
 */

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';
import { TERMINAL_SCRIPTS, type TermLine } from '@/lib/terminal-scripts';

const PROMPT = 'C:\\Users\\Jonatan&Claude>';
const SPINNER_FRAMES = ['·', '✢', '✳', '✵', '✻', '✽', '✻', '✵', '✳', '✢'];
const TYPE_MS = 26; // por carácter del comando
const LINE_MS = 420; // entre líneas de salida
const WORK_MS = 900; // respiro del spinner antes de la primera tool line
const HOLD_MS = 1500; // pausa con el guion completo antes de rotar
const STATIC_MS = 6000; // rotación en prefers-reduced-motion

export function TerminalIntro() {
  const locale = useLocale();
  const reducedMotion = usePrefersReducedMotion();

  const [lines, setLines] = useState<TermLine[]>([]);
  const [typed, setTyped] = useState<string | null>(null);
  const [spin, setSpin] = useState<{ verb: string } | null>(null);
  const [spinTick, setSpinTick] = useState({ frame: 0, secs: 1, tokens: 0 });
  const [done, setDone] = useState(false);

  // Motor de reproducción: recorre los guiones barajados en bucle infinito.
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const scripts = TERMINAL_SCRIPTS[locale === 'en' ? 'en' : 'es'];
    const order = scripts.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let cursor = 0;

    async function play() {
      while (!cancelled) {
        const script = scripts[order[cursor % order.length]];
        cursor += 1;
        setLines([]);
        setTyped(null);
        setSpin(null);
        setDone(false);

        if (reducedMotion) {
          setLines(script.filter((l) => l.t !== 'work'));
          setDone(true);
          await sleep(STATIC_MS);
          continue;
        }

        for (const line of script) {
          if (cancelled) return;
          if (line.t === 'cmd') {
            setTyped('');
            await sleep(280);
            for (let i = 1; i <= line.text.length; i++) {
              if (cancelled) return;
              setTyped(line.text.slice(0, i));
              await sleep(TYPE_MS);
            }
            await sleep(200);
            setLines((prev) => [...prev, line]);
            setTyped(null);
          } else if (line.t === 'work') {
            setSpin({ verb: line.verb });
            await sleep(WORK_MS);
          } else if (line.t === 'ok') {
            setSpin(null);
            await sleep(160);
            setLines((prev) => [...prev, line]);
            setDone(true);
          } else {
            setLines((prev) => [...prev, line]);
            await sleep(LINE_MS);
          }
        }
        await sleep(HOLD_MS);
      }
    }

    void play();
    return () => {
      cancelled = true;
    };
  }, [locale, reducedMotion]);

  // Tick del spinner: frame + segundos + tokens subiendo, como Claude Code.
  useEffect(() => {
    if (!spin) return;
    const start = Date.now();
    let tokens = 200 + Math.floor(Math.random() * 400);
    setSpinTick({ frame: 0, secs: 1, tokens });
    const id = setInterval(() => {
      tokens += 20 + Math.floor(Math.random() * 90);
      const elapsed = Date.now() - start;
      setSpinTick({
        frame: Math.floor(elapsed / 120) % SPINNER_FRAMES.length,
        secs: Math.floor(elapsed / 1000) + 1,
        tokens,
      });
    }, 120);
    return () => clearInterval(id);
  }, [spin]);

  const tabTitle = locale === 'en' ? 'Command Prompt' : 'Símbolo del sistema';

  return (
    <div className="w-full pt-24 sm:pt-32" aria-hidden="true">
      <div className="w-full border-y border-[var(--color-line)] bg-[#0c0c0c]">
        {/* Barra de pestañas estilo Símbolo del sistema */}
        <div className="flex items-center justify-between bg-[#171717] pr-3">
          <div className="flex items-end">
            <div className="flex items-center gap-2 rounded-t-[4px] bg-[#0c0c0c] px-3.5 py-2 font-mono text-[11px] text-[#cccccc]">
              <span className="rounded-[2px] bg-[#2b2b2b] px-1 text-[9px] leading-[14px] text-[var(--color-copper)]">
                &gt;_
              </span>
              <span>{tabTitle}</span>
              <span className="ml-2 text-[#6b6b6b]">×</span>
            </div>
            <span className="px-3 pb-2 font-mono text-[12px] text-[#6b6b6b]">+</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#8a8a8a]">
            <span>─</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>

        {/* Cuerpo del terminal */}
        <div className="mx-auto min-h-[300px] w-full max-w-6xl px-4 py-4 font-mono text-[11.5px] leading-[1.75] sm:px-6 sm:text-[13px]">
          {lines.map((line, i) => {
            if (line.t === 'cmd') {
              return (
                <p key={i}>
                  <span className="text-[#b8b8b8]">{PROMPT}</span>{' '}
                  <span className="text-[var(--color-ink)]">{line.text}</span>
                </p>
              );
            }
            if (line.t === 'tool') {
              return (
                <p key={i}>
                  <span className="text-[var(--color-copper)]">⏺</span>{' '}
                  <span className="text-[#e6e2db]">{line.text}</span>
                </p>
              );
            }
            if (line.t === 'out') {
              return (
                <p key={i} className="pl-4">
                  <span className="text-[#5f574f]">⎿</span>{' '}
                  <span className="text-[#9aa0a6]">{line.text}</span>
                </p>
              );
            }
            if (line.t === 'ok') {
              return (
                <p key={i} className="mt-1 font-medium text-[var(--color-copper-bright)]">
                  ✓ {line.text}
                </p>
              );
            }
            if (line.t === 'txt') {
              return (
                <p key={i} className="text-[#cccccc]">
                  {line.text}
                </p>
              );
            }
            return null; // 'work' nunca se persiste en lines
          })}

          {/* Comando en curso (typewriter + caret) */}
          {typed !== null && (
            <p>
              <span className="text-[#b8b8b8]">{PROMPT}</span>{' '}
              <span className="text-[var(--color-ink)]">{typed}</span>
              <span className="term-caret text-[var(--color-copper)]">▌</span>
            </p>
          )}

          {/* Spinner estilo Claude Code */}
          {spin && (
            <p className="mt-1">
              <span className="text-[var(--color-copper)]">{SPINNER_FRAMES[spinTick.frame]}</span>{' '}
              <span className="text-[var(--color-ink)]">{spin.verb}…</span>{' '}
              <span className="text-[#6b6b6b]">
                ({spinTick.secs}s · ↑ {(spinTick.tokens / 1000).toFixed(1)}k tokens · esc to
                interrupt)
              </span>
            </p>
          )}

          {/* Prompt nuevo al terminar, esperando la siguiente ronda */}
          {done && (
            <p className="mt-1">
              <span className="text-[#b8b8b8]">{PROMPT}</span>{' '}
              <span className="term-caret text-[var(--color-copper)]">▌</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
