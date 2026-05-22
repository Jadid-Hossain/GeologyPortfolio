import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Choiti Akter Lima | Geologist & PhD Researcher',
  description: 'Choiti Akter Lima - Geologist, PhD Researcher at University of Oklahoma. Specializing in reservoir systems, subsurface geology, CO₂ storage, and energy resources.',
  keywords: 'Choiti Akter Lima, Geologist, PhD Researcher, CO2 Storage, Reservoir Characterization, University of Oklahoma, Subsurface Geology, Energy Resources',
  authors: [{ name: 'Choiti Akter Lima' }],
  creator: 'Choiti Akter Lima',
  publisher: 'Choiti Akter Lima',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://choitilima.com',
    title: 'Choiti Akter Lima | Geologist & PhD Researcher',
    description: 'Geologist & PhD Researcher specializing in reservoir systems, subsurface geology, and CO₂ storage.',
    siteName: 'Choiti Akter Lima Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Choiti Akter Lima | Geologist & PhD Researcher',
    description: 'Geologist & PhD Researcher specializing in reservoir systems, subsurface geology, and CO₂ storage.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LoadingScreen />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
