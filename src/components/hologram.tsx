'use client';

/**
 * Hologram — capa de ambiente del hero. Red de nodos rotando en 3D con pulsos
 * viajando por las aristas: la metáfora visual de una orquestación multi-agente.
 *
 * Es el modo standalone del patrón `web-engine/patterns/04-hologram-hero`
 * (holograma procedural en canvas en vez de vídeo): 0 créditos, loop infinito,
 * peso cero. Regla del patrón: el hero es AMBIENTE, no interacción — no
 * scrubbea ni reacciona al scroll.
 *
 * Cumple las reglas del motor: rAF pausado fuera de viewport, DPR capado y
 * frame estático con prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/animation/use-prefers-reduced-motion';

const NODES = 26;
const ROT_SPEED = 0.00022; // radianes por ms
const LINK_DIST = 0.85; // distancia máx. (en unidades de esfera) para dibujar arista
const DPR_MAX = 2;
const COPPER = '200,125,75';

interface P3 {
  x: number;
  y: number;
  z: number;
  phase: number;
}

export function Hologram({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Nodos repartidos por la esfera con espiral de Fibonacci (reparto uniforme).
    const pts: P3[] = Array.from({ length: NODES }, (_, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / NODES);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        phase: (i * 137.5) % 360,
      };
    });

    // Aristas precalculadas: solo pares cercanos, para que la malla no sea sopa.
    const edges: [number, number][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y, pts[i].z - pts[j].z);
        if (d < LINK_DIST) edges.push([i, j]);
      }
    }

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (t: number) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.36;
      const ay = t * ROT_SPEED;
      const ax = Math.sin(t * ROT_SPEED * 0.55) * 0.32;

      // Rotación Y y luego X; proyección con perspectiva simple.
      const proj = pts.map((p) => {
        const x1 = p.x * Math.cos(ay) - p.z * Math.sin(ay);
        const z1 = p.x * Math.sin(ay) + p.z * Math.cos(ay);
        const y2 = p.y * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = p.y * Math.sin(ax) + z1 * Math.cos(ax);
        const scale = 1 / (2.6 - z2); // más cerca => más grande
        return {
          sx: cx + x1 * radius * scale * 2.2,
          sy: cy + y2 * radius * scale * 2.2,
          depth: (z2 + 1) / 2, // 0 detrás, 1 delante
          phase: p.phase,
        };
      });

      // Aristas
      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = proj[i];
        const b = proj[j];
        const depth = (a.depth + b.depth) / 2;
        ctx.strokeStyle = `rgba(${COPPER},${(0.05 + depth * 0.16).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();

        // Pulso viajando por la arista: el "mensaje" entre agentes.
        const cycle = ((t / 2600) + (i * 0.13 + j * 0.07)) % 1;
        if (depth > 0.42) {
          const px = a.sx + (b.sx - a.sx) * cycle;
          const py = a.sy + (b.sy - a.sy) * cycle;
          ctx.fillStyle = `rgba(${COPPER},${(0.5 * depth).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodos
      for (const p of proj) {
        const r = 1.1 + p.depth * 2.3;
        ctx.fillStyle = `rgba(${COPPER},${(0.22 + p.depth * 0.6).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
        if (p.depth > 0.72) {
          ctx.fillStyle = `rgba(${COPPER},0.1)`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw(reduced ? 0 : performance.now());
    });
    ro.observe(canvas);

    // Reduced-motion: un único frame estático, sin bucle.
    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    let raf: number | null = null;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (raf === null) raf = requestAnimationFrame(loop);
          } else if (raf !== null) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        }
      },
      { rootMargin: '100px 0px' },
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
