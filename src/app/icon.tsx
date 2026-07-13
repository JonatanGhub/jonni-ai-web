import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0d10',
          border: '2px solid #c87d4b',
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: '#c87d4b',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
