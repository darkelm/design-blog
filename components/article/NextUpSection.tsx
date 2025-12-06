import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'

/**
 * NextUpSection Component
 * 
 * Reusable "Next Up" section component for article pages.
 * Displays related articles in a clean list format.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Data: Passed as props
 * - Styling: Uses design tokens
 */
interface NextUpSectionProps {
  posts: Post[]
  title?: string
  showImage?: boolean
  className?: string
}

export function NextUpSection({ 
  posts, 
  title = 'Next up',
  showImage = true,
  className = '' 
}: NextUpSectionProps) {
  if (posts.length === 0) return null

  return (
    <section className={`w-full border-t border-neutral-200 py-section-y ${className}`}>
      <div className="mx-auto max-w-content px-6 lg:px-section-x">
        <div className="max-w-article mx-auto">
          <h2 className="text-display-sm font-semibold text-neutral-900 mb-8">
            {title}
          </h2>
          <div className="space-y-6">
            {posts.map((post) => {
              const author = post.authors?.[0]
              return (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="block group"
                >
                  <div className="flex flex-col md:flex-row gap-4 pb-6 border-b border-neutral-200 last:border-b-0 group-hover:opacity-70 transition-opacity">
                    {showImage && post.feature_image && (
                      <div className="w-full md:w-32 h-32 flex-shrink-0 relative overflow-hidden rounded">
                        <Image
                          src={post.feature_image}
                          alt={post.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-display-sm font-sans font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-body-md font-serif text-neutral-600 mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-label font-sans font-normal text-neutral-500">
                        {author && (
                          <>
                            <span>{author.name}</span>
                            <span>·</span>
                          </>
                        )}
                        <span>{formatDate(post.published_at, 'MMMM yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

