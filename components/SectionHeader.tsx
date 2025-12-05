import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  href?: string
  linkText?: string
}

export function SectionHeader({ title, subtitle, href, linkText = 'View All' }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-section-header-gap">
      <div>
        <h2 className="text-section-title font-extrabold text-neutral-900 mb-0">
          {title}
        </h2>
        {subtitle && (
          <p className="text-section-title font-light text-neutral-900 mt-0">
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-body-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1"
        >
          <span>{linkText}</span>
          <svg 
            className="w-6 h-6 rotate-90" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </Link>
      )}
    </div>
  )
}
