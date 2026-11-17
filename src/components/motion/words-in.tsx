'use client'

import { motion } from 'motion/react'

/*
  Adapted from ui-layouts' Scroll Text, without the uppercase: each word
  rises out of a blur one after another, on load. The heading keeps the
  plain sentence as its accessible name.
*/

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const word = {
  hidden: { opacity: 0, y: '0.35em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function WordsIn({
  text,
  id,
  className,
}: {
  text: string
  id?: string
  className?: string
}) {
  const words = text.split(' ')
  return (
    <motion.h1
      id={id}
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true">
          <motion.span data-reveal="" className="inline-block" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.h1>
  )
}
