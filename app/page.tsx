import Link from 'next/link'
import { Hero, ArticleCard, Newsletter, TopicFilter, SectionHeader, AnimatedSection, SectionContainer, QuoteArticle } from '@/components'
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
        />
      )}

      {/* Topic Filter */}
      <TopicFilter 
        tags={tags.filter(tag => tag.visibility === 'public').slice(0, 8)} 
      />

      {/* Insights Section */}
      <section className="w-full" data-section-id="insights">
        <SectionContainer>
          <SectionHeader title="Insights" href="/" />
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Article - Standard Card */}
            {filteredRecent[0] && (
              <div className="w-full lg:flex-1 lg:max-w-[426px]">
                <ArticleCard key={filteredRecent[0].id} post={filteredRecent[0]} index={0} />
              </div>
            )}
            {/* Right Article - Large Featured Card */}
            {filteredRecent[1] && (
              <div className="w-full lg:w-[901px] lg:flex-shrink-0">
                <ArticleCard key={filteredRecent[1].id} post={filteredRecent[1]} variant="featured-large" index={1} />
              </div>
            )}
          </div>
        </SectionContainer>
      </section>

      {/* Process Section - Dark Theme */}
      {processPosts.length > 0 && (
        <section className="w-full bg-[#1a1a1a]" data-section-id="process">
          <div className="mx-auto max-w-content px-[64px] py-[48px]">
            <div className="flex flex-col gap-[46px]">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-[32px] font-sans font-medium text-white leading-normal">
                  Process
                </h2>
                <Link
                  href="/tag/process"
                  className="text-[14px] font-sans font-semibold text-white hover:opacity-70 transition-opacity flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg 
                    className="w-6 h-6 rotate-90" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 15l7-7 7 7" 
                    />
                  </svg>
                </Link>
              </div>
              
              {/* Articles Container - 3 Column Layout */}
              <div className="flex flex-col lg:flex-row gap-[48px] items-start">
                {/* First Article - Flexible Width (Large Card with Video) */}
                {processPosts[0] && (
                  <div className="w-full lg:flex-1 lg:min-w-0 lg:basis-0 lg:grow">
                    <ArticleCard key={processPosts[0].id} post={processPosts[0]} variant="dark" index={0} />
                  </div>
                )}
                {/* Second Article - Fixed Width */}
                {processPosts[1] && (
                  <div className="w-full lg:w-[309px] lg:max-w-[426.67px] lg:shrink-0">
                    <ArticleCard key={processPosts[1].id} post={processPosts[1]} variant="dark" index={1} />
                  </div>
                )}
                {/* Third Article - Fixed Width */}
                {processPosts[2] && (
                  <div className="w-full lg:w-[309px] lg:max-w-[426.67px] lg:shrink-0">
                    <ArticleCard key={processPosts[2].id} post={processPosts[2]} variant="dark" index={2} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Quote Article */}
      <QuoteArticle
        label="Gen AI Tool Study"
        quote="The AI tools do a great job of creating a baseline, but it struggled to solve novel challenges."
        attribution="Rose Todaro, Visual Designer, Builder.io"
        href="/post/gen-ai-tool-study"
      />

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

    </>
  )
}