import type { Post, Tag, Author } from '@/lib/types'
import { getArticleContent } from './mockData/contentRegistry'
import { logger } from './utils/logger'

// Mock authors
const mockAuthors: Author[] = [
  {
    id: '1',
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Senior Product Designer',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '2',
    slug: 'michael-torres',
    name: 'Michael Torres',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Design Systems Lead',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '3',
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'UX Researcher',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '4',
    slug: 'james-wilson',
    name: 'James Wilson',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Design Tools Specialist',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '5',
    slug: 'lisa-park',
    name: 'Lisa Park',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Product Designer',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '6',
    slug: 'david-kim',
    name: 'David Kim',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Accessibility Lead',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
  {
    id: '7',
    slug: 'maya-chen',
    name: 'Maya Chen',
    profile_image: '/images/figma/author-avatar.svg',
    cover_image: undefined,
    bio: 'Service Designer working at the intersection of healthcare and emerging technology. When she\'s not mapping journeys, she\'s hiking with her rescue dog or experimenting with ceramics.',
    website: undefined,
    location: undefined,
    facebook: undefined,
    twitter: undefined,
    meta_title: undefined,
    meta_description: undefined,
  },
]

// Mock tags
const mockTags: Record<string, Tag> = {
  'case-studies': {
    id: 'cs-1',
    slug: 'case-studies',
    name: 'Case Studies',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'process': {
    id: 'proc-1',
    slug: 'process',
    name: 'Process',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'research': {
    id: 'res-1',
    slug: 'research',
    name: 'Research',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'tools': {
    id: 'tools-1',
    slug: 'tools',
    name: 'Tools',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'interviews': {
    id: 'int-1',
    slug: 'interviews',
    name: 'Interviews',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'perspectives': {
    id: 'persp-1',
    slug: 'perspectives',
    name: 'Perspectives',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'spotlight': {
    id: 'spot-1',
    slug: 'spotlight',
    name: 'Spotlight',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'events': {
    id: 'events-1',
    slug: 'events',
    name: 'Events',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'ai': {
    id: 'ai-1',
    slug: 'ai',
    name: 'AI',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
  'accessibility': {
    id: 'acc-1',
    slug: 'accessibility',
    name: 'Accessibility',
    description: undefined,
    feature_image: undefined,
    visibility: 'public',
    meta_title: undefined,
    meta_description: undefined,
  },
}

/**
 * Create Mock Post
 * 
 * Factory function for creating mock post data with validation and error handling.
 * 
 * Separation of Concerns:
 * - Structure: This function
 * - Content: contentRegistry.ts
 * - Validation: This function (input validation)
 * - Error Handling: This function (graceful degradation)
 * 
 * Best Practices:
 * - Validates all inputs before use
 * - Provides fallbacks for missing data
 * - Logs warnings for invalid configurations
 * - Uses centralized content registry
 * - Type-safe throughout
 */
function createMockPost(
  id: string,
  title: string,
  excerpt: string,
  tagSlug: string,
  authorIndex: number,
  featured: boolean = false,
  daysAgo: number = 0
): Post {
  // Validate inputs
  if (!id || !title || !excerpt) {
    logger.warn(`Invalid post data: missing required fields for post ${id}`)
  }

  // Validate tag exists
  const tag = mockTags[tagSlug] || mockTags['process'] // Fallback to 'process' tag
  if (!mockTags[tagSlug]) {
    logger.warn(`Tag "${tagSlug}" not found for post ${id}. Using fallback.`)
  }

  // Validate author index
  const author = mockAuthors[authorIndex] || mockAuthors[0] // Fallback to first author
  if (authorIndex < 0 || authorIndex >= mockAuthors.length) {
    logger.warn(`Invalid author index ${authorIndex} for post ${id}. Using index 0.`)
  }

  // Special date handling for specific articles
  let date: Date
  if (id === 'persp-1') {
    date = new Date('2025-04-01')
  } else if (['rec-1', 'rec-2', 'rec-3', 'proc-1', 'proc-2', 'proc-3'].includes(id)) {
    date = new Date('2026-12-01') // Fixed date for Insights and Process sections
  } else {
    date = new Date()
    date.setDate(date.getDate() - daysAgo)
  }
  
  // Map post IDs to Figma images
  const imageMap: Record<string, string> = {
    'feat-1': '/images/figma/featured-hero.jpg',
    'rec-1': '/images/figma/insights-1.jpg', // Putting a little personality - Agents.jpg
    'rec-2': '/images/figma/insights-2.jpg', // The shape of service design - ServiceDesign.jpg
    'rec-3': '/images/figma/recent-3.jpg', // Keep current image for third article
    'cs-1': '/images/figma/case-studies-1.jpg',
    'cs-2': '/images/figma/case-studies-2.jpg',
    'persp-1': '/images/figma/recent-1.jpg', // Using recent-1 as fallback (perspectives-1 download failed)
    'persp-2': '/images/figma/recent-1.jpg', // Reused from Recent
    'spot-1': '/images/figma/spotlight-1.jpg',
    'spot-2': '/images/figma/spotlight-2.jpg',
    'spot-3': '/images/figma/spotlight-3.jpg',
    'tools-1': '/images/figma/recent-1.jpg', // Reused from Recent
    'tools-2': '/images/figma/recent-2.jpg', // Reused from Recent
    'tools-3': '/images/figma/recent-3.jpg', // Reused from Recent
    // Process section:
    // - proc-1 uses the accessibility video
    // - proc-2 and proc-3 intentionally have no image mapping so they render with a grey placeholder background
    'proc-1': '/_videos/ai-accessibility.mp4', // Video for first Process article
  }
  
  // For most posts, fall back to a generic recent image.
  // For Process posts (proc-*), we *don't* fall back so that cards 2 and 3 show the grey placeholder background.
  const isProcessPost = id.startsWith('proc-')
  const defaultImage = isProcessPost ? undefined : '/images/figma/recent-1.jpg'
  const featureImage = imageMap[id] ?? defaultImage
  
  // Get HTML content from registry, fallback to excerpt
  const articleContent = getArticleContent(id)
  const htmlContent = articleContent?.html || `<p>${excerpt}</p>`

  // For Insights and Process section posts, add both AI and Accessibility tags
  let postTags = [tag]
  if (id === 'rec-1' || id === 'rec-2' || id === 'rec-3') {
    const aiTag = mockTags['ai'] || tag
    const accTag = mockTags['accessibility'] || tag
    postTags = [aiTag, accTag]
  } else if (id === 'proc-1' || id === 'proc-2' || id === 'proc-3') {
    // Process posts need 'process' tag for filtering, plus AI and Accessibility tags
    const processTag = mockTags['process'] || tag
    const aiTag = mockTags['ai'] || tag
    const accTag = mockTags['accessibility'] || tag
    postTags = [processTag, aiTag, accTag]
  }

  return {
    id,
    uuid: `uuid-${id}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    html: htmlContent,
    excerpt,
    feature_image: featureImage,
    featured,
    published_at: id === 'persp-1' ? new Date('2025-04-01').toISOString() : date.toISOString(),
    updated_at: date.toISOString(),
    reading_time: Math.floor(Math.random() * 10) + 3,
    tags: postTags,
    authors: [author],
    primary_tag: tag,
    primary_author: author,
    meta_title: undefined,
    meta_description: undefined,
    og_image: undefined,
    og_title: undefined,
    og_description: undefined,
    twitter_image: undefined,
    twitter_title: undefined,
    twitter_description: undefined,
  }
}

// Mock posts
export const mockPosts: Post[] = [
  // Featured post
  createMockPost(
    'feat-1',
    'Injecting some personality into our agentic future',
    'A deep dive into the research, iteration, and collaboration that shaped our most ambitious product update yet. We rebuilt the entire experience with accessibility and user needs at the center.',
    'case-studies',
    0,
    true,
    2
  ),
  
  // Recent posts (matching Figma design - Insights section)
  createMockPost(
    'rec-1',
    'Putting a little personality into our agentic future',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'ai',
    0,
    false,
    5
  ),
  createMockPost(
    'rec-2',
    'The shape of service design to come',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'accessibility',
    0,
    false,
    7
  ),
  createMockPost(
    'rec-3',
    'Harnessing Generative AI to Enhance Accessibility in Digital Products',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'ai',
    0,
    false,
    10
  ),
  createMockPost(
    'rec-4',
    'Designing for Global Accessibility: Part 1',
    'How we approach accessibility across different cultures, languages, and technical constraints.',
    'accessibility',
    0,
    false,
    12
  ),
  createMockPost(
    'rec-5',
    'Rethinking Color Theory for Healthcare',
    'Why traditional color theory doesn\'t always apply when designing for medical contexts.',
    'research',
    2,
    false,
    14
  ),
  createMockPost(
    'rec-6',
    'How to Use AI to Design Better Products',
    'Practical strategies for incorporating AI tools into your design workflow without losing the human touch.',
    'tools',
    3,
    false,
    16
  ),
  
  // Case studies (matching Figma design)
  createMockPost(
    'cs-1',
    'Revamping Our User Interface with AI: A Design Journey',
    'This case study explores the extensive research, iterative design processes, and collaborative efforts that led to a groundbreaking update of our digital platform. We prioritized user experience and accessibility, integrating AI to enhance functionality and engagement.',
    'case-studies',
    0,
    false,
    20
  ),
  createMockPost(
    'cs-2',
    'Transforming Sustainability in the Public Sector: AI\'s Role in Analyzing Oil Impact',
    'Discover how Generative AI is revolutionizing the way we create and manage Figma tokens.',
    'case-studies',
    0,
    false,
    25
  ),
  
  // Process posts (matching Figma design)
  createMockPost(
    'proc-1',
    'Making accessibility the foundation of AI',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'process',
    0,
    false,
    8
  ),
  createMockPost(
    'proc-2',
    'Video Gen Showdown: Runway',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'process',
    0,
    false,
    11
  ),
  createMockPost(
    'proc-3',
    'AI Literacy Fundamentals: MCP Servers for Designers',
    'Exploring how generative AI can revolutionize accessibility, ensuring that all users can engage with technology seamlessly and intuitively.',
    'process',
    0,
    false,
    15
  ),
  
  // Research posts
  createMockPost(
    'res-1',
    'Understanding Patient Anxiety in Digital Health',
    'Key findings from our research into how patients experience anxiety when using healthcare apps.',
    'research',
    2,
    false,
    9
  ),
  createMockPost(
    'res-2',
    'The Role of Trust in Healthcare UX',
    'Why trust matters more in healthcare than in other industries, and how to design for it.',
    'research',
    2,
    false,
    13
  ),
  createMockPost(
    'res-3',
    'Quantitative vs Qualitative: Finding the Balance',
    'When to use numbers and when to use stories in your research practice.',
    'research',
    2,
    false,
    17
  ),
  
  // Tools posts
  createMockPost(
    'tools-1',
    'Figma Tokens: The Most Powerful Design System Plugin',
    'How we use Figma Tokens to maintain consistency across our design system.',
    'tools',
    3,
    false,
    6
  ),
  createMockPost(
    'tools-2',
    'Setting Up Your Design Handoff Workflow',
    'Tools and processes for seamless collaboration between design and development.',
    'tools',
    3,
    false,
    18
  ),
  createMockPost(
    'tools-3',
    'Automating Design System Documentation',
    'How we keep our design system docs up to date without manual work.',
    'tools',
    3,
    false,
    21
  ),
  
  // Interviews
  createMockPost(
    'int-1',
    'In Conversation with Our New Head of Design',
    'We sat down with Maria González to talk about her journey, her vision for the team, and what excites her about healthcare design.',
    'interviews',
    0,
    false,
    22
  ),
  createMockPost(
    'int-2',
    'How a Nurse Became Our Best UX Advocate',
    'Clinical advisor Rachel Thompson shares how her frontline experience shapes better product decisions.',
    'interviews',
    2,
    false,
    28
  ),
  
  // Perspectives (matching Figma design)
  createMockPost(
    'persp-1',
    'The Three-Person Product Team: How AI Is Reshaping Who Gets to Build',
    'There\'s a quiet revolution happening in product organizations, and it\'s not about the technology itself. It\'s about who gets to wield it. When the cost of making things drops dramatically, small teams with outsized capability are emerging — and designers are uniquely positioned to lead.',
    'perspectives',
    0,
    false,
    30
  ),
  createMockPost(
    'persp-2',
    'How We Redesigned Our Patient Dashboard from the Ground Up',
    'A deep dive into the research, iteration, and collaboration that shaped our most ambitious product update yet. We rebuilt the entire experience with accessibility and user needs at the center.',
    'perspectives',
    0,
    false,
    35
  ),
  
  // Spotlight
  createMockPost(
    'spot-1',
    'Shaping Journeys: Service Design in the Age of AI',
    'As artificial intelligence reshapes how organizations deliver value to their customers, we\'re reflecting on what this means for the practice of service design itself. Service Designer Maya Chen discusses how she\'s navigating this evolving landscape, the new challenges it presents, and why she believes we\'re entering the most exciting era for the discipline.',
    'spotlight',
    6, // Maya Chen (index 6, which is the 7th author)
    false,
    30
  ),
  createMockPost(
    'spot-2',
    'Michael Torres • Design Systems Lead',
    'Discover how Generative AI is revolutionizing the way we create and manage Figma tokens.',
    'spotlight',
    1,
    false,
    42
  ),
  createMockPost(
    'spot-3',
    'Priya Sharma • UX Researcher',
    'Discover how Generative AI is revolutionizing the way we create and manage Figma tokens.',
    'spotlight',
    2,
    false,
    44
  ),
]

// Helper functions to get posts by category
export function getMockFeaturedPosts(limit: number = 1): Post[] {
  return mockPosts.filter(p => p.featured).slice(0, limit)
}

export function getMockPostsByTag(tagSlug: string, limit: number = 10): Post[] {
  return mockPosts
    .filter(p => p.tags?.some(t => t.slug === tagSlug))
    .slice(0, limit)
}

export function getMockRecentPosts(limit: number = 10, excludeId?: string): Post[] {
  return mockPosts
    .filter(p => p.id !== excludeId)
    .sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime())
    .slice(0, limit)
}

export function getMockTags(): Tag[] {
  return Object.values(mockTags)
}

export function getMockTagBySlug(slug: string): Tag | undefined {
  return mockTags[slug]
}

export function getMockPostBySlug(slug: string): Post | undefined {
  return mockPosts.find(post => post.slug === slug)
}

export function getMockAuthors(): Author[] {
  return [...mockAuthors]
}

export function getMockAuthorBySlug(slug: string): Author | undefined {
  return mockAuthors.find(author => author.slug === slug)
}

export function getMockPostsByAuthor(authorSlug: string, limit: number = 10): Post[] {
  return mockPosts
    .filter(p => p.authors?.some(a => a.slug === authorSlug))
    .slice(0, limit)
}

export function getMockPostsBySearch(query: string, limit: number = 20): Post[] {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return []
  
  return mockPosts
    .filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm)
      const excerptMatch = post.excerpt?.toLowerCase().includes(searchTerm) || false
      const tagMatch = post.tags?.some(tag => tag.name.toLowerCase().includes(searchTerm) || tag.slug.includes(searchTerm)) || false
      const authorMatch = post.authors?.some(author => author.name.toLowerCase().includes(searchTerm)) || false
      
      return titleMatch || excerptMatch || tagMatch || authorMatch
    })
    .slice(0, limit)
}

