/**
 * Application Constants
 * 
 * Centralized constants to avoid magic numbers and improve maintainability
 */

// Header Configuration
export const HEADER_CONFIG = {
  HEIGHT: 80, // Header height in pixels
  INITIAL_CHECK_DELAY: 300, // Delay before initial color check (ms)
  POLLING_INTERVAL: 500, // Fallback polling interval (ms)
  POLLING_DURATION: 5000, // How long to poll before stopping (ms)
  SCROLL_THRESHOLD: 10, // Pixels to scroll before detecting direction change
} as const

// Color Extraction Configuration
export const COLOR_CONFIG = {
  IMAGE_RESIZE_WIDTH: 200, // Max width for color extraction (px)
  PIXEL_SAMPLE_RATE: 10, // Sample every Nth pixel for performance
  MIN_CONTRAST_RATIO: 4.5, // WCAG 2.1 AA standard
} as const

// Animation Configuration
export const ANIMATION_CONFIG = {
  HEADER_COLOR_DURATION: 0.6, // Header color transition duration (s)
  HEADER_SLIDE_DURATION: 0.3, // Header slide in/out duration (s)
  HEADER_SLIDE_EASE: 'power2.out' as const, // Header slide easing function
  FADE_DURATION: 0.8, // Standard fade duration (s)
  STAGGER_DELAY: 0.1, // Delay between staggered items (s)
} as const

// Ghost API Configuration
export const GHOST_CONFIG = {
  DEFAULT_LIMIT: 10, // Default posts per page
  MAX_LIMIT: 100, // Maximum posts per request
  REVALIDATE_TIME: 60, // ISR revalidation time (s)
} as const

// Mock Data Configuration
export const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true' || !process.env.GHOST_URL || process.env.GHOST_URL.includes('your-ghost-site')

