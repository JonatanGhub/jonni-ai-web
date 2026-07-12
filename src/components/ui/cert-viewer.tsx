'use client';

/**
 * CertViewer — rejilla de certificados + visor modal embebido.
 * PDFs en <iframe>, imágenes en <img>. Se pueden consultar sin salir de la web
 * (como en el CV HTML antiguo). Cierre con Escape, click-fuera o botón.
 */

import { useCallback, useEffect, useState } from 'react';

export interface Cert {
  id: string;
  title: string;
  file: string;
  type: 'pdf' | 'image';
}

export function CertViewer({ certs, closeLabel }: { certs: Cert[]; closeLabel: string }) {
  const [open, setOpen] = useState<Cert | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {certs.map((cert) => (
          <li key={cert.id} data-reveal>
            <button
              type="button"
              onClick={() => setOpen(cert)}
              className="blueprint-card group flex h-full w-full flex-col items-start gap-3 p-4 text-left transition-transform hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-copper)]">
                {cert.type === 'pdf' ? 'PDF' : 'IMG'}
              </span>
              <span className="text-[14px] font-medium leading-snug text-[var(--color-ink)]">
                {cert.title}
              </span>
              <span className="mt-auto font-mono text-[11px] text-[var(--color-ink-faint)] transition-colors group-hover:text-[var(--color-copper)]">
                ver →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="blueprint-card relative flex h-full max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-4 border-b border-[var(--color-line-strong)] px-5 py-3">
              <span className="font-mono text-[13px] text-[var(--color-ink)]">{open.title}</span>
              <div className="flex items-center gap-4">
                <a
                  href={`/certs/${open.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-wider text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
                >
                  ↗
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="font-mono text-[12px] uppercase tracking-wider text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
                >
                  {closeLabel} ✕
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-auto bg-[var(--color-graphite-900)]">
              {open.type === 'pdf' ? (
                <iframe
                  src={`/certs/${open.file}#view=FitH`}
                  title={open.title}
                  className="h-full min-h-[70vh] w-full"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/certs/${open.file}`}
                  alt={open.title}
                  className="mx-auto max-h-full w-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
