import Link from 'next/link'
import { memo } from 'react'
import type { Tag as TagType } from '@/lib/types'

/**
 * Tag Component
 * 
 * Reusable tag component with consistent styling and hover effects.
 * Can be used as a link or a span (non-clickable).
 * 
 * Separation of Concerns:
 * - Styling: This component
 * - Behavior: Link vs span based on href prop
 * - State: Active state via className prop
 * 
 * Performance:
 * - Memoized to prevent unnecessary re-renders when rendered in lists
 */
interface TagProps {
  tag: TagType
  href?: string
  active?: boolean
  className?: string
  variant?: 'default' | 'dark' // Dark variant for dark backgrounds
}

function TagComponent({ tag, href, active = false, className = '', variant = 'default' }: TagProps) {
  let baseClasses: string
  let inactiveClasses: string
  let activeClasses: string
  
  if (variant === 'dark') {
    baseClasses = 'border border-solid border-white p-[8px] rounded-[2px] text-[14px] font-sans font-normal text-white transition-colors cursor-pointer'
    inactiveClasses = 'hover:border-white/80 hover:bg-white/10'
    activeClasses = 'bg-white/10'
  } else {
    baseClasses = 'border px-2 py-2 rounded-sm text-label font-sans font-normal transition-colors cursor-pointer'
    inactiveClasses = 'border-neutral-800 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
    activeClasses = 'border-neutral-900 bg-neutral-900 text-white'
  }
  
  const classes = `${baseClasses} ${active ? activeClasses : inactiveClasses} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {tag.name}
      </Link>
    )
  }

  return (
    <span className={classes}>
      {tag.name}
    </span>
  )
}

// Memoize to prevent unnecessary re-renders when rendered in lists
export const Tag = memo(TagComponent)

