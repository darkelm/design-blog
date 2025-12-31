import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/cms'
import { logger } from '@/lib/utils/logger'

/**
 * Search API Route
 * 
 * Handles search queries from the SearchModal component.
 * Uses the CMS abstraction layer to search posts.
 * 
 * GET /api/search?q=query
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ posts: [] })
  }

  try {
    const posts = await searchPosts(query.trim(), 20)
    return NextResponse.json({ posts })
  } catch (error) {
    logger.error('Search API error:', error)
    // Return empty results on error rather than failing
    // This allows the UI to handle gracefully
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}
