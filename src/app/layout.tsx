import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'

import { profile } from '@/data/projects'

import './globals.css'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  style: ['normal', 'italic'],
})

const instrument = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: `${profile.name}, frontend engineer`,
  description:
    'React and TypeScript work by Artur Bruno: feature flags with a real targeting engine, a realtime collaborative board, and the products I have shipped.',
  openGraph: {
    title: `${profile.name}, frontend engineer`,
    description: 'React and TypeScript, built to hold up under load and under review.',
    url: profile.url,
    siteName: profile.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
