import { getTranslations } from 'next-intl/server';
import { LangToggle } from '@/components/lang-toggle';

export async function SiteNav() {
  const t = await getTranslations('nav');
  const items = [
    { href: '#now', key: 'now' },
    { href: '#projects', key: 'projects' },
    { href: '#path', key: 'path' },
    { href: '#stack', key: 'stack' },
    { href: '#work', key: 'work' },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#top"
          className="font-mono text-[13px] font-medium tracking-wider text-[var(--color-ink)]"
        >
          <span className="text-[var(--color-copper)]">J</span>GR
          <span className="ml-2 text-[var(--color-ink-faint)]">/ jonni-ai</span>
        </a>

        <nav
          aria-label="Secciones"
          className="hidden items-center gap-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)] md:flex"
        >
          {items.map((it) => (
            <a
              key={it.key}
              href={it.href}
              className="transition-colors hover:text-[var(--color-copper)]"
            >
              {t(it.key)}
            </a>
          ))}
        </nav>

        <LangToggle />
      </div>
    </header>
  );
}
