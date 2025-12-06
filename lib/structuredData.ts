import type { Post, Author, Tag } from '@/lib/types'

/**
 * Structured Data (JSON-LD) Utilities
 * 
 * Generates schema.org structured data for SEO and rich snippets.
 * Helps search engines understand content better.
 * 
 * Separation of Concerns:
 * - SEO: This utility
 * - Data: Passed as props
 * - Rendering: Added to page metadata
 */

export interface ArticleStructuredData {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string[]
  datePublished: string
  dateModified: string
  author: {
    '@type': string
    name: string
    url?: string
  }[]
  publisher: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
}

/**
 * Generate Article structured data
 * 
 * @param post - Post data
 * @param authors - Author data
 * @param baseUrl - Site base URL
 * @returns JSON-LD structured data object
 */
export function generateArticleStructuredData(
  post: Post,
  authors: Author[],
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
): ArticleStructuredData {
  const postUrl = `${baseUrl}/post/${post.slug}`
  const images = post.feature_image ? [post.feature_image] : []

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.meta_description || '',
    image: images.length > 0 ? images : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: authors.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: author.website || `${baseUrl}/author/${author.slug}`,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Design Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`, // Update with your logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }
}

export interface OrganizationStructuredData {
  '@context': string
  '@type': string
  name: string
  url: string
  logo?: string
  sameAs?: string[]
}

/**
 * Generate Organization structured data
 * 
 * @param baseUrl - Site base URL
 * @param socialLinks - Social media URLs
 * @returns JSON-LD structured data object
 */
export function generateOrganizationStructuredData(
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
  socialLinks?: string[]
): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Design Blog',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`, // Update with your logo URL
    sameAs: socialLinks || [],
  }
}

export interface BreadcrumbStructuredData {
  '@context': string
  '@type': string
  itemListElement: {
    '@type': string
    position: number
    name: string
    item: string
  }[]
}

/**
 * Generate Breadcrumb structured data
 * 
 * @param items - Breadcrumb items (label, url pairs)
 * @param baseUrl - Site base URL
 * @returns JSON-LD structured data object
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ label: string; url: string }>,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
): BreadcrumbStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}

