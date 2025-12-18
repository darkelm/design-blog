'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Tag } from '@/lib/types'

interface TopicFilterProps {
  tags: Tag[]
  activeTag?: string
}

export function TopicFilter({ tags, activeTag }: TopicFilterProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="mx-auto max-w-content px-6 lg:px-10 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-3 flex-wrap"
      >
        <Link
          href="/"
          className={`
            px-4 py-2 rounded-full text-body-sm font-medium transition-colors
            ${isHome && !activeTag
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }
          `}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className={`
              px-4 py-2 rounded-full text-body-sm font-medium transition-colors
              ${activeTag === tag.slug
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            {tag.name}
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
