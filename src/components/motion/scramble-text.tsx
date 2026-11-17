'use client'

import { useEffect, useState } from 'react'

/*
  Adapted from ui-layouts' Randomized Text: the line starts as random
  symbols and the real letters lock in from left to right. Spaces and the
  middle dot stay put so the line keeps its shape. It only makes sense in
  a monospace face, where every glyph has the same width.

  The server renders the real text, hidden by [data-reveal] until the
  effect starts; screen readers get the real text the whole time.
*/

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz<>/{}[]=+*#_'
const KEEP = new Set([' ', '·', ','])

function scramble(text: string, lockedUpTo: number): string {
  return text
    .split('')
    .map((ch, i) =>
      i < lockedUpTo || KEEP.has(ch) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    )
    .join('')
}

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reveal once after hydration
      setStarted(true)
      return
    }
    let locked = 0
    let frame = 0
    const noiseFrames = 6
    setStarted(true)
    setShown(scramble(text, 0))
    const timer = window.setInterval(() => {
      frame += 1
      if (frame > noiseFrames) locked += 1
      setShown(scramble(text, locked))
      if (locked >= text.length) window.clearInterval(timer)
    }, 32)
    return () => window.clearInterval(timer)
  }, [text])

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        data-reveal=""
        style={{ opacity: started ? 1 : 0, transition: 'opacity 120ms linear' }}
      >
        {shown}
      </span>
    </p>
  )
}
