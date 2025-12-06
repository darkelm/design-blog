'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'
import { logger } from '@/lib/utils/logger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service in production
    logger.error('Error caught by boundary:', error, errorInfo)
    // Example: logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-display-md font-sans font-semibold text-neutral-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-body-md font-serif text-neutral-600 mb-8">
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-neutral-900 text-white font-sans font-medium rounded-lg hover:bg-neutral-800 transition-colors text-label"
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-neutral-100 text-neutral-900 font-sans font-medium rounded-lg hover:bg-neutral-200 transition-colors text-label"
              >
                Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-label font-sans text-neutral-500 cursor-pointer mb-2">
                  Error Details (dev only)
                </summary>
                <pre className="text-xs bg-neutral-100 p-4 rounded-lg overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

