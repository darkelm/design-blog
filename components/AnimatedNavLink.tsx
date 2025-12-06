'use client'

import { memo, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

interface AnimatedNavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * AnimatedNavLink Component
 * 
 * Navigation link with animated underline on hover
 * 
 * Separation of Concerns:
 * - Animation logic: GSAP timeline management
 * - Component logic: React lifecycle and event handling
 * - Styling: Tailwind classes + CSS for underline
 * 
 * Performance:
 * - Memoized to prevent unnecessary re-renders in navigation
 */
function AnimatedNavLinkComponent({
  href,
  children,
  className = '',
}: AnimatedNavLinkProps) {
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

    // Handle keyboard focus
    const handleFocus = () => {
      tl.play()
    }

    const handleBlur = () => {
      tl.reverse()
    }

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)
    link.addEventListener('focus', handleFocus)
    link.addEventListener('blur', handleBlur)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
      link.removeEventListener('focus', handleFocus)
      link.removeEventListener('blur', handleBlur)
      tl.kill()
    }
  }, [])

  return (
    <Link 
      href={href} 
      ref={linkRef} 
      className={`relative inline-block ${className}`}
      style={{ color: 'inherit' }}
    >
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

// Memoize to prevent unnecessary re-renders in navigation
export const AnimatedNavLink = memo(AnimatedNavLinkComponent)

