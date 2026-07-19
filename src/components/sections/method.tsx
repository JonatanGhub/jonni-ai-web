import { getTranslations } from 'next-intl/server';

/**
 * Method — formato de fases de docmo («How we work»): índice grande en cobre,
 * filas a ancho completo separadas por regla, en vez de tarjetas en grid. El
 * contenido son los 3 principios ya aprobados por Jonatan (no se inventa un 4º).
 */

const CONCEPTS = [
  { key: 'hitl', num: '01' },
  { key: 'discipline', num: '02' },
  { key: 'curiosity', num: '03' },
] as const;

export async function Method() {
  const t = await getTranslations('work');

  return (
    <section id="work" className="sec relative mx-auto max-w-6xl px-5">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2 data-reveal className="d-h2 mt-6 max-w-2xl text-[var(--color-ink)]">
        {t('title')}
      </h2>

      <div className="mt-16">
        {CONCEPTS.map((c, i) => (
          <article
            key={c.key}
            data-reveal
            data-delay={String(i + 1)}
            className="grid gap-x-10 gap-y-4 border-t border-[var(--color-line)] py-10 md:grid-cols-[auto_1fr_1.4fr] md:items-start"
          >
            <span className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-none text-[var(--color-copper)]">
              {c.num}
            </span>
            <h3 className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold leading-snug text-[var(--color-ink)]">
              {t(`${c.key}.title`)}
            </h3>
            <p className="text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
              {t(`${c.key}.body`)}
            </p>
          </article>
        ))}
        <div className="border-t border-[var(--color-line)]" />
      </div>
    </section>
  );
}
