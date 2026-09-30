import { profile, type OlderRepo, type Project } from '@/data/projects'

/** The subset of a GitHub repository the page shows. */
export interface RepoMeta {
  name: string
  description: string | null
  url: string
  homepage: string | null
  stars: number
  language: string | null
  pushedAt: string
}

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string | null
  pushed_at: string
}

export function toRepoMeta(raw: GitHubRepo): RepoMeta {
  return {
    name: raw.name,
    description: raw.description,
    url: raw.html_url,
    homepage: raw.homepage || null,
    stars: raw.stargazers_count,
    language: raw.language,
    pushedAt: raw.pushed_at,
  }
}

/**
 * Fetches one repository. Returns null on any failure (private repo, rate
 * limit, offline) so a build never breaks because GitHub did not answer.
 */
export async function fetchRepo(name: string): Promise<RepoMeta | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  try {
    const res = await fetch(`https://api.github.com/repos/${profile.login}/${name}`, {
      headers,
      cache: 'force-cache',
    })
    if (!res.ok) return null
    return toRepoMeta((await res.json()) as GitHubRepo)
  } catch {
    return null
  }
}

export interface ProjectView extends Project {
  meta: RepoMeta | null
  /** Where the card's title links, if anywhere. */
  href: string | null
}

export function toProjectView(project: Project, meta: RepoMeta | null): ProjectView {
  const href =
    project.private || project.wip ? null : `https://github.com/${profile.login}/${project.repo}`
  return { ...project, meta, href }
}

export async function loadProjects(projects: readonly Project[]): Promise<ProjectView[]> {
  return Promise.all(
    projects.map(async (p) =>
      toProjectView(p, p.private || p.wip ? null : await fetchRepo(p.repo)),
    ),
  )
}

export async function loadRepos(entries: readonly OlderRepo[]): Promise<RepoMeta[]> {
  const metas = await Promise.all(
    entries.map(async (e) => {
      const meta = await fetchRepo(e.repo)
      return meta && e.description ? { ...meta, description: e.description } : meta
    }),
  )
  return metas.filter((m): m is RepoMeta => m !== null)
}

/** `2024-03-09T14:05:00Z` -> `Mar 2024`. */
export function formatMonth(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}
