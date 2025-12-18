# Typography System

**Fonts:** Sora (display/headings) + Source Serif 4 (body) + IBM Plex Mono (code)

---

## Font Stack

| Font | Usage | Weights |
|------|-------|---------|
| **Sora** | Display text, headings, UI elements | 400, 500, 600 |
| **Source Serif 4** | Body copy, article content | 400, 500 |
| **IBM Plex Mono** | Code blocks, prompts, AI output | 400, 500 |

---

## Type Scale

| Token | Size | Line Height | Weight | Font | Use Case |
|-------|------|-------------|--------|------|----------|
| `display-xl` | 56px / 3.5rem | 1.1 | 600 | Sora | Homepage hero headline |
| `display-lg` | 40px / 2.5rem | 1.15 | 600 | Sora | Article page title |
| `display-md` | 32px / 2rem | 1.2 | 600 | Sora | Section headers (Recent, Case Studies) |
| `display-sm` | 24px / 1.5rem | 1.3 | 600 | Sora | Card headlines |
| `display-xs` | 20px / 1.25rem | 1.3 | 600 | Sora | Smaller card headlines |
| `body-lg` | 20px / 1.25rem | 1.6 | 400 | Source Serif 4 | Article body copy |
| `body-md` | 17px / 1.0625rem | 1.6 | 400 | Source Serif 4 | Card excerpts, descriptions |
| `body-sm` | 15px / 0.9375rem | 1.5 | 400 | Source Serif 4 | Secondary body text |
| `label` | 14px / 0.875rem | 1.4 | 500 | Sora | Author names, dates, metadata |
| `tag` | 12px / 0.75rem | 1.3 | 500 | Sora | Tags, categories (uppercase) |
| `overline` | 11px / 0.6875rem | 1.4 | 600 | Sora | Section labels, "Featured" (uppercase) |
| `mono` | 15px / 0.9375rem | 1.6 | 400 | IBM Plex Mono | Prompts, code, AI output |

---

## Usage Examples

### Homepage / Listing Pages

```tsx
// Navigation
<nav className="font-sans">
  <div className="text-[1.125rem] font-semibold">Logo</div> {/* 18px Sora 600 */}
  <a className="text-[0.9375rem] font-medium">Link</a> {/* 15px Sora 500 */}
  <button className="text-label font-semibold">Subscribe</button> {/* 14px Sora 600 */}
</nav>

// Hero
<div className="font-sans">
  <div className="text-overline uppercase tracking-[0.1em]">Featured</div> {/* 11px Sora 600 */}
  <h1 className="text-display-xl">Headline</h1> {/* 56px Sora 600 */}
  <p className="text-body-lg font-serif">Excerpt</p> {/* 20px Source Serif 4 */}
  <div className="text-label font-medium">Author Name</div> {/* 14px Sora 500 */}
  <div className="text-label font-normal">Date</div> {/* 14px Sora 400 */}
</div>

// Section Headers
<h2 className="text-display-md font-sans font-semibold">Section Title</h2> {/* 32px Sora 600 */}
<a className="text-label font-medium">View all</a> {/* 14px Sora 500 */}

// Article Cards
<div className="font-sans">
  <span className="text-tag uppercase tracking-[0.05em]">Tag</span> {/* 12px Sora 500 */}
  <h3 className="text-display-sm font-semibold">Headline</h3> {/* 24px Sora 600 */}
  <p className="text-body-md font-serif">Excerpt</p> {/* 17px Source Serif 4 */}
  <div className="text-label font-normal">Author + date</div> {/* 14px Sora 400 */}
</div>

// Featured Cards (2-column, larger)
<h3 className="text-display-md font-sans font-semibold">Headline</h3> {/* 32px Sora 600 */}
<p className="text-body-md font-serif">Excerpt</p> {/* 17px Source Serif 4 */}
```

### Article Page

```tsx
// Article Header
<div className="font-sans">
  <span className="text-tag uppercase tracking-[0.05em]">Tag</span> {/* 12px Sora 500 */}
  <h1 className="text-display-lg">Article Title</h1> {/* 40px Sora 600, can go 48px for short titles */}
  <p className="text-[1.375rem] font-serif italic">Excerpt/Dek</p> {/* 22px Source Serif 4 italic */}
  <div className="text-[0.9375rem] font-medium">Author name</div> {/* 15px Sora 500 */}
  <div className="text-[0.9375rem] font-normal">Date + read time</div> {/* 15px Sora 400 */}
</div>

// Article Body (uses .prose class)
<article className="prose">
  {/* Paragraphs: 20px Source Serif 4, 1.5em spacing, max-width 720px */}
  <p>Body copy...</p>
  
  {/* H2: 28px Sora 600, margin-top 2.5em, margin-bottom 0.75em */}
  <h2>Subheading</h2>
  
  {/* H3: 22px Sora 600, margin-top 2em, margin-bottom 0.5em */}
  <h3>Sub-subheading</h3>
  
  {/* Blockquotes: 22px Source Serif 4 italic */}
  <blockquote>Quote text...</blockquote>
  
  {/* Pull quotes: 28px Source Serif 4 500 */}
  <blockquote className="pull-quote">Key statement...</blockquote>
  
  {/* Code blocks: 15px IBM Plex Mono */}
  <pre><code>Code here...</code></pre>
  
  {/* Inline code: 16px IBM Plex Mono */}
  <code>inline code</code>
  
  {/* Captions: 14px Sora 400, muted gray */}
  <figcaption>Image caption</figcaption>
</article>

// Author Bio
<div className="font-sans">
  <h3 className="text-[1.125rem] font-semibold">Author Name</h3> {/* 18px Sora 600 */}
  <p className="text-[1rem] font-serif">Bio text</p> {/* 16px Source Serif 4 */}
</div>
```

### Footer

```tsx
<footer className="font-sans">
  <h4 className="text-footer-heading uppercase tracking-[0.05em]">Column Header</h4> {/* 11px Sora 600 */}
  <a className="text-footer-link font-normal">Link</a> {/* 15px Sora 400 */}
  <p className="text-label font-normal">Copyright</p> {/* 14px Sora 400 */}
</footer>
```

---

## Letter Spacing

| Context | Letter Spacing | Class |
|---------|----------------|-------|
| Overlines, tags (uppercase) | 0.05em – 0.1em | `tracking-[0.05em]` or `tracking-[0.1em]` |
| Display headlines (large) | -0.01em – -0.02em | Built into tokens |
| Body copy | 0 (default) | Default |
| Mono/code | 0 (default) | Default |

---

## Responsive Scaling

For mobile (< 768px), display sizes scale down automatically:

| Token | Desktop | Mobile |
|-------|---------|--------|
| `display-xl` | 56px | 36px |
| `display-lg` | 40px | 32px |
| `display-md` | 32px | 26px |
| `display-sm` | 24px | 20px |
| `body-lg` | 20px | 18px |
| `body-md` | 17px | 16px |

Body copy never goes below 16px on mobile for readability.

---

## Font Classes

### Font Family
- `font-sans` - Sora (for headings, UI)
- `font-serif` - Source Serif 4 (for body copy)
- `font-mono` - IBM Plex Mono (for code)

### Font Weight
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600

---

## Key Principles

1. **Display text** (headings, UI) → Use **Sora** (`font-sans`)
2. **Body copy** (articles, descriptions) → Use **Source Serif 4** (`font-serif`)
3. **Code/prompts** → Use **IBM Plex Mono** (`font-mono`)
4. **Article max-width**: 680-720px for optimal serif readability
5. **Paragraph spacing**: 1.5em (generous for editorial feel)
6. **Body line-height**: 1.6 for serif (needs room to breathe)
7. **Display line-height**: 1.1-1.3 (tighter for headlines)

---

## Migration Notes

- Old `text-body-md` (14px) → Use `text-label` (14px) or `text-body-sm` (15px)
- Old `text-body-sm` (14px) → Use `text-label` (14px)
- Old `text-display-*` sizes updated to match new scale
- Body copy now uses Source Serif 4 instead of sans-serif
- All display/heading text uses Sora

---

## Implementation

All typography tokens are defined in `tailwind.config.ts` and automatically applied through Tailwind classes. The fonts are loaded in `app/layout.tsx` via Next.js Google Fonts integration.





