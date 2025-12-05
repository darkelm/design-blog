import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Typography Scale
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        // Card titles
        'card-title-lg': ['1.75rem', { lineHeight: '1.3' }],      // Featured cards
        'card-title-md': ['1.5rem', { lineHeight: '1.3' }],      // Horizontal list items
        'card-title': ['1.375rem', { lineHeight: '1.3' }],       // Default cards
        // Body text
        'body-lg': ['1.25rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.5' }],
        // UI text
        'nav': ['0.9375rem', { lineHeight: '1.5' }],             // Navigation links
        'label': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'footer-heading': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'footer-link': ['0.9375rem', { lineHeight: '1.5' }],
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
          light: '#ffffff',      // White sections
          dark: '#fafafa',       // Light gray sections (neutral-50)
          border: '#e5e5e5',      // Section borders (neutral-200)
        },
      },
      // Spacing & Layout
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        // Semantic spacing tokens
        'section-x': '4rem',      // Horizontal section padding (px-16)
        'section-y': '4rem',      // Vertical section padding (py-16)
        'nav-x': '4rem',          // Navigation horizontal padding
        'card-gap': '2.5rem',     // Gap between cards (gap-10)
        'content-gap': '3rem',     // Gap in content areas (gap-12)
      },
      maxWidth: {
        'content': '1400px',
        'article': '720px',
        'newsletter': '600px',     // Newsletter max width
        'newsletter-form': '440px', // Newsletter form width
        'hero-excerpt': '540px',   // Hero excerpt max width
        'footer-desc': '300px',    // Footer description max width
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
