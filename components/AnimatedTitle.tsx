'use client'

import Link from 'next/link'

interface AnimatedTitleProps {
  href: string
  children: React.ReactNode
  className?: string
  groupHover?: boolean // If true, responds to parent group hover
}

/**
 * AnimatedTitle Component
 * 
 * Displays a title with an animated underline that:
 * - Uses CSS background-size animation (like Figma blog)
 * - Single continuous line that grows from left to right
 * - Animates in reverse on mouse leave
 * 
 * The underline is created using a linear-gradient background
 * positioned at the bottom, and animates via background-size
 * from 0% to 100% width.
 */
export function AnimatedTitle({
  href,
  children,
  className = '',
  groupHover = false,
}: AnimatedTitleProps) {
  // CSS class for the animated underline effect
  // Uses background-size animation for smooth left-to-right underline
  const underlineClass = groupHover
    ? 'animated-title-group-hover'
    : 'animated-title-hover'

  return (
    <Link 
      href={href} 
      className={`${underlineClass} ${className}`}
    >
      {children}
    </Link>
  )
}

