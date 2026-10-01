import Image from 'next/image'

import type { Engagement, Experience } from '@/data/projects'

import { Diagram } from './diagram'

export function ExperienceRow({ item }: { item: Experience }) {
  return (
    <li className="border-line grid gap-4 border-b py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6">
      {item.logo ? (
        <span className="border-line flex h-12 w-12 items-center justify-center rounded-xl border bg-white p-1">
          <Image src={item.logo} alt="" width={40} height={40} className="h-10 w-10 rounded-lg" />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="display bg-surface border-line text-ink flex h-12 w-12 items-center justify-center rounded-xl border text-xl"
        >
          {item.monogram}
        </span>
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="display text-xl sm:text-2xl">{item.company}</h3>
          <span className="text-muted font-mono text-xs">
            {item.role}
            {item.period ? ` · ${item.period}` : item.current ? ' · now' : ''}
          </span>
        </div>
        <p className="text-muted mt-1 text-sm">{item.product}</p>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed sm:text-base">{item.about}</p>
        {item.did && (
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed sm:text-base">{item.did}</p>
        )}
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {item.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="prose-link" rel="noopener">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {item.engagements && (
          <ol className="mt-6 space-y-8" aria-label={`Projects at ${item.company}`}>
            {item.engagements.map((e) => (
              <EngagementBlock key={e.client} engagement={e} />
            ))}
          </ol>
        )}
      </div>
    </li>
  )
}

function EngagementBlock({ engagement: e }: { engagement: Engagement }) {
  return (
    <li className="border-line border-l-2 pl-4 sm:pl-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-lg font-medium">{e.client}</h4>
        <span className="text-muted font-mono text-xs">
          {e.period}
          {e.current ? ' · current client' : ''}
        </span>
      </div>
      <p className="text-muted mt-1 max-w-prose text-[15px] leading-relaxed">{e.about}</p>
      <ul className="mt-3 max-w-prose space-y-2 text-[15px] leading-relaxed sm:text-base">
        {e.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span
              aria-hidden="true"
              className="text-accent mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-current"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      {e.diagram && <Diagram diagram={e.diagram} />}
      <ul
        className="text-muted mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs"
        aria-label="Stack"
      >
        {e.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {e.links && (
        <ul className="mt-2 flex flex-wrap gap-x-5 text-sm">
          {e.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="prose-link" rel="noopener">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
