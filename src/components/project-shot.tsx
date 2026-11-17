'use client'

import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import Image from 'next/image'
import type { PointerEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

/*
  The project screenshot, with two ideas from ui-layouts:

  - Spotlight Cards: a soft accent glow that follows the pointer over the
    frame. It is one radial gradient positioned by two CSS variables, so
    moving the pointer never re-renders React.
  - Media Modal: clicking the screenshot grows it into a full-screen view
    with a shared layout animation, and it shrinks back on close.

  The trigger is a real button, Escape and the backdrop close the dialog,
  focus goes to the close button and returns to the screenshot.

  The dialog is portalled to <body>: the reveal animation leaves a filter
  on the card, and a filter makes position: fixed relative to the card
  instead of the window.
*/

const noop = () => () => {}

interface Shot {
  src: string
  alt: string
  width: number
  height: number
}

const spring = { type: 'spring', stiffness: 320, damping: 32, mass: 0.6 } as const

export function ProjectShot({ image, imageDark }: { image: Shot; imageDark?: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])
  const isClient = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )

  useEffect(() => {
    if (!open) return
    const opener = trigger.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      // The close button is the only control inside, so Tab stays on it.
      if (e.key === 'Tab') {
        e.preventDefault()
        closeBtn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      opener?.focus({ preventScroll: true })
    }
  }, [open, close])

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const pictures = (sizes: string) => (
    <>
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={`block h-auto w-full ${imageDark ? 'theme-light-only' : ''}`}
      />
      {imageDark && (
        <Image
          src={imageDark}
          alt=""
          width={image.width}
          height={image.height}
          sizes={sizes}
          className="theme-dark-only block h-auto w-full"
        />
      )}
    </>
  )

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={onPointerMove}
        aria-label={`Enlarge screenshot: ${image.alt}`}
        aria-haspopup="dialog"
        className="shot-trigger relative z-10 block w-full cursor-zoom-in text-left"
      >
        {open ? (
          // Holds the row's height while the screenshot is in the dialog.
          <span aria-hidden="true" className="frame block opacity-0">
            {pictures('(min-width: 768px) 520px, 100vw')}
          </span>
        ) : (
          <motion.figure
            layoutId={`shot-${id}`}
            className="frame spotlight"
            style={{ borderRadius: 10 }}
          >
            {pictures('(min-width: 768px) 520px, 100vw')}
          </motion.figure>
        )}
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={image.alt}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
              >
                <motion.div
                  className="bg-bg/85 absolute inset-0 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={close}
                />
                <motion.figure
                  layoutId={`shot-${id}`}
                  className="frame relative w-full cursor-zoom-out"
                  style={{
                    borderRadius: 14,
                    // As wide as fits, but never taller than the window.
                    maxWidth: `min(72rem, calc(88dvh * ${image.width / image.height}))`,
                  }}
                  onClick={close}
                >
                  {pictures('100vw')}
                </motion.figure>
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={close}
                  aria-label="Close screenshot"
                  className="bg-surface border-line text-ink hover:text-accent absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border sm:top-6 sm:right-6"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </MotionConfig>
  )
}
