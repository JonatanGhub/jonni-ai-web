'use client';

/**
 * CvChatWidget — botón flotante que abre un chat guardrailed sobre el propio
 * CV (vía /api/cv-chat → LiteLLM gateway, modelo neo-small scoped). Cliente
 * mantiene el historial; el servidor solo responde con datos del CV.
 */

import { useCallback, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function CvChatWidget() {
  const t = useTranslations('cvChat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/cv-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, locale }),
      });

      if (res.status === 429) {
        setError(t('rateLimited'));
        return;
      }
      if (!res.ok) {
        setError(t('genericError'));
        return;
      }

      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply || t('genericError') }]);
    } catch {
      setError(t('genericError'));
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
      });
    }
  }, [input, loading, messages, locale, t]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 rounded-[3px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-800)] px-4 py-3 font-mono text-[13px] text-[var(--color-ink)] shadow-lg transition-colors hover:border-[var(--color-copper)]"
      >
        <span className="text-[var(--color-copper)]">$</span> {t('hint')}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('title')}
          className="fixed bottom-24 right-6 z-50 flex max-h-[70vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-[4px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-800)] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3">
            <span className="font-mono text-[13px] text-[var(--color-ink)]">{t('title')}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('close')}
              className="font-mono text-[13px] text-[var(--color-ink-faint)] hover:text-[var(--color-copper)]"
            >
              ✕
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="font-mono text-[12px] text-[var(--color-ink-faint)]">{t('greeting')}</p>
            )}
            {messages.map((m, i) => (
              <p
                key={i}
                className={`text-[13.5px] leading-relaxed ${
                  m.role === 'user'
                    ? 'text-right text-[var(--color-copper)]'
                    : 'text-[var(--color-ink-muted)]'
                }`}
              >
                {m.content}
              </p>
            ))}
            {loading && (
              <p className="font-mono text-[12px] text-[var(--color-ink-faint)]">…</p>
            )}
            {error && <p className="font-mono text-[12px] text-[var(--color-copper)]">{error}</p>}
          </div>

          <p className="border-t border-[var(--color-line)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
            {t('disclaimer')}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-[var(--color-line)] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              className="flex-1 bg-transparent font-mono text-[13px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="font-mono text-[12px] uppercase tracking-wider text-[var(--color-copper)] disabled:opacity-40"
            >
              {t('send')}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
