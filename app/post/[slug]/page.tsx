import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug, getPosts, getPostsByTag } from '@/lib/ghost'
import { ArticleCard } from '@/components'
import { formatDate, formatReadingTime } from '@/lib/utils'
import type { Post } from '@/lib/types'

interface PostPageProps {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug) as Post
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      openGraph: {
        title: post.og_title || post.title,
        description: post.og_description || post.excerpt,
        images: post.og_image || post.feature_image ? [{ url: post.og_image || post.feature_image! }] : [],
        type: 'article',
        publishedTime: post.published_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.twitter_title || post.title,
        description: post.twitter_description || post.excerpt,
        images: post.twitter_image || post.feature_image ? [post.twitter_image || post.feature_image!] : [],
      },
    }
  } catch {
    return { title: 'Post Not Found' }
  }
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getPosts({ limit: 100 }) as Post[]
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  let post: Post
  
  try {
    post = await getPostBySlug(params.slug) as Post
  } catch {
    notFound()
  }

  const primaryTag = post.tags?.[0]
  const author = post.authors?.[0]

  // Get related posts
  let relatedPosts: Post[] = []
  if (primaryTag) {
    const related = await getPostsByTag(primaryTag.slug, 4) as Post[]
    relatedPosts = related.filter(p => p.id !== post.id).slice(0, 3)
  }

  return (
    <article>
      {/* Article Header */}
      <header className="mx-auto max-w-content px-6 lg:px-section-x pt-12 lg:pt-20 pb-8">
        <div className="max-w-article mx-auto">
          {/* Tag */}
          {primaryTag && (
            <Link
              href={`/tag/${primaryTag.slug}`}
              className="inline-block text-overline text-neutral-500 uppercase font-medium mb-4 hover:text-neutral-700 transition-colors"
            >
              {primaryTag.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-display-lg lg:text-display-xl font-semibold text-neutral-900 mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-body-lg text-neutral-600 mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center gap-4 pb-8 border-b border-neutral-200">
            {author?.profile_image ? (
              <Image
                src={author.profile_image}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-neutral-200 rounded-full" />
            )}
            <div>
              {author && (
                <Link
                  href={`/author/${author.slug}`}
                  className="font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  {author.name}
                </Link>
              )}
              <p className="text-body-sm text-neutral-500">
                {formatDate(post.published_at)} · {formatReadingTime(post.reading_time)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Image */}
      {post.feature_image && (
        <div className="mx-auto max-w-content px-6 lg:px-section-x mb-12">
          <Image
            src={post.feature_image}
            alt={post.title}
            width={1400}
            height={700}
            className="w-full aspect-[2/1] object-cover rounded-xl"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="mx-auto max-w-content px-6 lg:px-section-x pb-16">
        <div
          className="prose max-w-article mx-auto"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>

      {/* Author Bio */}
      {author && (
        <aside className="mx-auto max-w-content px-6 lg:px-section-x pb-16">
          <div className="max-w-article mx-auto p-8 bg-neutral-50 rounded-xl">
            <div className="flex items-start gap-4">
              {author.profile_image ? (
                <Image
                  src={author.profile_image}
                  alt={author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex-shrink-0" />
              )}
              <div>
                <p className="text-overline text-neutral-500 uppercase font-medium mb-1">
                  Written by
                </p>
                <Link
                  href={`/author/${author.slug}`}
                  className="text-lg font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  {author.name}
                </Link>
                {author.bio && (
                  <p className="text-body-sm text-neutral-600 mt-2">
                    {author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-content px-6 lg:px-section-x py-section-y border-t border-neutral-200">
          <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {relatedPosts.map((relatedPost, index) => (
              <ArticleCard key={relatedPost.id} post={relatedPost} index={index} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
