import DOMPurify from 'isomorphic-dompurify'

/**
 * HTML Sanitization Utility
 * 
 * Sanitizes HTML content from Ghost CMS to prevent XSS attacks.
 * Uses DOMPurify with a whitelist of safe HTML tags and attributes.
 * 
 * Separation of Concerns:
 * - Security: This utility
 * - Content: Ghost CMS
 * - Rendering: React components
 */

/**
 * Configuration for DOMPurify
 * Allows common article formatting tags while blocking scripts and dangerous attributes
 */
const DOMPurifyConfig: Parameters<typeof DOMPurify.sanitize>[1] = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'pre', 'code', 'hr',
    'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span', 'section', 'article',
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src', 'width', 'height',
    'class', 'id', 'data-*',
    'colspan', 'rowspan', 'scope',
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
}

/**
 * Sanitize HTML content
 * 
 * @param html - Raw HTML string from Ghost CMS
 * @returns Sanitized HTML string safe for rendering
 * 
 * @example
 * ```tsx
 * const sanitized = sanitizeHTML(post.html)
 * <div dangerouslySetInnerHTML={{ __html: sanitized }} />
 * ```
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''
  
  try {
    return DOMPurify.sanitize(html, DOMPurifyConfig)
  } catch (error) {
    // If sanitization fails, return empty string
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('HTML sanitization failed:', error)
    }
    return ''
  }
}

/**
 * Sanitize HTML and return as TrustedHTML (if supported)
 * Provides additional security in browsers that support Trusted Types
 */
export function sanitizeHTMLTrusted(html: string): string {
  if (!html) return ''
  
  try {
    const config = {
      ...DOMPurifyConfig,
      RETURN_TRUSTED_TYPE: true,
    }
    const result = DOMPurify.sanitize(html, config)
    // TypeScript doesn't know about TrustedHTML, so we cast
    return result as unknown as string
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('HTML sanitization failed:', error)
    }
    return ''
  }
}

