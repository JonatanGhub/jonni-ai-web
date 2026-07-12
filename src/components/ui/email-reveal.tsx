'use client';

/**
 * EmailReveal — muestra el email de contacto en un popover SIN redirigir a
 * ningún sitio (nada de mailto:). Click → aparece el correo en texto
 * seleccionable con botón de copiar. Cierre con Escape o click fuera.
 *
 * Dos variantes: 'button' (pastilla, para el CTA) y 'link' (texto, para el footer).
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const EMAIL = 'j.garcia.r93@outlook.com';

export function EmailReveal({
  label,
  variant = 'button',
}: {
  label: string;
  variant?: 'button' | 'link';
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard bloqueado — el email sigue visible y seleccionable */
    }
  }, []);

  const trigger =
    variant === 'button' ? (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-[3px] border border-[var(--color-line-strong)] px-7 py-3.5 text-[16px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-copper)]"
      >
        {label}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-mono text-[14px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
      >
        {label}
      </button>
    );

  return (
    <div ref={rootRef} className="relative inline-block">
      {trigger}
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="blueprint-card absolute bottom-full left-1/2 z-50 mb-3 w-max -translate-x-1/2 px-4 py-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
            email
          </p>
          <p className="mt-1 select-all font-mono text-[15px] text-[var(--color-ink)]">{EMAIL}</p>
          <button
            type="button"
            onClick={copy}
            className="mt-2 font-mono text-[12px] uppercase tracking-wider text-[var(--color-copper)] transition-opacity hover:opacity-80"
          >
            {copied ? '✓ copiado' : 'copiar'}
          </button>
        </div>
      )}
    </div>
  );
}
