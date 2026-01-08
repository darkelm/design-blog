'use client'

import { useEffect, useState, useRef, memo } from 'react'

/**
 * CustomCursor Component
 * 
 * Creates a custom square cursor that follows the mouse, similar to Cohere Made.
 * The cursor enlarges when hovering over interactive elements (links, buttons, etc.)
 * 
 * Features:
 * - Square shape (instead of circle)
 * - Smooth following animation
 * - Enlarges on hover for interactive elements
 * - Hides default cursor
 */
function CustomCursorComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [isArticleCard, setIsArticleCard] = useState(false)

  useEffect(() => {
    // Only show cursor on desktop (not touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      return
    }

    setIsVisible(true)

    const updateCursor = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth animation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return false

      // Check if hovering over an article card
      const articleCard = target.closest('[data-article-card]')
      setIsArticleCard(!!articleCard)

      // Check if target or any parent is interactive
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('[data-cursor-hover]') !== null ||
        articleCard !== null ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isInteractive)
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e)
      checkInteractive(e)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Small periodic shake while hovering over interactive elements
  useEffect(() => {
    if (!isHovering) {
      setIsShaking(false)
      return
    }

    let intervalId: number | undefined
    let timeoutId: number | undefined

    const triggerShake = () => {
      setIsShaking(true)
      // Stop shaking quickly so it feels like a subtle nudge
      timeoutId = window.setTimeout(() => {
        setIsShaking(false)
      }, 160)
    }

    // Initial shake shortly after hover starts
    triggerShake()
    // Then repeat every few seconds
    intervalId = window.setInterval(triggerShake, 2600)

    return () => {
      if (intervalId) window.clearInterval(intervalId)
      if (timeoutId) window.clearTimeout(timeoutId)
      setIsShaking(false)
    }
  }, [isHovering])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed pointer-events-none z-[9999] mix-blend-difference ${
        isShaking ? 'cursor-shake' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition:
          'width var(--transition-base), height var(--transition-base)',
        width: isArticleCard ? '120px' : isHovering ? '48px' : '12px',
        height: isArticleCard ? '40px' : isHovering ? '48px' : '12px',
        backgroundColor: 'white',
        willChange: 'width, height, transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {isArticleCard && (
        <span
          className="text-label font-sans font-medium text-neutral-900 whitespace-nowrap"
          style={{
            transition: 'opacity var(--transition-base)',
          }}
        >
          Learn more
        </span>
      )}
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const CustomCursor = memo(CustomCursorComponent)

