'use client';

/**
 * LangToggle — conmutador ES/EN (cookie NEXT_LOCALE + router.refresh()).
 * Sin i18n routing: el Server Component relee la cookie y sirve el otro idioma.
 * Bilingüe → un solo botón que alterna, no un desplegable.
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

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
      className="flex items-center gap-1 font-mono text-[12px]"
      role="group"
      aria-label={t('aria')}
    >
      {(['es', 'en'] as const).map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-[var(--color-ink-faint)]">/</span>}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={current === code}
            className={
              current === code
                ? 'uppercase tracking-wider text-[var(--color-copper)]'
                : 'uppercase tracking-wider text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink-muted)]'
            }
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
