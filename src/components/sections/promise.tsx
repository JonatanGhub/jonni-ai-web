import { getTranslations } from 'next-intl/server';

/**
 * PromiseSection — equivalente a «Live in 7 Days — Guaranteed» de docmo: una
 * promesa corta y verificable seguida de 4 puntos que la sostienen. Es la
 * sección que convierte el hero en argumento.
 * (No se llama `Promise` para no sombrear el global de JS.)
 */

const POINTS = ['p1', 'p2', 'p3', 'p4'] as const;

export async function PromiseSection() {
  const t = await getTranslations('promise');

  return (
    <section className="sec relative mx-auto max-w-6xl px-5">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>

      <h2 data-reveal className="d-display mt-6 max-w-4xl text-balance text-[var(--color-ink)]">
        {t('headline')}
      </h2>

      <p data-reveal data-delay="1" className="d-lead mt-7 max-w-xl">
        {t('sub')}
      </p>

      <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map((p, i) => (
          <div key={p} data-reveal data-delay={String(i + 1)}>
            <div className="h-px w-full bg-[var(--color-line-strong)]" />
            <h3 className="mt-5 text-[17px] font-semibold text-[var(--color-ink)]">
              {t(`${p}.title`)}
            </h3>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
              {t(`${p}.body`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
