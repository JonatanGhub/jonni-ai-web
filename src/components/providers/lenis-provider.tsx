'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';
import { registerGsap } from '@/lib/animation/register-gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) return;

    registerGsap();

    let lenis: Lenis;

    import('lenis').then(({ default: LenisClass }) => {
      lenis = new LenisClass();
      lenis.on('scroll', () => ScrollTrigger.update());

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
    });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
