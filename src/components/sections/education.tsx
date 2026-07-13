import { getTranslations } from 'next-intl/server';
import { CertViewer } from '@/components/ui/cert-viewer';
import { CERTIFICATIONS as CERTS } from '@/lib/cv/certifications';

export async function Education() {
  const t = await getTranslations('education');

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6" data-reveal>
        <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]">
          {t('title')}
        </h2>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
            {t('langLabel')}
          </p>
          <p className="mt-1 font-mono text-[13px] text-[var(--color-ink-muted)]">{t('langs')}</p>
        </div>
      </div>
      <p data-reveal className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
        {t('lead')}
      </p>

      <div className="mt-10">
        <CertViewer certs={CERTS} closeLabel={t('close')} />
      </div>
    </section>
  );
}
