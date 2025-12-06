'use client'

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'

export interface SectionColor {
  backgroundColor: string
  textColor: string
}

interface HeaderColorContextType {
  sectionColors: Map<string, SectionColor>
  defaultColors: SectionColor
  registerSection: (id: string, colors: SectionColor | null) => void
  unregisterSection: (id: string) => void
}

const HeaderColorContext = createContext<HeaderColorContextType | undefined>(undefined)

export function useHeaderColorContext() {
  const context = useContext(HeaderColorContext)
  if (!context) {
    throw new Error('useHeaderColorContext must be used within HeaderColorProvider')
  }
  return context
}

interface HeaderColorProviderProps {
  children: ReactNode
  defaultColors?: SectionColor
}

/**
 * HeaderColorProvider
 * 
 * Manages section colors for dynamic header color matching.
 * 
 * Best Practices:
 * - Uses useCallback to memoize functions and prevent infinite loops
 * - Uses useMemo to memoize context value
 * - Prevents unnecessary re-renders
 * 
 * Separation of Concerns:
 * - Color state management only
 * - No DOM manipulation
 * - No scroll detection
 */
export function HeaderColorProvider({ 
  children, 
  defaultColors = { backgroundColor: '#ffffff', textColor: '#171717' } 
}: HeaderColorProviderProps) {
  const [sectionColors, setSectionColors] = useState<Map<string, SectionColor>>(new Map())

  // Memoize registerSection to prevent infinite loops in useEffect dependencies
  const registerSection = useCallback((id: string, colors: SectionColor | null) => {
    setSectionColors(prev => {
      const next = new Map(prev)
      const currentColors = next.get(id)
      
      // Only update if colors actually changed
      if (colors) {
        if (
          !currentColors ||
          currentColors.backgroundColor !== colors.backgroundColor ||
          currentColors.textColor !== colors.textColor
        ) {
          next.set(id, colors)
          return next
        }
      } else {
        if (currentColors) {
          next.delete(id)
          return next
        }
      }
      
      // No change, return same reference
      return prev
    })
  }, [])

  // Memoize unregisterSection to prevent infinite loops
  const unregisterSection = useCallback((id: string) => {
    setSectionColors(prev => {
      if (!prev.has(id)) {
        return prev // No change needed
      }
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      sectionColors,
      defaultColors,
      registerSection,
      unregisterSection,
    }),
    [sectionColors, defaultColors, registerSection, unregisterSection]
  )

  return (
    <HeaderColorContext.Provider value={contextValue}>
      {children}
    </HeaderColorContext.Provider>
  )
}

