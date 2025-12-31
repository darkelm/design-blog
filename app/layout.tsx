import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

// Load fonts - customize these for your brand
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
