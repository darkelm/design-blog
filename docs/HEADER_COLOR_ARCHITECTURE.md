# Header Color Architecture

## Overview

The header dynamically matches the background color of the section it's currently over, providing a seamless visual experience similar to [Google Design](https://design.google/?home=).

## Architecture Principles

### 1. Separation of Concerns

- **HeaderColorProvider**: Manages color state only (no DOM manipulation)
- **Header Component**: Handles scroll detection and color animation
- **Section Components**: Register their colors with the context
- **Animation Utilities**: GSAP-based color transitions

### 2. Scalability

- **Modular Registration**: Each section independently registers/unregisters
- **No Hardcoded Values**: All colors come from extracted image colors or defaults
- **Reusable Components**: `AnimatedSection` can wrap any section
- **Context-Based**: Centralized state management via React Context

### 3. Performance Optimizations

- **Memoized Functions**: `useCallback` prevents infinite loops
- **Memoized Context Value**: `useMemo` prevents unnecessary re-renders
- **Throttled Scroll Handler**: `requestAnimationFrame` for smooth performance
- **Color Change Detection**: Only updates when colors actually change

### 4. Best Practices

- **Type Safety**: Full TypeScript coverage
- **Error Prevention**: Guards against infinite loops and unnecessary updates
- **Accessibility**: Colors meet WCAG 2.1 contrast ratios
- **Cleanup**: Proper cleanup of event listeners and intervals

## Component Structure

```
HeaderColorProvider (Context)
├── Header (Consumer)
│   ├── useScrollDirection (Hook)
│   ├── ScrollTrigger (GSAP)
│   └── animateHeaderColor (GSAP)
├── Hero (Registers 'featured')
├── AnimatedSection (Registers sectionId)
│   ├── Case Studies
│   ├── Perspectives
│   └── Process
└── Regular Sections (Use default colors)
    ├── Recent
    ├── Newsletter
    ├── Tools
    └── Spotlight
```

## How It Works

1. **Registration**: Sections register their colors via `registerSection(id, colors)`
2. **Detection**: Header detects which section it's over using scroll position
3. **Animation**: GSAP smoothly animates color transitions
4. **Cleanup**: Sections unregister on unmount

## Key Files

- `components/HeaderColorProvider.tsx`: Context provider with memoized functions
- `components/Header.tsx`: Main header with scroll detection
- `components/AnimatedSection.tsx`: Reusable section wrapper
- `components/Hero.tsx`: Featured section component
- `lib/animations.ts`: GSAP animation utilities
- `lib/useScrollDirection.ts`: Scroll direction detection hook

## Comparison with Google Design

Google Design uses a similar approach:
- **Intersection Observer API**: Detects which section is in view
- **Smooth Transitions**: CSS transitions or JavaScript animations
- **Section-Based Colors**: Each section defines its own color scheme

Our implementation uses:
- **Scroll Position Detection**: More control over trigger points
- **GSAP Animations**: More robust animation system
- **React Context**: Better integration with React component lifecycle

## Future Improvements

1. **Intersection Observer**: Could replace scroll handlers for better performance
2. **Color Caching**: Already implemented for extracted colors
3. **Prefers-Reduced-Motion**: Respect user motion preferences
4. **Server-Side Rendering**: Ensure colors are available on initial load

