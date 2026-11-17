'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/*
  Adapted from ui-layouts' Animated Beam: a short pulse of light travels
  along the connection between two boxes. Here it runs under the arrows of
  the diagram, so the arrows stay the source of meaning (and work without
  JavaScript) and the beam only shows the direction of flow.

  Boxes are marked with data-beam-step. In "chain" mode each step connects
  to the next; in "pairs" mode step 2n connects to 2n+1 (before → after).
  A connection is drawn only when the two boxes sit side by side or one
  right under the other; when the flow wraps to a new row, the arrow is
  left on its own.

  Plain SVG and the Web Animations API, so no animation library is loaded
  for it. Nothing is drawn with reduced motion.
*/

type Mode = 'chain' | 'pairs'
type Seg = { d: string; len: number }

const STEP_MS = 650
const DASH = 26

function measure(root: HTMLElement, mode: Mode): Seg[] {
  const box = root.getBoundingClientRect()
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-beam-step]')).sort(
    (a, b) => Number(a.dataset.beamStep) - Number(b.dataset.beamStep),
  )
  const segs: Seg[] = []
  for (let i = 0; i + 1 < nodes.length; i += mode === 'pairs' ? 2 : 1) {
    const a = nodes[i].getBoundingClientRect()
    const b = nodes[i + 1].getBoundingClientRect()
    const ay = a.top + a.height / 2
    const by = b.top + b.height / 2
    let x1, y1, x2, y2
    if (b.left >= a.right - 2 && Math.abs(ay - by) < 10) {
      ;[x1, y1, x2, y2] = [a.right, ay, b.left, by]
    } else if (
      b.top >= a.bottom - 2 &&
      Math.abs(a.left + a.width / 2 - (b.left + b.width / 2)) < 24
    ) {
      // Stacked on phones, centered: run the beam down through the ↓ arrow.
      const arrow = nodes[i].parentElement?.querySelector('[data-beam-arrow]')
      const r = arrow?.getBoundingClientRect()
      const x = r && r.width > 0 ? r.left + r.width / 2 : a.left + a.width / 2
      ;[x1, y1, x2, y2] = [x, a.bottom, x, b.top]
    } else {
      continue
    }
    x1 -= box.left
    x2 -= box.left
    y1 -= box.top
    y2 -= box.top
    segs.push({ d: `M${x1},${y1} L${x2},${y2}`, len: Math.hypot(x2 - x1, y2 - y1) })
  }
  return segs
}

export function Beams({ mode, children }: { mode: Mode; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const [segs, setSegs] = useState<Seg[]>([])
  const glow = `beam-glow-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const update = () => setSegs(measure(el, mode))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [mode])

  useEffect(() => {
    const paths = Array.from(svg.current?.querySelectorAll('path') ?? [])
    if (paths.length === 0) return
    // Two paths per connection: the glow and the core line.
    const cycle = (paths.length / 2) * STEP_MS + 1400
    const animations = paths.map((p, i) => {
      const len = Number(p.dataset.len)
      p.style.strokeDasharray = `${DASH} ${len + DASH}`
      return p.animate(
        [
          { strokeDashoffset: DASH, opacity: 1 },
          { strokeDashoffset: -len, opacity: 1, offset: STEP_MS / cycle },
          { strokeDashoffset: -len, opacity: 0 },
        ],
        {
          duration: cycle,
          delay: Math.floor(i / 2) * STEP_MS,
          iterations: Infinity,
          easing: 'linear',
        },
      )
    })
    // Pause while the diagram is off screen.
    const io = new IntersectionObserver(([entry]) =>
      animations.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
    )
    if (root.current) io.observe(root.current)
    return () => {
      io.disconnect()
      animations.forEach((a) => a.cancel())
    }
  }, [segs])

  return (
    <div ref={root} className="relative">
      {segs.length > 0 && (
        <svg
          ref={svg}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          {segs.map((s, i) => (
            <g key={i}>
              <path
                d={s.d}
                data-len={s.len}
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter={`url(#${glow})`}
                style={{ strokeDasharray: `0 ${s.len + DASH}` }}
              />
              <path
                d={s.d}
                data-len={s.len}
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                style={{ strokeDasharray: `0 ${s.len + DASH}` }}
              />
            </g>
          ))}
        </svg>
      )}
      {children}
    </div>
  )
}
