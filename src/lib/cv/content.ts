import es from '@/i18n/messages/es.json';
import en from '@/i18n/messages/en.json';

const MESSAGES = { es, en };

const LABELS = {
  es: { experience: 'Experiencia', education: 'Formación académica' },
  en: { experience: 'Experience', education: 'Education' },
};

const TIMELINE = {
  es: [
    { year: '2018', label: 'Ingeniería' },
    { year: '2022', label: 'Máster' },
    { year: '2024', label: 'IGEX' },
    { year: '2026', label: 'NeoNexAI' },
  ],
  en: [
    { year: '2018', label: 'Engineering' },
    { year: '2022', label: "Master's" },
    { year: '2024', label: 'IGEX' },
    { year: '2026', label: 'NeoNexAI' },
  ],
};

export type CvLocale = keyof typeof MESSAGES;

export function getCvContent(locale: CvLocale) {
  const m = MESSAGES[locale];
  return {
    name: m.hero.name,
    roles: m.hero.roles,
    intro: m.hero.intro,
    email: 'j.garcia.r93@outlook.com',
    github: 'github.com/JonatanGhub',
    githubUrl: 'https://github.com/JonatanGhub',
    linkedin: 'linkedin.com/in/jonatan-garcia-ripolles',
    linkedinUrl: 'https://www.linkedin.com/in/jonatan-garcia-ripolles/',
    site: 'jonni-ai.com',
    siteUrl: 'https://jonni-ai.com',
    experience: [m.path.now, m.path.igex, m.path.resto],
    education: [m.path.master, m.path.degree],
    stack: [m.stack.ai, m.stack.dev, m.stack.eng],
    stackTitle: m.stack.title,
    languagesLabel: m.stack.langLabel,
    languages: m.stack.langs,
    experienceLabel: LABELS[locale].experience,
    educationLabel: LABELS[locale].education,
    tagline: m.footer.tagline,
    timeline: TIMELINE[locale],
  };
}
