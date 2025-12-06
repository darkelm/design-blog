'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call - replace with actual Ghost subscription endpoint
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, POST to your Ghost Members API or custom endpoint
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="bg-neutral-100" data-section-id="newsletter">
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-newsletter mx-auto text-center"
        >
          <h2 className="text-display-md font-semibold text-neutral-900 mb-4">
            Stay in the loop
          </h2>
          <p className="text-body-md text-neutral-600 mb-8">
            Get the latest articles, case studies, and event invites delivered to your inbox.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-neutral-900 font-medium">You're subscribed!</p>
              <p className="text-body-sm text-neutral-500 mt-1">Check your inbox for a confirmation email.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-newsletter-form mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3.5 bg-white border border-neutral-300 rounded-md text-body-md placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-body-md"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          <p className="text-body-sm text-neutral-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
