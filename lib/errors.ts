/**
 * Error Types and Utilities
 * 
 * Custom error classes for Ghost API and content fetching
 */

export class GhostAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message)
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
 */
export function isGhostAPIError(error: unknown): error is GhostAPIError {
  return error instanceof GhostAPIError
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
  if (error instanceof GhostAPIError) {
    if (error.statusCode === 404) {
      return 'Content not found'
    }
    if (error.statusCode === 401 || error.statusCode === 403) {
      return 'Authentication failed. Please check your API credentials.'
    }
    if (error.statusCode === 429) {
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





