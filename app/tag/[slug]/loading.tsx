import { ArticleListSkeleton } from '@/components/Loading'

/**
 * Tag Page Loading Component
 * 
 * Displays while tag page data is being fetched.
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <header className="mx-auto max-w-content px-6 lg:px-section-x pt-12 lg:pt-20 pb-8">
        <div className="max-w-2xl animate-pulse">
          <div className="h-4 w-24 bg-neutral-200 rounded mb-3" />
          <div className="h-12 w-3/4 bg-neutral-200 rounded mb-4" />
          <div className="h-4 w-48 bg-neutral-200 rounded" />
        </div>
      </header>

      {/* Topic Filter Skeleton */}
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
        <div className="flex gap-3 flex-wrap animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-neutral-200 rounded" />
          ))}
        </div>
      </div>

      {/* Articles Skeleton */}
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
        <ArticleListSkeleton count={9} />
      </div>
    </div>
  )
}

