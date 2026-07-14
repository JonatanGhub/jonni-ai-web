import { getTranslations } from 'next-intl/server';

export async function Manifesto() {
  const t = await getTranslations('manifesto');

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="border-l-2 border-[var(--color-copper)] pl-6 sm:pl-8" data-reveal>
        <p className="max-w-2xl text-[clamp(1.3rem,2.6vw,1.7rem)] font-medium leading-snug text-[var(--color-ink)]">
          {t('line')}
        </p>
      </div>
    </section>
  );
}
