import type { RepoMeta } from '@/lib/github'
import { formatMonth } from '@/lib/github'

export function RepoRow({ repo }: { repo: RepoMeta }) {
  return (
    <li className="border-line grid gap-1 border-b py-4 sm:grid-cols-[12rem_1fr_auto] sm:gap-x-6">
      <a href={repo.url} className="prose-link font-medium">
        {repo.name}
      </a>
      <p className="text-muted text-sm">{repo.description ?? 'No description yet.'}</p>
      <p className="text-muted font-mono text-xs sm:text-right">
        {[repo.language, formatMonth(repo.pushedAt)].filter(Boolean).join(' · ')}
      </p>
    </li>
  )
}
