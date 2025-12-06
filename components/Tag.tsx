import Link from 'next/link'
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
 */
interface TagProps {
  tag: TagType
  href?: string
  active?: boolean
  className?: string
}

export function Tag({ tag, href, active = false, className = '' }: TagProps) {
  const baseClasses = 'border px-2 py-2 rounded-sm text-body-sm transition-colors cursor-pointer'
  const inactiveClasses = 'border-neutral-800 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
  const activeClasses = 'border-neutral-900 bg-neutral-900 text-white'
  
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

