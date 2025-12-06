'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Tag } from './Tag'
import type { Tag as TagType } from '@/lib/types'

interface TopicFilterProps {
  tags: TagType[]
  activeTag?: string
}

export function TopicFilter({ tags, activeTag }: TopicFilterProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="mx-auto max-w-content px-6 lg:px-section-x py-section-y">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-3 flex-wrap"
      >
        <Link
          href="/"
          className={`
            border px-2 py-2 rounded-sm text-tag font-sans font-medium uppercase tracking-[0.05em] transition-colors
            ${isHome && !activeTag
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-800 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
            }
          `}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Tag
            key={tag.slug}
            tag={tag}
            href={`/tag/${tag.slug}`}
            active={activeTag === tag.slug}
          />
        ))}
      </motion.div>
    </div>
  )
}
