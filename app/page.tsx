import { Hero, ArticleCard, Newsletter, TopicFilter, SectionHeader, AnimatedSection, SectionContainer } from '@/components'
import { getHomePageData } from '@/lib/data/homePage'
import type { Post, Tag } from '@/lib/types'

// Revalidate every 60 seconds
export const revalidate = 60

// Set to true to use mock data for development
// Change to false to use real Ghost data
const USE_MOCK_DATA = true

export default async function HomePage() {
  // Fetch all homepage data
  const {
    featuredPosts,
    recentPosts,
    caseStudies,
    spotlightPosts,
    perspectivesPosts,
    processPosts,
    toolsPosts,
    allTags,
    sectionColors,
  } = await getHomePageData(USE_MOCK_DATA)

  const featuredPost = featuredPosts[0] as Post | undefined
  const tags = allTags as Tag[]
  
  // Filter out featured post from recent posts
  const filteredRecent = recentPosts
    .filter(post => post.id !== featuredPost?.id)
    .slice(0, 3)

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
      <section className="w-full" data-section-id="recent">
        <SectionContainer>
          <SectionHeader title="Recent" href="/" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {filteredRecent.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Case Studies - Featured Two Column */}
      {caseStudies.length > 0 && (
        <AnimatedSection
          className=""
          backgroundColor={sectionColors.caseStudies?.backgroundColor}
          textColor={sectionColors.caseStudies?.textColor}
          sectionId="caseStudies"
        >
          <SectionHeader title="Case Studies" href="/tag/case-studies" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-card-gap">
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
          className=""
          backgroundColor={sectionColors.perspectives?.backgroundColor}
          textColor={sectionColors.perspectives?.textColor}
          sectionId="perspectives"
        >
          <SectionHeader title="Perspectives" href="/tag/perspectives" />
          <div className="flex flex-col gap-content-gap">
            {perspectivesPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} variant="horizontal" index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Tools Section - 3 Column Grid */}
      {toolsPosts.length > 0 && (
        <section className="w-full" data-section-id="tools">
          <SectionContainer>
            <SectionHeader title="Tools" href="/tag/tools" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
              {toolsPosts.map((post, index) => (
                <ArticleCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Spotlight Section - Portrait Cards */}
      {spotlightPosts.length > 0 && (
        <section className="w-full" data-section-id="spotlight">
          <SectionContainer>
            <SectionHeader 
              title="Spotlight" 
              subtitle="the designers behind AI"
              href="/tag/spotlight" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
              {spotlightPosts.map((post, index) => (
                <ArticleCard key={post.id} post={post} variant="spotlight" index={index} />
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Process Section - 3 Column Grid */}
      {processPosts.length > 0 && (
        <AnimatedSection
          className=""
          backgroundColor={sectionColors.process?.backgroundColor}
          textColor={sectionColors.process?.textColor}
          sectionId="process"
        >
          <SectionHeader title="Process" href="/tag/process" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {processPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </>
  )
}