import type { Post, Tag, Author } from '@/lib/types'

// Mock authors
const mockAuthors: Author[] = [
  {
    id: '1',
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    profile_image: null,
    cover_image: null,
    bio: 'Senior Product Designer',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/sarah-chen',
  },
  {
    id: '2',
    slug: 'michael-torres',
    name: 'Michael Torres',
    profile_image: null,
    cover_image: null,
    bio: 'Design Systems Lead',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/michael-torres',
  },
  {
    id: '3',
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    profile_image: null,
    cover_image: null,
    bio: 'UX Researcher',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/priya-sharma',
  },
  {
    id: '4',
    slug: 'james-wilson',
    name: 'James Wilson',
    profile_image: null,
    cover_image: null,
    bio: 'Design Tools Specialist',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/james-wilson',
  },
  {
    id: '5',
    slug: 'lisa-park',
    name: 'Lisa Park',
    profile_image: null,
    cover_image: null,
    bio: 'Product Designer',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/lisa-park',
  },
  {
    id: '6',
    slug: 'david-kim',
    name: 'David Kim',
    profile_image: null,
    cover_image: null,
    bio: 'Accessibility Lead',
    website: null,
    location: null,
    facebook: null,
    twitter: null,
    meta_title: null,
    meta_description: null,
    url: '/author/david-kim',
  },
]

// Mock tags
const mockTags: Record<string, Tag> = {
  'case-studies': {
    id: 'cs-1',
    slug: 'case-studies',
    name: 'Case Studies',
    description: null,
    feature_image: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    url: '/tag/case-studies',
  },
  'process': {
    id: 'proc-1',
    slug: 'process',
    name: 'Process',
    description: null,
    feature_image: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    url: '/tag/process',
  },
  'research': {
    id: 'res-1',
    slug: 'research',
    name: 'Research',
    description: null,
    feature_image: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    url: '/tag/research',
  },
  'tools': {
    id: 'tools-1',
    slug: 'tools',
    name: 'Tools',
    description: null,
    feature_image: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    url: '/tag/tools',
  },
  'interviews': {
    id: 'int-1',
    slug: 'interviews',
    name: 'Interviews',
    description: null,
    feature_image: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    url: '/tag/interviews',
  },
}

// Helper to create mock posts
function createMockPost(
  id: string,
  title: string,
  excerpt: string,
  tagSlug: string,
  authorIndex: number,
  featured: boolean = false,
  daysAgo: number = 0
): Post {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  
  return {
    id,
    uuid: `uuid-${id}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    html: `<p>${excerpt}</p>`,
    excerpt,
    feature_image: `https://images.unsplash.com/photo-${1500000000000 + parseInt(id)}?w=1200&h=675&fit=crop`,
    featured,
    published_at: date.toISOString(),
    updated_at: date.toISOString(),
    reading_time: Math.floor(Math.random() * 10) + 3,
    tags: [mockTags[tagSlug]],
    authors: [mockAuthors[authorIndex]],
    primary_tag: mockTags[tagSlug],
    primary_author: mockAuthors[authorIndex],
    meta_title: null,
    meta_description: null,
    og_image: null,
    og_title: null,
    og_description: null,
    twitter_image: null,
    twitter_title: null,
    twitter_description: null,
  }
}

// Mock posts
export const mockPosts: Post[] = [
  // Featured post
  createMockPost(
    'feat-1',
    'How We Redesigned Our Patient Dashboard from the Ground Up',
    'A deep dive into the research, iteration, and collaboration that shaped our most ambitious product update yet. We rebuilt the entire experience with accessibility and user needs at the center.',
    'case-studies',
    0,
    true,
    2
  ),
  
  // Recent posts
  createMockPost(
    'rec-1',
    'Building a Design System That Actually Scales',
    'How we moved from scattered components to a unified system that serves our entire product suite.',
    'process',
    1,
    false,
    5
  ),
  createMockPost(
    'rec-2',
    'What We Learned from 50 User Interviews',
    'Patterns, surprises, and insights from talking to real users about their healthcare experiences.',
    'research',
    2,
    false,
    7
  ),
  createMockPost(
    'rec-3',
    'Our Favorite Figma Plugins This Quarter',
    'The tools that made our workflows faster and better, from automation to collaboration.',
    'tools',
    3,
    false,
    10
  ),
  createMockPost(
    'rec-4',
    'Designing for Global Accessibility: Part 1',
    'How we approach accessibility across different cultures, languages, and technical constraints.',
    'process',
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
  
  // Case studies
  createMockPost(
    'cs-1',
    'Redesigning the Medication Tracker Experience',
    'How empathy mapping and rapid prototyping helped us create a more intuitive experience for patients managing multiple medications.',
    'case-studies',
    4,
    false,
    20
  ),
  createMockPost(
    'cs-2',
    'Accessibility-First: Our Mobile App Overhaul',
    'We rebuilt our mobile experience with accessibility as a foundation, not an afterthought. Here\'s what changed.',
    'case-studies',
    5,
    false,
    25
  ),
  
  // Process posts
  createMockPost(
    'proc-1',
    'From Sketch to Ship: Our Design Process',
    'A detailed walkthrough of how we take ideas from initial concepts to shipped features.',
    'process',
    1,
    false,
    8
  ),
  createMockPost(
    'proc-2',
    'Collaboration Secrets: Design X Engineering',
    'How we built stronger partnerships between design and engineering teams.',
    'process',
    0,
    false,
    11
  ),
  createMockPost(
    'proc-3',
    'Running Effective Design Critiques',
    'Our framework for giving and receiving feedback that actually improves the work.',
    'process',
    1,
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

