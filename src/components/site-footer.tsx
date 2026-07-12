import { getTranslations } from 'next-intl/server';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/JonatanGhub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jónatan-garcía-ripollés-9271052a5/' },
  { label: 'Email', href: 'mailto:j.garcia.r93@outlook.com' },
];

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative border-t border-[var(--color-line-strong)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[15px] font-semibold text-[var(--color-ink)]">
            {t('rights')}
          </p>
          <p className="mt-1 font-mono text-[12px] text-[var(--color-ink-faint)]">{t('tagline')}</p>
        </div>

        <nav className="flex items-center gap-5 font-mono text-[13px]" aria-label="Redes">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8">
        <p className="font-mono text-[11px] text-[var(--color-ink-faint)]">
          © 2026 · {t('built')}
        </p>
      </div>
    </footer>
  );
}
