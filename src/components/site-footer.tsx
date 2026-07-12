import { getTranslations } from 'next-intl/server';
import { EmailReveal } from '@/components/ui/email-reveal';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/JonatanGhub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jónatan-garcía-ripollés-9271052a5/' },
];

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative border-t border-[var(--color-line-strong)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-[var(--color-ink)]">
            {t('rights')}
          </p>
          <p className="mt-1 font-mono text-[13px] text-[var(--color-ink-faint)]">{t('tagline')}</p>
        </div>

        <nav className="flex items-center gap-5 font-mono text-[14px]" aria-label="Redes">
          {LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-copper)]"
            >
              {s.label}
            </a>
          ))}
          {/* Email = popup con el correo, sin redirigir a ninguna parte */}
          <EmailReveal label="Email" variant="link" />
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8">
        <p className="font-mono text-[12px] text-[var(--color-ink-faint)]">
          © 2026 · {t('built')}
        </p>
      </div>
    </footer>
  );
}
