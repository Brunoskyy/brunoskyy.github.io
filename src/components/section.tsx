import type { ReactNode } from 'react'

interface SectionProps {
  index: string
  title: string
  id: string
  children: ReactNode
}

export function Section({ index, title, id, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-20 sm:mt-28">
      <div className="border-line mb-8 flex items-baseline gap-4 border-b pb-3">
        <span className="text-muted font-mono text-xs">{index}</span>
        <h2 id={`${id}-title`} className="display text-2xl sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
