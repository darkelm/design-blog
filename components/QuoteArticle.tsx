'use client'

import { useEffect, useRef, memo } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * QuoteArticle Component
 * 
 * A full-width quote/article component with dark background and centered content.
 * Features scroll-triggered GSAP animations for engaging reveal effects.
 * 
 * Design System:
 * - Typography: Uses design tokens (text-body-md, text-display-lg, etc.)
 * - Colors: Dark theme (bg-neutral-950, text-white)
 * - Spacing: Uses px-fluid and max-w-content for consistent layout
 * - Animations: GSAP ScrollTrigger for performant scroll-based reveals
 * 
 * @example
 * <QuoteArticle
 *   label="Gen AI Tool Study"
 *   quote="The AI tools do a great job of creating a baseline, but it struggled to solve novel challenges."
 *   attribution="Rose Todaro, Visual Designer, Builder.io"
 *   href="/post/article-slug"
 * />
 */
interface QuoteArticleProps {
  /** Label text above the quote (e.g., "Gen AI Tool Study") */
  label: string
  /** The main quote text */
  quote: string
  /** Attribution text below the quote */
  attribution: string
  /** Link URL for the article */
  href: string
  /** Optional className for additional styling */
  className?: string
}

function QuoteArticleComponent({
  label,
  quote,
  attribution,
  href,
  className = '',
}: QuoteArticleProps) {
  const containerRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const attributionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create GSAP timeline for staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animate elements in sequence with stagger
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3' // Start 0.3s before previous animation ends
      )
      .fromTo(
        attributionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
        '-=0.3'
      )

    // Cleanup function
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className={`w-full bg-neutral-950 text-white py-section-y ${className}`}
    >
      <div className="mx-auto max-w-content px-fluid">
        <div className="flex flex-col items-center gap-content-gap max-w-[850px] mx-auto">
          {/* Label */}
          <p
            ref={labelRef}
            className="text-body-md font-serif text-center text-white"
          >
            {label}
          </p>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-display-lg font-sans font-medium text-center text-white"
            style={{ lineHeight: '54px' }}
          >
            "{quote}"
          </p>

          {/* Attribution */}
          <p
            ref={attributionRef}
            className="text-body-md font-serif text-center text-white"
          >
            {attribution}
          </p>

          {/* Button */}
          <Link
            ref={buttonRef}
            href={href}
            className="inline-flex items-center justify-center px-4 py-2 rounded border border-white text-body-md font-sans font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors whitespace-nowrap"
            data-cursor-hover
          >
            Read the article
          </Link>
        </div>
      </div>
    </section>
  )
}

// Memoize to prevent unnecessary re-renders
export const QuoteArticle = memo(QuoteArticleComponent)

