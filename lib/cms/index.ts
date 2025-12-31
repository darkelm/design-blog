/**
 * CMS Provider Factory and Exports
 * 
 * This module provides:
 * - Factory function to get the active CMS provider
 * - Re-exports of all CMS convenience functions
 * - Single point of CMS initialization
 */

import type { CMSProvider } from './types'
import { GhostCMSProvider } from './providers/ghost'

let cmsProvider: CMSProvider | null = null

/**
 * Get the active CMS provider instance
 * 
 * Provider is selected based on CMS_PROVIDER environment variable.
 * Defaults to 'ghost' if not specified.
 * 
 * @returns CMSProvider instance
 */
export function getCMSProvider(): CMSProvider {
  if (cmsProvider) {
    return cmsProvider
  }

  const providerType = process.env.CMS_PROVIDER || 'ghost'
  
  switch (providerType) {
    case 'ghost':
      cmsProvider = new GhostCMSProvider()
      break
    case 'mock':
      // Could add mock provider later if needed
      throw new Error('Mock CMS provider not yet implemented. Use mockData.ts instead.')
    default:
      throw new Error(
        `Unknown CMS provider: ${providerType}. ` +
        `Supported providers: ghost. ` +
        `Set CMS_PROVIDER environment variable.`
      )
  }
  
  return cmsProvider
}

// Re-export all CMS convenience functions
export {
  getPosts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByTag,
  getPostsByAuthor,
  searchPosts,
  getTags,
  getTagBySlug,
  getAuthors,
  getAuthorBySlug,
  getPages,
  getPageBySlug,
  getSettings,
} from './functions'

// Re-export types for convenience
export type { CMSProvider, GetPostsOptions } from './types'

