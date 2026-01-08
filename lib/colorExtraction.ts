/**
 * Color Extraction Utilities
 * 
 * Extracts dominant colors from images using sharp
 */

import sharp from 'sharp'
import { rgbToHex, ensureAccessibleContrast, type ColorPair } from './colorAccessibility'
import { COLOR_CONFIG } from './constants'
import { logger } from './utils/logger'

export interface ExtractedColors {
  backgroundColor: string
  textColor: string
  contrastRatio: number
}

/**
 * Extract dominant color from an image
 * Uses k-means clustering on sampled pixels
 */
export async function extractDominantColor(
  imagePath: string | Buffer
): Promise<string | null> {
  try {
    // Resize image for faster processing
    // Convert URL to string if needed
    const input = imagePath instanceof URL ? imagePath.toString() : imagePath
    const image = sharp(input)
    const metadata = await image.metadata()
    
    const resized = await image
      .resize(COLOR_CONFIG.IMAGE_RESIZE_WIDTH, null, { withoutEnlargement: true })
      .raw()
      .toBuffer()

    const channels = metadata.channels || 3
    const pixels: Array<{ r: number; g: number; b: number }> = []

    // Sample pixels for performance
    for (let i = 0; i < resized.length; i += channels * COLOR_CONFIG.PIXEL_SAMPLE_RATE) {
      if (channels >= 3) {
        pixels.push({
          r: resized[i],
          g: resized[i + 1],
          b: resized[i + 2],
        })
      }
    }

    if (pixels.length === 0) {
      return null
    }

    // Simple k-means clustering (k=1, find average)
    // For better results, could use k-means with k=3-5 and pick the most vibrant
    const avg = pixels.reduce(
      (acc, pixel) => ({
        r: acc.r + pixel.r,
        g: acc.g + pixel.g,
        b: acc.b + pixel.b,
      }),
      { r: 0, g: 0, b: 0 }
    )

    const count = pixels.length
    const dominantColor = {
      r: Math.round(avg.r / count),
      g: Math.round(avg.g / count),
      b: Math.round(avg.b / count),
    }

    return rgbToHex(dominantColor.r, dominantColor.g, dominantColor.b)
  } catch (error) {
    logger.error('Error extracting color from image:', error)
    return null
  }
}

/**
 * Extract dominant color and ensure accessibility
 */
export async function extractAccessibleColor(
  imagePath: string | Buffer
): Promise<ExtractedColors | null> {
  // Convert URL to string if needed
  const input = imagePath instanceof URL ? imagePath.toString() : imagePath
  const dominantColor = await extractDominantColor(input)
  
  if (!dominantColor) {
    return null
  }

  const colorPair = ensureAccessibleContrast(dominantColor)
  
  return {
    backgroundColor: colorPair.backgroundColor,
    textColor: colorPair.textColor,
    contrastRatio: colorPair.contrastRatio,
  }
}

/**
 * Check if a URL is a video file
 */
function isVideoFile(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']
  const lowerUrl = url.toLowerCase()
  return videoExtensions.some(ext => lowerUrl.endsWith(ext))
}

/**
 * Download image from URL and extract color
 */
export async function extractColorFromUrl(imageUrl: string): Promise<ExtractedColors | null> {
  // Skip video files - sharp can't process them
  if (isVideoFile(imageUrl)) {
    logger.warn(`Skipping color extraction for video file: ${imageUrl}`)
    return null
  }

  try {
    // Handle local images (starting with /)
    if (imageUrl.startsWith('/')) {
      const fs = await import('fs/promises')
      const path = await import('path')
      const imagePath = path.join(process.cwd(), 'public', imageUrl)
      
      try {
        await fs.access(imagePath)
        return await extractAccessibleColor(imagePath)
      } catch {
        logger.warn(`Local image not found: ${imagePath}`)
        return null
      }
    }

    // Handle remote images
    const response = await fetch(imageUrl)
    if (!response.ok) {
      logger.warn(`Failed to fetch image: ${imageUrl}`)
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    return await extractAccessibleColor(buffer)
  } catch (error) {
    logger.error(`Error extracting color from URL ${imageUrl}:`, error)
    return null
  }
}

