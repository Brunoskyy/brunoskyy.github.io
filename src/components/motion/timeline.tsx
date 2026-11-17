'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

/*
  The experience list as a timeline: a hairline runs down through the
  company logos and an accent line fills it as you scroll. The rows
  themselves come in with Reveal, which is the staggered blur-in of
  ui-layouts' Timeline Animation.

  The line sits on the logo column, which only exists from sm up, so on
  phones there is no line. With reduced motion the accent line is shown
  full and does not follow the scroll (the [data-reveal] rule).
*/
export function Timeline({ children, label }: { children: ReactNode; label?: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="bg-line absolute top-14 bottom-8 left-6 hidden w-px -translate-x-1/2 sm:block"
      />
      <motion.span
        aria-hidden="true"
        className="bg-accent absolute top-14 bottom-8 left-6 hidden w-px origin-top -translate-x-1/2 sm:block"
        // With reduced motion, [data-reveal] in globals.css shows it full.
        data-reveal=""
        style={{ scaleY: progress }}
      />
      <ul ref={ref} className="border-line relative border-t" aria-label={label}>
        {children}
      </ul>
    </div>
  )
}
