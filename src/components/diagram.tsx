import type { Diagram as DiagramModel, DiagramStep } from '@/data/projects'

import { Beams } from './motion/beams'

function Node({
  step,
  tone = 'plain',
  beamStep,
}: {
  step: DiagramStep
  tone?: 'plain' | 'old' | 'new'
  beamStep?: number
}) {
  const toneClass =
    tone === 'old'
      ? 'text-muted border-dashed'
      : tone === 'new'
        ? 'border-accent/60 bg-accent/5'
        : ''
  return (
    <span
      data-beam-step={beamStep}
      className={`border-line bg-surface inline-flex min-w-0 flex-col rounded-lg border px-3 py-2 ${toneClass}`}
    >
      <span className="text-sm leading-tight font-medium">{step.label}</span>
      {step.note && <span className="text-muted mt-0.5 font-mono text-[11px]">{step.note}</span>}
    </span>
  )
}

function Arrow({ turn = false }: { turn?: boolean }) {
  // In a flow, the arrow points down on phones (centered under the box) and right from sm up.
  return (
    <span aria-hidden="true" data-beam-arrow="" className="text-accent shrink-0 font-mono text-sm">
      {turn ? (
        <>
          <span className="sm:hidden">↓</span>
          <span className="hidden sm:inline">→</span>
        </>
      ) : (
        '→'
      )}
    </span>
  )
}

/**
 * Drawn with HTML rather than SVG so the text stays readable at phone width
 * and the colors follow the theme. The same content is given to screen
 * readers as an ordered list.
 */
export function Diagram({ diagram }: { diagram: DiagramModel }) {
  return (
    <figure className="border-line mt-4 rounded-xl border p-4">
      <figcaption className="text-muted mb-3 font-mono text-[11px] tracking-wider uppercase">
        {diagram.title}
      </figcaption>
      {diagram.kind === 'flow' ? (
        <>
          <Beams mode="chain">
            <ol
              className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center"
              aria-label={diagram.title}
            >
              {diagram.steps.map((step, i) => (
                <li key={step.label} className="flex flex-col items-center gap-2 sm:flex-row">
                  <Node step={step} beamStep={i} />
                  {i < diagram.steps.length - 1 && <Arrow turn />}
                </li>
              ))}
            </ol>
          </Beams>
          {diagram.aside && (
            <p className="text-muted mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span>Fed by</span>
              {diagram.aside.map((step) => (
                <Node key={step.label} step={step} />
              ))}
            </p>
          )}
        </>
      ) : (
        <Beams mode="pairs">
          <ul className="grid gap-2" aria-label={diagram.title}>
            <li
              aria-hidden="true"
              className="text-muted grid grid-cols-[1fr_auto_1fr] gap-3 font-mono text-[11px]"
            >
              <span>Before</span>
              <span />
              <span>After</span>
            </li>
            {diagram.rows.map((row, r) => (
              <li
                key={row.before.label}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
              >
                <span className="sr-only">
                  {row.before.label} became {row.after.label}
                  {row.after.note ? ` (${row.after.note})` : ''}
                </span>
                <span aria-hidden="true" className="grid">
                  <Node step={row.before} tone="old" beamStep={r * 2} />
                </span>
                <span aria-hidden="true">
                  <Arrow />
                </span>
                <span aria-hidden="true" className="grid">
                  <Node step={row.after} tone="new" beamStep={r * 2 + 1} />
                </span>
              </li>
            ))}
          </ul>
        </Beams>
      )}
    </figure>
  )
}
