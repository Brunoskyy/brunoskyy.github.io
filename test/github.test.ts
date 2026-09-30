import { describe, expect, it } from 'vitest'

import { formatMonth, toProjectView, toRepoMeta } from '../src/lib/github'

describe('toRepoMeta', () => {
  it('keeps the fields the page shows and drops empty homepages', () => {
    expect(
      toRepoMeta({
        name: 'switchboard',
        description: 'Flags',
        html_url: 'https://github.com/Brunoskyy/switchboard',
        homepage: '',
        stargazers_count: 3,
        language: 'TypeScript',
        pushed_at: '2026-09-30T12:00:00Z',
      }),
    ).toEqual({
      name: 'switchboard',
      description: 'Flags',
      url: 'https://github.com/Brunoskyy/switchboard',
      homepage: null,
      stars: 3,
      language: 'TypeScript',
      pushedAt: '2026-09-30T12:00:00Z',
    })
  })
})

describe('toProjectView', () => {
  const base = { repo: 'x', name: 'X', description: '', interesting: '', stack: [] }

  it('links public projects to their repository', () => {
    expect(toProjectView(base, null).href).toBe('https://github.com/Brunoskyy/x')
  })

  it('does not link private or unfinished ones', () => {
    expect(toProjectView({ ...base, private: true }, null).href).toBeNull()
    expect(toProjectView({ ...base, wip: true }, null).href).toBeNull()
  })
})

describe('formatMonth', () => {
  it('renders month and year, and nothing for garbage', () => {
    expect(formatMonth('2026-09-30T12:00:00Z')).toBe('Sep 2026')
    expect(formatMonth('nope')).toBe('')
  })
})
