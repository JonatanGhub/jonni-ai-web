'use client';

/**
 * Capabilities — orbital de nodos. Mecánica portada 1:1 del patrón
 * `web-engine/patterns/05-orbital-nodes` (extraído a su vez del inline JS de la
 * landing de docmo): layout polar, rAF +0.11°/frame, click = lerp 0.14 por la
 * vuelta más corta hasta las 12:00, nodo activo + resto atenuado, chips que
 * saltan a otro nodo, IntersectionObserver que pausa el rAF fuera de viewport.
 *
 * Desviación deliberada del patrón: docmo remata la ficha con una métrica en
 * porcentaje. Aquí esos números serían inventados, así que la barra se sustituye
 * por una línea de prueba real y verificable (regla anti-hype de la casa).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const SPEED = 0.11; // grados por frame en modo órbita
const LERP = 0.14; // interpolación al seleccionar
const SETTLE = 0.3; // umbral para dar por terminado el lerp
const INVITE_MS = 1400;

/** Claves i18n de cada nodo + a qué otros nodos enlaza. */
const ITEMS = [
  { key: 'agents', icon: '◆', conn: ['mcp', 'automation'] },
  { key: 'web', icon: '▲', conn: ['infra', 'voice'] },
  { key: 'voice', icon: '◉', conn: ['agents', 'web'] },
  { key: 'automation', icon: '⬡', conn: ['agents', 'mcp'] },
  { key: 'mcp', icon: '⬢', conn: ['agents'] },
  { key: 'infra', icon: '▣', conn: ['web'] },
] as const;

const STEP = 360 / ITEMS.length;

export function Capabilities() {
  const t = useTranslations('capabilities');
  const reduced = usePrefersReducedMotion();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseRef = useRef(-90);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const modeRef = useRef<'orbit' | 'select'>('orbit');

  const [active, setActive] = useState<number | null>(null);
  const [invite, setInvite] = useState<number | null>(null);

  /** Coloca los nodos en la circunferencia según el ángulo actual. */
  const layout = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (!w) return;
    const small = w < 560;
    const r = w * 0.5 * (small ? 0.72 : 0.82);
    const half = (small ? 66 : 94) / 2;
    const cx = w / 2;
    const cy = h / 2;
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const a = ((baseRef.current + i * STEP) * Math.PI) / 180;
      n.style.translate = `${cx + r * Math.cos(a) - half}px ${cy + r * Math.sin(a) - half}px`;
    });
  }, []);

  const tick = useCallback(() => {
    if (modeRef.current === 'orbit') {
      baseRef.current += SPEED;
    } else if (targetRef.current !== null) {
      baseRef.current += (targetRef.current - baseRef.current) * LERP;
      if (Math.abs(targetRef.current - baseRef.current) < SETTLE) {
        baseRef.current = targetRef.current;
        targetRef.current = null;
      }
    }
    layout();
    rafRef.current =
      modeRef.current === 'orbit' || targetRef.current !== null ? requestAnimationFrame(tick) : null;
  }, [layout]);

  // Layout inicial + re-medida al cambiar el tamaño.
  useEffect(() => {
    layout();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [layout]);

  // El rAF solo corre con la sección en viewport. Con reduced-motion no hay órbita.
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (rafRef.current === null) tick();
          } else if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [reduced, tick]);

  // Invitación: pulsa un nodo distinto hasta el primer click.
  useEffect(() => {
    if (reduced || active !== null) {
      setInvite(null);
      return;
    }
    let i = 0;
    setInvite(0);
    const id = setInterval(() => {
      i = (i + 1) % ITEMS.length;
      setInvite(i);
    }, INVITE_MS);
    return () => clearInterval(id);
  }, [reduced, active]);

  const select = useCallback(
    (i: number) => {
      modeRef.current = 'select';
      // vuelta más corta hasta las 12:00
      let want = -90 - i * STEP;
      while (want - baseRef.current > 180) want -= 360;
      while (want - baseRef.current < -180) want += 360;
      if (reduced) {
        baseRef.current = want;
        targetRef.current = null;
        layout();
      } else {
        targetRef.current = want;
        if (rafRef.current === null) tick();
      }
      setActive(i);
    },
    [layout, reduced, tick],
  );

  const close = useCallback(() => {
    setActive(null);
    modeRef.current = 'orbit';
    if (!reduced && rafRef.current === null) tick();
  }, [reduced, tick]);

  // Cierre por click fuera.
  useEffect(() => {
    if (active === null) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [active, close]);

  const item = active !== null ? ITEMS[active] : null;

  return (
    <section id="capabilities" className="sec relative mx-auto max-w-6xl px-5">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2 data-reveal className="d-h2 mt-6 max-w-2xl text-[var(--color-ink)]">
        {t('title')}
      </h2>
      <p data-reveal data-delay="1" className="d-lead mt-6 max-w-xl">
        {t('lead')}
      </p>

      <div
        ref={wrapRef}
        className="orbital relative mx-auto mt-16 aspect-square w-[min(92vw,620px)]"
        aria-label={t('title')}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="41" className="fill-none stroke-[var(--color-line)]" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="30" className="fill-none stroke-[var(--color-line)]" strokeWidth="0.4" />
        </svg>

        {/* Hub central */}
        <div className="absolute left-1/2 top-1/2 grid aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 place-content-center gap-1 rounded-full border border-[var(--color-line-strong)] bg-[radial-gradient(circle_at_50%_35%,rgba(200,125,75,0.18),rgba(11,13,16,0.92)_70%)] text-center">
          <small className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
            {t('hubHint')}
          </small>
          <h3 className="font-display text-[clamp(1rem,3.2vw,1.35rem)] font-semibold text-[var(--color-ink)]">
            {t('hub')}
          </h3>
        </div>

        {/* Nodos */}
        {ITEMS.map((it, i) => (
          <button
            key={it.key}
            type="button"
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onClick={(e) => {
              e.stopPropagation();
              select(i);
            }}
            aria-label={t(`${it.key}.name`)}
            aria-pressed={active === i}
            style={{ willChange: 'translate' }}
            className={[
              'absolute left-0 top-0 grid aspect-square w-[66px] place-content-center gap-1 rounded-full border text-center sm:w-[94px]',
              'bg-[var(--color-graphite-800)] transition-[scale,border-color,opacity,box-shadow] duration-300',
              active === i
                ? 'scale-[1.18] border-[var(--color-copper)] shadow-[0_0_32px_rgba(200,125,75,0.4)]'
                : invite === i
                  ? 'scale-[1.12] border-[var(--color-copper)] shadow-[0_0_24px_rgba(200,125,75,0.25)]'
                  : 'border-[var(--color-line-strong)]',
              active !== null && active !== i ? 'opacity-30' : 'opacity-100',
            ].join(' ')}
          >
            <span aria-hidden className="text-[1rem] leading-none text-[var(--color-copper)]">
              {it.icon}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] sm:text-[10px]">
              {t(`${it.key}.name`)}
            </span>
          </button>
        ))}

        {/* Ficha */}
        {item && (
          <div
            role="dialog"
            aria-live="polite"
            aria-label={t(`${item.key}.title`)}
            className="absolute left-1/2 top-[54%] z-10 w-[min(86%,360px)] -translate-x-1/2 rounded-[4px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-800)] p-5 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t('close')}
              className="absolute right-3 top-2 text-[18px] leading-none text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-copper)]"
            >
              ×
            </button>
            <span className="inline-block rounded-full bg-[var(--color-copper)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-graphite-900)]">
              {t(`${item.key}.badge`)}
            </span>
            <h4 className="mt-3 text-[17px] font-semibold text-[var(--color-ink)]">
              {t(`${item.key}.title`)}
            </h4>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
              {t(`${item.key}.desc`)}
            </p>

            {/* Prueba real en lugar de la métrica inventada del patrón original */}
            <p className="mt-4 flex items-start gap-2 border-t border-[var(--color-line)] pt-3 font-mono text-[11px] leading-relaxed text-[var(--color-ink-muted)]">
              <span className="shrink-0 text-[var(--color-copper)]">✓</span>
              <span>{t(`${item.key}.proof`)}</span>
            </p>

            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
              {t('connected')}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.conn.map((c) => {
                const idx = ITEMS.findIndex((x) => x.key === c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (idx >= 0) select(idx);
                    }}
                    className="rounded-full border border-[var(--color-line-strong)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]"
                  >
                    {t(`${c}.name`)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {active === null && (
          <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
            {t('tap')}
          </p>
        )}
      </div>
    </section>
  );
}
