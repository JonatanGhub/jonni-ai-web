'use client';

import { useEffect, useState } from 'react';

const SECTION_IDS = ['now', 'projects', 'path', 'stack', 'work'] as const;

interface NavLinkItem {
  key: string;
  href: string;
  label: string;
}

export function NavLinks({ items }: { items: NavLinkItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          className={`transition-colors hover:text-[var(--color-copper)] ${
            active === it.key ? 'text-[var(--color-copper)]' : ''
          }`}
        >
          {it.label}
        </a>
      ))}
    </>
  );
}
