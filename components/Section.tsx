import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  variant?: 'light' | 'dark'
  withBorder?: boolean
  className?: string
}

export function Section({ 
  children, 
  variant = 'light', 
  withBorder = true,
  className = '' 
}: SectionProps) {
  const bgColor = variant === 'light' ? 'bg-section-light' : 'bg-section-dark'
  const borderClass = withBorder ? 'border-t border-section-border' : ''
  
  return (
    <section className={`${bgColor} py-section-y ${borderClass} ${className}`}>
      <div className="mx-auto max-w-content px-fluid">
        {children}
      </div>
    </section>
  )
}

