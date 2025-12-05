# Figma Design System Specifications

Complete design system specifications for setting up your design blog in Figma.

---

## Grid System

### Main Container

**No CSS Grid System** - The main container uses a centered max-width approach, not a column-based grid.

| Property | Value | Description |
|---------|-------|-------------|
| **Max Width** | `1400px` | Main content container (`max-w-content`) |
| **Centering** | `margin: 0 auto` | Horizontally centered |
| **Padding (Mobile)** | `24px` left/right | `px-6` |
| **Padding (Desktop)** | `64px` left/right | `px-section-x` |
| **Grid Type** | None | Content flows naturally, grids only within sections |

### Recommended Figma Grid System

For alignment and consistency in Figma, use a **12-column grid**:

| Property | Value | Notes |
|---------|-------|-------|
| **Columns** | `12` | Standard 12-column grid |
| **Column Width** | `104px` | (1400px - 128px padding) / 12 = 106px, rounded to 104px |
| **Gutter** | `40px` | Matches card gap |
| **Margins** | `64px` | Left/right padding |
| **Total Width** | `1400px` | Container max width |

**Grid Calculation:**
- Container: `1400px`
- Minus margins: `1400px - 128px (64px × 2) = 1272px`
- Column width: `(1272px - 11 gutters) / 12 = ~104px`
- Gutter: `40px` (matches card-gap)

### Container Widths

| Breakpoint | Max Width | Description |
|------------|-----------|-------------|
| **Desktop** | `1400px` | Main content container (`max-w-content`) |
| **Article** | `720px` | Article content width |
| **Newsletter** | `600px` | Newsletter section max width |
| **Newsletter Form** | `440px` | Newsletter form input width |
| **Hero Excerpt** | `540px` | Hero section excerpt max width |
| **Footer Description** | `300px` | Footer description max width |

### Margins & Padding

| Element | Mobile | Desktop (lg) | Token |
|---------|--------|--------------|-------|
| **Section Padding (X)** | `24px` (px-6) | `64px` (px-section-x) | `section-x: 4rem` |
| **Section Padding (Y)** | `48px` (py-section-y) | `48px` (py-section-y) | `section-y: 3rem` |
| **Navigation Padding (X)** | `24px` (px-6) | `64px` (px-nav-x) | `nav-x: 4rem` |
| **Card Gap** | `40px` (gap-10) | `40px` (gap-card-gap) | `card-gap: 2.5rem` |
| **Content Gap** | `48px` (gap-12) | `48px` (gap-content-gap) | `content-gap: 3rem` |

### Content Grid Layouts

These grids are used **within sections**, not for the main container:

| Layout | Columns | Gap | Column Span | Notes |
|--------|---------|-----|-------------|-------|
| **3-Column Grid** | 3 columns | `40px` | 4 cols each | Recent articles, Process, Research, Tools |
| **2-Column Grid** | 2 columns | `40px` | 6 cols each | Case studies (featured) |
| **Hero Layout** | 2 columns | `48px` | 6 cols each | Hero section (content + image) |
| **Footer Grid** | 4 columns | `64px` | `[6, 2, 2, 2]` | Footer layout (2fr, 1fr, 1fr, 1fr) |

---

## Typography Scale

### Display Sizes

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `display-xl` | `64px` (4rem) | `1.1` | `-0.02em` | Hero titles (updated to match Figma) |
| `display-lg` | `48px` (3rem) | `1.15` | `-0.02em` | Large headings |
| `display-md` | `36px` (2.25rem) | `1.2` | `-0.01em` | Section titles, Newsletter |
| `display-sm` | `28px` (1.75rem) | `1.3` | `-0.01em` | Subheadings |

### Section Titles

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `section-title` | `40px` (2.5rem) | `1.2` | Section headings (updated to match Figma) |

### Card Titles

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `card-title-lg` | `32px` (2rem) | `1.3` | Featured cards (2-column) - updated to match Figma |
| `card-title-md` | `24px` (1.5rem) | `1.3` | Default cards (3-column) - updated to match Figma |
| `card-title` | `24px` (1.5rem) | `1.3` | Default cards (matches card-title-md) |

### Body Text

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `body-lg` | `20px` (1.25rem) | `1.6` | Hero excerpts, large body |
| `body-md` | `16px` (1rem) | `1.5` | Article excerpts, body text |
| `body-sm` | `14px` (0.875rem) | `1.5` | Small body, card excerpts (updated to match Figma) |

### UI Text

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `nav` | `16px` (1rem) | `1.5` | - | Navigation links (updated to match Figma) |
| `label` | `14px` (0.875rem) | `1.4` | `0.02em` | Author names, labels (updated to match Figma) |
| `overline` | `12px` (0.75rem) | `1.4` | `0.05em` | Tag labels, categories |
| `footer-heading` | `13px` (0.8125rem) | `1.4` | `0.05em` | Footer section headings |
| `footer-link` | `15px` (0.9375rem) | `1.5` | - | Footer links |

### Font Weights

- **Regular**: `400` (default)
- **Medium**: `500` (labels, overlines)
- **Semibold**: `600` (headings, card titles)

---

## Color System

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#fafafa` | Section backgrounds (dark variant) |
| `neutral-100` | `#f5f5f5` | Newsletter background |
| `neutral-200` | `#e5e5e5` | Borders, dividers |
| `neutral-300` | `#d4d4d4` | Placeholder backgrounds |
| `neutral-400` | `#a3a3a3` | Featured dot, disabled text |
| `neutral-500` | `#737373` | Secondary text |
| `neutral-600` | `#525252` | Body text, links |
| `neutral-700` | `#404040` | - |
| `neutral-800` | `#262626` | Author names, headings |
| `neutral-900` | `#171717` | Primary text, buttons |
| `neutral-950` | `#0a0a0a` | - |

### Section Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `section-light` | `#ffffff` | White sections |
| `section-dark` | `#fafafa` | Light gray sections |
| `section-border` | `#e5e5e5` | Section borders |

### Accent (Currently Blue - Customize)

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-500` | `#0ea5e9` | Primary accent |
| `accent-600` | `#0284c7` | Hover states |

---

## Component Specifications

### Header

| Property | Value |
|----------|-------|
| **Height (Mobile)** | `64px` (h-16) |
| **Height (Desktop)** | `80px` (h-20) |
| **Logo Size** | `32px × 32px` (w-8 h-8) |
| **Logo Border Radius** | `8px` (rounded-lg) |
| **Nav Link Gap** | `40px` (gap-10) |
| **Padding (X)** | `24px` mobile, `64px` desktop |

### Hero Section

| Property | Value |
|----------|-------|
| **Layout** | Centered, stacked (image above content) |
| **Gap** | `40px` (gap-10) between image and content |
| **Image Dimensions** | `1312px × 542px` (desktop) |
| **Image Border Radius** | `4px` (rounded-sm) |
| **Content Width** | `635px` (max-w-hero-content) |
| **Excerpt Width** | `523px` (max-w-hero-excerpt) |
| **Author Avatar** | `24px × 24px` (w-6 h-6) - updated to match Figma |
| **Content Gap** | `24px` (gap-6) |
| **Section Title** | `64px` (text-display-xl) |

### Article Cards

#### Default Card (3-Column)

| Property | Value |
|----------|-------|
| **Image Dimensions** | `411px × 213px` (matches Figma) |
| **Border Radius** | `2px` (rounded-sm) - updated to match Figma |
| **Content Gap** | `24px` (gap-6) |
| **Tag Style** | Bordered rectangles (`border border-neutral-800`) - updated to match Figma |
| **Tag Padding** | `8px` (px-2 py-2) |
| **Tag Border Radius** | `2px` (rounded-sm) |
| **Tag Gap** | `16px` (gap-4) |
| **Author Avatar** | `24px × 24px` (w-6 h-6) - updated to match Figma |
| **Author Gap** | `12px` (gap-3) |
| **Date Format** | "Month, Day Year" (e.g., "January, 15 2024") |

#### Featured Card (2-Column)

| Property | Value |
|----------|-------|
| **Image Dimensions** | `636px × 309px` (matches Figma) |
| **Border Radius** | `2px` (rounded-sm) - updated to match Figma |
| **Content Gap** | `24px` (gap-6) |
| **Title-Body Gap** | `32px` (gap-8) |
| **Tag Style** | Bordered rectangles (`border border-neutral-800`) - updated to match Figma |
| **Tag Padding** | `8px` (px-2 py-2) |
| **Tag Border Radius** | `2px` (rounded-sm) |
| **Tag Gap** | `16px` (gap-4) |
| **Author Avatar** | `24px × 24px` (w-6 h-6) - updated to match Figma |

#### Spotlight Card

| Property | Value |
|----------|-------|
| **Image Dimensions** | `411px × 526px` (portrait, matches Figma) |
| **Border Radius** | `2px` (rounded-sm) |
| **Content Gap** | `24px` (gap-6) |
| **Title Size** | `24px` (text-card-title-md) |
| **No tags or author** | Simplified layout for team/people spotlight |

#### Horizontal Card (Perspectives)

| Property | Value |
|----------|-------|
| **Layout** | Side-by-side (content left, image right) |
| **Image Dimensions** | `524px × 524px` (square, matches Figma) |
| **Border Radius** | `2px` (rounded-sm) |
| **Content Gap** | `24px` (gap-6) |
| **Title-Body Gap** | `32px` (gap-8) |
| **Tag Style** | Bordered rectangles (`border border-neutral-800`) |
| **Author Avatar** | `24px × 24px` (w-6 h-6) |
| **Gap Between Columns** | `40px` (gap-10) |

#### Horizontal Card (Legacy)

| Property | Value |
|----------|-------|
| **Layout** | `[1fr, 300px]` grid |
| **Image Width** | `300px` |
| **Image Aspect Ratio** | `16:10` |
| **Border Bottom** | `1px solid neutral-200` |
| **Padding Bottom** | `32px` (pb-8) |
| **Content Gap** | `12px` (gap-3) |

### Topic Filter

| Property | Value |
|----------|-------|
| **Tag Padding** | `8px × 8px` (px-2 py-2) - updated to match Figma |
| **Border Radius** | `2px` (rounded-sm) - updated from rounded-full to match Figma |
| **Border Style** | `border border-neutral-800` - bordered rectangles instead of pills |
| **Gap Between Tags** | `12px` (gap-3) |
| **Active State** | `border-neutral-900 bg-neutral-900 text-white` |
| **Inactive State** | `border-neutral-800 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50` |

### Newsletter

| Property | Value |
|----------|-------|
| **Max Width** | `600px` |
| **Form Max Width** | `440px` |
| **Background** | `neutral-100` |
| **Padding (Y)** | `80px` (py-20) |
| **Input Padding** | `16px × 14px` (px-4 py-3.5) |
| **Input Border Radius** | `6px` (rounded-md) |
| **Button Padding** | `24px × 14px` (px-6 py-3.5) |
| **Success Icon** | `48px × 48px` (w-12 h-12) |

### Footer

| Property | Value |
|----------|-------|
| **Grid Layout** | `[2fr, 1fr, 1fr, 1fr]` |
| **Grid Gap** | `64px` (gap-16) |
| **Padding (Y)** | `64px` (py-16) |
| **Logo Size** | `32px × 32px` (w-8 h-8) |
| **Link Gap** | `12px` (space-y-3) |
| **Social Icon Size** | `24px × 24px` (w-6 h-6) |
| **Border Top** | `1px solid neutral-200` |

### Section Header

| Property | Value |
|----------|-------|
| **Title Size** | `24px` (text-2xl) |
| **Margin Bottom** | `40px` (mb-10) |
| **Padding Bottom** | `16px` (pb-4) |
| **Border Bottom** | `1px solid neutral-200` |
| **Link Gap** | `6px` (gap-1.5) |

---

## Spacing System

### Base Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `gap-0.5` | `2px` | Tight spacing |
| `gap-2` | `8px` | Featured dot gap |
| `gap-2.5` | `10px` | Tag spacing |
| `gap-3` | `12px` | Small gaps, author info |
| `gap-4` | `16px` | Default card content gap |
| `gap-5` | `20px` | Hero content gap (mobile) |
| `gap-6` | `24px` | Hero content gap (desktop) |
| `gap-8` | `32px` | Horizontal card gap |
| `gap-10` | `40px` | Navigation link gap |
| `gap-12` | `48px` | Content gap (hero) |
| `gap-16` | `64px` | Footer grid gap |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | `2px` | Cards, images, tags (updated to match Figma) |
| `rounded-md` | `6px` | Buttons, inputs |
| `rounded-lg` | `8px` | Logos (legacy) |
| `rounded-xl` | `12px` | Hero images (legacy) |
| `rounded-full` | `9999px` | Avatars only (tags now use rounded-sm) |

---

## Image Specifications

### Hero Image (Updated to match Figma)
- **Dimensions**: `1312px × 542px` (desktop)
- **Border Radius**: `4px` (rounded-sm)

### Default Card Image (3-Column)
- **Dimensions**: `411px × 213px` (matches Figma)
- **Border Radius**: `2px` (rounded-sm)

### Featured Card Image (2-Column)
- **Dimensions**: `636px × 309px` (matches Figma)
- **Border Radius**: `2px` (rounded-sm)

### Horizontal Card Image (Perspectives)
- **Dimensions**: `524px × 524px` (square, matches Figma)
- **Border Radius**: `2px` (rounded-sm)

### Spotlight Card Image
- **Dimensions**: `411px × 526px` (portrait, matches Figma)
- **Border Radius**: `2px` (rounded-sm)

### Author Avatar (Updated to match Figma)
- **All Cards**: `24px × 24px` (w-6 h-6)
- **Border Radius**: `50%` (rounded-full)

---

## Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `sm` | `640px` | Small tablets |
| `md` | `768px` | Tablets (2-column grids) |
| `lg` | `1024px` | Desktop (full layout) |

---

## Figma Setup Recommendations

### 1. Create Frames

- **Desktop**: `1400px` wide
- **Tablet**: `768px` wide
- **Mobile**: `375px` wide

### 2. Set Up Grids

**Main Container Grid (12-column):**
- **Columns**: `12`
- **Column Width**: `104px`
- **Gutter**: `40px`
- **Margins**: `64px` left/right
- **Total Width**: `1400px`

**Content Grids (within sections):**
- **3-Column Grid**: 3 columns, `40px` gutter (spans 4 cols each)
- **2-Column Grid**: 2 columns, `40px` gutter (spans 6 cols each)
- **Hero Grid**: 2 columns, `48px` gutter (spans 6 cols each)

### 3. Create Components

- **Article Card (Default)**: `500px × auto` (min-height for content)
- **Article Card (Featured)**: `600px × auto`
- **Article Card (Horizontal)**: `Full width × auto`
- **Hero Section**: `1400px × auto`
- **Header**: `1400px × 80px`
- **Footer**: `1400px × auto`

### 4. Style Guide

Create text styles for all typography tokens and color styles for the color system.

---

## Quick Reference

**Container**: `1400px` max width  
**Section Padding**: `64px` horizontal, `64px` vertical  
**Card Gap**: `40px`  
**3-Column Grid**: `3 columns, 40px gutter`  
**2-Column Grid**: `2 columns, 40px gutter`  
**Hero Image**: `700×525px, 4:3 ratio`  
**Card Image**: `500×300px, 16:10 ratio`  
**Featured Card Image**: `600×340px, 16:9 ratio`

