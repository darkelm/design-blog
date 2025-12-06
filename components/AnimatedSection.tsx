'use client'

import { useRef, useEffect } from 'react'
import { animateColorFade } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderColorContext } from './HeaderColorProvider'
import { SectionContainer } from './SectionContainer'

interface AnimatedSectionProps {
  children: React.ReactNode
  backgroundColor?: string
  textColor?: string
  className?: string
  style?: React.CSSProperties
  sectionId?: string // Unique ID for header color matching
}

/**
 * AnimatedSection Component
 * 
 * Wraps a section with scroll-triggered color fade-in animation.
 * Uses GSAP for performant, rapid color transitions.
 * 
 * Separation of Concerns:
 * - Animation logic: lib/animations.ts
 * - Component logic: This component
 * - Styling: Tailwind classes + inline styles
 */
export function AnimatedSection({
  children,
  backgroundColor,
  textColor,
  className = '',
  style = {},
  sectionId,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { registerSection, unregisterSection } = useHeaderColorContext()

  // Register section with header color context
  // Only register if sectionId and colors are provided
  useEffect(() => {
    if (sectionId && backgroundColor && textColor) {
      registerSection(sectionId, { backgroundColor, textColor })
    } else if (sectionId) {
      // Unregister if colors are not provided
      unregisterSection(sectionId)
    }

    return () => {
      if (sectionId) {
        unregisterSection(sectionId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // registerSection and unregisterSection are memoized with useCallback
  }, [sectionId, backgroundColor, textColor])

  useEffect(() => {
    if (!sectionRef.current) return

    // Only animate if colors are provided
    if (!backgroundColor && !textColor) return

    const timeline = animateColorFade(sectionRef.current, {
      backgroundColor,
      textColor,
      duration: 0.6, // Rapid fade-in
      start: 'top 90%', // Start when section is 90% down viewport
      ease: 'power2.out',
    })

    // Cleanup on unmount
    return () => {
      if (timeline) {
        timeline.kill()
      }
      if (sectionRef.current) {
        // Clean up ScrollTrigger instances for this element
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [backgroundColor, textColor])

  // Set data attribute for header color detection
  useEffect(() => {
    if (sectionRef.current && sectionId) {
      sectionRef.current.setAttribute('data-section-id', sectionId)
    }
  }, [sectionId])

  // Merge provided styles
  // Note: Initial transparent colors are set by GSAP animation, not here
  const mergedStyle: React.CSSProperties = {
    ...style,
  }

  return (
    <section
      ref={sectionRef}
      className={`w-full ${className}`}
      style={mergedStyle}
    >
      <SectionContainer>
        {children}
      </SectionContainer>
    </section>
  )
}

