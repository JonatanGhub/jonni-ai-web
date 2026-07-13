import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 132,
            height: 132,
            border: '3px solid #c87d4b',
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: '#c87d4b',
              fontFamily: 'monospace',
              lineHeight: 1,
            }}
          >
            J
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
