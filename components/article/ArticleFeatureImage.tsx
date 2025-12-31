import Image from 'next/image'
import type { Post } from '@/lib/types'

/**
 * ArticleFeatureImage Component
 * 
 * Reusable feature image component for article pages.
 * Handles image display with proper aspect ratio and optimization.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Data: Passed as props
 * - Styling: Uses design tokens
 */
interface ArticleFeatureImageProps {
  post: Post
  aspectRatio?: '2/1' | '16/9' | '4/3' | '1/1'
  className?: string
}

export function ArticleFeatureImage({ 
  post, 
  aspectRatio = '2/1',
  className = '' 
}: ArticleFeatureImageProps) {
  if (!post.feature_image) return null

  const aspectClasses = {
    '2/1': 'aspect-[2/1]',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }

  return (
    <div className={`w-full pb-section-y ${className}`}>
      <div className="mx-auto max-w-content px-6 lg:px-section-x">
        <div className="max-w-article mx-auto">
          <div className={`w-full ${aspectClasses[aspectRatio]} relative overflow-hidden rounded-lg`}>
            <Image
              src={post.feature_image}
              alt={post.title}
              width={1400}
              height={700}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

