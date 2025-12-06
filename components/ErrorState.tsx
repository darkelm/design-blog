'use client'

import Link from 'next/link'
import { getErrorMessage } from '@/lib/errors'

interface ErrorStateProps {
  error: unknown
  title?: string
  action?: {
    label: string
    href: string
  }
}

/**
 * ErrorState Component
 * 
 * Displays user-friendly error messages
 * 
 * Separation of Concerns:
 * - Error display logic
 * - User-friendly messaging
 * - Recovery actions
 */
export function ErrorState({
  error,
  title = 'Something went wrong',
  action,
}: ErrorStateProps) {
  const message = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display-md font-semibold text-neutral-900 mb-4">
          {title}
        </h1>
        <p className="text-body-md text-neutral-600 mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Try Again
          </button>
          {action ? (
            <Link
              href={action.href}
              className="px-6 py-3 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <Link
              href="/"
              className="px-6 py-3 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Go Home
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

