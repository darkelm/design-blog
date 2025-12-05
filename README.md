# Design Blog — Next.js + Ghost Headless CMS

A modern, enterprise-grade design blog built with Next.js 14 and Ghost as a headless CMS. Inspired by Figma and Google Design blogs.

## Features

- **Headless Architecture** — Ghost for content, Next.js for frontend
- **Full Design Control** — Custom styling with Tailwind CSS
- **Animations** — Smooth transitions with Framer Motion
- **SEO Optimized** — Dynamic metadata, Open Graph, Twitter cards
- **Responsive** — Mobile-first, works on all devices
- **Fast** — Static generation with ISR (Incremental Static Regeneration)
- **Type Safe** — Full TypeScript support

## Stack

| Layer | Technology |
|-------|------------|
| CMS | Ghost (self-hosted or Ghost Pro) |
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Google Fonts (customizable) |
| Deployment | Vercel (recommended) |

---

## Quick Start

### 1. Set Up Ghost

**Option A: Ghost Pro (Easiest)**
1. Sign up at [ghost.org](https://ghost.org)
2. Create your publication
3. Go to Settings → Integrations → Add custom integration
4. Copy your Content API URL and Key

**Option B: Self-Hosted**
1. Follow [Ghost's installation guide](https://ghost.org/docs/install/)
2. Create a custom integration for API access

### 2. Configure Environment

```bash
# Clone and enter the project
cd design-blog

# Copy environment example
cp .env.example .env.local

# Edit with your Ghost credentials
nano .env.local
```

Add your Ghost credentials:
```
GHOST_URL=https://your-ghost.ghost.io
GHOST_CONTENT_API_KEY=abc123...
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
design-blog/
├── app/
│   ├── layout.tsx          # Root layout (header, footer, fonts)
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles + Tailwind
│   ├── post/[slug]/page.tsx # Single article page
│   ├── tag/[slug]/page.tsx  # Tag archive page
│   └── author/[slug]/page.tsx # Author page
├── components/
│   ├── Header.tsx           # Navigation
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Featured article hero
│   ├── ArticleCard.tsx      # Reusable article card (4 variants)
│   ├── Newsletter.tsx       # Email signup
│   ├── TopicFilter.tsx      # Tag pills for filtering
│   └── SectionHeader.tsx    # Section titles
├── lib/
│   ├── ghost.ts             # Ghost API client
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helper functions
├── tailwind.config.ts       # Design tokens + theme
└── package.json
```

---

## Customization Guide

### Design Tokens (tailwind.config.ts)

All design decisions are centralized:

```typescript
// Colors — swap neutral/accent for your brand
colors: {
  neutral: { ... },  // Grays
  accent: { ... },   // Brand color
}

// Typography — update font families
fontFamily: {
  sans: ['var(--font-sans)', ...],
  display: ['var(--font-display)', ...],
}

// Font sizes — predefined scale
fontSize: {
  'display-xl': ['4rem', { lineHeight: '1.1' }],
  'display-lg': ['3rem', { lineHeight: '1.15' }],
  // ...
}
```

### Fonts (app/layout.tsx)

Replace Inter with your brand fonts:

```typescript
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
})

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
})
```

### Navigation (components/Header.tsx)

Update navigation links:

```typescript
const navigation = [
  { name: 'Articles', href: '/tag/articles' },
  { name: 'Case Studies', href: '/tag/case-studies' },
  // Add/remove as needed
]
```

---

## Ghost Content Setup

### Recommended Tags

Create these tags in Ghost for the homepage sections to work:

| Tag Slug | Purpose |
|----------|---------|
| `case-studies` | Featured case study section |
| `interviews` | Interview section |
| `process` | Process articles |
| `research` | Research articles |
| `tools` | Tools & resources |
| `pov` | Opinion pieces |
| `events` | Event announcements |

### Featured Posts

Mark a post as "Featured" in Ghost to display it in the hero section.

### Authors

Ghost handles multi-author natively. Each author gets their own page at `/author/[slug]`.

---

## Animation Customization

### Scroll Animations

ArticleCard uses Framer Motion for entrance animations:

```typescript
// Adjust timing in ArticleCard.tsx
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,      // Animation duration
      delay: index * 0.1, // Stagger delay
    },
  },
}
```

### Hover Effects

CSS-based for performance (globals.css):

```css
.hover-lift:hover {
  @apply -translate-y-1;
}

.hover-zoom:hover img {
  @apply scale-105;
}
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Build Commands

```bash
npm run build   # Production build
npm run start   # Start production server
```

---

## Adding More Pages

### Static Page (e.g., About)

```bash
mkdir app/about
touch app/about/page.tsx
```

```typescript
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 lg:px-10 py-20">
      <h1 className="text-display-lg font-semibold">About Us</h1>
      {/* Content */}
    </div>
  )
}
```

### Dynamic Page from Ghost Pages

Ghost has a Pages feature for static content. Fetch with `getPageBySlug()`.

---

## Performance Notes

- **ISR**: Pages revalidate every 60 seconds (configurable via `revalidate`)
- **Image Optimization**: Using Next.js Image component
- **Font Loading**: `display: swap` prevents FOIT
- **Animations**: CSS-first, Framer Motion for complex sequences

---

## Next Steps for AI Agent Iteration

When working with AI agents to customize:

1. **Start with design tokens** — Update `tailwind.config.ts` first
2. **Component by component** — Iterate on one component at a time
3. **Test in browser** — Run `npm run dev` and review visually
4. **Provide screenshots** — Show the agent what you want changed

Good prompts:
- "Update the color palette to use [brand colors]"
- "Change the hero layout to [description]"
- "Add a hover animation to the article cards that..."
- "Make the typography feel more [editorial/modern/playful]"

---

## License

MIT — Use freely for your design blog.
