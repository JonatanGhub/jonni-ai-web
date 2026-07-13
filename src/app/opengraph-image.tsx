import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAME = 'Jonatan García Ripollés';
const ROLE = 'Agentic Developer · AI Expert · CEO & Founder de NeoNexAI AGENCY';

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const res = await fetch(match[1]);
    if (res.ok) return res.arrayBuffer();
  }
  throw new Error(`No se pudo cargar la fuente ${family}`);
}

const CORNER = {
  width: 22,
  height: 22,
  borderColor: '#c87d4b',
} as const;

export default async function OgImage() {
  const [archivoBold, plexMono] = await Promise.all([
    loadGoogleFont('Archivo', 700, NAME),
    loadGoogleFont('IBM+Plex+Mono', 500, '// jonni-ai.com' + ROLE),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#0b0d10',
          position: 'relative',
        }}
      >
        {/* crop marks, las 4 esquinas */}
        <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', ...CORNER, borderTop: `2px solid ${CORNER.borderColor}`, borderLeft: `2px solid ${CORNER.borderColor}` }} />
        <div style={{ position: 'absolute', top: 28, right: 28, display: 'flex', ...CORNER, borderTop: `2px solid ${CORNER.borderColor}`, borderRight: `2px solid ${CORNER.borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 28, left: 28, display: 'flex', ...CORNER, borderBottom: `2px solid ${CORNER.borderColor}`, borderLeft: `2px solid ${CORNER.borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 28, right: 28, display: 'flex', ...CORNER, borderBottom: `2px solid ${CORNER.borderColor}`, borderRight: `2px solid ${CORNER.borderColor}` }} />

        <div
          style={{
            display: 'flex',
            fontFamily: 'IBM Plex Mono',
            fontSize: 22,
            fontWeight: 500,
            color: '#8a5836',
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          {'// jonni-ai.com'}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Archivo',
            fontWeight: 700,
            fontSize: 68,
            color: '#ece8e1',
            lineHeight: 1.08,
            maxWidth: 980,
          }}
        >
          {NAME}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'IBM Plex Mono',
            fontWeight: 500,
            fontSize: 23,
            color: '#c87d4b',
            marginTop: 32,
            maxWidth: 1010,
          }}
        >
          {ROLE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: archivoBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: plexMono, weight: 500, style: 'normal' },
      ],
    }
  );
}
