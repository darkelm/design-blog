import type { Post } from '@/lib/types'
import { ArticleCard } from './ArticleCard'

interface ArticleGridProps {
  posts: Post[]
  variant?: 'default' | 'featured' | 'horizontal' | 'spotlight'
  columns?: 1 | 2 | 3
  emptyMessage?: string
}

export function ArticleGrid({ 
  posts, 
  variant = 'default',
  columns = 3,
  emptyMessage = 'No articles yet.'
}: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500">{emptyMessage}</p>
      </div>
    )
  }

  // Determine grid columns based on variant and columns prop
  const gridCols = variant === 'featured' 
    ? 'grid-cols-1 lg:grid-cols-2'
    : variant === 'horizontal'
    ? 'flex flex-col gap-16'
    : variant === 'spotlight'
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : columns === 3
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1'

  const containerClass = variant === 'horizontal' 
    ? gridCols 
    : `grid ${gridCols} gap-card-gap`

  return (
    <div className={containerClass}>
      {posts.map((post, index) => (
        <ArticleCard 
          key={post.id} 
          post={post} 
          variant={variant === 'horizontal' ? 'horizontal' : variant === 'spotlight' ? 'spotlight' : variant}
          index={index} 
        />
      ))}
    </div>
  )
}

