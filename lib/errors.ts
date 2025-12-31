/**
 * Error Types and Utilities
 * 
 * Custom error classes for CMS API and content fetching.
 * Includes both generic CMS errors and Ghost-specific errors (for backward compatibility).
 */

/**
 * Generic CMS API Error
 * Use this for CMS-agnostic error handling
 */
export class CMSAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: string, // 'ghost', 'contentful', etc.
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'CMSAPIError'
  }
}

/**
 * Ghost API Error
 * Kept for backward compatibility. Extends CMSAPIError.
 * 
 * @deprecated Use CMSAPIError for new code. This is kept for backward compatibility.
 */
export class GhostAPIError extends CMSAPIError {
  constructor(
    message: string,
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message, statusCode, 'ghost', originalError)
    this.name = 'GhostAPIError'
  }
}

export class ContentFetchError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'ContentFetchError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}

/**
 * Check if error is a Ghost API error
 * 
 * @deprecated Use isCMSAPIError for new code. This is kept for backward compatibility.
 */
export function isGhostAPIError(error: unknown): error is GhostAPIError {
  return error instanceof GhostAPIError
}

/**
 * Check if error is a CMS API error (generic)
 */
export function isCMSAPIError(error: unknown): error is CMSAPIError {
  return error instanceof CMSAPIError || error instanceof GhostAPIError
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ETIMEDOUT')
    )
  }
  return false
}

/**
 * Format error message for user display
 */
export function getErrorMessage(error: unknown): string {
  // Check for generic CMS API error first
  if (error instanceof CMSAPIError || error instanceof GhostAPIError) {
    const apiError = error instanceof GhostAPIError 
      ? (error as CMSAPIError) 
      : (error as CMSAPIError)
    if (apiError.statusCode === 404) {
      return 'Content not found'
    }
    if (apiError.statusCode === 401 || apiError.statusCode === 403) {
      return 'Authentication failed. Please check your API credentials.'
    }
    if (apiError.statusCode === 429) {
      return 'Too many requests. Please try again later.'
    }
    return 'Failed to load content. Please try again.'
  }

  if (isNetworkError(error)) {
    return 'Network error. Please check your connection and try again.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}








