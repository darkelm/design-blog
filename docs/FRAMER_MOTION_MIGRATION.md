# Framer Motion Migration Plan

## Current Status

**Issue**: We're using both Framer Motion and GSAP, which is redundant and can cause build issues.

**Current Usage**:
- ✅ **GSAP**: Advanced animations (color fades, scroll triggers, header animations)
- ⚠️ **Framer Motion**: Simple fade-in animations in Hero, ArticleCard, Newsletter, TopicFilter, Header

## The Problem

1. **Redundancy**: Two animation libraries doing similar things
2. **Bundle Size**: Framer Motion adds ~50KB to bundle
3. **Build Issues**: Can cause module resolution errors (like the current error)
4. **Inconsistency**: Different animation systems in the same codebase

## Migration Strategy

### Components to Migrate

1. **Hero.tsx** - Simple fade-in animations → GSAP `fadeIn`
2. **ArticleCard.tsx** - Card stagger animations → GSAP `staggerFadeIn`
3. **Newsletter.tsx** - Form fade-in → GSAP `fadeIn`
4. **TopicFilter.tsx** - Filter animations → GSAP `fadeIn`
5. **Header.tsx** - Mobile menu → GSAP (already using GSAP for other animations)

### Benefits of Migration

- ✅ **Smaller Bundle**: Remove ~50KB dependency
- ✅ **Consistency**: Single animation system
- ✅ **Performance**: GSAP is more performant for complex animations
- ✅ **No Build Issues**: Eliminates module resolution problems

## Recommendation

**Migrate to GSAP** - We already have a comprehensive GSAP animation system. The framer-motion usage is minimal and easy to replace.

Would you like me to migrate all components to GSAP now, or keep framer-motion for now and just fix the build error?








