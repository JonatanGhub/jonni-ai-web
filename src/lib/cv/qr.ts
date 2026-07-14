import QRCode from 'qrcode';

export function generateQrDataUri(): Promise<string> {
  return QRCode.toDataURL('https://jonni-ai.com', {
    margin: 0,
    color: { dark: '#1c1a17', light: '#00000000' },
  });
}
