import GhostContentAPI from '@tryghost/content-api'

// Initialize Ghost Content API
// Replace with your Ghost credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'https://your-ghost-site.com',
  key: process.env.GHOST_CONTENT_API_KEY || 'your-content-api-key',
  version: 'v5.0',
})

// ============================================
// POSTS
// ============================================

export async function getPosts(options?: {
  limit?: number
  page?: number
  filter?: string
  include?: string[]
}) {
  return await api.posts.browse({
    limit: options?.limit || 10,
    page: options?.page || 1,
    filter: options?.filter,
    include: options?.include || ['tags', 'authors'],
  })
}

export async function getFeaturedPosts(limit = 1) {
  return await api.posts.browse({
    limit,
    filter: 'featured:true',
    include: ['tags', 'authors'],
  })
}

export async function getPostsByTag(slug: string, limit = 10) {
  return await api.posts.browse({
    limit,
    filter: `tag:${slug}`,
    include: ['tags', 'authors'],
  })
}

export async function getPostBySlug(slug: string) {
  return await api.posts.read(
    { slug },
    { include: ['tags', 'authors'] }
  )
}

export async function getPostsByAuthor(slug: string, limit = 10) {
  return await api.posts.browse({
    limit,
    filter: `author:${slug}`,
    include: ['tags', 'authors'],
  })
}

// ============================================
// TAGS
// ============================================

export async function getTags() {
  return await api.tags.browse({
    limit: 'all',
    include: ['count.posts'],
  })
}

export async function getTagBySlug(slug: string) {
  return await api.tags.read({ slug })
}

// ============================================
// AUTHORS
// ============================================

export async function getAuthors() {
  return await api.authors.browse({
    limit: 'all',
    include: ['count.posts'],
  })
}

export async function getAuthorBySlug(slug: string) {
  return await api.authors.read(
    { slug },
    { include: ['count.posts'] }
  )
}

// ============================================
// PAGES
// ============================================

export async function getPages() {
  return await api.pages.browse({ limit: 'all' })
}

export async function getPageBySlug(slug: string) {
  return await api.pages.read({ slug })
}

// ============================================
// SETTINGS
// ============================================

export async function getSettings() {
  return await api.settings.browse()
}
