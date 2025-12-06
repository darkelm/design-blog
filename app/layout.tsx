import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeaderColorProvider } from '@/components/HeaderColorProvider'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { generateOrganizationStructuredData } from '@/lib/structuredData'

// Load fonts - customize these for your brand
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
    <html lang="en" className={inter.variable}>
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
          <main className="min-h-screen pt-20">
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
