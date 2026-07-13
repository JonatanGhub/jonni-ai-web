import es from '@/i18n/messages/es.json';
import en from '@/i18n/messages/en.json';
import { CERTIFICATIONS } from './certifications';

const MESSAGES = { es, en };

const LABELS = {
  es: { experience: 'Experiencia', education: 'Formación académica', certifications: 'Certificaciones' },
  en: { experience: 'Experience', education: 'Education', certifications: 'Certifications' },
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
    linkedin: 'linkedin.com/in/jónatan-garcía-ripollés-9271052a5',
    linkedinUrl: 'https://www.linkedin.com/in/jónatan-garcía-ripollés-9271052a5/',
    site: 'jonni-ai.com',
    siteUrl: 'https://jonni-ai.com',
    experience: [m.path.now, m.path.igex, m.path.resto],
    education: [m.path.master, m.path.degree],
    stack: [m.stack.ai, m.stack.dev, m.stack.eng],
    stackTitle: m.stack.title,
    certifications: CERTIFICATIONS.map((c) => c.title),
    certificationsLabel: LABELS[locale].certifications,
    languagesLabel: m.education.langLabel,
    languages: m.education.langs,
    experienceLabel: LABELS[locale].experience,
    educationLabel: LABELS[locale].education,
    tagline: m.footer.tagline,
  };
}
