/**
 * ArticleIntro Component
 * 
 * Intro section that appears above the main article content.
 * Displays a prominent heading and descriptive text about the blog.
 * 
 * Separation of Concerns:
 * - Layout: This component
 * - Content: Configurable via props
 * - Styling: Uses design tokens
 */
interface ArticleIntroProps {
  title?: string
  description?: string
  className?: string
}

export function ArticleIntro({ 
  title = "We're at the edges of AI and Design",
  description = "This is our one-stop shop for everything you want to know about how AI is impacting the way we work, the work we do, the way we deliver and what design will become.",
  className = '' 
}: ArticleIntroProps) {
  return (
    <section className={`w-full bg-section-light py-16 lg:py-24 xl:py-[9.5rem] ${className}`}>
      <div className="mx-auto max-w-content px-fluid">
        <div className="max-w-[902px] mx-auto text-center flex flex-col gap-6 lg:gap-8">
          {/* Main Heading - 48px on desktop, responsive on mobile, Plus Jakarta Sans Medium, line-height 52px */}
          <h2 className="text-2xl lg:text-display-md xl:text-[3rem] font-sans font-medium text-neutral-900 leading-tight lg:leading-[52px]">
            {title}
          </h2>
          
          {/* Description - 16px, Lora Regular, line-height 24px */}
          <p className="text-body-md font-serif text-neutral-600 leading-6">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

