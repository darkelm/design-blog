import { HeroSkeleton, ArticleListSkeleton } from '@/components/Loading'

/**
 * Global Loading Component
 * 
 * Displays while page data is being fetched.
 * Uses skeleton components matching the design system.
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
        <ArticleListSkeleton count={6} />
      </div>
    </div>
  )
}

