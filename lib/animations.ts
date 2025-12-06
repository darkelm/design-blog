import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'
import type { DependencyList } from 'react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * GSAP Animation Utilities
 * 
 * These utilities provide reusable animation patterns for the blog.
 * GSAP offers better performance and more control than Framer Motion
 * for complex animations, scroll-triggered effects, and timeline-based sequences.
 */

// ============================================
// Fade In Animations
// ============================================

export function fadeInUp(element: HTMLElement | null, delay: number = 0) {
  if (!element) return
  
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  )
}

export function fadeIn(element: HTMLElement | null, delay: number = 0) {
  if (!element) return
  
  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.6,
      delay,
      ease: 'power2.out',
    }
  )
}

// ============================================
// Scroll-Triggered Animations
// ============================================

export function scrollReveal(
  element: HTMLElement | null,
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
    start?: string
  } = {}
) {
  if (!element) return
  
  const {
    y = 50,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
  } = options

  gsap.fromTo(
    element,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// ============================================
// Stagger Animations
// ============================================

export function staggerFadeIn(
  elements: HTMLElement[] | NodeListOf<Element> | null,
  options: {
    delay?: number
    stagger?: number
    y?: number
  } = {}
) {
  if (!elements || elements.length === 0) return
  
  const { delay = 0, stagger = 0.1, y = 30 } = options

  gsap.fromTo(
    Array.from(elements),
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      stagger,
      ease: 'power2.out',
    }
  )
}

// ============================================
// React Hooks
// ============================================

export function useGSAP(
  callback: () => void,
  dependencies: DependencyList = []
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      callback()
    }
    // Cleanup
    return () => {
      if (ref.current) {
        gsap.killTweensOf(ref.current)
      }
    }
  }, dependencies)

  return ref
}

export function useScrollReveal(
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      scrollReveal(ref.current, options)
    }
    
    return () => {
      if (ref.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === ref.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [])

  return ref
}

/**
 * Hook for animating color fade-in on scroll
 * Returns a ref to attach to the element
 */
export function useColorFade(options: ColorFadeOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const timeline = animateColorFade(ref.current, options)

    return () => {
      // Cleanup: kill timeline and ScrollTrigger
      if (timeline) {
        timeline.kill()
      }
      if (ref.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === ref.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [options.backgroundColor, options.textColor])

  return ref
}

// ============================================
// Color Fade Animations
// ============================================

export interface ColorFadeOptions {
  backgroundColor?: string
  textColor?: string
  duration?: number
  start?: string
  ease?: string
}

/**
 * Animate background and text color fade-in on scroll
 * Optimized for rapid, smooth color transitions
 * 
 * Uses GSAP's color animation which handles hex/RGB/RGBA automatically
 */
export function animateColorFade(
  element: HTMLElement | null,
  options: ColorFadeOptions = {}
) {
  if (!element) return null

  const {
    backgroundColor,
    textColor,
    duration = 0.6,
    start = 'top 90%',
    ease = 'power2.out',
  } = options

  // If no colors provided, don't animate
  if (!backgroundColor && !textColor) return null

  // Create animation timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none reverse',
    },
  })

  // Animate background color from transparent to target
  if (backgroundColor) {
    gsap.set(element, { backgroundColor: 'rgba(255, 255, 255, 0)' })
    tl.to(element, {
      backgroundColor,
      duration,
      ease,
    }, 0) // Start immediately
  }

  // Animate text color from transparent to target
  if (textColor) {
    // Start with transparent (will inherit from parent or be invisible)
    gsap.set(element, { color: 'rgba(0, 0, 0, 0)' })
    tl.to(element, {
      color: textColor,
      duration,
      ease,
    }, 0) // Start immediately (same time as background)
  }

  return tl
}

/**
 * Animate header colors smoothly when they change
 * Used for fixed headers that match section colors
 * 
 * @param element - Header element to animate
 * @param colors - Target colors
 * @param duration - Animation duration (default: 0.6s)
 * @returns GSAP timeline
 */
export function animateHeaderColor(
  element: HTMLElement | null,
  colors: { backgroundColor: string; textColor: string },
  duration: number = 0.6 // Can be imported from ANIMATION_CONFIG if needed
) {
  if (!element) return null

  const tl = gsap.timeline()

  // Animate background color
  tl.to(element, {
    backgroundColor: colors.backgroundColor,
    duration,
    ease: 'power2.out',
  }, 0)

  // Animate text color (for all text elements)
  tl.to(element, {
    color: colors.textColor,
    duration,
    ease: 'power2.out',
  }, 0)

  // Animate border color if it exists
  tl.to(element, {
    borderColor: colors.textColor,
    duration,
    ease: 'power2.out',
  }, 0)

  return tl
}

// ============================================
// Timeline Animations
// ============================================

export function createTimeline() {
  return gsap.timeline()
}

// ============================================
// Common Animation Presets
// ============================================

export const animationPresets = {
  // Hero section entrance
  hero: {
    title: (element: HTMLElement | null) => {
      if (!element) return
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    },
    image: (element: HTMLElement | null) => {
      if (!element) return
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      )
    },
  },
  
  // Card grid entrance
  cardGrid: (elements: NodeListOf<Element> | null) => {
    if (!elements) return
    staggerFadeIn(elements, { stagger: 0.1, y: 30 })
  },
  
  // Section header
  sectionHeader: (element: HTMLElement | null) => {
    if (!element) return
    scrollReveal(element, { y: 20, duration: 0.6 })
  },
}

