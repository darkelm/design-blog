/**
 * Color Accessibility Utilities
 * 
 * Calculates accessible text colors and contrast ratios
 * based on WCAG 2.1 guidelines
 */

export interface RGB {
  r: number
  g: number
  b: number
}

export interface ColorPair {
  backgroundColor: string
  textColor: string
  contrastRatio: number
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

/**
 * Calculate relative luminance (WCAG 2.1)
 * Returns a value between 0 (black) and 1 (white)
 */
export function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculate contrast ratio between two colors (WCAG 2.1)
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Determine if a color is light or dark
 */
export function isLightColor(rgb: RGB): boolean {
  const luminance = getLuminance(rgb)
  return luminance > 0.5
}

/**
 * Get accessible text color (black or white) for a given background
 * Ensures WCAG AA compliance (4.5:1 for normal text)
 */
export function getAccessibleTextColor(backgroundColor: RGB): string {
  const white: RGB = { r: 255, g: 255, b: 255 }
  const black: RGB = { r: 0, g: 0, b: 0 }

  const whiteContrast = getContrastRatio(backgroundColor, white)
  const blackContrast = getContrastRatio(backgroundColor, black)

  // Use the color with better contrast, but ensure minimum 4.5:1
  if (whiteContrast >= 4.5) {
    return '#ffffff'
  }
  if (blackContrast >= 4.5) {
    return '#000000'
  }

  // If neither meets 4.5:1, use the better one (shouldn't happen with good colors)
  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

/**
 * Adjust color brightness to ensure accessibility
 * Lightens dark colors or darkens light colors if needed
 */
export function ensureAccessibleContrast(
  backgroundColor: string,
  minContrast: number = 4.5
): ColorPair {
  const bgRgb = hexToRgb(backgroundColor)
  if (!bgRgb) {
    // Fallback to neutral gray
    return {
      backgroundColor: '#f5f5f5',
      textColor: '#000000',
      contrastRatio: 12.63,
    }
  }

  const white: RGB = { r: 255, g: 255, b: 255 }
  const black: RGB = { r: 0, g: 0, b: 0 }

  let adjustedBg = { ...bgRgb }
  let textColor = getAccessibleTextColor(adjustedBg)
  let contrast = getContrastRatio(
    adjustedBg,
    textColor === '#ffffff' ? white : black
  )

  // If contrast is too low, adjust the background color
  if (contrast < minContrast) {
    const isLight = isLightColor(adjustedBg)
    const targetLuminance = isLight ? 0.9 : 0.1 // Lighten dark colors, darken light colors

    // Adjust towards target luminance
    const currentLum = getLuminance(adjustedBg)
    const factor = targetLuminance / currentLum

    adjustedBg = {
      r: Math.min(255, Math.max(0, adjustedBg.r * factor)),
      g: Math.min(255, Math.max(0, adjustedBg.g * factor)),
      b: Math.min(255, Math.max(0, adjustedBg.b * factor)),
    }

    textColor = getAccessibleTextColor(adjustedBg)
    contrast = getContrastRatio(
      adjustedBg,
      textColor === '#ffffff' ? white : black
    )
  }

  return {
    backgroundColor: rgbToHex(adjustedBg.r, adjustedBg.g, adjustedBg.b),
    textColor,
    contrastRatio: contrast,
  }
}

