import Image from 'next/image'

import type { ProjectView } from '@/lib/github'
import { formatMonth } from '@/lib/github'

export function ProjectCard({ project }: { project: ProjectView }) {
  const status = project.wip ? 'in progress' : project.private ? 'private, ask me for access' : null
  const meta = project.meta

  return (
    <article className="border-line relative grid gap-6 border-b py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-12 md:py-14">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-center gap-3">
          {project.logo && (
            <Image
              src={project.logo}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-[9px]"
            />
          )}
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

        <dl className="text-muted flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
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

        <p className="text-[15px] leading-relaxed sm:text-base">{project.description}</p>
        <p className="display-italic text-muted text-[17px] leading-snug sm:text-lg">
          {project.interesting}
        </p>

        <ul
          className="text-muted flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs"
          aria-label="Stack"
        >
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        {(project.href || project.live) && (
          <ul className="relative z-10 flex gap-5 pt-1 text-sm">
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
      </div>

      <div className="min-w-0 self-start md:pt-1">
        {project.image && (
          <figure className="frame">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 768px) 520px, 100vw"
              className="block h-auto w-full"
            />
          </figure>
        )}
      </div>
    </article>
  )
}
