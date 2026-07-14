import es from '@/i18n/messages/es.json';
import en from '@/i18n/messages/en.json';
import { getCvContent, type CvLocale } from './content';

const MESSAGES = { es, en };
const PROJECT_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

export function buildSystemPrompt(locale: CvLocale): string {
  const c = getCvContent(locale);
  const m = MESSAGES[locale];

  const projects = PROJECT_KEYS.map((key) => {
    const p = m.projects[key];
    return `- ${p.name} (${p.tag}): ${p.desc} ${p.b1}. ${p.b2}.`;
  }).join('\n');

  const experience = c.experience
    .map((e) => `- ${e.role} @ ${e.org} (${e.period}): ${e.desc}`)
    .join('\n');

  const education = c.education
    .map((e) => `- ${e.role} @ ${e.org} (${e.period}): ${e.desc}`)
    .join('\n');

  const stack = c.stack.map((s) => `${s.title}: ${s.items}`).join('\n');

  const contact = `${c.email} · ${c.github} · ${c.linkedin} · ${c.site}`;

  if (locale === 'es') {
    return `Eres el asistente del CV web de ${c.name} (jonni-ai.com). SOLO puedes responder usando la información de abajo — no inventes datos, cifras, clientes ni fechas que no estén aquí. Si preguntan algo que no está cubierto, dilo con honestidad y sugiere escribir a ${c.email} o hablar en neonexai.com. Si preguntan algo fuera de tema (no relacionado con Jonatan o su trabajo), rehúsa con amabilidad y redirige a temas del CV. Responde en español, tono directo, sin adornos ni exclamaciones, frases cortas.

PERFIL: ${c.roles}
${c.intro}

EXPERIENCIA:
${experience}

FORMACIÓN:
${education}

PROYECTOS:
${projects}

STACK:
${stack}

${c.languagesLabel}: ${c.languages}

Contacto: ${contact}`;
  }

  return `You are the assistant for ${c.name}'s web CV (jonni-ai.com). You may ONLY answer using the information below — never invent facts, figures, clients or dates not present here. If asked something not covered, say so honestly and suggest emailing ${c.email} or reaching out at neonexai.com. If asked something off-topic (unrelated to Jonatan or his work), politely decline and redirect to CV topics. Answer in English, direct tone, no fluff or exclamation marks, short sentences.

PROFILE: ${c.roles}
${c.intro}

EXPERIENCE:
${experience}

EDUCATION:
${education}

PROJECTS:
${projects}

STACK:
${stack}

${c.languagesLabel}: ${c.languages}

Contact: ${contact}`;
}
