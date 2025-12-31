/**
 * CMS Provider Interface
 * 
 * This interface defines the contract that all CMS providers must implement.
 * It ensures that different CMS systems (Ghost, Contentful, Strapi, etc.)
 * can be swapped without changing application code.
 */

import type { Post, Tag, Author, Page, Settings } from '../types'

/**
 * Options for fetching posts
 */
export interface GetPostsOptions {
  limit?: number
  page?: number
  filter?: string
  include?: string[]
}

/**
 * CMS Provider Interface
 * 
 * All CMS implementations must implement this interface to be compatible
 * with the application.
 */
export interface CMSProvider {
  // Posts
  getPosts(options?: GetPostsOptions): Promise<Post[]>
  getPostBySlug(slug: string): Promise<Post>
  getFeaturedPosts(limit?: number): Promise<Post[]>
  getPostsByTag(slug: string, limit?: number): Promise<Post[]>
  getPostsByAuthor(slug: string, limit?: number): Promise<Post[]>
  searchPosts(query: string, limit?: number): Promise<Post[]>
  
  // Tags
  getTags(): Promise<Tag[]>
  getTagBySlug(slug: string): Promise<Tag>
  
  // Authors
  getAuthors(): Promise<Author[]>
  getAuthorBySlug(slug: string): Promise<Author>
  
  // Pages
  getPages(): Promise<Page[]>
  getPageBySlug(slug: string): Promise<Page>
  
  // Settings
  getSettings(): Promise<Settings>
}

