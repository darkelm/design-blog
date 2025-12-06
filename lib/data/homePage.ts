/**
 * Home Page Data Fetching
 * 
 * Centralized data fetching logic for the homepage
 * 
 * Separation of Concerns:
 * - Data fetching orchestration
 * - Mock/real data switching
 * - Error handling
 */

import {
  getPosts,
  getFeaturedPosts,
  getPostsByTag,
  getTags,
} from '../ghost'
import {
  getMockFeaturedPosts,
  getMockRecentPosts,
  getMockPostsByTag,
  getMockTags,
  mockPosts,
} from '../mockData'
import { getAllSectionColors } from '../getSectionColors'
import type { Post, Tag } from '../types'
import { logger } from '../utils/logger'

export interface HomePageData {
  featuredPosts: Post[]
  recentPosts: Post[]
  caseStudies: Post[]
  spotlightPosts: Post[]
  perspectivesPosts: Post[]
  processPosts: Post[]
  toolsPosts: Post[]
  allTags: Tag[]
  sectionColors: {
    featured?: { backgroundColor: string; textColor: string } | null
    caseStudies?: { backgroundColor: string; textColor: string } | null
    perspectives?: { backgroundColor: string; textColor: string } | null
    process?: { backgroundColor: string; textColor: string } | null
  }
}

/**
 * Fetch all data needed for the homepage
 */
export async function getHomePageData(useMockData = false): Promise<HomePageData> {
  let featuredPosts: Post[] = []
  let recentPosts: Post[] = []
  let caseStudies: Post[] = []
  let spotlightPosts: Post[] = []
  let perspectivesPosts: Post[] = []
  let processPosts: Post[] = []
  let toolsPosts: Post[] = []
  let allTags: Tag[] = []

  if (useMockData) {
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
    try {
      const [
        fetchedFeatured,
        fetchedRecent,
        fetchedCaseStudies,
        fetchedPerspectives,
        fetchedSpotlight,
        fetchedProcess,
        fetchedTools,
        fetchedTags,
      ] = await Promise.all([
        getFeaturedPosts(1),
        getPosts({ limit: 9 }),
        getPostsByTag('case-studies', 2),
        getPostsByTag('perspectives', 2),
        getPostsByTag('spotlight', 3),
        getPostsByTag('process', 3),
        getPostsByTag('tools', 3),
        getTags(),
      ])

      featuredPosts = fetchedFeatured
      recentPosts = fetchedRecent
      caseStudies = fetchedCaseStudies
      perspectivesPosts = fetchedPerspectives
      spotlightPosts = fetchedSpotlight
      processPosts = fetchedProcess
      toolsPosts = fetchedTools
      allTags = fetchedTags
    } catch (error) {
      // Log error but don't throw - return empty arrays
      // Pages can handle empty states gracefully
      logger.error('Failed to fetch homepage data:', error)
      // Return empty arrays to allow page to render with empty states
    }
  }

  // Extract colors for sections (with caching)
  const sectionColors = await getAllSectionColors({
    featured: featuredPosts.length > 0 ? featuredPosts : undefined,
    caseStudies: caseStudies.length > 0 ? caseStudies : undefined,
    perspectives: perspectivesPosts.length > 0 ? perspectivesPosts : undefined,
    process: processPosts.length > 0 ? processPosts : undefined,
  })

  return {
    featuredPosts,
    recentPosts,
    caseStudies,
    spotlightPosts,
    perspectivesPosts,
    processPosts,
    toolsPosts,
    allTags,
    sectionColors,
  }
}

