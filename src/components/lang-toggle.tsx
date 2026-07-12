'use client';

/**
 * LangToggle — conmutador ES/EN con bandera + código (cookie NEXT_LOCALE +
 * router.refresh()). Sin i18n routing: el Server Component relee la cookie y
 * sirve el otro idioma. Bilingüe → dos pastillas, la activa resaltada.
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FlagES, FlagEN } from '@/components/flags';

const LOCALES = [
  { code: 'es', label: 'ES', Flag: FlagES },
  { code: 'en', label: 'EN', Flag: FlagEN },
] as const;

export function LangToggle() {
  const t = useTranslations('langToggle');
  const active = useLocale();
  const router = useRouter();
  const [current, setCurrent] = useState(active);

  useEffect(() => setCurrent(active), [active]);

  const switchTo = useCallback(
    (code: string) => {
      if (code === current) return;
      document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000;SameSite=Lax`;
      setCurrent(code);
      router.refresh();
    },
    [current, router],
  );

  return (
    <div
      className="flex items-center gap-1.5 rounded-[3px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-800)]/60 p-1"
      role="group"
      aria-label={t('aria')}
    >
      {LOCALES.map(({ code, label, Flag }) => {
        const on = current === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={on}
            className={`flex items-center gap-1.5 rounded-[2px] px-2.5 py-1.5 font-mono text-[13px] font-medium tracking-wider transition-colors ${
              on
                ? 'bg-[var(--color-copper)] text-[var(--color-graphite-900)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Flag className="h-[13px] w-[18px] shrink-0 overflow-hidden rounded-[1.5px]" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
