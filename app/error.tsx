'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/**
 * Global Error Page
 * 
 * Handles errors that occur during page rendering.
 * Uses ErrorBoundary component for consistent error handling.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-display-md font-semibold text-neutral-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-body-md text-neutral-600 mb-8">
            We encountered an unexpected error. Please try refreshing the page or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Go Home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && error.digest && (
            <details className="mt-8 text-left">
              <summary className="text-body-sm text-neutral-500 cursor-pointer mb-2">
                Error Details (dev only)
              </summary>
              <pre className="text-xs bg-neutral-100 p-4 rounded-lg overflow-auto">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

