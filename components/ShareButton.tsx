'use client'

import { useState, useEffect } from 'react'
import { event } from '@/lib/analytics'
import { logger } from '@/lib/utils/logger'

/**
 * ShareButton Component
 * 
 * Native Web Share API with fallback to manual share buttons.
 * Supports Twitter, LinkedIn, and copy link functionality.
 * 
 * Separation of Concerns:
 * - Share logic: This component
 * - UI: Design tokens
 * - Analytics: Can be extended
 * 
 * Note: Uses useEffect to check for native share API to prevent hydration errors.
 * Server always renders fallback, client updates after hydration.
 */
interface ShareButtonProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButton({ 
  url, 
  title, 
  description = '',
  className = '' 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [hasNativeShare, setHasNativeShare] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check for native share API only on client after mount
  useEffect(() => {
    setIsMounted(true)
    if (typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function') {
      setHasNativeShare(true)
    }
  }, [])

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
        // Track share event
        event({
          action: 'share',
          category: 'engagement',
          label: 'native_share',
        })
      } catch (error) {
        // User cancelled or error occurred
        if (error instanceof Error && error.name !== 'AbortError') {
          logger.error('Error sharing:', error)
        }
      }
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    // Track share event
    event({
      action: 'share',
      category: 'engagement',
      label: 'twitter',
    })
  }

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
    // Track share event
    event({
      action: 'share',
      category: 'engagement',
      label: 'linkedin',
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      // Track copy event
      event({
        action: 'copy_link',
        category: 'engagement',
        label: 'article_link',
      })
    } catch (error) {
      logger.error('Failed to copy link:', error)
    }
  }

  // Render consistent initial state (fallback) to prevent hydration errors
  // After mount, check for native share and update if available
  if (isMounted && hasNativeShare) {
    return (
      <button
        onClick={handleNativeShare}
        className={`px-4 py-2 bg-neutral-900 text-white text-label font-sans font-medium rounded-lg hover:bg-neutral-800 transition-colors ${className}`}
        aria-label="Share article"
      >
        Share
      </button>
    )
  }

  // Fallback to manual share buttons (rendered on server and client without native share)
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleTwitterShare}
        className="px-4 py-2 bg-neutral-900 text-white text-label font-sans font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        aria-label="Share on Twitter"
      >
        Twitter
      </button>
      <button
        onClick={handleLinkedInShare}
        className="px-4 py-2 bg-neutral-900 text-white text-label font-sans font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </button>
      <button
        onClick={handleCopyLink}
        className="px-4 py-2 bg-neutral-100 text-neutral-900 text-label font-sans font-medium rounded-lg hover:bg-neutral-200 transition-colors"
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

