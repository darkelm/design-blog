'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Latest', href: '/' },
  { name: 'Case Studies', href: '/tag/case-studies' },
  { name: 'Spotlight', href: '/tag/spotlight' },
  { name: 'Perspectives', href: '/tag/perspectives' },
  { name: 'Tools', href: '/tag/tools' },
  { name: 'Process', href: '/tag/process' },
  { name: 'Events', href: '/tag/events' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-section-light border-b border-section-header-border">
      <nav className="mx-auto max-w-content px-6 lg:px-section-x">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <span className="text-2xl font-bold text-neutral-900">D&DP&AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-between max-w-[749px] ml-auto mr-0">
            <ul className="flex items-center justify-between w-full gap-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-md font-normal text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Search Icon */}
            <button 
              className="ml-8 p-0 text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0 w-6 h-6"
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-section-header-border"
            >
              <ul className="py-4 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-body-md text-neutral-900 hover:bg-neutral-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 px-4">
                  <button
                    className="w-full py-3 text-body-md text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Search"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
