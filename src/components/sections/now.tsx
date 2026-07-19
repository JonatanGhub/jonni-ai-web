import { getTranslations } from 'next-intl/server';
import { CountUp } from '@/components/ui/count-up';

export async function Now() {
  const t = await getTranslations('now');

  return (
    <section id="now" className="sec-wide relative mx-auto max-w-6xl px-5">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2
          data-reveal
          className="d-h2 max-w-xl text-[var(--color-ink)]"
        >
          {t('title')}
        </h2>
        <p data-reveal className="max-w-md text-[17.5px] leading-relaxed text-[var(--color-ink-muted)]">
          {t('body')}
        </p>
      </div>

      <div className="mt-14 h-px w-full tech-rule" />

      <dl className="mt-10 grid gap-8 sm:grid-cols-3">
        <div data-reveal>
          <dt className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold text-[var(--color-copper)]">
            <CountUp value={5} />
          </dt>
          <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {t('metricProjects')}
          </dd>
        </div>
        <div data-reveal>
          <dt className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold text-[var(--color-copper)]">
            <CountUp value={4} />
          </dt>
          <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {t('metricClients')}
          </dd>
        </div>
        <div data-reveal>
          <dt className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold text-[var(--color-copper)]">
            24/7
          </dt>
          <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {t('metricUptime')}
          </dd>
        </div>
      </dl>

      <p
        data-reveal
        className="mt-10 flex items-baseline gap-2 font-mono text-[13px] leading-relaxed text-[var(--color-ink-muted)]"
      >
        <span className="shrink-0 uppercase tracking-[0.14em] text-[var(--color-copper)]">{t('focusLabel')}</span>
        <span>{t('focus')}</span>
      </p>
    </section>
  );
}
