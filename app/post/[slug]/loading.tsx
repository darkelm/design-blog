import { ArticleCardSkeleton } from '@/components/Loading'

/**
 * Article Page Loading Component
 * 
 * Displays while article data is being fetched.
 * Matches the article page layout structure.
 */
export default function Loading() {
  return (
    <article className="min-h-screen">
      {/* Header Skeleton */}
      <header className="w-full pt-20 pb-section-y">
        <div className="mx-auto max-w-content px-6 lg:px-section-x">
          <div className="max-w-article mx-auto animate-pulse">
            <div className="h-4 w-32 bg-neutral-200 rounded mb-4" />
            <div className="h-16 w-full bg-neutral-200 rounded mb-6" />
            <div className="h-4 w-24 bg-neutral-200 rounded" />
          </div>
        </div>
      </header>

      {/* Image Skeleton */}
      <div className="w-full pb-section-y">
        <div className="mx-auto max-w-content px-6 lg:px-section-x">
          <div className="max-w-article mx-auto">
            <div className="w-full aspect-[2/1] bg-neutral-200 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="w-full pb-section-y">
        <div className="mx-auto max-w-content px-6 lg:px-section-x">
          <div className="max-w-article mx-auto space-y-4 animate-pulse">
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-5/6 bg-neutral-200 rounded" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-4/6 bg-neutral-200 rounded mt-8" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-5/6 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    </article>
  )
}

