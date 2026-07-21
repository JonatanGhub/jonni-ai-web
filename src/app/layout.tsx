import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { RevealScope } from '@/lib/animation/reveal-scope';
import { TerminalEasterEgg } from '@/components/terminal-easter-egg';
import { CvChatWidget } from '@/components/cv-chat-widget';
import { IntroOverlay } from '@/components/intro-overlay';
import { WhatsappFab } from '@/components/whatsapp-fab';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    metadataBase: new URL('https://jonni-ai.com'),
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'profile',
      url: 'https://jonni-ai.com',
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <LenisProvider>{children}</LenisProvider>
          <RevealScope />
          <IntroOverlay />
          <WhatsappFab />
          <TerminalEasterEgg />
          <CvChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
