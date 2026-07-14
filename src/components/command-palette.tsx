'use client';

/**
 * CommandPalette — Cmd+K / Ctrl+K. Navegar por secciones, descargar el CV,
 * copiar el email (sin mailto), cambiar de idioma y abrir GitHub/LinkedIn.
 * Un botón discreto en el nav también lo abre (no todo el mundo conoce el atajo).
 */

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Command } from 'cmdk';

const EMAIL = 'j.garcia.r93@outlook.com';

const SECTIONS = [
  { href: '#now', key: 'now' },
  { href: '#projects', key: 'projects' },
  { href: '#path', key: 'path' },
  { href: '#stack', key: 'stack' },
  { href: '#work', key: 'work' },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('commandPalette');
  const tNav = useTranslations('nav');
  const tUses = useTranslations('uses');
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith('#')) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    },
    [],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bloqueado */
    }
  }, []);

  const switchLang = useCallback(() => {
    const next = locale === 'es' ? 'en' : 'es';
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    setOpen(false);
    router.refresh();
  }, [locale, router]);

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-[2px] border border-[var(--color-line-strong)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]"
        aria-label={t('hint')}
      >
        <span>{t('hint')}</span>
        <span className="hidden text-[10px] sm:inline">⌘K</span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t('hint')}
        className="fixed left-1/2 top-[18%] z-[60] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-[4px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-800)] shadow-2xl"
        contentClassName=""
        overlayClassName="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
      >
        <Command.Input
          placeholder={t('placeholder')}
          className="w-full border-b border-[var(--color-line)] bg-transparent px-4 py-3.5 font-mono text-[14px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
        />
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center font-mono text-[13px] text-[var(--color-ink-faint)]">
            {t('empty')}
          </Command.Empty>

          <Command.Group
            heading={t('groupNav')}
            className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)] [&_[cmdk-group-items]]:mt-1"
          >
            {SECTIONS.map((s) => (
              <Command.Item
                key={s.key}
                onSelect={() => go(s.href)}
                className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
              >
                {tNav(s.key)}
              </Command.Item>
            ))}
            <Command.Item
              onSelect={() => go('/uses')}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {tUses('title')}
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading={t('groupActions')}
            className="mt-2 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)] [&_[cmdk-group-items]]:mt-1"
          >
            <Command.Item
              onSelect={() => go(`/cv-${locale}`)}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {t('downloadCv')}
            </Command.Item>
            <Command.Item
              onSelect={copyEmail}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {copied ? t('copyEmailDone') : t('copyEmail')}
            </Command.Item>
            <Command.Item
              onSelect={switchLang}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {locale === 'es' ? t('toEn') : t('toEs')}
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading={t('groupLinks')}
            className="mt-2 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)] [&_[cmdk-group-items]]:mt-1"
          >
            <Command.Item
              onSelect={() => openExternal('https://github.com/JonatanGhub')}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {t('github')}
            </Command.Item>
            <Command.Item
              onSelect={() => openExternal('https://www.linkedin.com/in/jonatan-garcia-ripolles/')}
              className="cursor-pointer rounded-[2px] px-2.5 py-2 text-[14px] text-[var(--color-ink-muted)] data-[selected=true]:bg-[var(--color-graphite-700)] data-[selected=true]:text-[var(--color-copper)]"
            >
              {t('linkedin')}
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
