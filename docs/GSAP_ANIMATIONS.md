# GSAP Animations Guide

This guide explains how to use GSAP (GreenSock Animation Platform) for animations in the design blog.

---

## Why GSAP?

GSAP offers several advantages over Framer Motion:

- **Performance**: Better for complex animations and large numbers of elements
- **Control**: More precise control over timelines and sequences
- **ScrollTrigger**: Powerful scroll-based animations
- **Size**: Can be smaller when you only need specific features
- **Flexibility**: Works with any DOM element, not just React components

---

## Installation

GSAP is already installed. To add plugins:

```bash
npm install gsap
# Optional plugins:
npm install gsap/ScrollTrigger
```

---

## Basic Usage

### Simple Fade In

```tsx
import { fadeInUp } from '@/lib/animations'
import { useEffect, useRef } from 'react'

export function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    fadeInUp(ref.current, 0.2) // delay of 0.2s
  }, [])
  
  return <div ref={ref}>Content</div>
}
```

### Scroll-Triggered Animation

```tsx
import { useScrollReveal } from '@/lib/animations'

export function MyComponent() {
  const ref = useScrollReveal({ y: 50, duration: 0.8 })
  
  return <div ref={ref}>Reveals on scroll</div>
}
```

### Stagger Animation (for lists)

```tsx
import { staggerFadeIn } from '@/lib/animations'
import { useEffect } from 'react'

export function ArticleList() {
  useEffect(() => {
    const cards = document.querySelectorAll('.article-card')
    staggerFadeIn(cards, { stagger: 0.1, y: 30 })
  }, [])
  
  return (
    <div>
      {articles.map(article => (
        <div key={article.id} className="article-card">...</div>
      ))}
    </div>
  )
}
```

---

## Available Utilities

### Animation Functions

- `fadeInUp(element, delay)` - Fade in from bottom
- `fadeIn(element, delay)` - Simple fade in
- `scrollReveal(element, options)` - Scroll-triggered reveal
- `staggerFadeIn(elements, options)` - Staggered animation for multiple elements

### React Hooks

- `useGSAP(callback, deps)` - Run GSAP animations in useEffect
- `useScrollReveal(options)` - Scroll-triggered animation hook

### Presets

- `animationPresets.hero.title(element)` - Hero title animation
- `animationPresets.hero.image(element)` - Hero image animation
- `animationPresets.cardGrid(elements)` - Card grid stagger
- `animationPresets.sectionHeader(element)` - Section header reveal

---

## Advanced: Custom Timelines

```tsx
import { createTimeline } from '@/lib/animations'
import { useEffect, useRef } from 'react'

export function ComplexAnimation() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const tl = createTimeline()
    
    tl.to(ref1.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(ref2.current, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.4') // Start 0.4s before previous ends
    
    return () => tl.kill()
  }, [])
  
  return (
    <>
      <div ref={ref1}>First</div>
      <div ref={ref2}>Second</div>
    </>
  )
}
```

---

## Migration from Framer Motion

### Before (Framer Motion)

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### After (GSAP)

```tsx
import { fadeInUp } from '@/lib/animations'
import { useEffect, useRef } from 'react'

const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  fadeInUp(ref.current, 0)
}, [])

<div ref={ref}>Content</div>
```

---

## Performance Tips

1. **Use ScrollTrigger sparingly** - Each ScrollTrigger instance has overhead
2. **Kill animations on unmount** - Always clean up in useEffect return
3. **Use `will-change` CSS** - For elements that will animate frequently
4. **Batch DOM reads/writes** - GSAP does this automatically, but be aware

---

## Examples

See `components/HeroGSAP.tsx` for a complete example of GSAP animations replacing Framer Motion.

