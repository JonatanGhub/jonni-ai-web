import { getTranslations } from 'next-intl/server';
import { CertViewer, type Cert } from '@/components/ui/cert-viewer';

// Certificados reales (títulos = nombres propios, iguales en ambos idiomas).
const CERTS: Cert[] = [
  { id: 'iso', title: 'ISO 50.001 · Gestión energética', file: 'iso-50001.pdf', type: 'pdf' },
  { id: 'huella', title: 'Cálculo de huella de carbono', file: 'huella-carbono.pdf', type: 'pdf' },
  { id: 'chatgpt', title: 'ChatGPT en Excel', file: 'chatgpt-excel.pdf', type: 'pdf' },
  { id: 'copilot', title: 'Copilot para Microsoft 365', file: 'copilot-m365.pdf', type: 'pdf' },
  { id: 'outlook', title: 'Outlook para Microsoft 365', file: 'outlook-m365.pdf', type: 'pdf' },
  { id: 'altura', title: 'Trabajos en altura', file: 'trabajos-altura.pdf', type: 'pdf' },
  { id: 'nego', title: 'Técnicas de negociación', file: 'tecnicas-negociacion.jpg', type: 'image' },
  { id: 'bienestar', title: 'Bienestar corporativo y alto rendimiento', file: 'bienestar-corporativo.jpg', type: 'image' },
];

export async function Education() {
  const t = await getTranslations('education');

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <p className="tech-label" data-reveal>
        {t('label')}
      </p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6" data-reveal>
        <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-semibold text-[var(--color-ink)]">
          {t('title')}
        </h2>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
            {t('langLabel')}
          </p>
          <p className="mt-1 font-mono text-[13px] text-[var(--color-ink-muted)]">{t('langs')}</p>
        </div>
      </div>
      <p data-reveal className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
        {t('lead')}
      </p>

      <div className="mt-10">
        <CertViewer certs={CERTS} closeLabel={t('close')} />
      </div>
    </section>
  );
}
