/**
 * next-intl request config — modo SIN i18n routing.
 * El locale se determina por la cookie NEXT_LOCALE (default: 'es').
 * jonni-ai.com es bilingüe ES·EN (sin valenciano — audiencia distinta a la agencia).
 *
 * @see https://next-intl.dev/docs/usage/configuration#i18n-request
 */

import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get('NEXT_LOCALE')?.value as Locale | undefined;
  const locale: Locale = LOCALES.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;

  const messages = (await import(`./messages/${locale}.json`)).default;

  return { locale, messages };
});
