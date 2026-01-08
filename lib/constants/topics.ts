/**
 * Topics Configuration
 * 
 * Centralized configuration for the Topics dropdown in the header.
 * This makes it easy to update topics without modifying the Header component.
 */

export interface Topic {
  name: string
  href: string
}

export interface FeaturedTopic {
  tag: string
  title: string
  description: string
  href: string
}

/**
 * Featured topics shown in the left column of the dropdown
 */
export const FEATURED_TOPICS: FeaturedTopic[] = [
  {
    tag: 'News',
    title: 'News',
    description: 'Get the latest on all things D&DP+AI.',
    href: '/tag/news',
  },
  {
    tag: 'Design Systems',
    title: 'Design Systems',
    description: 'Everything you need to know about building and scaling design systems in the age of AI.',
    href: '/tag/tools',
  },
]

/**
 * All topics shown in the "Explore topics" grid
 */
export const ALL_TOPICS: Topic[] = [
  { name: 'ACCESSIBILITY', href: '/tag/accessibility' },
  { name: 'AI', href: '/tag/ai' },
  { name: 'CASE STUDIES', href: '/tag/case-studies' },
  { name: 'RESEARCH', href: '/tag/research' },
  { name: 'TOOLS', href: '/tag/tools' },
  { name: 'PERSPECTIVES', href: '/tag/perspectives' },
  { name: 'SPOTLIGHT', href: '/tag/spotlight' },
  { name: 'EVENTS', href: '/tag/events' },
]

