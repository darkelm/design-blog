/**
 * Analytics Utilities
 * 
 * Centralized analytics configuration and utilities.
 * Supports both Vercel Analytics and Google Analytics.
 * 
 * Separation of Concerns:
 * - Analytics: This utility
 * - Configuration: Environment variables
 * - Implementation: Next.js Script components
 */

/**
 * Google Analytics Configuration
 * 
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env.local file
 * Example: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

/**
 * Check if Google Analytics is enabled
 */
export const isGAEnabled = () => {
  return typeof window !== 'undefined' && GA_MEASUREMENT_ID !== ''
}

/**
 * Track page views for Google Analytics
 * Called automatically by the GA script component
 */
export const pageview = (url: string) => {
  if (!isGAEnabled()) return

  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

/**
 * Track custom events for Google Analytics
 * 
 * @example
 * ```tsx
 * event('share', {
 *   method: 'twitter',
 *   content_type: 'article',
 *   item_id: post.slug,
 * })
 * ```
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!isGAEnabled()) return

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * TypeScript declarations for gtag
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

