import { getTranslations } from 'next-intl/server';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

const ITEMS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'] as const;

export async function generateMetadata() {
  const t = await getTranslations('uses');
  return { title: `${t('title')} — Jonatan García Ripollés` };
}

export default async function UsesPage() {
  const t = await getTranslations('uses');

  return (
    <>
      <SiteNav />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-36 sm:pt-40">
        <p className="tech-label">{t('label')}</p>
        <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]">
          {t('title')}
        </h1>
        <p className="mt-5 max-w-xl text-[17.5px] leading-relaxed text-[var(--color-ink-muted)]">
          {t('lead')}
        </p>

        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-[3px] border border-[var(--color-line-strong)]">
          {ITEMS.map((key) => (
            <div
              key={key}
              className="flex flex-col gap-1 bg-[var(--color-graphite-800)]/60 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--color-copper)] sm:w-64 sm:shrink-0">
                {t(`${key}.tool`)}
              </span>
              <span className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                {t(`${key}.desc`)}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/"
          className="mt-12 inline-block font-mono text-[13px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
        >
          {t('back')}
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
