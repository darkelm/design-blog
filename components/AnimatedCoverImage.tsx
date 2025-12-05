'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Post } from '@/lib/types'

interface AnimatedCoverImageProps {
  post: Post
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

/**
 * AnimatedCoverImage Component
 * 
 * Supports static images, GIFs, and MP4 videos as cover images.
 * Ghost CMS allows uploading GIFs and MP4s, but they need custom handling.
 * 
 * Usage in Ghost:
 * - Upload GIF/MP4 as feature image
 * - Ghost will store the URL in post.feature_image
 * - This component detects the file type and renders appropriately
 */
export function AnimatedCoverImage({
  post,
  className = '',
  priority = false,
  width = 1200,
  height = 675,
}: AnimatedCoverImageProps) {
  const [imageType, setImageType] = useState<'image' | 'gif' | 'video' | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!post.feature_image) return

    const url = post.feature_image.toLowerCase()
    
    if (url.endsWith('.gif') || url.includes('.gif')) {
      setImageType('gif')
    } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
      setImageType('video')
    } else {
      setImageType('image')
    }
  }, [post.feature_image])

  if (!post.feature_image) {
    return (
      <div className={`bg-neutral-200 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400">No image</span>
      </div>
    )
  }

  // Render GIF
  if (imageType === 'gif') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={post.feature_image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    )
  }

  // Render Video (MP4)
  if (imageType === 'video') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={post.feature_image}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => {
            // Ensure video plays
            videoRef.current?.play().catch(() => {
              // Autoplay failed, user interaction required
            })
          }}
        />
      </div>
    )
  }

  // Render static image (default)
  return (
    <Image
      src={post.feature_image}
      alt={post.title}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}

