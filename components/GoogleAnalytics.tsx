import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

/**
 * GoogleAnalytics Component
 * 
 * Loads Google Analytics script and initializes tracking.
 * Only renders if GA_MEASUREMENT_ID is configured.
 * 
 * Separation of Concerns:
 * - Analytics: This component
 * - Configuration: Environment variables
 * - Performance: Uses Next.js Script optimization
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

