import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Oculta el indicador de dev (Route/Bundler/Issues) de la esquina; es solo
  // ruido de desarrollo — en producción no existe.
  devIndicators: false,
  // Bundle mínimo para el runner de Docker (patrón neonexai-web, ya validado
  // en este VPS: Dockerfile multi-stage copia solo .next/standalone + static).
  output: 'standalone',
  // Fija la raíz del workspace: sin esto, Turbopack detecta el
  // package-lock.json del monorepo NeoNexAI un nivel por encima y anida la
  // salida en .next/standalone/projects/jonni-ai-web/server.js en vez de
  // .next/standalone/server.js (rompe el Dockerfile). process.cwd() = /app
  // dentro del build de Docker, y el directorio del proyecto en local.
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
