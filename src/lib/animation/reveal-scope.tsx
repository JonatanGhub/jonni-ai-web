'use client';

/**
 * RevealScope — reveals on-scroll declarativos (patrón portado de neonexai-web).
 *
 * Observa todos los `[data-reveal]` y les añade `is-revealed` al entrar en
 * viewport, con stagger automático entre hermanos. Progressive enhancement:
 * la ocultación vive bajo `html.js` (globals.css) — sin JS todo es visible.
 * `prefers-reduced-motion` revela sin animación.
 *
 * Se monta una vez en el layout. No renderiza nada.
 */

import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const STAGGER_MS = 80;

export function RevealScope() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add('js');

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (els.length === 0) return;

    if (reducedMotion) {
      for (const el of els) el.classList.add('is-revealed');
      return;
    }

    for (const el of els) {
      const parent = el.parentElement;
      if (!parent) continue;
      const siblings = Array.from(parent.children).filter((c) => c.hasAttribute('data-reveal'));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = `${index * STAGGER_MS}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    for (const el of els) {
      if (el.classList.contains('is-revealed')) continue;
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  return null;
}
