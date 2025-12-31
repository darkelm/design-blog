/**
 * CMS Convenience Functions
 * 
 * Thin wrapper functions that delegate to the active CMS provider.
 * These provide familiar function names that application code already uses,
 * making migration seamless while maintaining the abstraction.
 * 
 * When USE_MOCK_DATA is true, these functions use mock data instead of the CMS provider.
 */

import { getCMSProvider } from './index'
import type { GetPostsOptions } from './types'
import { USE_MOCK_DATA } from '../constants'
import {
  mockPosts,
  getMockRecentPosts,
  getMockFeaturedPosts,
  getMockPostsByTag,
  getMockPostBySlug,
  getMockTags,
  getMockTagBySlug,
  getMockAuthors,
  getMockAuthorBySlug,
  getMockPostsByAuthor,
  getMockPostsBySearch,
} from '../mockData'
import type { Post, Tag, Author } from '../types'
import { NotFoundError } from '../errors'

/**
 * Get posts with optional filtering and pagination
 */
export async function getPosts(options?: GetPostsOptions): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    // Use mock data
    let posts = [...mockPosts]
    
    // Apply filtering if specified
    if (options?.filter) {
      // Simple filter support for mock data
      // For more complex filtering, would need to parse Ghost filter syntax
      const filter = options.filter.toLowerCase()
      if (filter.includes('featured:true')) {
        posts = posts.filter(p => p.featured)
      }
      if (filter.includes('tag:')) {
        const tagMatch = filter.match(/tag:([a-z-]+)/)
        if (tagMatch) {
          const tagSlug = tagMatch[1]
          posts = posts.filter(p => p.tags?.some(t => t.slug === tagSlug))
        }
      }
    }
    
    // Apply pagination
    const limit = options?.limit || 10
    const page = options?.page || 1
    const start = (page - 1) * limit
    const end = start + limit
    
    // Sort by published date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.published_at || 0).getTime()
      const dateB = new Date(b.published_at || 0).getTime()
      return dateB - dateA
    })
    
    return posts.slice(start, end)
  }
  
  const provider = getCMSProvider()
  return provider.getPosts(options)
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  if (USE_MOCK_DATA) {
    const post = getMockPostBySlug(slug)
    if (!post) {
      throw new NotFoundError(`Post: ${slug}`)
    }
    return post
  }
  
  const provider = getCMSProvider()
  return provider.getPostBySlug(slug)
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit = 1): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return getMockFeaturedPosts(limit)
  }
  
  const provider = getCMSProvider()
  return provider.getFeaturedPosts(limit)
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(slug: string, limit = 10): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return getMockPostsByTag(slug, limit)
  }
  
  const provider = getCMSProvider()
  return provider.getPostsByTag(slug, limit)
}

/**
 * Get posts filtered by author
 */
export async function getPostsByAuthor(slug: string, limit = 10): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return getMockPostsByAuthor(slug, limit)
  }
  
  const provider = getCMSProvider()
  return provider.getPostsByAuthor(slug, limit)
}

/**
 * Search posts
 */
export async function searchPosts(query: string, limit = 20): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return getMockPostsBySearch(query, limit)
  }
  
  const provider = getCMSProvider()
  return provider.searchPosts(query, limit)
}

/**
 * Get all tags
 */
export async function getTags(): Promise<Tag[]> {
  if (USE_MOCK_DATA) {
    return getMockTags()
  }
  
  const provider = getCMSProvider()
  return provider.getTags()
}

/**
 * Get a single tag by slug
 */
export async function getTagBySlug(slug: string): Promise<Tag> {
  if (USE_MOCK_DATA) {
    const tag = getMockTagBySlug(slug)
    if (!tag) {
      throw new NotFoundError(`Tag: ${slug}`)
    }
    return tag
  }
  
  const provider = getCMSProvider()
  return provider.getTagBySlug(slug)
}

/**
 * Get all authors
 */
export async function getAuthors(): Promise<Author[]> {
  if (USE_MOCK_DATA) {
    return getMockAuthors()
  }
  
  const provider = getCMSProvider()
  return provider.getAuthors()
}

/**
 * Get a single author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author> {
  if (USE_MOCK_DATA) {
    const author = getMockAuthorBySlug(slug)
    if (!author) {
      throw new NotFoundError(`Author: ${slug}`)
    }
    return author
  }
  
  const provider = getCMSProvider()
  return provider.getAuthorBySlug(slug)
}

/**
 * Get all pages
 */
export async function getPages() {
  const provider = getCMSProvider()
  return provider.getPages()
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string) {
  const provider = getCMSProvider()
  return provider.getPageBySlug(slug)
}

/**
 * Get CMS settings
 */
export async function getSettings() {
  const provider = getCMSProvider()
  return provider.getSettings()
}

