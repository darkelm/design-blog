import { format, parseISO } from 'date-fns'

/**
 * Format a date string for display
 */
export function formatDate(dateString: string, formatStr = 'MMMM d, yyyy'): string {
  return format(parseISO(dateString), formatStr)
}

/**
 * Format reading time
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read'
  return `${minutes} min read`
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Generate excerpt from HTML content if none provided
 */
export function generateExcerpt(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return truncate(text, maxLength)
}

/**
 * Get primary tag name or fallback
 */
export function getPrimaryTagName(
  tags?: { name: string }[],
  fallback = 'Article'
): string {
  return tags?.[0]?.name || fallback
}

/**
 * Get primary author name or fallback
 */
export function getPrimaryAuthorName(
  authors?: { name: string }[],
  fallback = 'Anonymous'
): string {
  return authors?.[0]?.name || fallback
}

/**
 * Create a className string from conditionals
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
