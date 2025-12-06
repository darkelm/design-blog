/**
 * useScrollDirection Hook
 * 
 * Detects scroll direction and provides visibility state for fixed headers
 * 
 * Separation of Concerns:
 * - Scroll detection logic
 * - Visibility state management
 * - Throttling for performance
 */

import { useState, useEffect } from 'react'
import { HEADER_CONFIG } from './constants'

export interface ScrollDirectionState {
  isVisible: boolean
  direction: 'up' | 'down' | null
}

/**
 * Hook to detect scroll direction and control header visibility
 * 
 * @param threshold - Minimum scroll distance before hiding/showing (default: 10px)
 * @param initialVisible - Initial visibility state (default: true)
 * @returns Object with isVisible state and scroll direction
 */
export function useScrollDirection(
  threshold: number = HEADER_CONFIG.SCROLL_THRESHOLD,
  initialVisible: boolean = true
): ScrollDirectionState {
  const [isVisible, setIsVisible] = useState(initialVisible)
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // Don't hide header at the very top
        if (currentScrollY < threshold) {
          setIsVisible(true)
          setDirection(null)
          setLastScrollY(currentScrollY)
          ticking = false
          return
        }

        // Determine scroll direction
        const scrollDifference = currentScrollY - lastScrollY

        if (Math.abs(scrollDifference) < threshold) {
          ticking = false
          return
        }

        if (scrollDifference > 0) {
          // Scrolling down
          setDirection('down')
          setIsVisible(false)
        } else {
          // Scrolling up
          setDirection('up')
          setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, threshold])

  return { isVisible, direction }
}

