'use client';

/**
 * Contact — sección de contacto dedicada al estilo docmo (foto + formulario +
 * accesos directos + garantías), sustituye al viejo CTA-en-tarjeta.
 *
 * El formulario NO tiene backend: compone un mensaje de WhatsApp con los campos
 * y abre wa.me (decisión de Jonatan — cero config, funciona ya). El email sigue
 * detrás del EmailReveal (0 mailto en todo el sitio).
 *
 * La foto es la actual del founder como placeholder; se sustituye por el
 * retrato de contacto generado en F2 cuando lleguen las fotos nuevas.
 */

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EmailReveal } from '@/components/ui/email-reveal';

const WA_NUMBER = '34620033053';
const NEEDS = ['web', 'voice', 'automation', 'unsure'] as const;
const WHENS = ['asap', 'month', 'exploring'] as const;
const GUARANTEES = ['g1', 'g2', 'g3'] as const;

export function Contact() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [reach, setReach] = useState('');
  const [need, setNeed] = useState('');
  const [when, setWhen] = useState('');
  const [message, setMessage] = useState('');

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Componer el mensaje solo con los campos rellenados.
      const lines = [t('waIntro'), ''];
      if (name.trim()) lines.push(`${t('fName')}: ${name.trim()}`);
      if (reach.trim()) lines.push(`${t('fReach')}: ${reach.trim()}`);
      if (need) lines.push(`${t('fNeed')}: ${t(`need.${need}`)}`);
      if (when) lines.push(`${t('fWhen')}: ${t(`when.${when}`)}`);
      if (message.trim()) lines.push('', message.trim());
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [name, reach, need, when, message, t],
  );

  const fieldCls =
    'w-full rounded-[3px] border border-[var(--color-line-strong)] bg-[var(--color-graphite-900)] px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-copper)] placeholder:text-[var(--color-ink-faint)]';

  return (
    <section id="contact" className="sec-wide relative mx-auto max-w-6xl px-5">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <h2 data-reveal className="d-display mt-6 max-w-3xl text-balance text-[var(--color-ink)]">
        {t('title')}
      </h2>
      <p data-reveal data-delay="1" className="d-lead mt-6 max-w-xl">
        {t('lead')}
      </p>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Columna izquierda: foto + garantías + accesos directos */}
        <div data-reveal className="flex flex-col gap-8">
          <div className="blueprint-card overflow-hidden p-2">
            <Image
              src="/brand/founder.jpg"
              alt="Jonatan García Ripollés"
              width={480}
              height={480}
              className="w-full grayscale-[0.15] contrast-[1.05]"
            />
            <div className="flex items-center justify-between px-2 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
              <span>{t('photoCaption')}</span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
                {t('reply')}
              </span>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-start gap-2.5 text-[15px] text-[var(--color-ink-muted)]">
                <span className="mt-1 shrink-0 text-[var(--color-copper)]">✓</span>
                {t(g)}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t('waIntro'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[3px] bg-[var(--color-copper)] px-5 py-3 text-[15px] font-semibold text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
            >
              {t('waDirect')}
            </a>
            <EmailReveal label={t('emailBtn')} variant="button" />
          </div>
        </div>

        {/* Columna derecha: formulario → WhatsApp */}
        <form data-reveal data-delay="1" onSubmit={submit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                {t('fName')}
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('phName')}
                className={fieldCls}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                {t('fReach')}
              </span>
              <input
                type="text"
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                placeholder={t('phReach')}
                className={fieldCls}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                {t('fNeed')}
              </span>
              <select value={need} onChange={(e) => setNeed(e.target.value)} className={fieldCls}>
                <option value="">{t('phSelect')}</option>
                {NEEDS.map((n) => (
                  <option key={n} value={n}>
                    {t(`need.${n}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
                {t('fWhen')}
              </span>
              <select value={when} onChange={(e) => setWhen(e.target.value)} className={fieldCls}>
                <option value="">{t('phSelect')}</option>
                {WHENS.map((w) => (
                  <option key={w} value={w}>
                    {t(`when.${w}`)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
              {t('fMessage')}
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder={t('phMessage')}
              className={`${fieldCls} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-[3px] bg-[var(--color-copper)] px-7 py-3.5 text-[15px] font-semibold text-[var(--color-graphite-900)] transition-colors hover:bg-[var(--color-copper-bright)]"
          >
            {t('send')}
          </button>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--color-ink-faint)]">
            {t('sendNote')}
          </p>
        </form>
      </div>
    </section>
  );
}
