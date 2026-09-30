import type { ProjectView } from '@/lib/github'
import { formatMonth } from '@/lib/github'

export function ProjectCard({ project }: { project: ProjectView }) {
  const status = project.wip ? 'in progress' : project.private ? 'private, ask me for access' : null
  const meta = project.meta

  return (
    <article className="border-line relative grid gap-3 border-b py-8 sm:grid-cols-[1fr_auto] sm:gap-x-10">
      <div className="sm:col-start-1">
        <h3 className="display text-2xl sm:text-3xl">
          {project.href ? (
            <a href={project.href} className="card-title-link hover:text-accent">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
      </div>

      <dl className="text-muted flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs sm:col-start-2 sm:row-start-1 sm:justify-end sm:text-right">
        {status && (
          <div>
            <dt className="sr-only">Status</dt>
            <dd className="text-accent">{status}</dd>
          </div>
        )}
        {meta?.language && (
          <div>
            <dt className="sr-only">Language</dt>
            <dd>{meta.language}</dd>
          </div>
        )}
        {meta && meta.stars > 0 && (
          <div>
            <dt className="sr-only">Stars</dt>
            <dd>{meta.stars} ★</dd>
          </div>
        )}
        {meta && (
          <div>
            <dt className="sr-only">Last push</dt>
            <dd>{formatMonth(meta.pushedAt)}</dd>
          </div>
        )}
      </dl>

      <div className="max-w-prose space-y-3 sm:col-span-2">
        <p className="text-[15px] leading-relaxed sm:text-base">{project.description}</p>
        <p className="display-italic text-muted text-[17px] leading-snug sm:text-lg">
          {project.interesting}
        </p>
      </div>

      <ul
        className="text-muted flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs sm:col-span-2"
        aria-label="Stack"
      >
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      {(project.href || project.live) && (
        <ul className="relative z-10 flex gap-5 pt-1 text-sm sm:col-span-2">
          {project.href && (
            <li>
              <a href={project.href} className="prose-link">
                Repository
              </a>
            </li>
          )}
          {project.live && (
            <li>
              <a href={project.live} className="prose-link">
                Live
              </a>
            </li>
          )}
        </ul>
      )}
    </article>
  )
}
