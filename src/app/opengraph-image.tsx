import { ImageResponse } from 'next/og'

import { profile } from '@/data/projects'

export const dynamic = 'force-static'
export const alt = `${profile.name}, frontend engineer`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#f6f2ec',
        color: '#1b1917',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, color: '#625c53' }}
      >
        <div style={{ width: 22, height: 22, borderRadius: 6, background: '#b4532a' }} />
        brunoskyy.github.io
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>{profile.name}</div>
        <div style={{ fontSize: 40, color: '#625c53', lineHeight: 1.2 }}>
          Frontend engineer. React and TypeScript, built to hold up under load and under review.
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#b4532a' }}>{profile.location}</div>
    </div>,
    size,
  )
}
