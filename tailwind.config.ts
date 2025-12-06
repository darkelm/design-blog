import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Typography Scale - Sora + Source Serif 4 + IBM Plex Mono
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],      // Sora for display/headings
        serif: ['var(--font-serif)', 'Georgia', 'serif'],            // Source Serif 4 for body
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],            // IBM Plex Mono for code
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],    // Alias for Sora
      },
      fontSize: {
        // Display sizes - Sora, 600 weight
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],  // 56px - Homepage hero headline
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],  // 40px - Article page title
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],     // 32px - Section headers
        'display-sm': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],                              // 24px - Card headlines
        'display-xs': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],                            // 20px - Smaller card headlines
        
        // Body text - Source Serif 4, 400 weight
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],      // 20px - Article body copy
        'body-md': ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],   // 17px - Card excerpts, descriptions
        'body-sm': ['0.9375rem', { lineHeight: '1.5', fontWeight: '400' }],  // 15px - Secondary body text
        
        // UI text - Sora
        'label': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],     // 14px - Author names, dates, metadata
        'tag': ['0.75rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.05em' }],  // 12px - Tags, categories (uppercase)
        'overline': ['0.6875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.1em' }],    // 11px - Section labels, "Featured" (uppercase)
        'mono': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],     // 15px - Prompts, code, AI output
        
        // Legacy/Compatibility tokens
        'nav': ['0.9375rem', { lineHeight: '1.5', fontWeight: '500' }],       // 15px - Navigation links
        'footer-heading': ['0.6875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.05em' }],  // 11px - Footer column headers
        'footer-link': ['0.9375rem', { lineHeight: '1.5', fontWeight: '400' }],  // 15px - Footer links
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      // Color System
      colors: {
        // Neutrals - customize these for your brand
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Accent - swap for your brand color
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Semantic section colors
        section: {
          light: '#fbfbfb',      // Off-white sections (replaces pure white)
          dark: '#fafafa',       // Light gray sections (neutral-50)
          border: '#e5e5e5',      // Section borders (neutral-200)
          'header-border': '#829dce', // Header border color (matches Figma)
        },
      },
      // Spacing & Layout
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        // Semantic spacing tokens - Updated to match Figma
        'section-x': '4rem',      // Horizontal section padding (64px)
        'section-y': '3rem',      // Vertical section padding (48px) - Updated from 64px
        'nav-x': '4rem',          // Navigation horizontal padding (64px)
        'card-gap': '2.5rem',     // Gap between cards (40px)
        'content-gap': '3rem',     // Gap in content areas (48px)
        'section-header-gap': '2.875rem', // Gap between section header and content (46px)
        'header-height': '5rem',    // Header height (80px)
        'icon-size': '1.5rem',     // Standard icon size (24px)
        // Image heights - Specific Figma dimensions
        'hero-image-h': '542px',   // Hero image height
        'card-image-h-default': '213px',  // Default 3-column card image height
        'card-image-h-featured': '309px', // Featured 2-column card image height
        'card-image-h-horizontal': '524px', // Horizontal card image height
        'card-image-h-spotlight': '526px',  // Spotlight card image height
      },
      maxWidth: {
        'content': '1400px',
        'article': '720px',        // Article max-width: 680-720px for optimal serif readability
        'newsletter': '600px',     // Newsletter max width
        'newsletter-form': '440px', // Newsletter form width
        'hero-excerpt': '523px',   // Hero excerpt max width (matches Figma)
        'hero-content': '635px',    // Hero content container width (matches Figma)
        'footer-desc': '300px',    // Footer description max width
      },
      screens: {
        'xs': '475px',
        // Tailwind defaults: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
      },
      // Animation
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
