# Article Layout System

A modular, scalable system for article page layouts that allows different article types to have slightly different layouts while maintaining consistency.

## Architecture

### Separation of Concerns

1. **Components** (`components/article/`): Reusable, composable UI components
2. **Layout System** (`lib/articleLayouts.ts`): Layout variant definitions and registry
3. **Page** (`app/post/[slug]/page.tsx`): Orchestrates data fetching and layout selection

### Component Structure

Each article section is a separate, reusable component:

- `ArticleHeader` - Title, credits, date
- `ArticleFeatureImage` - Hero image with configurable aspect ratios
- `ArticleContent` - Main article content with prose styles
- `ArticleCreditsSection` - Author credits with avatars and bios
- `NextUpSection` - Related articles list

### Layout Variants

The system supports multiple layout variants:

- **`default`** - Spotify Design-inspired layout (credits, image, content, credits section, next up)
- **`minimal`** - Simplified layout without credits section
- **`featured`** - Enhanced layout with larger image and prominent credits
- **`interview`** - Layout optimized for interview-style content

## Usage

### Using Default Layout

The page automatically determines the layout based on post metadata:

```tsx
// Automatically selects layout based on post tags/features
const layoutVariant = getLayoutVariantFromPost(post)
const layoutComponents = getArticleLayout(layoutVariant, {
  post,
  authors,
  relatedPosts,
})
```

### Creating a New Layout Variant

1. **Add variant to type**:
```typescript
export type ArticleLayoutVariant = 'default' | 'minimal' | 'featured' | 'interview' | 'your-variant'
```

2. **Create layout function**:
```typescript
export function getYourVariantLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: true },
      key: 'header',
    },
    // ... add components in desired order
  ]
}
```

3. **Register in layout registry**:
```typescript
const layoutRegistry: Record<ArticleLayoutVariant, ...> = {
  // ... existing layouts
  'your-variant': getYourVariantLayout,
}
```

4. **Update variant detection** (optional):
```typescript
export function getLayoutVariantFromPost(post: Post): ArticleLayoutVariant {
  // Add your detection logic
  if (post.tags?.some(tag => tag.slug === 'your-tag')) {
    return 'your-variant'
  }
  // ... existing logic
}
```

### Customizing Component Props

Each component accepts props for customization:

```typescript
// ArticleHeader
{
  post: Post
  authors: Author[]
  showCredits?: boolean  // Toggle credits display
  className?: string     // Additional classes
}

// ArticleFeatureImage
{
  post: Post
  aspectRatio?: '2/1' | '16/9' | '4/3' | '1/1'  // Image aspect ratio
  className?: string
}

// NextUpSection
{
  posts: Post[]
  title?: string        // Section title (default: 'Next up')
  showImage?: boolean   // Toggle thumbnail images
  className?: string
}
```

## Benefits

### Modularity
- Each component is self-contained and reusable
- Components can be used independently or in different combinations
- Easy to test individual components

### Scalability
- Add new layouts without modifying existing code
- Components can be extended with new props
- Layout registry pattern allows easy expansion

### Performance
- Components are optimized with Next.js Image
- Lazy loading for related articles
- Minimal re-renders with proper key usage

### Maintainability
- Single source of truth for each component
- Consistent styling through design tokens
- Clear separation between layout logic and UI

### Flexibility
- Different article types can have different layouts
- Easy to A/B test different layouts
- Can conditionally show/hide sections

## Best Practices

1. **Always use design tokens** - Never hardcode colors, spacing, or typography
2. **Keep components focused** - Each component should do one thing well
3. **Use TypeScript** - Proper typing ensures consistency and catches errors
4. **Document props** - Clear prop interfaces make components easier to use
5. **Test variants** - Ensure all layout variants work correctly

## Example: Adding a "Case Study" Layout

```typescript
// 1. Add to variant type
export type ArticleLayoutVariant = 'default' | 'minimal' | 'featured' | 'interview' | 'case-study'

// 2. Create layout function
export function getCaseStudyLayout({ post, authors, relatedPosts }: ArticleLayoutProps): ArticleLayoutComponent[] {
  return [
    {
      component: ArticleHeader,
      props: { post, authors, showCredits: true },
      key: 'header',
    },
    {
      component: ArticleFeatureImage,
      props: { post, aspectRatio: '16/9' },
      key: 'feature-image',
    },
    {
      component: ArticleContent,
      props: { post },
      key: 'content',
    },
    // Case studies might have a different credits section
    {
      component: ArticleCreditsSection,
      props: { authors, title: 'Project team' },
      key: 'credits',
    },
    {
      component: NextUpSection,
      props: { posts: relatedPosts, title: 'More case studies', showImage: true },
      key: 'next-up',
    },
  ]
}

// 3. Register
const layoutRegistry = {
  // ... existing
  'case-study': getCaseStudyLayout,
}

// 4. Update detection
export function getLayoutVariantFromPost(post: Post): ArticleLayoutVariant {
  if (post.tags?.some(tag => tag.slug === 'case-studies')) {
    return 'case-study'
  }
  // ... rest
}
```

That's it! The new layout is now available and will be automatically used for case study posts.

