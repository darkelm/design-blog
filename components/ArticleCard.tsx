'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedTitle } from './AnimatedTitle'
import { Tag } from './Tag'
import type { Post } from '@/lib/types'
import { formatDate, formatDateEuropean, formatReadingTime, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'
import { logger } from '@/lib/utils/logger'

interface ArticleCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'featured-large' | 'compact' | 'horizontal' | 'spotlight' | 'dark' | 'dark-large'
  index?: number
}

function ArticleCardComponent({ post, variant = 'default', index = 0 }: ArticleCardProps) {
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
        data-article-card
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
          <h3 className="text-card-title-lg font-sans font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
            <AnimatedTitle href={`/post/${post.slug}`} groupHover>
              {post.title}
            </AnimatedTitle>
          </h3>
          <p className="text-body-md font-serif text-neutral-600">
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
        data-article-card
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
          <p className="text-body-sm font-serif text-neutral-600">
            {formatDate(post.published_at, 'MMMM d, yyyy')}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-6">
            <h3 className="text-card-title-lg font-sans font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
              <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                {post.title}
              </AnimatedTitle>
            </h3>
            <p className="text-body-md font-serif text-neutral-600">
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
            <p className="text-body-sm font-serif text-neutral-600">
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

  if (variant === 'featured-large') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group flex flex-col gap-6 cursor-pointer"
        data-article-card
      >
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-[2px]">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={901}
              height={588}
              className="w-full h-[588px] object-cover rounded-[2px]"
            />
          ) : (
            <div className="w-full h-[588px] bg-neutral-200 rounded-[2px] flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-col gap-6">
          {/* Title & Date */}
          <div className="flex flex-col gap-3">
            <h3 className="text-card-title-lg font-sans font-medium text-[#1a1a1a] leading-[32px] group-hover:text-neutral-600 transition-colors">
              <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                {post.title}
              </AnimatedTitle>
            </h3>
            <p className="text-label font-sans text-[#666]">
              {formatDateEuropean(post.published_at)}
            </p>
          </div>

          {/* Body Copy */}
          <div className="flex flex-col gap-2">
            <p className="text-body-md font-serif text-[#383838] leading-6">
              {post.excerpt}
            </p>
            <Link 
              href={`/post/${post.slug}`}
              className="text-body-md font-serif text-[#1a49f1] underline decoration-solid underline-offset-2 hover:text-[#1a49f1]/80 transition-colors"
            >
              Learn more
            </Link>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={authorName}
                width={24}
                height={24}
                className="rounded-full shrink-0"
              />
            ) : (
              <div className="w-6 h-6 bg-neutral-300 rounded-full shrink-0" />
            )}
            <p className="text-body-sm font-serif text-[#666]">
              By {authorName}
            </p>
          </div>

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
        </div>
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
        data-article-card
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
          <p className="text-body-sm font-serif text-neutral-600">
            {formatDate(post.published_at, 'MMMM d, yyyy')}
          </p>

          {/* Title & Body */}
          <div className="flex flex-col gap-8">
            <h3 className="text-card-title-lg font-sans font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
              <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                {post.title}
              </AnimatedTitle>
            </h3>
            <p className="text-body-md font-serif text-neutral-600">
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
            <p className="text-body-sm font-serif text-neutral-600">
              By {authorName}
            </p>
          </div>
        </div>
      </motion.article>
    )
  }

  if (variant === 'dark' || variant === 'dark-large') {
    const videoRef = useRef<HTMLVideoElement>(null)
    const isVideo = post.feature_image?.toLowerCase().endsWith('.mp4') || 
                    post.feature_image?.toLowerCase().endsWith('.webm') || 
                    post.feature_image?.toLowerCase().endsWith('.mov')
    const isLarge = variant === 'dark-large'

    useEffect(() => {
      const video = videoRef.current
      if (video && isVideo) {
        video.play().catch(() => {
          // Autoplay failed, user interaction required
        })
      }
      
      // Cleanup: pause video on unmount to prevent memory leaks
      return () => {
        if (video && !video.paused) {
          video.pause()
        }
      }
    }, [isVideo])

    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="group flex flex-col gap-6 cursor-pointer"
        data-article-card
      >
        <Link href={`/post/${post.slug}`} className="hover-zoom rounded-[2px] block">
          {isVideo && post.feature_image ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              controlsList="nodownload"
              className="w-full h-[320px] object-cover rounded-[2px]"
              onLoadedData={() => {
                videoRef.current?.play().catch(() => {
                  // Autoplay failed, user interaction required
                })
              }}
              onError={(e) => {
                logger.error('Video failed to load:', post.feature_image, e)
              }}
            >
              <source src={post.feature_image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={isLarge ? 901 : 426}
              height={320}
              className="w-full h-[320px] object-cover rounded-[2px]"
            />
          ) : (
            <div className="w-full h-[320px] bg-[#6d6d6d] rounded-[2px] flex items-center justify-center">
              <span className="text-body-sm text-neutral-400">Image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-col gap-6">
          {/* Main Content */}
          <div className="flex flex-col gap-6">
            {/* Title & Date */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[24px] font-sans font-medium text-white leading-[32px] group-hover:text-white/80 transition-colors">
                <AnimatedTitle href={`/post/${post.slug}`} groupHover>
                  {post.title}
                </AnimatedTitle>
              </h3>
              <p className="text-[14px] font-sans font-normal text-[#d9d9d9] leading-normal">
                {formatDateEuropean(post.published_at)}
              </p>
            </div>

            {/* Body Copy */}
            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-serif font-normal text-[#d9d9d9] leading-6">
                {post.excerpt}
              </p>
              <Link 
                href={`/post/${post.slug}`}
                className="text-[16px] font-serif font-normal text-[#1a49f1] underline decoration-solid hover:text-[#1a49f1]/80 transition-colors"
              >
                Learn more
              </Link>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={24}
                  height={24}
                  className="rounded-full shrink-0"
                />
              ) : (
                <div className="w-6 h-6 bg-neutral-300 rounded-full shrink-0" />
              )}
              <p className="text-[14px] font-serif font-normal text-[#d9d9d9] leading-normal whitespace-nowrap">
                By {authorName}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-4 items-center flex-wrap">
            {post.tags?.slice(0, 2).map((tag) => (
              <Tag
                key={tag.slug}
                tag={tag}
                href={`/tag/${tag.slug}`}
                variant="dark"
              />
            ))}
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
      data-article-card
    >
      <Link href={`/post/${post.slug}`} className="hover-zoom rounded-[2px]">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            width={411}
            height={320}
            className="w-full h-[320px] object-cover rounded-[2px]"
          />
        ) : (
          <div className="w-full h-[320px] bg-neutral-200 rounded-[2px] flex items-center justify-center">
            <span className="text-body-sm text-neutral-400">Image</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-6">
        {/* Title & Date */}
        <div className="flex flex-col gap-3">
          <h3 className="text-card-title-lg font-sans font-medium text-[#1a1a1a] group-hover:text-neutral-600 transition-colors leading-[32px]">
            <AnimatedTitle href={`/post/${post.slug}`} groupHover>
              {post.title}
            </AnimatedTitle>
          </h3>
          <p className="text-label font-sans text-[#666]">
            {formatDateEuropean(post.published_at)}
          </p>
        </div>

        {/* Body Copy */}
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-serif text-[#383838] leading-6">
            {post.excerpt}
          </p>
          <Link 
            href={`/post/${post.slug}`}
            className="text-body-md font-serif text-[#1a49f1] underline decoration-solid underline-offset-2 hover:text-[#1a49f1]/80 transition-colors"
          >
            Learn more
          </Link>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={authorName}
              width={24}
              height={24}
              className="rounded-full shrink-0"
            />
          ) : (
            <div className="w-6 h-6 bg-neutral-300 rounded-full shrink-0" />
          )}
          <p className="text-body-sm font-serif text-[#666]">
            By {authorName}
          </p>
        </div>

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
      </div>
    </motion.article>
  )
}

// Memoize to prevent unnecessary re-renders when parent re-renders
export const ArticleCard = memo(ArticleCardComponent)
