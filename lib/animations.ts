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

