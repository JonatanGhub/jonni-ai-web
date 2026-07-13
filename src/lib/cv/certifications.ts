export interface Certification {
  id: string;
  title: string;
  file: string;
  type: 'pdf' | 'image';
}

// Certificados reales (títulos = nombres propios, iguales en ambos idiomas).
export const CERTIFICATIONS: Certification[] = [
  { id: 'iso', title: 'ISO 50.001 · Gestión energética', file: 'iso-50001.pdf', type: 'pdf' },
  { id: 'huella', title: 'Cálculo de huella de carbono', file: 'huella-carbono.pdf', type: 'pdf' },
  { id: 'chatgpt', title: 'ChatGPT en Excel', file: 'chatgpt-excel.pdf', type: 'pdf' },
  { id: 'copilot', title: 'Copilot para Microsoft 365', file: 'copilot-m365.pdf', type: 'pdf' },
  { id: 'outlook', title: 'Outlook para Microsoft 365', file: 'outlook-m365.pdf', type: 'pdf' },
  { id: 'altura', title: 'Trabajos en altura', file: 'trabajos-altura.pdf', type: 'pdf' },
  { id: 'nego', title: 'Técnicas de negociación', file: 'tecnicas-negociacion.jpg', type: 'image' },
  { id: 'bienestar', title: 'Bienestar corporativo y alto rendimiento', file: 'bienestar-corporativo.jpg', type: 'image' },
];
