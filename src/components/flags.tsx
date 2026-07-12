/**
 * Banderas SVG inline (los emoji de bandera no renderizan en Windows).
 * España (ES) y Reino Unido (EN). 20×15, esquinas redondeadas.
 */

export function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true" focusable="false">
      <path fill="#AA151B" d="M0 0h640v480H0z" />
      <path fill="#F1BF00" d="M0 120h640v240H0z" />
    </svg>
  );
}

export function FlagEN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true" focusable="false">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path stroke="#fff" strokeWidth="96" d="m0 0 640 480M640 0 0 480" />
      <path stroke="#C8102E" strokeWidth="64" d="m0 0 640 480M640 0 0 480" />
      <path stroke="#fff" strokeWidth="160" d="M320 0v480M0 240h640" />
      <path stroke="#C8102E" strokeWidth="96" d="M320 0v480M0 240h640" />
    </svg>
  );
}
