import { describe, expect, it } from 'vitest'

import { nextTheme, parseTheme, THEME_BOOT_SCRIPT } from '@/lib/theme'

describe('theme', () => {
  it('cycles system, light, dark', () => {
    expect(nextTheme('system')).toBe('light')
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('system')
  })

  it('treats anything unknown as system', () => {
    expect(parseTheme('dark')).toBe('dark')
    expect(parseTheme(null)).toBe('system')
    expect(parseTheme('sepia')).toBe('system')
  })

  it('boot script applies only valid stored values and survives blocked storage', () => {
    const run = (stored: string | null, throws = false) => {
      const dataset: Record<string, string> = {}
      const localStorage = {
        getItem: () => {
          if (throws) throw new Error('blocked')
          return stored
        },
      }
      new Function('document', 'localStorage', THEME_BOOT_SCRIPT)(
        { documentElement: { dataset } },
        localStorage,
      )
      return dataset.theme
    }
    expect(run('dark')).toBe('dark')
    expect(run('light')).toBe('light')
    expect(run('<script>')).toBeUndefined()
    expect(run(null, true)).toBeUndefined()
  })
})
