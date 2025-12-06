import Link from 'next/link'

/**
 * 404 Not Found Page
 * 
 * Custom 404 page matching the design system.
 * Provides helpful navigation back to the site.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display-xl font-sans font-semibold text-neutral-900 mb-4">
          404
        </h1>
        <h2 className="text-display-sm font-sans font-semibold text-neutral-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-body-md font-serif text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-neutral-900 text-white font-sans font-medium rounded-lg hover:bg-neutral-800 transition-colors text-label"
          >
            Go Home
          </Link>
          <Link
            href="/tag/case-studies"
            className="px-6 py-3 bg-neutral-100 text-neutral-900 font-sans font-medium rounded-lg hover:bg-neutral-200 transition-colors text-label"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  )
}

