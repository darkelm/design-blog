'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

interface AnimatedTitleProps {
  href: string
  children: React.ReactNode
  className?: string
  groupHover?: boolean // If true, responds to parent group hover
}

/**
 * AnimatedTitle Component
 * 
 * Displays a title with an animated underline that:
 * - Animates from left to right on hover
 * - Animates in reverse (right to left) on mouse leave
 * 
 * Separation of Concerns:
 * - Animation logic: GSAP timeline management
 * - Component logic: React lifecycle and event handling
 * - Styling: Tailwind classes + CSS for underline
 */
export function AnimatedTitle({
  href,
  children,
  className = '',
  groupHover = false,
}: AnimatedTitleProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const link = linkRef.current
    const underline = underlineRef.current

    if (!link || !underline) return

    // Create timeline for hover animation
    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    // Set initial state (scaleX: 0, transform-origin: left)
    gsap.set(underline, {
      scaleX: 0,
      transformOrigin: 'left center',
    })

    // Animate underline from left to right
    tl.to(underline, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Handle hover events
    const handleMouseEnter = () => {
      tl.play()
    }

    const handleMouseLeave = () => {
      tl.reverse()
    }

    if (groupHover) {
      // For group hover, listen to parent article
      const article = link.closest('article')
      if (article) {
        article.addEventListener('mouseenter', handleMouseEnter)
        article.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          article.removeEventListener('mouseenter', handleMouseEnter)
          article.removeEventListener('mouseleave', handleMouseLeave)
          tl.kill()
        }
      }
    } else {
      // Direct hover on link
      link.addEventListener('mouseenter', handleMouseEnter)
      link.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter)
        link.removeEventListener('mouseleave', handleMouseLeave)
        tl.kill()
      }
    }
  }, [groupHover])

  return (
    <Link href={href} ref={linkRef} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-current origin-left"
        aria-hidden="true"
        style={{ transform: 'scaleX(0)' }}
      />
    </Link>
  )
}

