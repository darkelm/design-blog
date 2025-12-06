'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { animateColorFade } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderColorContext } from './HeaderColorProvider'
import { SectionContainer } from './SectionContainer'
import type { Post } from '@/lib/types'
import { formatDate, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'

interface HeroProps {
  post: Post
  backgroundColor?: string
  textColor?: string
}

export function Hero({ post, backgroundColor, textColor }: HeroProps) {
  const tagName = getPrimaryTagName(post.tags)
  const authorName = getPrimaryAuthorName(post.authors)
  const authorImage = post.authors?.[0]?.profile_image
  const heroRef = useRef<HTMLDivElement>(null)
  const { registerSection, unregisterSection } = useHeaderColorContext()

  // Register hero section with header color context
  // Only register if colors are provided and different from current
  useEffect(() => {
    if (backgroundColor && textColor) {
      registerSection('featured', { backgroundColor, textColor })
    } else {
      // Unregister if colors are not provided
      unregisterSection('featured')
    }

    return () => {
      unregisterSection('featured')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // registerSection and unregisterSection are memoized with useCallback
  }, [backgroundColor, textColor])

  useEffect(() => {
    if (!heroRef.current || (!backgroundColor && !textColor)) return

    // Animate color fade-in on scroll (starts when hero enters viewport)
    const timeline = animateColorFade(heroRef.current, {
      backgroundColor,
      textColor,
      duration: 0.6,
      start: 'top 95%', // Start slightly earlier since it's at the top
      ease: 'power2.out',
    })

    return () => {
      if (timeline) {
        timeline.kill()
      }
      if (heroRef.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === heroRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [backgroundColor, textColor])

  // Set data attribute for header color detection
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.setAttribute('data-section-id', 'featured')
    }
  }, [])

  return (
    <div 
      ref={heroRef}
      className="w-full"
    >
      <SectionContainer>
      {/* Section Title */}
      <div className="flex items-center justify-center mb-12">
        <h2 className="text-display-xl font-extrabold text-center" style={{ color: 'inherit' }}>
          Feature
        </h2>
      </div>

      {/* Featured Article - Centered Layout */}
      <div className="flex flex-col gap-10 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <Link href={`/post/${post.slug}`} className="block hover-zoom rounded-sm overflow-hidden">
            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.title}
                width={1312}
                height={542}
                className="w-full h-hero-image-h object-cover rounded-sm"
                priority
              />
            ) : (
              <div className="w-full h-hero-image-h bg-neutral-200 flex items-center justify-center rounded-sm">
                <span className="text-neutral-400">Featured Image</span>
              </div>
            )}
          </Link>
        </motion.div>

        {/* Content - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-6 items-center max-w-hero-content"
        >
          {/* Date */}
          <p className="text-body-sm text-center opacity-80" style={{ color: 'inherit' }}>
            {formatDate(post.published_at)}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-6 items-center">
            <Link href={`/post/${post.slug}`} className="group">
              <h1 className="text-section-title font-medium group-hover:opacity-80 transition-opacity text-center" style={{ color: 'inherit' }}>
                {post.title}
              </h1>
            </Link>

            <p className="text-body-md max-w-hero-excerpt text-center opacity-90" style={{ color: 'inherit' }}>
              {post.excerpt}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={authorName}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-current opacity-20 rounded-full" />
            )}
            <p className="text-body-sm opacity-90" style={{ color: 'inherit' }}>
              By {authorName}
            </p>
          </div>
        </motion.div>
      </div>
      </SectionContainer>
    </div>
  )
}
