import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import { getPostBySlug, getPosts, getPostsByTag } from '@/lib/cms'
import { getMockPostBySlug, getMockPostsByTag, mockPosts } from '@/lib/mockData'
import { getArticleLayout, getLayoutVariantFromPost, type ArticleLayoutVariant } from '@/lib/articleLayouts'
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/structuredData'
import { ReadingProgress } from '@/components/ReadingProgress'
import type { Post } from '@/lib/types'
import { logger } from '@/lib/utils/logger'

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true // Set to false to use real Ghost data

// Force dynamic rendering in development
export const dynamic = 'force-dynamic'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  let post: Post | undefined
  
  if (USE_MOCK_DATA) {
    post = getMockPostBySlug(slug)
  } else {
    try {
      post = await getPostBySlug(slug)
    } catch (error) {
      logger.error('Failed to fetch post for metadata:', error)
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
      posts = await getPosts({ limit: 100 })
    } catch (error) {
      logger.error('Failed to fetch posts for static params:', error)
      posts = []
    }
  }
  
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  let post: Post | undefined
  let relatedPosts: Post[] = []
  
  if (USE_MOCK_DATA) {
    post = getMockPostBySlug(slug)
    if (post) {
      const primaryTag = post.tags?.[0]
      if (primaryTag) {
        const related = getMockPostsByTag(primaryTag.slug, 4)
        relatedPosts = related.filter(p => p.id !== post?.id).slice(0, 3)
      }
    }
  } else {
    try {
      post = await getPostBySlug(slug)
      if (!post) {
        notFound()
      }
      const primaryTag = post.tags?.[0]
      if (primaryTag) {
        const related = await getPostsByTag(primaryTag.slug, 4)
        relatedPosts = related.filter(p => p.id !== post!.id).slice(0, 3)
      }
    } catch (error) {
      // NotFoundError will be handled by notFound()
      // Other errors will be caught and logged
      logger.error('Failed to fetch post:', error)
      notFound()
    }
  }

  if (!post) {
    notFound()
  }

  const authors = post.authors || []
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  
  // Determine layout variant (can be extended to check post metadata, tags, etc.)
  const layoutVariant: ArticleLayoutVariant = getLayoutVariantFromPost(post)
  
  // Get layout components
  const layoutComponents = getArticleLayout(layoutVariant, {
    post,
    authors,
    relatedPosts,
  })

  // Generate structured data
  const articleStructuredData = generateArticleStructuredData(post, authors, baseUrl)
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(
    [
      { label: 'Home', url: '/' },
      { label: post.title, url: `/post/${post.slug}` },
    ],
    baseUrl
  )

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <article className="min-h-screen">
        <ReadingProgress />
        {layoutComponents.map(({ component: Component, props, key }) => (
          <Component key={key} {...props} />
        ))}
      </article>
    </>
  )
}
