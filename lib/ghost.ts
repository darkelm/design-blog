import GhostContentAPI from '@tryghost/content-api'
import { GhostAPIError, ContentFetchError, NotFoundError } from './errors'
import type { Post, Tag, Author, Page, Settings, PostsResponse } from './types'

// Initialize Ghost Content API
const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'https://your-ghost-site.com',
  key: process.env.GHOST_CONTENT_API_KEY || 'your-content-api-key',
  version: 'v5.0',
})

/**
 * Type guards for API responses
 */
function isPostArray(response: unknown): response is Post[] {
  return Array.isArray(response) && response.every(isPost)
}

function isPost(response: unknown): response is Post {
  return (
    typeof response === 'object' &&
    response !== null &&
    'id' in response &&
    'slug' in response &&
    'title' in response
  )
}

function isPostsResponse(response: unknown): response is PostsResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'posts' in response &&
    Array.isArray((response as PostsResponse).posts)
  )
}

function isTagArray(response: unknown): response is Tag[] {
  return Array.isArray(response) && response.every(isTag)
}

function isTag(response: unknown): response is Tag {
  return (
    typeof response === 'object' &&
    response !== null &&
    'id' in response &&
    'slug' in response &&
    'name' in response
  )
}

function isAuthorArray(response: unknown): response is Author[] {
  return Array.isArray(response) && response.every(isAuthor)
}

function isAuthor(response: unknown): response is Author {
  return (
    typeof response === 'object' &&
    response !== null &&
    'id' in response &&
    'slug' in response &&
    'name' in response
  )
}

/**
 * Normalize Ghost API responses to arrays
 */
function normalizePostsResponse(response: unknown): Post[] {
  if (isPostArray(response)) {
    return response
  }
  if (isPostsResponse(response)) {
    return response.posts
  }
  throw new ContentFetchError('Invalid posts response format')
}

function normalizeTagsResponse(response: unknown): Tag[] {
  if (isTagArray(response)) {
    return response
  }
  if (typeof response === 'object' && response !== null && 'tags' in response) {
    const tagsResponse = response as { tags: unknown }
    if (isTagArray(tagsResponse.tags)) {
      return tagsResponse.tags
    }
  }
  throw new ContentFetchError('Invalid tags response format')
}

function normalizeAuthorsResponse(response: unknown): Author[] {
  if (isAuthorArray(response)) {
    return response
  }
  if (typeof response === 'object' && response !== null && 'authors' in response) {
    const authorsResponse = response as { authors: unknown }
    if (isAuthorArray(authorsResponse.authors)) {
      return authorsResponse.authors
    }
  }
  throw new ContentFetchError('Invalid authors response format')
}

// ============================================
// POSTS
// ============================================

export async function getPosts(options?: {
  limit?: number
  page?: number
  filter?: string
  include?: string[]
}): Promise<Post[]> {
  try {
    const response = await api.posts.browse({
      limit: options?.limit || 10,
      page: options?.page || 1,
      filter: options?.filter,
      include: options?.include || ['tags', 'authors'],
    })
    return normalizePostsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch posts: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch posts', error)
  }
}

export async function getFeaturedPosts(limit = 1): Promise<Post[]> {
  try {
    const response = await api.posts.browse({
      limit,
      filter: 'featured:true',
      include: ['tags', 'authors'],
    })
    return normalizePostsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch featured posts: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch featured posts', error)
  }
}

export async function getPostsByTag(slug: string, limit = 10): Promise<Post[]> {
  try {
    const response = await api.posts.browse({
      limit,
      filter: `tag:${slug}`,
      include: ['tags', 'authors'],
    })
    return normalizePostsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Tag: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch posts by tag: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch posts by tag: ${slug}`, error)
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    )
    if (!isPost(post)) {
      throw new NotFoundError(`Post: ${slug}`)
    }
    return post
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Post: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch post: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch post: ${slug}`, error)
  }
}

export async function getPostsByAuthor(slug: string, limit = 10): Promise<Post[]> {
  try {
    const response = await api.posts.browse({
      limit,
      filter: `author:${slug}`,
      include: ['tags', 'authors'],
    })
    return normalizePostsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Author: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch posts by author: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch posts by author: ${slug}`, error)
  }
}

// ============================================
// TAGS
// ============================================

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await api.tags.browse({
      limit: 'all',
      include: ['count.posts'],
    })
    return normalizeTagsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch tags: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch tags', error)
  }
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  try {
    const tag = await api.tags.read({ slug })
    if (!isTag(tag)) {
      throw new NotFoundError(`Tag: ${slug}`)
    }
    return tag
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Tag: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch tag: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch tag: ${slug}`, error)
  }
}

// ============================================
// AUTHORS
// ============================================

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await api.authors.browse({
      limit: 'all',
      include: ['count.posts'],
    })
    return normalizeAuthorsResponse(response)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch authors: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch authors', error)
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  try {
    const author = await api.authors.read(
      { slug },
      { include: ['count.posts'] }
    )
    if (!isAuthor(author)) {
      throw new NotFoundError(`Author: ${slug}`)
    }
    return author
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Author: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch author: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch author: ${slug}`, error)
  }
}

// ============================================
// PAGES
// ============================================

export async function getPages(): Promise<Page[]> {
  try {
    const response = await api.pages.browse({ limit: 'all' })
    if (Array.isArray(response)) {
      return response as Page[]
    }
    throw new ContentFetchError('Invalid pages response format')
  } catch (error) {
    if (error instanceof ContentFetchError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch pages: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch pages', error)
  }
}

export async function getPageBySlug(slug: string): Promise<Page> {
  try {
    const page = await api.pages.read({ slug })
    if (
      typeof page === 'object' &&
      page !== null &&
      'id' in page &&
      'slug' in page &&
      'title' in page
    ) {
      return page as Page
    }
    throw new NotFoundError(`Page: ${slug}`)
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 404) {
        throw new NotFoundError(`Page: ${slug}`)
      }
      throw new GhostAPIError(
        `Failed to fetch page: ${error.message}`,
        statusCode,
        error
      )
    }
    throw new ContentFetchError(`Failed to fetch page: ${slug}`, error)
  }
}

// ============================================
// SETTINGS
// ============================================

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await api.settings.browse()
    if (
      typeof settings === 'object' &&
      settings !== null &&
      'title' in settings &&
      'description' in settings
    ) {
      return settings as Settings
    }
    throw new ContentFetchError('Invalid settings response format')
  } catch (error) {
    if (error instanceof ContentFetchError) {
      throw error
    }
    if (error instanceof Error && 'statusCode' in error) {
      throw new GhostAPIError(
        `Failed to fetch settings: ${error.message}`,
        error.statusCode as number,
        error
      )
    }
    throw new ContentFetchError('Failed to fetch settings', error)
  }
}
