'use client';

/**
 * Path — trayectoria como timeline vertical. La línea de progreso cobre se
 * "dibuja" con el scroll (GSAP ScrollTrigger scrub → scaleY 0→1). Los nodos
 * se encienden vía reveal. prefers-reduced-motion: línea completa, sin scrub.
 */

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { registerGsap } from '@/lib/animation/register-gsap';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const ITEMS = ['now', 'igex', 'master', 'degree', 'resto'] as const;

export function Path() {
  const t = useTranslations('path');
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress) return;

    if (reducedMotion) {
      progress.style.transform = 'scaleY(1)';
      return;
    }

    registerGsap();
    let ctx: gsap.Context | null = null;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ctx = gsap.context(() => {
        gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(progress, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        });
      }, track);
      ScrollTrigger.refresh();
    });

    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <section id="path" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2
        data-reveal
        className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]"
      >
        {t('title')}
      </h2>

      <div ref={trackRef} className="relative mt-14 pl-8 sm:pl-10">
        {/* Riel de la timeline */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-line-strong)] sm:left-[9px]" />
        <div
          ref={progressRef}
          data-timeline-progress
          className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-copper)] sm:left-[9px]"
          style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
        />

        <ol className="flex flex-col gap-12" role="list">
          {ITEMS.map((item) => (
            <li key={item} data-reveal className="relative">
              {/* Nodo */}
              <span className="absolute left-[-30px] top-1.5 flex h-4 w-4 items-center justify-center sm:left-[-38px]">
                <span className="timeline-node h-2.5 w-2.5 rounded-full border border-[var(--color-copper)] bg-[var(--color-graphite-900)]" />
              </span>

              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                {t(`${item}.period`)}
              </p>
              <h3 className="mt-1.5 text-[20px] font-semibold text-[var(--color-ink)]">
                {t(`${item}.role`)}
              </h3>
              <p className="mt-0.5 font-mono text-[14px] text-[var(--color-copper)]">
                {t(`${item}.org`)}
              </p>
              <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                {t(`${item}.desc`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
