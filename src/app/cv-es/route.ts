import { renderToBuffer } from '@react-pdf/renderer';
import { CvDocument } from '@/lib/cv/cv-document';

export async function GET() {
  const buffer = await renderToBuffer(CvDocument({ locale: 'es' }));
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="jonatan-garcia-ripolles-cv-es.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
