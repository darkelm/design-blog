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
        <h2 className="text-section-title font-sans font-medium mb-0" style={{ color: 'inherit' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-section-title font-sans font-normal mt-0" style={{ color: 'inherit' }}>
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-label font-sans font-semibold hover:opacity-70 transition-opacity flex items-center gap-1"
          style={{ color: 'inherit' }}
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
