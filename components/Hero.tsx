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
    <section className="mx-auto max-w-content px-6 lg:px-10 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-5 lg:gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
            <span className="text-overline text-neutral-500 uppercase font-medium">
              Featured
            </span>
          </div>

          <Link href={`/post/${post.slug}`} className="group">
            <h1 className="text-display-lg lg:text-display-xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
              {post.title}
            </h1>
          </Link>

          <p className="text-body-lg text-neutral-600 max-w-xl">
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
            <div className="flex flex-col">
              <span className="font-medium text-neutral-800">{authorName}</span>
              <span className="text-body-sm text-neutral-500">
                {formatDate(post.published_at)} · {formatReadingTime(post.reading_time)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href={`/post/${post.slug}`} className="block hover-zoom rounded-xl overflow-hidden">
            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.title}
                width={700}
                height={525}
                className="w-full aspect-[4/3] object-cover"
                priority
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400">Featured Image</span>
              </div>
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
