'use client'

import { HeaderColorProvider } from './HeaderColorProvider'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * Providers Component
 * 
 * Wraps all client-side providers needed by the app.
 * This allows server components to use client-side context.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <HeaderColorProvider>
      {children}
    </HeaderColorProvider>
  )
}

