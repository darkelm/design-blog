import type { Metadata } from 'next'
import Script from 'next/script'
import { Sora, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeaderColorProvider } from '@/components/HeaderColorProvider'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { generateOrganizationStructuredData } from '@/lib/structuredData'

// Load fonts - Sora (display/headings), Source Sans 3 (body), IBM Plex Mono (code)
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

// Site metadata - customize for your blog
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Design Blog',
    template: '%s | Design Blog',
  },
  description: 'Stories, insights, and perspectives from our design team.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Design Blog',
    description: 'Stories, insights, and perspectives from our design team.',
    url: baseUrl,
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
  // Generate organization structured data
  const organizationStructuredData = generateOrganizationStructuredData(baseUrl)

  return (
    <html lang="en" className={`${sora.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Organization Structured Data */}
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <HeaderColorProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </HeaderColorProvider>
        {/* Vercel Analytics - Performance & traffic monitoring */}
        <Analytics />
        {/* Vercel Speed Insights - Core Web Vitals & performance metrics */}
        <SpeedInsights />
      </body>
    </html>
  )
}
