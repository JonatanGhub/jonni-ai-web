import { getTranslations } from 'next-intl/server';

/**
 * Manifesto — quote de founder a gran tamaño con atribución, patrón §2.2 del
 * análisis de docmo (quote display + firma). Es el único bloque del sitio sin
 * eyebrow: llega en seco después de la promesa.
 */

export async function Manifesto() {
  const t = await getTranslations('manifesto');

  return (
    <section className="sec-tight relative mx-auto max-w-6xl px-5">
      <figure className="mx-auto max-w-4xl">
        <div
          data-reveal
          aria-hidden
          className="mx-auto mb-9 h-8 w-px bg-gradient-to-b from-transparent to-[var(--color-copper)]"
        />
        <blockquote data-reveal className="d-quote text-center text-[var(--color-ink)]">
          {t('line')}
        </blockquote>
        <figcaption
          data-reveal
          data-delay="1"
          className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-faint)]"
        >
          <span className="text-[var(--color-copper)]">—</span> {t('attribution')}
        </figcaption>
      </figure>
    </section>
  );
}
