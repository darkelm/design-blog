'use client'

import { useRef, useEffect } from 'react'
import { animateColorFade } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface AnimatedSectionProps {
  children: React.ReactNode
  backgroundColor?: string
  textColor?: string
  className?: string
  style?: React.CSSProperties
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
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

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

  // Merge provided styles
  // Note: Initial transparent colors are set by GSAP animation, not here
  const mergedStyle: React.CSSProperties = {
    ...style,
  }

  return (
    <section
      ref={sectionRef}
      className={className}
      style={mergedStyle}
    >
      {children}
    </section>
  )
}

