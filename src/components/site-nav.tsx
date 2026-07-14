import { getTranslations } from 'next-intl/server';
import { LangToggle } from '@/components/lang-toggle';
import { NavLinks } from '@/components/nav-links';

export async function SiteNav() {
  const t = await getTranslations('nav');
  const items = [
    { href: '#now', key: 'now' },
    { href: '#projects', key: 'projects' },
    { href: '#path', key: 'path' },
    { href: '#stack', key: 'stack' },
    { href: '#work', key: 'work' },
  ].map((it) => ({ ...it, label: t(it.key) }));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-graphite-900)]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <a
          href="#top"
          className="font-mono text-[16px] font-medium tracking-wider text-[var(--color-ink)]"
        >
          <span className="text-[var(--color-copper)]">J</span>GR
          <span className="ml-2 text-[var(--color-ink-faint)]">/ jonni-ai</span>
        </a>

        <nav
          aria-label="Secciones"
          className="hidden items-center gap-7 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)] md:flex"
        >
          <NavLinks items={items} />
        </nav>

        <LangToggle />
      </div>
    </header>
  );
}
