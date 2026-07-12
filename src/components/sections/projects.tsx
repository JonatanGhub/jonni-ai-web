import { getTranslations } from 'next-intl/server';

const PROJECTS = [
  { key: 'p1', num: '01', href: 'https://neonexai.com' },
  { key: 'p2', num: '02', href: 'https://app.neonexai.com' },
  { key: 'p3', num: '03', href: 'https://github.com/JonatanGhub' },
  { key: 'p4', num: '04', href: null },
  { key: 'p5', num: '05', href: null },
] as const;

export async function Projects() {
  const t = await getTranslations('projects');

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2
        data-reveal
        className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]"
      >
        {t('title')}
      </h2>
      <p data-reveal className="mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
        {t('lead')}
      </p>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const inner = (
            <article
              className={`blueprint-card flex h-full flex-col p-6 transition-transform ${
                p.href ? 'group-hover:-translate-y-1' : ''
              } ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-[var(--color-ink-faint)]">
                    § {p.num}
                  </span>
                  <span className="rounded-[2px] border border-[var(--color-line-strong)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-copper)]">
                    {t(`${p.key}.tag`)}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
                  {t('live')}
                </span>
              </div>

              <h3 className="mt-4 text-[22px] font-semibold text-[var(--color-ink)]">
                {t(`${p.key}.name`)}
                {p.href && (
                  <span className="ml-2 inline-block text-[var(--color-copper)] transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                )}
              </h3>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                {t(`${p.key}.desc`)}
              </p>

              <ul className="mt-5 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                {(['b1', 'b2'] as const).map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 font-mono text-[12.5px] leading-relaxed text-[var(--color-ink-muted)]"
                  >
                    <span className="mt-2 inline-block h-px w-3 shrink-0 bg-[var(--color-copper)]" />
                    {t(`${p.key}.${b}`)}
                  </li>
                ))}
              </ul>
            </article>
          );

          return (
            <div key={p.key} data-reveal className={`group ${i === 0 ? 'md:col-span-2' : ''}`}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
