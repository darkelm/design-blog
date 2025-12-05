'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { animationPresets, scrollReveal } from '@/lib/animations'
import { AnimatedCoverImage } from './AnimatedCoverImage'
import type { Post } from '@/lib/types'
import { formatDate, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'

interface HeroGSAPProps {
  post: Post
}

/**
 * Hero Component with GSAP Animations
 * 
 * This is an example of how to use GSAP instead of Framer Motion.
 * GSAP offers:
 * - Better performance for complex animations
 * - More control over timelines and sequences
 * - ScrollTrigger for scroll-based animations
 * - Smaller bundle size for specific use cases
 */
export function HeroGSAP({ post }: HeroGSAPProps) {
  const tagName = getPrimaryTagName(post.tags)
  const authorName = getPrimaryAuthorName(post.authors)
  const authorImage = post.authors?.[0]?.profile_image
  
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Animate content on mount
    if (contentRef.current) {
      animationPresets.hero.title(titleRef.current)
      scrollReveal(contentRef.current, { y: 20, duration: 0.8 })
    }
    
    if (imageRef.current) {
      animationPresets.hero.image(imageRef.current)
    }
  }, [])

  return (
    <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-content-gap items-center">
        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-5 lg:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
            <span className="text-label text-neutral-500 uppercase font-medium">
              Featured
            </span>
          </div>

          <Link href={`/post/${post.slug}`} className="group">
            <h1 
              ref={titleRef}
              className="text-display-xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors"
            >
              {post.title}
            </h1>
          </Link>

          <p className="text-body-lg text-neutral-600 max-w-hero-excerpt">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-2">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={authorName}
                width={44}
                height={44}
                className="rounded-full"
              />
            ) : (
              <div className="w-11 h-11 bg-neutral-200 rounded-full" />
            )}
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-nav text-neutral-800">{authorName}</span>
              <span className="text-body-sm text-neutral-500">
                {formatDate(post.published_at)} · {formatReadingTime(post.reading_time)}
              </span>
            </div>
          </div>
        </div>

        {/* Image - Supports GIFs and MP4s */}
        <div ref={imageRef}>
          <Link href={`/post/${post.slug}`} className="block hover-zoom rounded-xl overflow-hidden">
            {post.feature_image ? (
              <AnimatedCoverImage
                post={post}
                className="w-full aspect-[4/3] object-cover rounded-xl"
                priority
                width={700}
                height={525}
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400">Featured Image</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

