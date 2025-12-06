import type { Post } from '@/lib/types'
import { sanitizeHTML } from '@/lib/sanitize'

/**
 * ArticleContent Component
 * 
 * Reusable content component for article pages.
 * Handles HTML content rendering with prose styles.
 * Sanitizes HTML content to prevent XSS attacks.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Data: Passed as props
 * - Security: HTML sanitization
 * - Styling: Uses design tokens and prose classes
 */
interface ArticleContentProps {
  post: Post
  className?: string
}

export function ArticleContent({ post, className = '' }: ArticleContentProps) {
  return (
    <div className={`w-full pb-section-y ${className}`}>
      <div className="mx-auto max-w-content px-6 lg:px-section-x">
        <div className="max-w-article mx-auto">
          {post.html ? (
            <div
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.html) }}
            />
          ) : (
            <div className="space-y-4">
              <p className="text-body-md text-neutral-700">
                {post.excerpt}
              </p>
              <div className="space-y-4 mt-8">
                <div className="h-4 bg-neutral-200 w-full rounded" />
                <div className="h-4 bg-neutral-200 w-5/6 rounded" />
                <div className="h-4 bg-neutral-200 w-full rounded" />
                <div className="h-4 bg-neutral-200 w-4/6 mt-8 rounded" />
                <div className="h-4 bg-neutral-200 w-full rounded" />
                <div className="h-4 bg-neutral-200 w-5/6 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

