/**
 * Color Cache Management
 * 
 * Manages persistent color cache to avoid re-extracting colors
 * when content hasn't changed
 */

import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import type { ExtractedColors } from './colorExtraction'
import { logger } from './utils/logger'

export interface SectionColorCache {
  postIds: string[]
  colors: ExtractedColors
  lastUpdated: string
}

export interface ColorCache {
  featured?: SectionColorCache
  caseStudies?: SectionColorCache
  perspectives?: SectionColorCache
  process?: SectionColorCache
}

const CACHE_FILE_PATH = path.join(process.cwd(), 'lib', 'colorCache.json')

/**
 * Load color cache from file
 */
export async function loadColorCache(): Promise<ColorCache> {
  try {
    if (!existsSync(CACHE_FILE_PATH)) {
      return {}
    }

    const fileContent = await readFile(CACHE_FILE_PATH, 'utf-8')
    return JSON.parse(fileContent) as ColorCache
  } catch (error) {
    logger.warn('Failed to load color cache:', error)
    return {}
  }
}

/**
 * Save color cache to file
 */
export async function saveColorCache(cache: ColorCache): Promise<void> {
  try {
    const dir = path.dirname(CACHE_FILE_PATH)
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }

    await writeFile(CACHE_FILE_PATH, JSON.stringify(cache, null, 2), 'utf-8')
  } catch (error) {
    logger.error('Failed to save color cache:', error)
  }
}

/**
 * Check if post IDs match cached IDs for a section
 */
export function hasContentChanged(
  cached: SectionColorCache | undefined,
  currentPostIds: string[]
): boolean {
  if (!cached) {
    return true // No cache, content has "changed" (needs extraction)
  }

  // Compare arrays
  if (cached.postIds.length !== currentPostIds.length) {
    return true
  }

  const sortedCached = [...cached.postIds].sort()
  const sortedCurrent = [...currentPostIds].sort()

  return !sortedCached.every((id, index) => id === sortedCurrent[index])
}

/**
 * Get cached colors for a section if content hasn't changed
 */
export function getCachedColors(
  cache: ColorCache,
  section: keyof ColorCache,
  currentPostIds: string[]
): ExtractedColors | null {
  const cached = cache[section]
  
  if (!cached) {
    return null
  }

  if (hasContentChanged(cached, currentPostIds)) {
    return null // Content changed, need to re-extract
  }

  return cached.colors
}

/**
 * Update cache for a section
 */
export async function updateSectionCache(
  section: keyof ColorCache,
  postIds: string[],
  colors: ExtractedColors
): Promise<void> {
  const cache = await loadColorCache()
  
  cache[section] = {
    postIds,
    colors,
    lastUpdated: new Date().toISOString(),
  }

  await saveColorCache(cache)
}

/**
 * Get post IDs from posts array
 */
export function getPostIds(posts: Array<{ id: string }>): string[] {
  return posts.map((post) => post.id).sort()
}

