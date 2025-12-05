'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Post } from '@/lib/types'
import { formatDate, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'

interface ArticleCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  index?: number
}

export function ArticleCard({ post, variant = 'default', index = 0 }: ArticleCardProps) {
  const tagName = getPrimaryTagName(post.tags)
  const authorName = getPrimaryAuthorName(post.authors)
  const authorImage = post.authors?.[0]?.profile_image

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group grid grid-cols-1 md:grid-cols-[1fr,300px] gap-card-gap pb-8 border-b border-neutral-200 last:border-0 cursor-pointer"
      >
        <div className="flex flex-col justify-center gap-3">
          <span className="text-overline text-neutral-500 uppercase font-medium">
            {tagName}
          </span>
          <Link href={`/post/${post.slug}`}>
            <h3 className="text-card-title-md font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-body-md text-neutral-600 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={authorName}
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <div className="w-7 h-7 bg-neutral-300 rounded-full" />
            )}
            <span className="text-label text-neutral-600">
              {authorName} · {formatDate(post.published_at, 'MMM d')}
            </span>
          </div>
        </div>
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-lg order-first md:order-last">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full aspect-[16/10] object-cover rounded-lg"
            />
          ) : (
            <div className="w-full aspect-[16/10] bg-neutral-200 rounded-lg flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
      </motion.article>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group flex flex-col gap-5 cursor-pointer"
      >
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-lg">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={600}
              height={340}
              className="w-full aspect-[16/9] object-cover rounded-lg"
            />
          ) : (
            <div className="w-full aspect-[16/9] bg-neutral-200 rounded-lg flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-col gap-3">
          <span className="text-overline text-neutral-500 uppercase font-medium">
            {tagName}
          </span>
          <Link href={`/post/${post.slug}`}>
            <h3 className="text-card-title-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-body-md text-neutral-600 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-1">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={authorName}
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <div className="w-7 h-7 bg-neutral-300 rounded-full" />
            )}
            <span className="text-label text-neutral-600">
              {authorName} · {formatDate(post.published_at, 'MMM d')}
            </span>
          </div>
        </div>
      </motion.article>
    )
  }

  // Default variant
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      <Link href={`/post/${post.slug}`} className="hover-zoom rounded-lg">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            width={500}
            height={300}
            className="w-full aspect-[16/10] object-cover rounded-lg"
          />
        ) : (
          <div className="w-full aspect-[16/10] bg-neutral-200 rounded-lg flex items-center justify-center">
            <span className="text-body-sm text-neutral-400">Image</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-2.5">
        <span className="text-overline text-neutral-500 uppercase font-medium">
          {tagName}
        </span>
        <Link href={`/post/${post.slug}`}>
          <h3 className="text-card-title font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-body-sm text-neutral-600 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={authorName}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <div className="w-7 h-7 bg-neutral-300 rounded-full" />
          )}
          <span className="text-label text-neutral-600">
            {authorName} · {formatDate(post.published_at, 'MMM d')}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
