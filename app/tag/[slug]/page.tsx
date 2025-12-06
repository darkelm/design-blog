import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTagBySlug, getPostsByTag, getTags } from '@/lib/ghost'
import { getMockTagBySlug, getMockPostsByTag, getMockTags } from '@/lib/mockData'
import { ArticleCard, TopicFilter } from '@/components'
import type { Post, Tag } from '@/lib/types'
import { logger } from '@/lib/utils/logger'

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true // Set to false to use real Ghost data

// Force dynamic rendering in development to avoid 404s
export const dynamic = 'force-dynamic'

interface TagPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  let tag: Tag | undefined
  
  if (USE_MOCK_DATA) {
    tag = getMockTagBySlug(params.slug)
  } else {
    try {
      tag = await getTagBySlug(params.slug)
    } catch (error) {
      logger.error('Failed to fetch tag for metadata:', error)
      tag = undefined
    }
  }
  
  if (!tag) {
    return { title: 'Tag Not Found' }
  }
  
  return {
    title: tag.meta_title || tag.name,
    description: tag.meta_description || tag.description || `Articles tagged with ${tag.name}`,
  }
}

export async function generateStaticParams() {
  let tags: Tag[] = []
  
  if (USE_MOCK_DATA) {
    tags = getMockTags()
  } else {
    try {
      tags = await getTags()
    } catch (error) {
      logger.error('Failed to fetch tags for static params:', error)
      tags = []
    }
  }
  
  return tags.map((tag) => ({ slug: tag.slug }))
}

export default async function TagPage({ params }: TagPageProps) {
  let tag: Tag | undefined
  let posts: Post[] = []
  let allTags: Tag[] = []

  if (USE_MOCK_DATA) {
    tag = getMockTagBySlug(params.slug)
    posts = getMockPostsByTag(params.slug, 20)
    allTags = getMockTags()
  } else {
    try {
      ;[tag, posts, allTags] = await Promise.all([
        getTagBySlug(params.slug),
        getPostsByTag(params.slug, 20),
        getTags(),
      ])
    } catch (error) {
      logger.error('Failed to fetch tag page data:', error)
      notFound()
    }
  }

  if (!tag) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-content px-6 lg:px-section-x pt-12 lg:pt-20 pb-8">
        <div className="max-w-2xl">
          <p className="text-overline text-neutral-500 uppercase font-medium mb-3">
            Topic
          </p>
          <h1 className="text-display-lg font-semibold text-neutral-900 mb-4">
            {tag.name}
          </h1>
          {tag.description && (
            <p className="text-body-md text-neutral-600">
              {tag.description}
            </p>
          )}
          <p className="text-body-sm text-neutral-500 mt-4">
            {tag.count?.posts || posts.length} article{(tag.count?.posts || posts.length) !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      {/* Topic Filter */}
      <TopicFilter
        tags={allTags.filter(t => t.visibility === 'public').slice(0, 8)}
        activeTag={params.slug}
      />

      {/* Posts Grid */}
      <section className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {posts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-500">No articles found in this topic yet.</p>
          </div>
        )}
      </section>
    </>
  )
}
