/**
 * Get Section Colors
 * 
 * Main utility to get colors for sections, with caching and automatic extraction
 */

import type { Post } from './types'
import { loadColorCache, getCachedColors, updateSectionCache, getPostIds } from './colorCache'
import { extractColorFromUrl, type ExtractedColors } from './colorExtraction'

export type SectionKey = 'featured' | 'caseStudies' | 'perspectives' | 'process'

/**
 * Check if a URL is a video file
 */
function isVideoFile(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']
  const lowerUrl = url.toLowerCase()
  return videoExtensions.some(ext => lowerUrl.endsWith(ext))
}

/**
 * Get the image URL from the first post in a section
 * Skips video files and looks for the first image in the posts
 */
function getSectionImageUrl(posts: Post[]): string | null {
  if (posts.length === 0) {
    return null
  }

  // Find the first post with a non-video feature_image
  for (const post of posts) {
    if (post.feature_image && !isVideoFile(post.feature_image)) {
      return post.feature_image
    }
  }

  return null
}

/**
 * Get colors for a section, using cache if available
 */
export async function getSectionColors(
  section: SectionKey,
  posts: Post[]
): Promise<ExtractedColors | null> {
  if (posts.length === 0) {
    return null
  }

  const postIds = getPostIds(posts)
  const cache = await loadColorCache()

  // Check if we have cached colors for this content
  const cachedColors = getCachedColors(cache, section, postIds)
  if (cachedColors) {
    return cachedColors
  }

  // Need to extract colors
  const imageUrl = getSectionImageUrl(posts)
  if (!imageUrl) {
    return null
  }

  // Extract color from image
  const extractedColors = await extractColorFromUrl(imageUrl)
  if (!extractedColors) {
    return null
  }

  // Cache the extracted colors
  await updateSectionCache(section, postIds, extractedColors)

  return extractedColors
}

/**
 * Get colors for multiple sections in parallel
 */
export async function getAllSectionColors(
  sections: {
    featured?: Post[]
    caseStudies?: Post[]
    perspectives?: Post[]
    process?: Post[]
  }
): Promise<{
  featured?: ExtractedColors | null
  caseStudies?: ExtractedColors | null
  perspectives?: ExtractedColors | null
  process?: ExtractedColors | null
}> {
  const promises: Array<Promise<[SectionKey, ExtractedColors | null]>> = []

  if (sections.featured) {
    promises.push(
      getSectionColors('featured', sections.featured).then((colors) => [
        'featured' as SectionKey,
        colors,
      ])
    )
  }

  if (sections.caseStudies) {
    promises.push(
      getSectionColors('caseStudies', sections.caseStudies).then((colors) => [
        'caseStudies' as SectionKey,
        colors,
      ])
    )
  }

  if (sections.perspectives) {
    promises.push(
      getSectionColors('perspectives', sections.perspectives).then((colors) => [
        'perspectives' as SectionKey,
        colors,
      ])
    )
  }

  if (sections.process) {
    promises.push(
      getSectionColors('process', sections.process).then((colors) => [
        'process' as SectionKey,
        colors,
      ])
    )
  }

  const results = await Promise.all(promises)

  const colors: {
    featured?: ExtractedColors | null
    caseStudies?: ExtractedColors | null
    perspectives?: ExtractedColors | null
    process?: ExtractedColors | null
  } = {}

  results.forEach(([section, color]) => {
    colors[section] = color
  })

  return colors
}








