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
  const isLatestActive = isHome && !activeTag

  return (
    <div className="mx-auto max-w-content px-fluid mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-6 items-start"
      >
        {/* "Dive into the" label */}
        <div className="flex items-center justify-center p-2">
          <p className="text-body-md" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Dive into the
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-6 items-start flex-wrap">
          <Link
            href="/"
            className={`
              px-6 py-2 rounded-[999px] text-body-md transition-colors
              ${isLatestActive
                ? 'bg-[#dedede] text-[#1a1a1a]'
                : 'border border-[#1a1a1a] text-[#2b2b2b] hover:bg-neutral-50'
              }
            `}
            style={{ fontFamily: isLatestActive ? 'Helvetica Neue, Helvetica, Arial, sans-serif' : 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: isLatestActive ? 500 : 400 }}
          >
            Latest
          </Link>
          {tags.map((tag) => {
            const isActive = activeTag === tag.slug
            return (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className={`
                  px-6 py-2 rounded-[999px] text-body-md transition-colors
                  ${isActive
                    ? 'bg-[#dedede] text-[#1a1a1a]'
                    : 'border border-[#1a1a1a] text-[#2b2b2b] hover:bg-neutral-50'
                  }
                `}
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: isActive ? 500 : 400 }}
              >
                {tag.name}
              </Link>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
