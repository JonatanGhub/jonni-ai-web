'use client';

/**
 * Showreel — banda de arrastre con deriva continua, al estilo del showreel de
 * docmo («läuft von selbst — zieh mit dem Finger»). Arrastra con ratón o dedo,
 * se mueve sola cuando la sueltas y hace bucle sin costura duplicando la lista.
 *
 * Aquí es el gancho visual de la sección de proyectos: tarjetas compactas. El
 * detalle (descripción + bullets) sigue en la rejilla de abajo, porque en un CV
 * esconder el texto tras una interacción lo empeora.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const SPEED = 0.45; // px por frame de deriva automática

interface ShowreelItem {
  key: string;
  num: string;
  href: string | null;
}

export function Showreel({ items }: { items: ShowreelItem[] }) {
  const t = useTranslations('projects');
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const halfRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0, moved: 0 });

  // La lista se duplica para que el bucle no tenga costura.
  const loop = [...items, ...items];

  const apply = useCallback(() => {
    const half = halfRef.current;
    if (half > 0) {
      // Normaliza dentro de [-half, 0) — el punto exacto donde la 2ª copia calca a la 1ª.
      offsetRef.current = ((offsetRef.current % half) + half) % half;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }
  }, []);

  const tick = useCallback(() => {
    if (!dragRef.current.active) offsetRef.current += SPEED;
    apply();
    rafRef.current = requestAnimationFrame(tick);
  }, [apply]);

  // Mide la mitad del track (= ancho de una copia) y arranca la deriva en viewport.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
      apply();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    if (reduced) return () => ro.disconnect();

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
      { rootMargin: '150px 0px' },
    );
    io.observe(track);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [apply, reduced, tick]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      moved: 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d.active) return;
      const dx = e.clientX - d.startX;
      d.moved = Math.abs(dx);
      offsetRef.current = d.startOffset - dx;
      apply();
    },
    [apply],
  );

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <div className="relative mt-12 select-none">
      {/* Degradados de borde para que las tarjetas entren y salgan sin corte seco */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-graphite-900)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-graphite-900)] to-transparent"
      />

      <div
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
          {loop.map((p, i) => {
            const card = (
              <div className="blueprint-card flex h-full w-[240px] flex-col justify-between gap-6 p-5 sm:w-[280px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[12px] text-[var(--color-copper)]">[{p.num}]</span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
                    {t('live')}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-copper)]">
                    {t(`${p.key}.tag`)}
                  </p>
                  <h3 className="mt-2 text-[17px] font-semibold leading-snug text-[var(--color-ink)]">
                    {t(`${p.key}.name`)}
                    {p.href && <span className="ml-1.5 text-[var(--color-copper)]">↗</span>}
                  </h3>
                </div>
              </div>
            );

            // Solo la 1ª copia es navegable; la 2ª es visual (evita ids/enlaces duplicados en a11y).
            const isClone = i >= items.length;
            return (
              <div key={`${p.key}-${i}`} aria-hidden={isClone} className="shrink-0">
                {p.href && !isClone ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Un arrastre no debe acabar navegando.
                    onClick={(e) => {
                      if (dragRef.current.moved > 6) e.preventDefault();
                    }}
                    draggable={false}
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
        {t('dragHint')}
      </p>
    </div>
  );
}
