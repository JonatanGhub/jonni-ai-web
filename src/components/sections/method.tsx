import { getTranslations } from 'next-intl/server';

const CONCEPTS = [
  { key: 'hitl', num: '01' },
  { key: 'discipline', num: '02' },
  { key: 'curiosity', num: '03' },
] as const;

export async function Method() {
  const t = await getTranslations('work');

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2
        data-reveal
        className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]"
      >
        {t('title')}
      </h2>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {CONCEPTS.map((c) => (
          <article key={c.key} data-reveal className="blueprint-card flex flex-col p-6">
            <span className="font-mono text-[13px] text-[var(--color-copper)]">[{c.num}]</span>
            <h3 className="mt-4 text-[20px] font-semibold text-[var(--color-ink)]">
              {t(`${c.key}.title`)}
            </h3>
            <p className="mt-3 text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
              {t(`${c.key}.body`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
