import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/ghost'
import { mockPosts } from '@/lib/mockData'
import { USE_MOCK_DATA } from '@/lib/constants'

// Force dynamic rendering for search API
export const dynamic = 'force-dynamic'

/**
 * Search API Route
 * 
 * Handles search requests using Ghost's filter API or mock data
 * 
 * GET /api/search?q=searchterm
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    let posts

    if (USE_MOCK_DATA) {
      // Search mock data
      const allPosts = mockPosts
      const searchTerm = query.toLowerCase().trim()
      
      posts = allPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm)
        const excerptMatch = post.excerpt?.toLowerCase().includes(searchTerm)
        const tagMatch = post.tags?.some(tag => 
          tag.name.toLowerCase().includes(searchTerm) || 
          tag.slug.toLowerCase().includes(searchTerm)
        )
        
        return titleMatch || excerptMatch || tagMatch
      })
    } else {
      // Use Ghost API
      posts = await searchPosts(query, 20)
    }

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    )
  }
}

