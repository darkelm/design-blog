import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug, getPosts, getPostsByTag } from '@/lib/ghost'
import { getMockPostBySlug, getMockPostsByTag, mockPosts } from '@/lib/mockData'
import { ArticleCard } from '@/components'
import { formatDate, formatReadingTime } from '@/lib/utils'
import type { Post } from '@/lib/types'

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true // Set to false to use real Ghost data

// Force dynamic rendering in development
export const dynamic = 'force-dynamic'

interface PostPageProps {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  let post: Post | undefined
  
  if (USE_MOCK_DATA) {
    post = getMockPostBySlug(params.slug)
  } else {
    try {
      post = await getPostBySlug(params.slug) as Post
    } catch {
      post = undefined
    }
  }
  
  if (!post) {
    return { title: 'Post Not Found' }
  }
  
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
}

// Generate static paths for all posts
export async function generateStaticParams() {
  let posts: Post[] = []
  
  if (USE_MOCK_DATA) {
    posts = mockPosts
  } else {
    try {
      posts = await getPosts({ limit: 100 }) as Post[]
    } catch {
      posts = []
    }
  }
  
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  let post: Post | undefined
  let relatedPosts: Post[] = []
  
  if (USE_MOCK_DATA) {
    post = getMockPostBySlug(params.slug)
    if (post) {
      const primaryTag = post.tags?.[0]
      if (primaryTag) {
        const related = getMockPostsByTag(primaryTag.slug, 4)
        relatedPosts = related.filter(p => p.id !== post?.id).slice(0, 3)
      }
    }
  } else {
    try {
      post = await getPostBySlug(params.slug) as Post
      const primaryTag = post.tags?.[0]
      if (primaryTag) {
        const related = await getPostsByTag(primaryTag.slug, 4) as Post[]
        relatedPosts = related.filter(p => p.id !== post.id).slice(0, 3)
      }
    } catch {
      notFound()
    }
  }

  if (!post) {
    notFound()
  }

  const primaryTag = post.tags?.[0]
  const author = post.authors?.[0]

  return (
    <article className="min-h-screen">
      {/* Article Header - Wireframe Structure */}
      <header className="mx-auto max-w-content px-6 lg:px-section-x pt-12 lg:pt-20 pb-section-y border-b-2 border-neutral-300">
        <div className="max-w-article mx-auto">
          {/* Tag - Wireframe Box */}
          {primaryTag && (
            <div className="mb-6">
              <Link
                href={`/tag/${primaryTag.slug}`}
                className="inline-block px-3 py-1 border-2 border-neutral-400 text-body-sm text-neutral-700 font-medium"
              >
                {primaryTag.name}
              </Link>
            </div>
          )}

          {/* Title - Wireframe Box */}
          <div className="mb-6 border-2 border-neutral-300 p-6">
            <h1 className="text-section-title font-extrabold text-neutral-900">
              {post.title}
            </h1>
          </div>

          {/* Excerpt - Wireframe Box */}
          <div className="mb-8 border-2 border-neutral-300 p-4">
            <p className="text-body-lg text-neutral-600">
              {post.excerpt}
            </p>
          </div>

          {/* Author & Meta - Wireframe Box */}
          <div className="flex items-center gap-4 pb-8 border-b-2 border-neutral-300">
            <div className="w-12 h-12 border-2 border-neutral-400 bg-neutral-100" />
            <div className="border-2 border-neutral-300 p-3 flex-1">
              {author && (
                <div className="mb-1">
                  <Link
                    href={`/author/${author.slug}`}
                    className="text-body-md font-semibold text-neutral-900 hover:text-neutral-600"
                  >
                    {author.name}
                  </Link>
                </div>
              )}
              <p className="text-body-sm text-neutral-500">
                {formatDate(post.published_at)} · {formatReadingTime(post.reading_time)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Image - Wireframe Box */}
      {post.feature_image && (
        <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y border-b-2 border-neutral-300">
          <div className="max-w-article mx-auto">
            <div className="w-full aspect-[2/1] border-2 border-neutral-400 bg-neutral-100 flex items-center justify-center">
              <Image
                src={post.feature_image}
                alt={post.title}
                width={1400}
                height={700}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content - Wireframe Structure */}
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y border-b-2 border-neutral-300">
        <div className="max-w-article mx-auto">
          <div className="border-2 border-neutral-300 p-8">
            {post.html ? (
              <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            ) : (
              <div className="space-y-4">
                <div className="h-4 bg-neutral-200 w-full" />
                <div className="h-4 bg-neutral-200 w-5/6" />
                <div className="h-4 bg-neutral-200 w-full" />
                <div className="h-4 bg-neutral-200 w-4/6 mt-8" />
                <div className="h-4 bg-neutral-200 w-full" />
                <div className="h-4 bg-neutral-200 w-5/6" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Bio - Wireframe Box */}
      {author && (
        <aside className="mx-auto max-w-content px-6 lg:px-section-x py-section-y border-b-2 border-neutral-300">
          <div className="max-w-article mx-auto">
            <div className="border-2 border-neutral-300 p-6 bg-neutral-50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 border-2 border-neutral-400 bg-neutral-200 flex-shrink-0" />
                <div className="flex-1 border-2 border-neutral-300 p-4">
                  <p className="text-overline text-neutral-500 uppercase font-medium mb-2">
                    Written by
                  </p>
                  <Link
                    href={`/author/${author.slug}`}
                    className="text-body-md font-semibold text-neutral-900 hover:text-neutral-600 block mb-2"
                  >
                    {author.name}
                  </Link>
                  {author.bio && (
                    <p className="text-body-sm text-neutral-600">
                      {author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Related Posts - Wireframe Structure */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
          <div className="mb-section-header-gap border-2 border-neutral-300 p-4 inline-block">
            <h2 className="text-section-title font-extrabold text-neutral-900">
              Related Articles
            </h2>
          </div>
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
