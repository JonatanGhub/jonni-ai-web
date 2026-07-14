import { renderToBuffer } from '@react-pdf/renderer';
import { CvDocument } from '@/lib/cv/cv-document';
import { generateQrDataUri } from '@/lib/cv/qr';

export async function GET() {
  const qrDataUri = await generateQrDataUri();
  const buffer = await renderToBuffer(CvDocument({ locale: 'en', qrDataUri }));
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="jonatan-garcia-ripolles-cv-en.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
