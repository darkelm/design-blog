import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'
import { CustomCursor } from '@/components/CustomCursor'

// Load fonts from design system
// Plus Jakarta Sans - for headings, UI elements, tags
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'], // Regular, Medium, SemiBold
  display: 'swap',
})

// Lora - for body copy, author names, links
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'], // Regular only
  display: 'swap',
})

// Site metadata - customize for your blog
export const metadata: Metadata = {
  title: {
    default: 'Design Blog',
    template: '%s | Design Blog',
  },
  description: 'Stories, insights, and perspectives from our design team.',
  openGraph: {
    title: 'Design Blog',
    description: 'Stories, insights, and perspectives from our design team.',
    url: 'https://your-domain.com',
    siteName: 'Design Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Blog',
    description: 'Stories, insights, and perspectives from our design team.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <CustomCursor />
          <Header />
          <Suspense fallback={null}>
            <main className="min-h-screen">
              {children}
            </main>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
