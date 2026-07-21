'use client';

/**
 * IntroOverlay — puerta de entrada a pantalla completa, réplica del intro de
 * docmo («START EXPERIENCE / SKIP INTRO», con sonido y auriculares
 * recomendados).
 *
 * Dos diferencias respecto a docmo, deliberadas:
 *  - El visual no es un vídeo: es el mismo holograma procedural del hero a
 *    pantalla completa (0 assets, 0 créditos, coherente con el resto).
 *  - El audio se SINTETIZA en el navegador con Web Audio (drone de tres
 *    osciladores desafinados con filtro paso bajo y LFO). No hay archivo que
 *    descargar y no puede sonar antes de que lo pidas.
 *
 * Reglas: el audio solo arranca tras gesto explícito (los navegadores bloquean
 * el autoplay con sonido, y sería hostil); se recuerda la elección en la sesión;
 * con prefers-reduced-motion o si ya se vio, no aparece.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Hologram } from '@/components/hologram';

const DRONE_SECONDS = 7; // el drone acompaña la transición y se apaga solo

export function IntroOverlay() {
  const t = useTranslations('intro');
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const startRef = useRef<HTMLButtonElement | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  // Decisión en cliente tras montar: nunca en SSR (evita desincronía y flash).
  // Aparece en cada carga (decisión de Jonatan) — solo se salta con reduced-motion.
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) setVisible(true);
  }, []);

  // Bloquear el scroll del fondo mientras la puerta está abierta.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    startRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  /** Drone ambiental: 3 osciladores desafinados → paso bajo con LFO → fade out. */
  const playDrone = useCallback(() => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      audioRef.current = ctx;
      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(0.16, now + 1.6); // entra suave
      master.gain.setValueAtTime(0.16, now + DRONE_SECONDS - 3);
      master.gain.linearRampToValueAtTime(0, now + DRONE_SECONDS); // y se apaga solo
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.linearRampToValueAtTime(1150, now + DRONE_SECONDS);
      filter.Q.value = 6;
      filter.connect(master);

      // Movimiento lento del corte: evita que el drone suene plano.
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.13;
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start(now);
      lfo.stop(now + DRONE_SECONDS);

      // Tríada grave levemente desafinada (D2 · A2 · D3).
      for (const [freq, type, gain] of [
        [73.42, 'sine', 0.5],
        [110.0, 'triangle', 0.28],
        [146.83, 'sine', 0.2],
      ] as const) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = (Math.random() - 0.5) * 12;
        g.gain.value = gain;
        osc.connect(g).connect(filter);
        osc.start(now);
        osc.stop(now + DRONE_SECONDS);
      }

      window.setTimeout(() => {
        void ctx.close().catch(() => {});
        if (audioRef.current === ctx) audioRef.current = null;
      }, (DRONE_SECONDS + 0.4) * 1000);
    } catch {
      /* sin audio disponible: la entrada sigue funcionando igual */
    }
  }, []);

  const dismiss = useCallback(
    (withSound: boolean) => {
      if (withSound) playDrone();
      setClosing(true);
      window.setTimeout(() => setVisible(false), 700);
    },
    [playDrone],
  );

  // Escape = saltar (sin sonido).
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, dismiss]);

  // Cerrar el contexto de audio si el componente muere antes de tiempo.
  useEffect(
    () => () => {
      void audioRef.current?.close().catch(() => {});
    },
    [],
  );

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-graphite-900)] px-5 transition-opacity duration-700 ${
        closing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Hologram className="absolute inset-0 h-full w-full opacity-60" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="tech-label" style={{ animation: 'terminal-line .6s ease both' }}>
          {t('kicker')}
        </p>

        <h1
          className="d-display mt-6 max-w-3xl text-balance text-[var(--color-ink)]"
          style={{ animation: 'terminal-line .6s ease .12s both' }}
        >
          {t('title')}
        </h1>

        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'terminal-line .6s ease .24s both' }}
        >
          <button
            ref={startRef}
            type="button"
            onClick={() => dismiss(true)}
            className="rounded-[3px] bg-[var(--color-copper)] px-8 py-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
          >
            {t('start')}
          </button>
          <button
            type="button"
            onClick={() => dismiss(false)}
            className="px-3 py-4 font-mono text-[13px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
          >
            {t('skip')} ›
          </button>
        </div>

        <p
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]"
          style={{ animation: 'terminal-line .6s ease .36s both' }}
        >
          {t('sound')}
        </p>
      </div>
    </div>
  );
}
