import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-20 pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        {/* Texto */}
        <div>
          <p className="tech-label" data-reveal>
            {t('eyebrow')}
          </p>

          <h1
            data-reveal
            className="mt-5 text-balance text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.98] text-[var(--color-ink)]"
          >
            {t('name')}
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-xl font-mono text-[14px] leading-relaxed tracking-wide text-[var(--color-copper-bright)]"
          >
            {t('roles')}
          </p>

          <p
            data-reveal
            className="mt-7 max-w-xl text-[17.5px] leading-relaxed text-[var(--color-ink-muted)]"
          >
            {t('intro')}
          </p>

          <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-[3px] bg-[var(--color-copper)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
            >
              {t('ctaProjects')}
            </a>
            <a
              href="#contact"
              className="rounded-[3px] border border-[var(--color-line-strong)] px-6 py-3.5 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-copper)]"
            >
              {t('ctaContact')}
            </a>
          </div>
        </div>

        {/* Retrato con marco de plano técnico */}
        <div data-reveal className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:ml-auto">
          <div className="blueprint-card overflow-hidden p-2">
            <Image
              src="/brand/founder.jpg"
              alt="Jonatan García Ripollés"
              width={320}
              height={320}
              priority
              className="w-full grayscale-[0.15] contrast-[1.05]"
            />
          </div>
          {/* Anotación técnica bajo la foto */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
            <span>Fig. 01</span>
            <span>Founder · NeoNexAI</span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]"
      >
        <span className="animate-pulse">scroll ↓</span>
      </div>
    </section>
  );
}
