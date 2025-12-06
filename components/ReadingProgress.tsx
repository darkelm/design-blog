'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@/lib/animations'
import { gsap } from 'gsap'

/**
 * ReadingProgress Component
 * 
 * Displays a reading progress bar at the top of article pages.
 * Uses GSAP for smooth animations.
 * 
 * Separation of Concerns:
 * - Animation: GSAP
 * - Layout: This component
 * - Styling: Design tokens
 */
interface ReadingProgressProps {
  className?: string
}

export function ReadingProgress({ className = '' }: ReadingProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!progressRef.current) return

    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0
      
      gsap.to(progressRef.current, {
        scaleX: Math.min(progress, 1),
        duration: 0.1,
        ease: 'none',
      })
    }

    // Initial update
    updateProgress()

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 right-0 h-0.5 bg-neutral-900 origin-left z-50 ${className}`}
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  )
}

