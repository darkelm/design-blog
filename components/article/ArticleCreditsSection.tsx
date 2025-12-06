import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/types'

/**
 * ArticleCreditsSection Component
 * 
 * Reusable credits section component for article pages.
 * Displays author information with avatars and bios.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Data: Passed as props
 * - Styling: Uses design tokens
 */
interface ArticleCreditsSectionProps {
  authors: Author[]
  title?: string
  className?: string
}

export function ArticleCreditsSection({ 
  authors, 
  title = 'Credits',
  className = '' 
}: ArticleCreditsSectionProps) {
  if (authors.length === 0) return null

  return (
    <section className={`w-full border-t border-neutral-200 py-section-y ${className}`}>
      <div className="mx-auto max-w-content px-6 lg:px-section-x">
        <div className="max-w-article mx-auto">
          <h2 className="text-display-sm font-semibold text-neutral-900 mb-8">
            {title}
          </h2>
          <div className="space-y-6">
            {authors.map((author) => (
              <div key={author.slug} className="flex items-start gap-4">
                {author.profile_image ? (
                  <Image
                    src={author.profile_image}
                    alt={author.name}
                    width={64}
                    height={64}
                    className="rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-neutral-200 rounded-full flex-shrink-0" />
                )}
                <div className="flex-1">
                  <Link
                    href={`/author/${author.slug}`}
                    className="text-[1.125rem] font-sans font-semibold text-neutral-900 hover:text-neutral-600 transition-colors block mb-1"
                  >
                    {author.name}
                  </Link>
                  {author.bio && (
                    <p className="text-[1rem] font-serif text-neutral-600">
                      {author.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

