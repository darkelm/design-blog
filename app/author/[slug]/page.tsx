import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cms'
import { ArticleCard } from '@/components'
import type { Post, Author } from '@/lib/types'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const author = await getAuthorBySlug(slug) as Author
    return {
      title: author.meta_title || author.name,
      description: author.meta_description || author.bio || `Articles by ${author.name}`,
    }
  } catch {
    return { title: 'Author Not Found' }
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[]
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  let author: Author
  let posts: Post[]

  try {
    ;[author, posts] = await Promise.all([
      getAuthorBySlug(slug) as Promise<Author>,
      getPostsByAuthor(slug, 20) as Promise<Post[]>,
    ])
  } catch {
    notFound()
  }

  return (
    <>
      {/* Author Header */}
      <header className="mx-auto max-w-content px-fluid pt-12 lg:pt-20 pb-12">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {/* Avatar */}
          {author.profile_image ? (
            <Image
              src={author.profile_image}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full"
            />
          ) : (
            <div className="w-28 h-28 bg-neutral-200 rounded-full flex-shrink-0" />
          )}

          {/* Info */}
          <div className="flex-1">
            <p className="text-overline text-neutral-500 uppercase font-medium mb-2">
              Author
            </p>
            <h1 className="text-display-md font-semibold text-neutral-900 mb-3">
              {author.name}
            </h1>
            {author.bio && (
              <p className="text-body-lg text-neutral-600 max-w-2xl mb-4">
                {author.bio}
              </p>
            )}
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-neutral-500">
              {author.location && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {author.location}
                </span>
              )}
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Website
                </a>
              )}
              {author.twitter && (
                <a
                  href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              )}
              <span>
                {author.count?.posts || posts.length} article{(author.count?.posts || posts.length) !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Articles */}
      <section className="mx-auto max-w-content px-fluid py-section-y border-t border-neutral-200">
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-8">
          Articles by {author.name}
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {posts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-500">No articles by this author yet.</p>
          </div>
        )}
      </section>
    </>
  )
}
