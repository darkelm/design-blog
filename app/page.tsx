import { Hero, ArticleGrid, Newsletter, TopicFilter, SectionHeader, Section } from '@/components'
import { getPosts, getFeaturedPosts, getPostsByTag, getTags } from '@/lib/ghost'
import { 
  getMockFeaturedPosts, 
  getMockRecentPosts, 
  getMockPostsByTag,
  mockPosts 
} from '@/lib/mockData'
import type { Post, Tag } from '@/lib/types'

// Revalidate every 60 seconds
export const revalidate = 60

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true // Set to false to use real Ghost data

export default async function HomePage() {
  let featuredPosts: Post[] = []
  let recentPosts: Post[] = []
  let caseStudies: Post[] = []
  let interviews: Post[] = []
  let processPosts: Post[] = []
  let researchPosts: Post[] = []
  let toolsPosts: Post[] = []
  let allTags: Tag[] = []

  if (USE_MOCK_DATA) {
    // Use mock data
    const featured = getMockFeaturedPosts(1)
    const recent = getMockRecentPosts(9)
    
    featuredPosts = featured
    recentPosts = recent
    caseStudies = getMockPostsByTag('case-studies', 2)
    interviews = getMockPostsByTag('interviews', 2)
    processPosts = getMockPostsByTag('process', 3)
    researchPosts = getMockPostsByTag('research', 3)
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
    const [fetchedFeatured, fetchedRecent, fetchedCaseStudies, fetchedInterviews, fetchedProcess, fetchedResearch, fetchedTools, fetchedTags] = await Promise.all([
      getFeaturedPosts(1),
      getPosts({ limit: 9 }),
      getPostsByTag('case-studies', 2),
      getPostsByTag('interviews', 2),
      getPostsByTag('process', 3),
      getPostsByTag('research', 3),
      getPostsByTag('tools', 3),
      getTags(),
    ])
    
    featuredPosts = fetchedFeatured as Post[]
    recentPosts = fetchedRecent as Post[]
    caseStudies = fetchedCaseStudies as Post[]
    interviews = fetchedInterviews as Post[]
    processPosts = fetchedProcess as Post[]
    researchPosts = fetchedResearch as Post[]
    toolsPosts = fetchedTools as Post[]
    allTags = fetchedTags as Tag[]
  }

  const featuredPost = featuredPosts[0] as Post | undefined
  const tags = allTags as Tag[]
  
  // Filter out featured post from recent posts
  const filteredRecent = recentPosts
    .filter(post => post.id !== featuredPost?.id)
    .slice(0, 6)

  return (
    <>
      {/* Hero - Featured Article (Full Width, Prominent) */}
      {featuredPost && (
        <section className="bg-section-dark border-b border-section-border">
          <Hero post={featuredPost} />
        </section>
      )}

      {/* Topic Filter */}
      <section className="bg-section-light border-b border-section-border">
        <TopicFilter 
          tags={tags.filter(tag => tag.visibility === 'public').slice(0, 8)} 
        />
      </section>

      {/* Recent Articles - 3 Column Grid */}
      <Section variant="light" withBorder={false}>
        <SectionHeader title="Recent" href="/articles" />
        <ArticleGrid 
          posts={filteredRecent} 
          variant="default" 
          columns={3}
          emptyMessage="No recent articles yet."
        />
      </Section>

      {/* Case Studies - Featured Two Column */}
      <Section variant="dark">
        <SectionHeader title="Case Studies" href="/tag/case-studies" />
        <ArticleGrid 
          posts={caseStudies as Post[]} 
          variant="featured"
          emptyMessage="No case studies yet."
        />
      </Section>

      {/* Process Section - 3 Column Grid */}
      {(processPosts as Post[]).length > 0 && (
        <Section variant="light">
          <SectionHeader title="Process" href="/tag/process" />
          <ArticleGrid 
            posts={processPosts as Post[]} 
            variant="default" 
            columns={3}
          />
        </Section>
      )}

      {/* Research Section - 3 Column Grid */}
      {(researchPosts as Post[]).length > 0 && (
        <Section variant="dark">
          <SectionHeader title="Research" href="/tag/research" />
          <ArticleGrid 
            posts={researchPosts as Post[]} 
            variant="default" 
            columns={3}
          />
        </Section>
      )}

      {/* Newsletter - Middle Placement */}
      <Newsletter />

      {/* Tools Section - 3 Column Grid */}
      {(toolsPosts as Post[]).length > 0 && (
        <Section variant="light">
          <SectionHeader title="Tools" href="/tag/tools" />
          <ArticleGrid 
            posts={toolsPosts as Post[]} 
            variant="default" 
            columns={3}
          />
        </Section>
      )}

      {/* Interviews - Horizontal Layout */}
      <Section variant="dark">
        <SectionHeader title="Interviews" href="/tag/interviews" />
        <ArticleGrid 
          posts={interviews as Post[]} 
          variant="horizontal"
          emptyMessage="No interviews yet."
        />
      </Section>
    </>
  )
}
