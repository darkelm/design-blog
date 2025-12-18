# Adding Articles to Mock Data

This guide explains how to add new articles to the mock data system in a scalable, modular, and maintainable way.

## Overview

The mock data system uses a **content registry pattern** that separates article content from structure. This makes it easy to add new articles without modifying the factory function or breaking existing functionality.

## Architecture

### Components

1. **`lib/mockData/contentRegistry.ts`** - Centralized registry for article HTML content
2. **`lib/mockData.ts`** - Factory function (`createMockPost`) that creates post objects with validation
3. **`app/post/[slug]/page.tsx`** - Article page that renders posts

### Separation of Concerns

- **Content**: Stored in `contentRegistry.ts`
- **Structure**: Defined by `createMockPost()` function
- **Validation**: Built into `createMockPost()` with fallbacks
- **Rendering**: Handled by article page components

## Step-by-Step Guide

### Step 1: Add HTML Content to Content Registry

Open `lib/mockData/contentRegistry.ts` and add your article content:

```typescript
export const articleContentRegistry: Record<string, ArticleContent> = {
  // ... existing articles ...
  
  'your-article-id': {
    html: `<h1>Your Article Title</h1>

<p><strong>Publication Date</strong></p>

<p>Your article introduction paragraph...</p>

<h2>First Section Heading</h2>

<p>Section content...</p>

<h2>Second Section Heading</h2>

<p>More content...</p>

<p><em>Closing note or credits</em></p>`
  },
}
```

**Important Notes:**
- Use the post ID as the key (e.g., `'persp-1'`, `'spot-1'`)
- HTML content should be valid and sanitized (will be sanitized automatically)
- Use semantic HTML (`<h1>`, `<h2>`, `<p>`, `<em>`, `<strong>`, `<hr />`, etc.)
- Follow the existing content structure for consistency

### Step 2: Create the Post Entry

Open `lib/mockData.ts` and add your post to the `mockPosts` array:

```typescript
export const mockPosts: Post[] = [
  // ... existing posts ...
  
  createMockPost(
    'your-article-id',        // Unique ID (must match content registry key)
    'Your Article Title',      // Title (will be used to generate slug)
    'Brief excerpt...',        // Short excerpt for previews
    'tag-slug',                // Tag slug (e.g., 'perspectives', 'spotlight', 'case-studies')
    authorIndex,               // Author index (0-6, see mockAuthors array)
    false,                     // Featured? (true/false)
    daysAgo                    // Days ago published (0 = today)
  ),
]
```

### Step 3: Verify Required Data Exists

Before creating the post, ensure:

1. **Tag exists**: Check `mockTags` object in `lib/mockData.ts`
   - Available tags: `'case-studies'`, `'process'`, `'research'`, `'tools'`, `'interviews'`, `'perspectives'`, `'spotlight'`, `'events'`
   - If tag doesn't exist, it will fallback to `'process'` tag

2. **Author exists**: Check `mockAuthors` array in `lib/mockData.ts`
   - Currently 7 authors (indices 0-6)
   - If index is invalid, it will fallback to first author (index 0)

3. **Image exists** (optional): Add to `imageMap` in `createMockPost()` if you want a specific image
   - Default: `/images/figma/recent-1.jpg`
   - Place images in `public/images/figma/`

## Complete Example

### Example 1: Adding a Perspectives Article

**1. Add content to registry** (`lib/mockData/contentRegistry.ts`):

```typescript
'persp-3': {
  html: `<h1>The Future of Design Tools</h1>

<p><strong>May 2025</strong></p>

<p>Design tools are evolving rapidly. Here's what we're seeing...</p>

<h2>Current State</h2>

<p>Most design tools today...</p>

<h2>What's Next</h2>

<p>We predict...</p>

<p><em>Published by the Design Editorial Team, May 2025</em></p>`
},
```

**2. Create the post** (`lib/mockData.ts`):

```typescript
createMockPost(
  'persp-3',
  'The Future of Design Tools',
  'Design tools are evolving rapidly. Here's what we're seeing in the industry and what it means for designers.',
  'perspectives',
  1,  // Michael Torres
  false,
  5   // Published 5 days ago
),
```

**3. (Optional) Add image** - Add to `imageMap` in `createMockPost()`:

```typescript
const imageMap: Record<string, string> = {
  // ... existing images ...
  'persp-3': '/images/figma/perspectives-3.jpg',
}
```

### Example 2: Adding a Spotlight Article

**1. Add content to registry**:

```typescript
'spot-4': {
  html: `<h1>Interview: Design Leadership in 2025</h1>

<p><strong>June 2025</strong></p>

<hr />

<p>We sat down with...</p>

<h2>Question 1</h2>

<p>Answer...</p>

<h2>Question 2</h2>

<p>Answer...</p>

<hr />

<p><em>Thank you to...</em></p>`
},
```

**2. Create the post**:

```typescript
createMockPost(
  'spot-4',
  'Interview: Design Leadership in 2025',
  'We sat down with design leaders to discuss the future of design teams and leadership.',
  'spotlight',
  0,  // Sarah Chen
  false,
  10  // Published 10 days ago
),
```

## Validation & Error Handling

The system includes built-in validation:

- **Missing required fields**: Logs warning, continues with defaults
- **Invalid tag**: Falls back to `'process'` tag, logs warning
- **Invalid author index**: Falls back to first author (index 0), logs warning
- **Missing content**: Falls back to excerpt wrapped in `<p>` tags

All warnings are logged using the environment-aware logger (only in development).

## Best Practices

### 1. Content Organization

- **Use semantic HTML**: `<h1>` for title, `<h2>` for sections, `<p>` for paragraphs
- **Include metadata**: Add publication date, credits, etc.
- **Use horizontal rules**: `<hr />` to separate major sections (common in interviews)
- **Close with credits**: Use `<em>` tags for closing notes

### 2. Naming Conventions

- **Post IDs**: Use descriptive prefixes (`persp-`, `spot-`, `cs-`, `proc-`, etc.)
- **Slugs**: Auto-generated from title (lowercase, hyphens, no special chars)
- **Image names**: Match post ID or use descriptive names

### 3. Content Structure

Follow existing patterns:

**Perspectives Articles:**
```html
<h1>Title</h1>
<p><strong>Date</strong></p>
<p>Introduction...</p>
<h2>Section 1</h2>
<p>Content...</p>
<h2>Section 2</h2>
<p>Content...</p>
<p><em>Credits</em></p>
```

**Spotlight/Interview Articles:**
```html
<h1>Title</h1>
<p><strong>Date</strong></p>
<hr />
<p>Introduction...</p>
<hr />
<h2>Question/Heading</h2>
<p>Answer/Content...</p>
<h2>Question/Heading</h2>
<p>Answer/Content...</p>
<hr />
<p><em>Thank you...</em></p>
```

### 4. Testing

After adding an article:

1. **Build check**: Run `npm run build` to ensure no TypeScript errors
2. **Visual check**: Navigate to `/post/[slug]` to verify rendering
3. **Homepage check**: Verify article appears in correct sections
4. **Tag page check**: Verify article appears on tag archive pages

## Troubleshooting

### Article doesn't appear

- **Check slug**: Verify the slug matches what's in the URL
- **Check content registry**: Ensure the post ID matches the registry key
- **Check mockPosts array**: Ensure the post is added to the array

### Content not showing

- **Check content registry**: Verify HTML content exists for the post ID
- **Check console**: Look for validation warnings in development
- **Check fallback**: If no registry entry, it will use the excerpt

### Type errors

- **Check tag slug**: Ensure it exists in `mockTags`
- **Check author index**: Ensure it's within 0-6 range
- **Check types**: Ensure all required fields are provided

## File Structure Reference

```
lib/
├── mockData.ts                    # Factory function & mock data arrays
└── mockData/
    └── contentRegistry.ts         # HTML content registry

public/
└── images/
    └── figma/                     # Article images
        ├── featured-hero.jpg
        ├── recent-1.jpg
        ├── spotlight-1.jpg
        └── ...
```

## Quick Reference

### Available Tags

- `'case-studies'` - Case study articles
- `'process'` - Process articles
- `'research'` - Research articles
- `'tools'` - Tools articles
- `'interviews'` - Interview articles (legacy, use 'spotlight')
- `'perspectives'` - Perspective articles
- `'spotlight'` - Spotlight/interview articles
- `'events'` - Event articles

### Available Authors (indices)

- `0` - Sarah Chen (Senior Product Designer)
- `1` - Michael Torres (Design Systems Lead)
- `2` - Priya Sharma (UX Researcher)
- `3` - James Wilson (Design Tools Specialist)
- `4` - Lisa Park (Product Designer)
- `5` - David Kim (Accessibility Lead)
- `6` - Maya Chen (Service Designer)

### Image Map Locations

Common image paths:
- `/images/figma/featured-hero.jpg` - Featured article
- `/images/figma/recent-1.jpg` - Recent articles (fallback)
- `/images/figma/spotlight-1.jpg` - Spotlight articles
- `/images/figma/case-studies-1.jpg` - Case studies

## Summary

To add a new article:

1. ✅ Add HTML content to `lib/mockData/contentRegistry.ts` with post ID as key
2. ✅ Add post entry to `mockPosts` array using `createMockPost()`
3. ✅ (Optional) Add image to `imageMap` in `createMockPost()`
4. ✅ Verify tag and author exist
5. ✅ Test by building and viewing the article page

The system will automatically:
- Generate slug from title
- Validate inputs and provide fallbacks
- Use content from registry or fallback to excerpt
- Handle errors gracefully with logging

## Questions?

If you encounter issues:
1. Check the validation warnings in the console (development mode)
2. Verify all required fields are provided
3. Ensure content registry key matches post ID
4. Check that tag and author exist

The system is designed to be resilient - it will always provide fallbacks rather than breaking.





