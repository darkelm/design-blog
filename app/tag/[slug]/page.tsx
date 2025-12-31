import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTagBySlug, getPostsByTag, getTags } from '@/lib/cms'
import { ArticleCard, TopicFilter } from '@/components'
import type { Post, Tag } from '@/lib/types'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const tag = await getTagBySlug(slug) as Tag
    return {
      title: tag.meta_title || tag.name,
      description: tag.meta_description || tag.description || `Articles tagged with ${tag.name}`,
    }
  } catch {
    return { title: 'Tag Not Found' }
  }
}

export async function generateStaticParams() {
  const tags = await getTags() as Tag[]
  return tags.map((tag) => ({ slug: tag.slug }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  let tag: Tag
  let posts: Post[]
  let allTags: Tag[]

  try {
    ;[tag, posts, allTags] = await Promise.all([
      getTagBySlug(slug) as Promise<Tag>,
      getPostsByTag(slug, 20) as Promise<Post[]>,
      getTags() as Promise<Tag[]>,
    ])
  } catch {
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
            <p className="text-body-lg text-neutral-600">
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
        activeTag={slug}
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
