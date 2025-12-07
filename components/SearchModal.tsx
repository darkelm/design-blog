'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import type { Post } from '@/lib/types'
import { formatDate, getPrimaryTagName, getPrimaryAuthorName } from '@/lib/utils'
import { Tag } from './Tag'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * SearchModal Component
 * 
 * Full-screen search modal with instant results
 * 
 * Features:
 * - Debounced search input
 * - Results display with post cards
 * - Keyboard navigation (ESC to close, Enter to select)
 * - Click outside to close
 * 
 * Separation of Concerns:
 * - UI: This component
 * - Data fetching: API route
 * - Search logic: Ghost API or mock data
 * - Animations: GSAP
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setQuery('')
      setResults([])
      setSelectedIndex(-1)
    }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    if (!isOpen) return

    const timeoutId = setTimeout(() => {
      if (query.trim().length === 0) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      
      fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.posts || [])
          setIsLoading(false)
          setSelectedIndex(-1)
        })
        .catch(error => {
          console.error('Search error:', error)
          setResults([])
          setIsLoading(false)
        })
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [query, isOpen])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault()
      router.push(`/post/${results[selectedIndex].slug}`)
      onClose()
    }
  }, [results, selectedIndex, router, onClose])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // GSAP animations for modal open/close
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return

    if (isOpen) {
      // Set initial state
      gsap.set(backdropRef.current, { opacity: 0 })
      gsap.set(modalRef.current, { opacity: 0, y: -20 })

      // Animate in
      const tl = gsap.timeline()
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
      tl.to(modalRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.1')
    } else {
      // Animate out
      const tl = gsap.timeline()
      tl.to(modalRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: 'power2.in',
      })
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, '-=0.1')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-x-0 top-0 z-50 bg-section-light shadow-xl"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
      >
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Search Input */}
          <div className="relative mb-8">
            <div className="flex items-center gap-4">
              <svg
                className="w-6 h-6 text-neutral-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags, authors..."
                className="flex-1 bg-transparent border-0 outline-0 text-display-sm font-sans font-normal text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="p-2 hover:bg-neutral-100 rounded transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-label font-sans text-neutral-500">
                  Searching...
                </div>
              </div>
            ) : query.trim().length === 0 ? (
              <div className="text-center py-12">
                <p className="text-body-md font-serif text-neutral-500">
                  Start typing to search articles, tags, and authors
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-body-md font-serif text-neutral-500">
                  No results found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((post, index) => {
                  const tagName = getPrimaryTagName(post.tags)
                  const authorName = getPrimaryAuthorName(post.authors)
                  const isSelected = index === selectedIndex

                  return (
                    <Link
                      key={post.id}
                      href={`/post/${post.slug}`}
                      onClick={onClose}
                      className={`block p-4 rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex gap-4">
                        {post.feature_image && (
                          <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded">
                            <Image
                              src={post.feature_image}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          {tagName && (
                            <div className="mb-2">
                              <Tag
                                tag={{ id: '', slug: '', name: tagName, visibility: 'public' }}
                                className="text-tag"
                              />
                            </div>
                          )}
                          <h3 className="text-display-sm font-sans font-semibold text-neutral-900 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-body-sm font-serif text-neutral-600 mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-label font-sans text-neutral-500">
                            {authorName && <span>{authorName}</span>}
                            {authorName && post.published_at && <span>·</span>}
                            {post.published_at && (
                              <span>{formatDate(post.published_at)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer hint */}
          {query.trim().length > 0 && results.length > 0 && (
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-label font-sans text-neutral-400 text-center">
                Press <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs">Enter</kbd> to select,{' '}
                <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs">Esc</kbd> to close
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
