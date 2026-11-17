'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/*
  Adapted from ui-layouts' Scroll Animation: blur, fade and a short slide
  when the element scrolls into view, once.

  The hidden state is an inline style written on the server, so the page
  would stay blank without JavaScript or with reduced motion. A rule in
  globals.css on [data-reveal] overrides it in both cases.
*/

const variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  ul: motion.ul,
} as const

interface RevealProps {
  children: ReactNode
  as?: keyof typeof tags
  className?: string
  delay?: number
  /** Animate on load instead of on scroll, for content above the fold. */
  onMount?: boolean
}

export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  onMount = false,
}: RevealProps) {
  const Tag = tags[as]
  const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay }
  return (
    <Tag
      data-reveal=""
      className={className}
      variants={variants}
      initial="hidden"
      transition={transition}
      {...(onMount
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.1, margin: '0px 0px -10% 0px' },
          })}
    >
      {children}
    </Tag>
  )
}
