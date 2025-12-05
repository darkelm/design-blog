import { Hero, ArticleCard, Newsletter, TopicFilter, SectionHeader, AnimatedSection } from '@/components'
import { getPosts, getFeaturedPosts, getPostsByTag, getTags } from '@/lib/ghost'
import { 
  getMockFeaturedPosts, 
  getMockRecentPosts, 
  getMockPostsByTag,
  getMockTags,
  mockPosts 
} from '@/lib/mockData'
import { getAllSectionColors } from '@/lib/getSectionColors'
import type { Post, Tag } from '@/lib/types'

// Revalidate every 60 seconds
export const revalidate = 60

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true

// Helper function to normalize Ghost API responses to arrays
function normalizePostsResponse(response: any): Post[] {
  return Array.isArray(response) ? (response as Post[]) : (response.posts as Post[])
}

function normalizeTagsResponse(response: any): Tag[] {
  return Array.isArray(response) ? (response as Tag[]) : (response.tags as Tag[])
}

export default async function HomePage() {
  let featuredPosts: Post[] = []
  let recentPosts: Post[] = []
  let caseStudies: Post[] = []
  let spotlightPosts: Post[] = []
  let perspectivesPosts: Post[] = []
  let processPosts: Post[] = []
  let toolsPosts: Post[] = []
  let allTags: Tag[] = []

  if (USE_MOCK_DATA) {
    // Use mock data
    const featured = getMockFeaturedPosts(1)
    const recent = getMockRecentPosts(9)

    featuredPosts = featured
    recentPosts = recent
    caseStudies = getMockPostsByTag('case-studies', 2)
    perspectivesPosts = getMockPostsByTag('perspectives', 2)
    spotlightPosts = getMockPostsByTag('spotlight', 3)
    processPosts = getMockPostsByTag('process', 3)
    toolsPosts = getMockPostsByTag('tools', 3)

    // Create tags from mock posts
    const tagMap = new Map<string, Tag>()
    mockPosts.forEach(post => {
      post.tags?.forEach(tag => {
        if (!tagMap.has(tag.slug)) {
          tagMap.set(tag.slug, tag)
        }
      })
    })
    allTags = Array.from(tagMap.values())
  } else {
    // Fetch real data from Ghost
    const [fetchedFeatured, fetchedRecent, fetchedCaseStudies, fetchedPerspectives, fetchedSpotlight, fetchedProcess, fetchedTools, fetchedTags] = await Promise.all([
      getFeaturedPosts(1),
      getPosts({ limit: 9 }),
      getPostsByTag('case-studies', 2),
      getPostsByTag('perspectives', 2),
      getPostsByTag('spotlight', 3),
      getPostsByTag('process', 3),
      getPostsByTag('tools', 3),
      getTags(),
    ])

    featuredPosts = normalizePostsResponse(fetchedFeatured)
    recentPosts = normalizePostsResponse(fetchedRecent)
    caseStudies = normalizePostsResponse(fetchedCaseStudies)
    perspectivesPosts = normalizePostsResponse(fetchedPerspectives)
    spotlightPosts = normalizePostsResponse(fetchedSpotlight)
    processPosts = normalizePostsResponse(fetchedProcess)
    toolsPosts = normalizePostsResponse(fetchedTools)
    allTags = normalizeTagsResponse(fetchedTags)
  }

  const featuredPost = featuredPosts[0] as Post | undefined
  const tags = allTags as Tag[]
  
  // Filter out featured post from recent posts
  const filteredRecent = recentPosts
    .filter(post => post.id !== featuredPost?.id)
    .slice(0, 3)

  // Extract colors for sections (with caching)
  const sectionColors = await getAllSectionColors({
    featured: featuredPosts.length > 0 ? featuredPosts : undefined,
    caseStudies: caseStudies.length > 0 ? caseStudies : undefined,
    perspectives: perspectivesPosts.length > 0 ? perspectivesPosts : undefined,
    process: processPosts.length > 0 ? processPosts : undefined,
  })

  return (
    <>
      {/* Hero - Featured Article */}
      {featuredPost && (
        <Hero 
          post={featuredPost} 
          backgroundColor={sectionColors.featured?.backgroundColor}
          textColor={sectionColors.featured?.textColor}
        />
      )}

      {/* Topic Filter */}
      <TopicFilter 
        tags={tags.filter(tag => tag.visibility === 'public').slice(0, 8)} 
      />

      {/* Recent Articles */}
      <section className="mx-auto max-w-content px-6 lg:px-10 py-12">
        <SectionHeader title="Recent" href="/articles" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredRecent.map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      {/* Case Studies - Featured Two Column */}
      {caseStudies.length > 0 && (
        <AnimatedSection
          className="mx-auto max-w-content px-6 lg:px-10 py-12"
          backgroundColor={sectionColors.caseStudies?.backgroundColor}
          textColor={sectionColors.caseStudies?.textColor}
        >
          <SectionHeader title="Case Studies" href="/tag/case-studies" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((post, index) => (
              <ArticleCard key={post.id} post={post} variant="featured" index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Newsletter */}
      <Newsletter />

      {/* Perspectives Section - Horizontal Layout */}
      {perspectivesPosts.length > 0 && (
        <AnimatedSection
          className="mx-auto max-w-content px-6 lg:px-10 py-12"
          backgroundColor={sectionColors.perspectives?.backgroundColor}
          textColor={sectionColors.perspectives?.textColor}
        >
          <SectionHeader title="Perspectives" href="/tag/perspectives" />
          <div className="flex flex-col gap-8">
            {perspectivesPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} variant="horizontal" index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Tools Section - 3 Column Grid */}
      {toolsPosts.length > 0 && (
        <section className="mx-auto max-w-content px-6 lg:px-10 py-12">
          <SectionHeader title="Tools" href="/tag/tools" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {toolsPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Spotlight Section - Portrait Cards */}
      {spotlightPosts.length > 0 && (
        <section className="mx-auto max-w-content px-6 lg:px-10 py-12">
          <SectionHeader 
            title="Spotlight" 
            subtitle="the designers behind AI"
            href="/tag/spotlight" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {spotlightPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} variant="spotlight" index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Process Section - 3 Column Grid */}
      {processPosts.length > 0 && (
        <AnimatedSection
          className="mx-auto max-w-content px-6 lg:px-10 py-12"
          backgroundColor={sectionColors.process?.backgroundColor}
          textColor={sectionColors.process?.textColor}
        >
          <SectionHeader title="Process" href="/tag/process" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {processPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </>
  )
}