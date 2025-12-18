# Color Fade Animations

This document explains the GSAP-based color fade animation system for section backgrounds.

## Overview

Sections with extracted colors (Featured, Case Studies, Perspectives, Process) fade in their background and text colors as the user scrolls down the page. Animations are rapid (0.6s) and smooth, triggered when sections enter the viewport.

## Architecture

### Separation of Concerns

1. **Animation Logic** (`lib/animations.ts`)
   - Pure animation functions
   - No component dependencies
   - Reusable across the app

2. **Component Layer** (`components/AnimatedSection.tsx`)
   - Wrapper component for sections
   - Handles React lifecycle
   - Manages GSAP cleanup

3. **Page Layer** (`app/page.tsx`)
   - Data fetching and color extraction
   - Composes components
   - No animation logic

### Modular Structure

```
lib/
  animations.ts          # Animation utilities (animateColorFade)
  colorExtraction.ts     # Image color extraction
  colorAccessibility.ts  # WCAG contrast calculations
  colorCache.ts          # Persistent color caching
  getSectionColors.ts    # Main color extraction orchestrator

components/
  AnimatedSection.tsx    # Reusable animated section wrapper
  Hero.tsx               # Hero with color fade animation
```

## Usage

### Using AnimatedSection Component

```tsx
import { AnimatedSection } from '@/components'

<AnimatedSection
  className="mx-auto max-w-content px-6 lg:px-10 py-12"
  backgroundColor="#829dce"
  textColor="#ffffff"
>
  {/* Section content */}
</AnimatedSection>
```

### Using Animation Directly

```tsx
import { animateColorFade } from '@/lib/animations'
import { useRef, useEffect } from 'react'

function MyComponent() {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      animateColorFade(ref.current, {
        backgroundColor: '#829dce',
        textColor: '#ffffff',
        duration: 0.6,
        start: 'top 90%',
      })
    }
  }, [])
  
  return <section ref={ref}>Content</section>
}
```

## Animation Details

### Timing
- **Duration**: 0.6 seconds (rapid fade-in)
- **Easing**: `power2.out` (smooth deceleration)
- **Trigger**: Starts when section top reaches 90% of viewport

### Performance
- Uses GSAP's optimized color interpolation
- ScrollTrigger handles scroll detection efficiently
- Proper cleanup prevents memory leaks

### Accessibility
- Colors are pre-calculated for WCAG AA compliance
- Text color automatically selected for contrast
- Animations respect `prefers-reduced-motion` (future enhancement)

## Current Implementation

### Sections with Color Fade
- ✅ **Featured (Hero)**: Fades in on scroll
- ✅ **Case Studies**: Fades in on scroll
- ✅ **Perspectives**: Fades in on scroll
- ✅ **Process**: Fades in on scroll

### Sections without Colors
- Recent Articles (uses default styling)
- Tools (uses default styling)
- Spotlight (uses default styling)
- Newsletter (uses default styling)

## Best Practices

1. **Always Clean Up**: GSAP animations must be killed on unmount
2. **Use AnimatedSection**: Prefer the component wrapper for consistency
3. **Test Performance**: Monitor ScrollTrigger instances in dev tools
4. **Respect Colors**: Only animate if colors are provided

## Future Enhancements

- [ ] Add `prefers-reduced-motion` support
- [ ] Add animation presets (slow, fast, etc.)
- [ ] Add stagger animations for nested elements
- [ ] Add intersection observer fallback for older browsers





