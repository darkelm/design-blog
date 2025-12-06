import type { ComponentType } from 'react'
import type { Post, Author } from '@/lib/types'
import {
  ArticleHeader,
  ArticleFeatureImage,
  ArticleContent,
  ArticleCreditsSection,
  NextUpSection,
} from '@/components/article'

/**
 * Article Layout System
 * 
 * Modular, scalable system for different article layout variants.
 * Allows easy addition of new layouts while maintaining consistency.
 * 
 * Architecture:
 * - Layout functions return React components in order
 * - Each layout can customize component props
 * - Easy to add new variants without touching existing code
 */

export type ArticleLayoutVariant = 'default' | 'minimal' | 'featured' | 'interview'

export interface ArticleLayoutProps {
  post: Post
  authors: Author[]
  relatedPosts: Post[]
}

export interface ArticleLayoutComponent {
  component: ComponentType<any>
  props: Record<string, any>
  key: string
}

/**
 * Default Article Layout
 * Spotify Design-inspired layout with credits, image, content, credits section, and next up
 */
export function getDefaultLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: true },
      key: 'header',
    },
    {
      component: ArticleFeatureImage,
      props: { post, aspectRatio: '2/1' as const },
      key: 'feature-image',
    },
    {
      component: ArticleContent,
      props: { post },
      key: 'content',
    },
    {
      component: ArticleCreditsSection,
      props: { authors, title: 'Credits' },
      key: 'credits',
    },
    {
      component: NextUpSection,
      props: { posts: relatedPosts, title: 'Next up', showImage: true },
      key: 'next-up',
    },
  ]
}

/**
 * Minimal Article Layout
 * Simplified layout without credits section, just header, content, and next up
 */
export function getMinimalLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: false },
      key: 'header',
    },
    {
      component: ArticleFeatureImage,
      props: { post, aspectRatio: '16/9' as const },
      key: 'feature-image',
    },
    {
      component: ArticleContent,
      props: { post },
      key: 'content',
    },
    {
      component: NextUpSection,
      props: { posts: relatedPosts, title: 'Related articles', showImage: false },
      key: 'next-up',
    },
  ]
}

/**
 * Featured Article Layout
 * Enhanced layout with larger image and prominent credits
 */
export function getFeaturedLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: true },
      key: 'header',
    },
    {
      component: ArticleFeatureImage,
      props: { post, aspectRatio: '16/9' as const },
      key: 'feature-image',
    },
    {
      component: ArticleContent,
      props: { post },
      key: 'content',
    },
    {
      component: ArticleCreditsSection,
      props: { authors, title: 'About the authors' },
      key: 'credits',
    },
    {
      component: NextUpSection,
      props: { posts: relatedPosts, title: 'Continue reading', showImage: true },
      key: 'next-up',
    },
  ]
}

/**
 * Interview Article Layout
 * Layout optimized for interview-style content
 */
export function getInterviewLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: true },
      key: 'header',
    },
    {
      component: ArticleFeatureImage,
      props: { post, aspectRatio: '1/1' as const },
      key: 'feature-image',
    },
    {
      component: ArticleContent,
      props: { post },
      key: 'content',
    },
    {
      component: ArticleCreditsSection,
      props: { authors, title: 'Interview participants' },
      key: 'credits',
    },
    {
      component: NextUpSection,
      props: { posts: relatedPosts, title: 'More interviews', showImage: true },
      key: 'next-up',
    },
  ]
}

/**
 * Layout Registry
 * Maps layout variants to their respective layout functions
 */
const layoutRegistry: Record<ArticleLayoutVariant, (props: ArticleLayoutProps) => ArticleLayoutComponent[]> = {
  default: getDefaultLayout,
  minimal: getMinimalLayout,
  featured: getFeaturedLayout,
  interview: getInterviewLayout,
}

/**
 * Get Article Layout
 * 
 * Returns the appropriate layout components for a given variant.
 * Falls back to 'default' if variant doesn't exist.
 * 
 * Usage:
 * ```tsx
 * const layout = getArticleLayout('default', { post, authors, relatedPosts })
 * layout.forEach(({ component: Component, props, key }) => (
 *   <Component key={key} {...props} />
 * ))
 * ```
 */
export function getArticleLayout(
  variant: ArticleLayoutVariant,
  props: ArticleLayoutProps
): ArticleLayoutComponent[] {
  const layoutFn = layoutRegistry[variant] || layoutRegistry.default
  return layoutFn(props)
}

/**
 * Get Layout Variant from Post
 * 
 * Determines the appropriate layout variant based on post metadata.
 * Can be extended to check tags, custom fields, etc.
 */
export function getLayoutVariantFromPost(post: Post): ArticleLayoutVariant {
  // Check for custom field or tag that indicates layout preference
  // For now, default to 'default'
  // Future: Check post.tags for 'interview', 'featured', etc.
  
  const primaryTag = post.tags?.[0]?.slug
  
  if (primaryTag === 'interview' || primaryTag === 'spotlight') {
    return 'interview'
  }
  
  if (post.featured) {
    return 'featured'
  }
  
  return 'default'
}

