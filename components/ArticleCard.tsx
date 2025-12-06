'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedTitle } from './AnimatedTitle'
import { Tag } from './Tag'
import type { Post } from '@/lib/types'
import { formatDate, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'

interface ArticleCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact' | 'horizontal' | 'spotlight'
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

  if (variant === 'spotlight') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group flex flex-col gap-6 cursor-pointer"
      >
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-sm">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={411}
              height={526}
              className="w-full h-card-image-h-spotlight object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-card-image-h-spotlight bg-neutral-200 rounded-sm flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-col gap-6">
          {/* Name & Role / Title */}
          <h3 className="text-card-title-md font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
            <AnimatedTitle href={`/post/${post.slug}`} groupHover>
              {post.title}
            </AnimatedTitle>
          </h3>
          <p className="text-body-sm text-neutral-600">
            {post.excerpt}
          </p>
        </div>
      </motion.article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group flex gap-10 pb-16 border-b border-neutral-200 last:border-0 cursor-pointer"
      >
        <div className="flex flex-[1_0_0] flex-col gap-6">
          {/* Tags */}
          <div className="flex gap-4 flex-wrap">
            {post.tags?.slice(0, 3).map((tag) => (
              <Tag
                key={tag.slug}
                tag={tag}
                href={`/tag/${tag.slug}`}
              />
            ))}
          </div>

          {/* Date */}
          <p className="text-body-sm text-neutral-700">
            {formatDate(post.published_at, 'MMMM d, yyyy')}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-6">
            <h3 className="text-card-title-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
              <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                {post.title}
              </AnimatedTitle>
            </h3>
            <p className="text-body-md text-neutral-600">
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
              <div className="w-6 h-6 bg-neutral-300 rounded-full" />
            )}
            <p className="text-body-sm text-neutral-700">
              By {authorName}
            </p>
          </div>
        </div>

        {/* Image */}
        <Link href={`/post/${post.slug}`} className="flex-[1_0_0] hover-zoom rounded-sm order-first md:order-last">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={524}
              height={524}
              className="w-full h-card-image-h-horizontal object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-card-image-h-horizontal bg-neutral-200 rounded-sm flex items-center justify-center">
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
        className="group flex flex-col gap-6 cursor-pointer"
      >
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-sm">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={636}
              height={309}
              className="w-full h-card-image-h-featured object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-card-image-h-featured bg-neutral-200 rounded-sm flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-col gap-6">
          {/* Tags */}
          <div className="flex gap-4 flex-wrap">
            {post.tags?.slice(0, 3).map((tag) => (
              <Tag
                key={tag.slug}
                tag={tag}
                href={`/tag/${tag.slug}`}
              />
            ))}
          </div>

          {/* Date */}
          <p className="text-body-sm text-neutral-700">
            {formatDate(post.published_at, 'MMMM d, yyyy')}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-8">
            <h3 className="text-card-title-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
              <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                {post.title}
              </AnimatedTitle>
            </h3>
            <p className="text-body-md text-neutral-600">
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
              <div className="w-6 h-6 bg-neutral-300 rounded-full" />
            )}
            <p className="text-body-sm text-neutral-700">
              By {authorName}
            </p>
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
      className="group flex flex-col gap-6 cursor-pointer"
    >
      <Link href={`/post/${post.slug}`} className="hover-zoom rounded-sm">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            width={411}
            height={213}
            className="w-full h-card-image-h-default object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-card-image-h-default bg-neutral-200 rounded-sm flex items-center justify-center">
            <span className="text-body-sm text-neutral-400">Image</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-6">
        {/* Tags */}
        <div className="flex gap-4 flex-wrap">
          {post.tags?.slice(0, 3).map((tag) => (
            <Tag
              key={tag.slug}
              tag={tag}
              href={`/tag/${tag.slug}`}
            />
          ))}
        </div>

        {/* Date */}
        <p className="text-body-sm text-neutral-700">
          {formatDate(post.published_at, 'MMMM, yyyy')}
        </p>

        {/* Title & Body */}
        <div className="flex flex-col gap-6">
          <h3 className="text-card-title-md font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
            <AnimatedTitle href={`/post/${post.slug}`} groupHover>
              {post.title}
            </AnimatedTitle>
          </h3>
          <p className="text-body-sm text-neutral-600 line-clamp-2">
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
            <div className="w-6 h-6 bg-neutral-300 rounded-full" />
          )}
          <p className="text-body-sm text-neutral-700">
            By {authorName}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
