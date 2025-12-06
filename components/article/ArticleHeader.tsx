import Link from 'next/link'
import { SectionContainer } from '@/components'
import { ShareButton } from '@/components/ShareButton'
import type { Post, Author } from '@/lib/types'
import { formatDate } from '@/lib/utils'

/**
 * ArticleHeader Component
 * 
 * Reusable header component for article pages.
 * Displays article credits, title, and date.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Data: Passed as props
 * - Styling: Uses design tokens
 */
interface ArticleHeaderProps {
  post: Post
  authors: Author[]
  showCredits?: boolean
  showExcerpt?: boolean
  className?: string
}

export function ArticleHeader({ 
  post, 
  authors, 
  showCredits = true,
  showExcerpt = true,
  className = '' 
}: ArticleHeaderProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  const postUrl = `${baseUrl}/post/${post.slug}`

  return (
    <header className={`w-full pt-20 pb-section-y ${className}`}>
      <SectionContainer>
        <div className="max-w-article mx-auto">
          {/* Article Credits */}
          {showCredits && authors.length > 0 && (
            <div className="mb-8">
              <p className="text-overline text-neutral-500 uppercase font-medium mb-4">
                Article credits
              </p>
              <div className="flex flex-wrap gap-4">
                {authors.map((author) => (
                  <Link
                    key={author.slug}
                    href={`/author/${author.slug}`}
                    className="text-body-md font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    {author.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-display-xl font-semibold text-neutral-900 mb-6">
            {post.title}
          </h1>

          {/* Date */}
          <p className="text-body-sm text-neutral-500 mb-8">
            {formatDate(post.published_at, 'MMMM yyyy')}
          </p>

          {/* Share Button */}
          <div className="mb-8">
            <ShareButton
              url={postUrl}
              title={post.title}
              description={post.excerpt || ''}
            />
          </div>

          {/* Excerpt (optional) */}
          {showExcerpt && post.excerpt && (
            <p className="text-body-md text-neutral-600 mb-8">
              {post.excerpt}
            </p>
          )}
        </div>
      </SectionContainer>
    </header>
  )
}

