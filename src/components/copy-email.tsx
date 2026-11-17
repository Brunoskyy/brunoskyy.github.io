'use client'

import { useEffect, useState } from 'react'

/** Copies the address, for readers whose machine has no mail app behind mailto:. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const t = window.setTimeout(() => setState('idle'), 1800)
    return () => window.clearTimeout(t)
  }, [state])

  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard.writeText(email).then(
          () => setState('copied'),
          () => setState('failed'),
        )
      }
      className="border-line text-muted hover:text-ink hover:border-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 align-middle font-mono text-xs transition-colors"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {state === 'copied' ? (
          <path d="M5 12l5 5L20 7" />
        ) : (
          <>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </>
        )}
      </svg>
      <span aria-live="polite">
        {state === 'copied'
          ? 'Copied'
          : state === 'failed'
            ? 'Copy failed, select it instead'
            : 'Copy email'}
      </span>
    </button>
  )
}
