import { getTranslations } from 'next-intl/server';

export async function Cta() {
  const t = await getTranslations('cta');

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div data-reveal className="blueprint-card mx-auto max-w-3xl px-8 py-14 text-center sm:px-14">
        <p className="tech-label mx-auto w-fit">{t('label')}</p>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] text-[var(--color-ink)]">
          {t('title')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
          {t('body')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://neonexai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[3px] bg-[var(--color-copper)] px-7 py-3.5 text-[15px] font-semibold text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
          >
            {t('button')} ↗
          </a>
          <a
            href="mailto:j.garcia.r93@outlook.com"
            className="rounded-[3px] border border-[var(--color-line-strong)] px-7 py-3.5 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-copper)]"
          >
            {t('secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
