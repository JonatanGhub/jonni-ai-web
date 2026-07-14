import { getLocale, getTranslations } from 'next-intl/server';

const REPOS = ['jonni-ai-web', 'grass_bot_auto_24-7', 'AI-AGENCY-PROMPT-OS'] as const;

interface RepoData {
  name: string;
  stars: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

async function fetchRepos(): Promise<RepoData[]> {
  const results = await Promise.all(
    REPOS.map(async (name): Promise<RepoData | null> => {
      try {
        const res = await fetch(`https://api.github.com/repos/JonatanGhub/${name}`, {
          headers: { Accept: 'application/vnd.github+json' },
          next: { revalidate: 86400 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return {
          name: data.name,
          stars: data.stargazers_count,
          language: data.language,
          updatedAt: data.updated_at,
          url: data.html_url,
        };
      } catch {
        return null;
      }
    }),
  );
  return results.filter((r): r is RepoData => r !== null);
}

export async function GithubStats() {
  const [repos, locale, t] = await Promise.all([
    fetchRepos(),
    getLocale(),
    getTranslations('projects'),
  ]);

  if (repos.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
        {t('reposLabel')}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {repos.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blueprint-card flex flex-col gap-2 p-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="truncate font-mono text-[13px] font-medium text-[var(--color-ink)]">
              {r.name}
            </span>
            <span className="flex items-center gap-3 font-mono text-[11px] text-[var(--color-ink-muted)]">
              <span className="flex items-center gap-1 text-[var(--color-copper)]">
                ★ {r.stars}
              </span>
              {r.language && <span>{r.language}</span>}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
              {new Date(r.updatedAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
