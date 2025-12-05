import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href?: string
  linkText?: string
}

export function SectionHeader({ title, href, linkText = 'View all →' }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-200">
      <h2 className="text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-nav text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-1.5"
        >
          {linkText}
        </Link>
      )}
    </div>
  )
}
