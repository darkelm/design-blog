'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Tag } from './Tag'
import type { Post } from '@/lib/types'
import { getPrimaryAuthorName } from '@/lib/utils'

interface HeroProps {
  post: Post
}

export function Hero({ post }: HeroProps) {
  const authorName = getPrimaryAuthorName(post.authors)
  const authorImage = post.authors?.[0]?.profile_image
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    // Ensure video plays when loaded
    if (video) {
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
  }, [])

  return (
    <section className="w-full flex flex-col items-center gap-10 pb-12 pt-16 px-fluid">
      {/* Hero video with same spacing as page content */}
      <div className="w-full max-w-content">
        <div className="w-full h-[634px] relative rounded-[4px] overflow-hidden bg-[#6d6d6d]">
          <Link href={`/post/${post.slug}`} className="block w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              controlsList="nodownload"
              className="absolute inset-0 w-full h-full object-cover rounded-[2px]"
              onLoadedData={() => {
                videoRef.current?.play().catch(() => {
                  // Autoplay failed, user interaction required
                })
              }}
            >
              <source src="/_videos/hero-video.mp4" type="video/mp4" />
            </video>
          </Link>
        </div>
      </div>

      {/* Centered content below image */}
      <div className="w-full max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Title & Date */}
          <div className="flex flex-col gap-3 items-center w-full">
            <Link href={`/post/${post.slug}`} className="group">
              <h1 className="text-[36px] font-sans font-medium text-[#1a1a1a] leading-[32px] text-center group-hover:text-neutral-600 transition-colors">
                Hey AI, meet D&DP
              </h1>
            </Link>
            <p className="text-label font-sans text-[#666] text-center">
              01.12.2026
            </p>
          </div>

          {/* Body Copy */}
          <div className="flex flex-col gap-2 items-center max-w-[664px]">
            <p className="text-body-md font-serif text-[#383838] leading-6 text-center">
              The intent behind this is to be more than a blog. It's a record of the things we make in the age of AI. The clearest path to figuring out the future is building the future.
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
          <div className="flex gap-4 items-center justify-center flex-wrap">
            {post.tags?.slice(0, 3).map((tag) => (
              <Tag
                key={tag.slug}
                tag={tag}
                href={`/tag/${tag.slug}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
