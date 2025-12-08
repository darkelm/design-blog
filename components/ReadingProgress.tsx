'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { HEADER_CONFIG, ANIMATION_CONFIG } from '@/lib/constants'
import { useScrollDirection } from '@/lib/useScrollDirection'

/**
 * ReadingProgress Component
 * 
 * Fixed progress bar at the top of the viewport that fills as the user scrolls.
 * Dynamically positions itself:
 * - At top (0px) when header is hidden
 * - Below header (64px) when header is visible
 * 
 * Separation of Concerns:
 * - Scroll tracking: This component
 * - Header visibility: useScrollDirection hook
 * - Layout: Fixed positioning with dynamic top
 * - Styling: Design tokens
 * - Performance: Throttled scroll updates, passive listeners
 * 
 * Architecture:
 * - Uses requestAnimationFrame for smooth updates
 * - Calculates progress based on scroll position relative to article content
 * - Updates width directly for better performance than transform
 * - Animates position with GSAP to match header animation timing
 */
interface ReadingProgressProps {
  /**
   * Optional target element ID to calculate progress relative to.
   * If not provided, uses the entire document.
   */
  targetId?: string
  className?: string
}

export function ReadingProgress({ targetId = 'article-content', className = '' }: ReadingProgressProps) {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const { isVisible } = useScrollDirection(HEADER_CONFIG.SCROLL_THRESHOLD, true)

  useEffect(() => {
    const updateProgress = () => {
      // Get the target element (article content) or fallback to document
      const targetElement = targetId 
        ? document.getElementById(targetId) 
        : document.documentElement

      if (!targetElement || !progressBarRef.current) return

      // Get scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      
      // Get element position and dimensions
      const rect = targetElement.getBoundingClientRect()
      const elementTop = rect.top + scrollTop
      const elementHeight = targetElement.scrollHeight || rect.height
      
      // Calculate when element starts (when top of element reaches top of viewport)
      const elementStart = elementTop
      // Calculate when element ends (when bottom of element reaches top of viewport)
      const elementEnd = elementTop + elementHeight - windowHeight
      
      // Calculate scroll progress through the element
      let calculatedProgress = 0
      
      if (scrollTop < elementStart) {
        // Before element starts
        calculatedProgress = 0
      } else if (scrollTop >= elementEnd) {
        // After element ends (fully scrolled past)
        calculatedProgress = 1
      } else {
        // Within element - calculate progress from start to end
        const scrolled = scrollTop - elementStart
        const totalScrollable = elementEnd - elementStart
        calculatedProgress = totalScrollable > 0 ? scrolled / totalScrollable : 0
      }

      // Clamp between 0 and 1
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress))
      
      setProgress(calculatedProgress)
      
      // Update width directly for better performance
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${calculatedProgress * 100}%`
      }
    }

    // Throttled scroll handler using requestAnimationFrame
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial update
    updateProgress()

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [targetId])

  // Animate position based on header visibility
  useEffect(() => {
    if (!containerRef.current) return

    // When header is visible, position bar below it
    // When header is hidden, position bar at top
    const targetTop = isVisible ? HEADER_CONFIG.HEIGHT : 0

    gsap.to(containerRef.current, {
      top: targetTop,
      duration: ANIMATION_CONFIG.HEADER_SLIDE_DURATION,
      ease: ANIMATION_CONFIG.HEADER_SLIDE_EASE,
    })
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={`fixed left-0 right-0 h-1 bg-neutral-200 z-40 ${className}`}
      style={{ top: isVisible ? `${HEADER_CONFIG.HEIGHT}px` : '0px' }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        ref={progressBarRef}
        className="h-full bg-neutral-900 transition-all duration-150 ease-out origin-left"
        style={{ width: '0%' }}
      />
    </div>
  )
}

