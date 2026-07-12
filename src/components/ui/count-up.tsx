'use client';

/**
 * CountUp — anima un número al entrar en viewport. Conserva prefijo/sufijo
 * ("2 h" → "5 min", ">500.000 €"). prefers-reduced-motion pinta el final.
 */

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const DURATION_MS = 1100;

export function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reducedMotion ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('es-ES')}
    </span>
  );
}
