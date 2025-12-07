import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/ghost'
import { getMockPostsBySearch } from '@/lib/mockData'
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

    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Search request:', { query, USE_MOCK_DATA })
    }

    let posts

    if (USE_MOCK_DATA) {
      // Search mock data using the dedicated search function
      posts = getMockPostsBySearch(query, 20)
    } else {
      // Use Ghost API with fallback to mock data
      try {
        posts = await searchPosts(query, 20)
      } catch (ghostError) {
        console.error('Ghost API search error, falling back to mock data:', ghostError)
        // Fallback to mock data if Ghost API fails
        posts = getMockPostsBySearch(query, 20)
      }
    }

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error('Search error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      useMockData: USE_MOCK_DATA,
    })
    return NextResponse.json(
      { 
        error: 'Failed to search posts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

