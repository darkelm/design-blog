'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { useHeaderColorContext } from './HeaderColorProvider'
import { animateHeaderColor } from '@/lib/animations'
import { AnimatedNavLink } from './AnimatedNavLink'
import { SearchModal } from './SearchModal'
import { HEADER_CONFIG, ANIMATION_CONFIG } from '@/lib/constants'
import { logger } from '@/lib/utils/logger'

const navigation = [
  { name: 'Latest', href: '/' },
  { name: 'Case Studies', href: '/tag/case-studies' },
  { name: 'Spotlight', href: '/tag/spotlight' },
  { name: 'Perspectives', href: '/tag/perspectives' },
  { name: 'Tools', href: '/tag/tools' },
  { name: 'Process', href: '/tag/process' },
  { name: 'Events', href: '/tag/events' },
]

/**
 * Header Component
 * 
 * Fixed header that:
 * - Hides on scroll down, shows on scroll up
 * - Matches section colors with fade animation
 * - Has animated underline on nav links
 * - Maintains accessibility standards
 * 
 * Separation of Concerns:
 * - Scroll behavior: useScrollDirection hook
 * - Color animation: GSAP + useHeaderColorContext
 * - Navigation: AnimatedNavLink components
 * - Layout: Fixed positioning and transitions
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isVisible } = useScrollDirection(10, true)
  const headerRef = useRef<HTMLElement>(null)
  const { sectionColors, defaultColors } = useHeaderColorContext()
  const currentColorsRef = useRef(defaultColors)
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

  // Animate header visibility (slide up/down)
  useEffect(() => {
    if (!headerRef.current) return

    gsap.to(headerRef.current, {
      y: isVisible ? 0 : -100,
      duration: ANIMATION_CONFIG.HEADER_SLIDE_DURATION,
      ease: ANIMATION_CONFIG.HEADER_SLIDE_EASE,
    })
  }, [isVisible])

  // Detect which section is in view and animate colors
  useEffect(() => {
    if (!headerRef.current) return

    // Clean up previous ScrollTriggers
    scrollTriggersRef.current.forEach(trigger => trigger.kill())
    scrollTriggersRef.current = []

    if (sectionColors.size === 0) {
      // Set default colors if no sections registered
      animateHeaderColor(headerRef.current, defaultColors)
      currentColorsRef.current = defaultColors
      return
    }

    // Create ScrollTriggers for each registered section
    // Use a small delay to ensure DOM elements are ready
    let triggerTimeout: NodeJS.Timeout | null = null
    
    const setupTriggers = () => {
      Array.from(sectionColors.entries()).forEach(([sectionId, colors]) => {
        // Find section element by data attribute
        const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement
        if (!sectionElement) {
          logger.warn(`Section element not found for: ${sectionId}`)
          return
        }

        // Special handling for featured section - it should trigger at the very top
        const isFeatured = sectionId === 'featured'
        const startPoint = isFeatured ? 'top top' : 'top 10%'
        const endPoint = isFeatured ? 'bottom top' : 'bottom 10%'

        const trigger = ScrollTrigger.create({
          trigger: sectionElement,
          start: startPoint,
          end: endPoint,
          onEnter: () => {
            if (headerRef.current) {
              // Only animate if colors are different
              if (
                currentColorsRef.current.backgroundColor !== colors.backgroundColor ||
                currentColorsRef.current.textColor !== colors.textColor
              ) {
                animateHeaderColor(headerRef.current, colors)
                currentColorsRef.current = colors
              }
            }
          },
          onEnterBack: () => {
            if (headerRef.current) {
              // Only animate if colors are different
              if (
                currentColorsRef.current.backgroundColor !== colors.backgroundColor ||
                currentColorsRef.current.textColor !== colors.textColor
              ) {
                animateHeaderColor(headerRef.current, colors)
                currentColorsRef.current = colors
              }
            }
          },
          onLeave: () => {
            // When leaving a section, check what section we're entering
            // The scroll handler will update colors based on what's actually under the header
            if (headerRef.current) {
              // Trigger a check to see what section we're now over
              setTimeout(() => {
                const scrollY = window.scrollY
                const headerHeight = HEADER_CONFIG.HEIGHT
                const checkPoint = scrollY + headerHeight + 50
                
                // Find what section is now under the header
                const allSections = document.querySelectorAll('[data-section-id]')
                let foundSection = false
                
                allSections.forEach((el) => {
                  const element = el as HTMLElement
                  const rect = element.getBoundingClientRect()
                  const sectionTop = rect.top + scrollY
                  const sectionBottom = sectionTop + rect.height
                  
                  if (checkPoint >= sectionTop && checkPoint <= sectionBottom) {
                    const sectionId = element.getAttribute('data-section-id')
                    if (sectionId) {
                      const nextColors = sectionColors.get(sectionId) || defaultColors
                      if (
                        currentColorsRef.current.backgroundColor !== nextColors.backgroundColor ||
                        currentColorsRef.current.textColor !== nextColors.textColor
                      ) {
                        animateHeaderColor(headerRef.current, nextColors)
                        currentColorsRef.current = nextColors
                      }
                      foundSection = true
                    }
                  }
                })
                
                // If no section found, use default colors
                if (!foundSection) {
                  if (
                    currentColorsRef.current.backgroundColor !== defaultColors.backgroundColor ||
                    currentColorsRef.current.textColor !== defaultColors.textColor
                  ) {
                    animateHeaderColor(headerRef.current, defaultColors)
                    currentColorsRef.current = defaultColors
                  }
                }
              }, 50)
            }
          },
        })

        scrollTriggersRef.current.push(trigger)
      })
      
      // Refresh ScrollTrigger to ensure all triggers are active
      ScrollTrigger.refresh()
    }

    // Setup triggers after a short delay to ensure DOM is ready
    triggerTimeout = setTimeout(setupTriggers, 200)

    // Set initial colors based on scroll position
    const updateInitialColors = () => {
      if (!headerRef.current) return

      const scrollY = window.scrollY
      const headerHeight = HEADER_CONFIG.HEIGHT
      const checkPoint = scrollY + headerHeight + 50 // Point just below header to check what section we're over
      let activeColors = defaultColors
      let highestPriority = -1

      // If at the top of the page, use featured section colors
      if (scrollY < 100) {
        const featuredColors = sectionColors.get('featured')
        if (featuredColors) {
          activeColors = featuredColors
        }
      } else {
        // Find ALL sections on the page (both with and without colors)
        const allSections = document.querySelectorAll('[data-section-id]')
        
        // Check each section to see if the header is over it
        // rect.top is relative to viewport, header is at top (0-64px)
        const headerBottom = headerHeight // Header ends at 64px from top of viewport
        
        allSections.forEach((sectionElement) => {
          const element = sectionElement as HTMLElement
          const rect = element.getBoundingClientRect()
          
          // Check if header (0 to headerBottom) overlaps with this section
          // Section is under header if its top is above headerBottom and its bottom is below 0
          if (rect.top < headerBottom && rect.bottom > 0) {
            // This section is currently under the header
            const sectionId = element.getAttribute('data-section-id')
            
            if (sectionId) {
              // Check if this section has registered colors
              const sectionColorsForId = sectionColors.get(sectionId)
              
              // Calculate priority based on how much of the section overlaps with header
              // Sections with more overlap have higher priority
              const overlapTop = Math.max(0, rect.top)
              const overlapBottom = Math.min(headerBottom, rect.bottom)
              const overlap = overlapBottom - overlapTop
              const priority = overlap

              if (priority > highestPriority) {
                highestPriority = priority
                // Use section colors if available, otherwise use default
                activeColors = sectionColorsForId || defaultColors
              }
            }
          }
        })

        // Fallback: if no section found with data-section-id, check by viewport position
        if (highestPriority === -1) {
          Array.from(sectionColors.entries()).forEach(([sectionId, colors]) => {
            const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement
            if (!sectionElement) return

            const rect = sectionElement.getBoundingClientRect()
            const sectionTop = rect.top + scrollY
            const sectionBottom = sectionTop + rect.height

            // Check if section overlaps with viewport near the top
            if (sectionBottom > scrollY && sectionTop < scrollY + window.innerHeight) {
              const distanceFromTop = Math.abs(rect.top)
              const priority = 1 / (distanceFromTop + 1)

              if (priority > highestPriority) {
                highestPriority = priority
                activeColors = colors
              }
            }
          })
        }
      }

      // Only update if colors have changed
      if (
        currentColorsRef.current.backgroundColor !== activeColors.backgroundColor ||
        currentColorsRef.current.textColor !== activeColors.textColor
      ) {
        animateHeaderColor(headerRef.current, activeColors)
        currentColorsRef.current = activeColors
      }
    }

    // Initial check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateInitialColors()
    }, HEADER_CONFIG.INITIAL_CHECK_DELAY)

    // Listen for scroll to continuously update colors (throttled)
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateInitialColors()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Use Intersection Observer for better performance (replaces setInterval polling)
    let pollingTimeout: NodeJS.Timeout | null = null
    
    try {
      intersectionObserverRef.current = new IntersectionObserver(
        () => {
          // When sections intersect, update colors
          updateInitialColors()
        },
        {
          rootMargin: `-${HEADER_CONFIG.HEIGHT}px 0px 0px 0px`, // Account for header height
          threshold: [0, 0.1, 0.5, 1],
        }
      )
      
      // Observe all sections with data-section-id
      const sections = document.querySelectorAll('[data-section-id]')
      sections.forEach((section) => {
        intersectionObserverRef.current?.observe(section)
      })
    } catch (error) {
      // Fallback to polling if Intersection Observer not supported
      logger.warn('Intersection Observer not supported, using polling fallback')
      const checkInterval = setInterval(() => {
        updateInitialColors()
      }, HEADER_CONFIG.POLLING_INTERVAL)
      
      pollingTimeout = setTimeout(() => {
        clearInterval(checkInterval)
      }, HEADER_CONFIG.POLLING_DURATION)
    }

    return () => {
      clearTimeout(timeoutId)
      if (triggerTimeout) {
        clearTimeout(triggerTimeout)
      }
      if (pollingTimeout) {
        clearTimeout(pollingTimeout)
      }
      window.removeEventListener('scroll', handleScroll)
      scrollTriggersRef.current.forEach(trigger => trigger.kill())
      scrollTriggersRef.current = []
      // Clean up Intersection Observer
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect()
      }
    }
  }, [sectionColors, defaultColors])

  // Set initial colors on mount - check for featured section first
  useEffect(() => {
    if (!headerRef.current) return
    
    // Check if featured section exists and we're at the top
    const featuredColors = sectionColors.get('featured')
    const initialColors = featuredColors || defaultColors
    
    gsap.set(headerRef.current, {
      backgroundColor: initialColors.backgroundColor,
      color: initialColors.textColor,
    })
    currentColorsRef.current = initialColors
  }, [defaultColors, sectionColors])

  // Get initial colors (featured if available, otherwise default)
  const initialColors = sectionColors.get('featured') || defaultColors

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{
        backgroundColor: initialColors.backgroundColor,
        color: initialColors.textColor,
      }}
      role="banner"
    >
      <nav className="mx-auto max-w-content px-6 lg:px-section-x" aria-label="Main navigation">
        <div className="flex h-header-height items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center justify-center"
            aria-label="Home"
          >
            <span className="text-[1.125rem] font-sans font-semibold" style={{ color: 'inherit' }}>
              D&DP&AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-between max-w-[749px] ml-auto mr-0">
            <ul className="flex items-center justify-between w-full gap-8" role="list">
              {navigation.map((item) => (
                <li key={item.name}>
                  <AnimatedNavLink
                    href={item.href}
                    className="text-label font-sans font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </AnimatedNavLink>
                </li>
              ))}
            </ul>
            
            {/* Search Icon */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="ml-8 p-0 transition-opacity hover:opacity-70 focus:opacity-70 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded flex-shrink-0 w-6 h-6"
              aria-label="Search"
              style={{ color: 'inherit' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 transition-opacity hover:opacity-70 focus:opacity-70 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            style={{ color: 'inherit' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-section-header-border"
            >
              <ul className="py-4 space-y-1" role="list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-label font-sans font-medium transition-colors hover:opacity-70 focus:opacity-70 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ color: 'inherit' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 px-4">
                  <button
                    className="w-full py-3 text-label font-sans font-medium transition-colors hover:opacity-70 focus:opacity-70 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Search"
                    style={{ color: 'inherit' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
