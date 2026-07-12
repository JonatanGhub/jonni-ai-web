import { getTranslations } from 'next-intl/server';

const GROUPS = ['ai', 'dev', 'eng'] as const;

export async function Stack() {
  const t = await getTranslations('stack');

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
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
        {GROUPS.map((g) => {
          const items = t(`${g}.items`)
            .split('·')
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div key={g} data-reveal className="blueprint-card p-6">
              <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--color-copper)]">
                {t(`${g}.title`)}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2" role="list">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[2px] border border-[var(--color-line)] bg-[var(--color-graphite-700)]/40 px-2.5 py-1.5 font-mono text-[13px] text-[var(--color-ink-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
