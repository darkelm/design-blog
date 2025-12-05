'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Post } from '@/lib/types'
import { formatDate, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'

interface HeroProps {
  post: Post
}

export function Hero({ post }: HeroProps) {
  const tagName = getPrimaryTagName(post.tags)
  const authorName = getPrimaryAuthorName(post.authors)
  const authorImage = post.authors?.[0]?.profile_image

  return (
    <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-12">
        <h2 className="text-display-xl font-extrabold text-neutral-900 text-center">
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
          <p className="text-body-sm text-neutral-600 text-center">
            {formatDate(post.published_at)}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-6 items-center">
            <Link href={`/post/${post.slug}`} className="group">
              <h1 className="text-section-title font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors text-center">
                {post.title}
              </h1>
            </Link>

            <p className="text-body-lg text-neutral-600 max-w-hero-excerpt text-center">
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
              <div className="w-6 h-6 bg-neutral-200 rounded-full" />
            )}
            <p className="text-body-sm text-neutral-700">
              By {authorName}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
