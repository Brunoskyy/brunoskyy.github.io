import type { RepoMeta } from '@/lib/github'
import { formatMonth } from '@/lib/github'

/* The whole row is the link: the name's ::after covers it (see .row-link). */
export function RepoRow({ repo }: { repo: RepoMeta }) {
  return (
    <li className="border-line group before:bg-surface relative isolate grid gap-1 border-b py-4 before:absolute before:-inset-x-3 before:inset-y-1 before:-z-10 before:rounded-md before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-100 sm:grid-cols-[12rem_1fr_auto] sm:gap-x-6">
      <a href={repo.url} className="prose-link row-link font-medium">
        {repo.name}
      </a>
      <p className="text-muted text-sm">{repo.description ?? 'No description yet.'}</p>
      <p className="text-muted flex items-center gap-2 font-mono text-xs sm:justify-end">
        {[repo.language, formatMonth(repo.pushedAt)].filter(Boolean).join(' · ')}
        <span
          aria-hidden="true"
          className="text-accent -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        >
          →
        </span>
      </p>
    </li>
  )
}
