# jonni-ai.com

Web-CV personal de **Jonatan García Ripollés** — ingeniero en tecnologías
industriales, agentic developer y founder de NeoNexAI Agency.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4**
- **next-intl** (bilingüe ES · EN, cookie-based, sin routing)
- **Lenis** + **GSAP ScrollTrigger** para el motion
- Estética propia "plano técnico": grafito + cobre

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm build
```

En Windows, `pnpm` requiere `.npmrc` con `node-linker=hoisted` (ya en `.gitignore`).

## Despliegue

Pensado para Coolify sobre el VPS de NeoNexAI, sirviendo `jonni-ai.com`.
