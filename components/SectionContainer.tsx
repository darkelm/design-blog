import { ReactNode } from 'react'

/**
 * SectionContainer Component
 * 
 * Reusable wrapper for section content that maintains consistent
 * max-width and padding across all sections.
 * 
 * Separation of Concerns:
 * - Layout logic: This component
 * - Content: Passed as children
 * - Styling: Uses design tokens
 * 
 * @example
 * <section className="w-full">
 *   <SectionContainer>
 *     Your content here
 *   </SectionContainer>
 * </section>
 */
interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return (
    <div className={`mx-auto max-w-content px-6 lg:px-section-x py-section-y ${className}`}>
      {children}
    </div>
  )
}
