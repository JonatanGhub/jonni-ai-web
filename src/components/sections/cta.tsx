import { getTranslations } from 'next-intl/server';
import { EmailReveal } from '@/components/ui/email-reveal';

export async function Cta() {
  const t = await getTranslations('cta');

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div data-reveal className="blueprint-card mx-auto max-w-3xl px-8 py-14 text-center sm:px-14">
        <p className="tech-label mx-auto w-fit">{t('label')}</p>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] text-[var(--color-ink)]">
          {t('title')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
          {t('body')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://neonexai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[3px] bg-[var(--color-copper)] px-7 py-3.5 text-[16px] font-semibold text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
          >
            {t('button')} ↗
          </a>
          <EmailReveal label={t('secondary')} variant="button" />
        </div>
      </div>
    </section>
  );
}
