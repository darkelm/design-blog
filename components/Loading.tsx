export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} text-neutral-400`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <article className="flex flex-col gap-4 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-[16/10] bg-neutral-200 rounded-lg" />
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-20 bg-neutral-200 rounded" />
        <div className="h-6 w-full bg-neutral-200 rounded" />
        <div className="h-6 w-3/4 bg-neutral-200 rounded" />
        <div className="h-4 w-full bg-neutral-200 rounded mt-2" />
        <div className="h-4 w-2/3 bg-neutral-200 rounded" />
        
        {/* Author skeleton */}
        <div className="flex items-center gap-3 mt-1">
          <div className="w-6 h-6 bg-neutral-200 rounded-full" />
          <div className="h-4 w-32 bg-neutral-200 rounded" />
        </div>
      </div>
    </article>
  )
}

export function ArticleListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <section className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-content-gap items-center animate-pulse">
        {/* Content skeleton */}
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="h-4 w-24 bg-neutral-200 rounded" />
          <div className="h-12 w-full bg-neutral-200 rounded" />
          <div className="h-12 w-3/4 bg-neutral-200 rounded" />
          <div className="h-6 w-full bg-neutral-200 rounded mt-2" />
          <div className="h-6 w-5/6 bg-neutral-200 rounded" />
          
          {/* Author skeleton */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-11 h-11 bg-neutral-200 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 bg-neutral-200 rounded" />
              <div className="h-4 w-40 bg-neutral-200 rounded" />
            </div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full aspect-[4/3] bg-neutral-200 rounded-xl" />
      </div>
    </section>
  )
}

