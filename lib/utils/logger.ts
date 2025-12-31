/**
 * Logger Utility
 * 
 * Centralized logging that respects environment and can integrate with error tracking services
 * 
 * Best Practices:
 * - Only logs in development by default
 * - Can be extended to send errors to tracking services in production
 * - Type-safe logging
 */

type LogLevel = 'log' | 'warn' | 'error'

function shouldLog(level: LogLevel): boolean {
  // Always log errors, but only log warnings/info in development
  if (level === 'error') return true
  return process.env.NODE_ENV === 'development'
}

function formatMessage(level: LogLevel, ...args: unknown[]): string {
  const timestamp = new Date().toISOString()
  return `[${timestamp}] [${level.toUpperCase()}] ${args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
  ).join(' ')}`
}

export const logger = {
  log: (...args: unknown[]) => {
    if (shouldLog('log')) {
      console.log(...args)
    }
  },
  
  warn: (...args: unknown[]) => {
    if (shouldLog('warn')) {
      console.warn(...args)
    }
    // In production, could send to monitoring service
    // if (process.env.NODE_ENV === 'production') {
    //   sendToMonitoringService('warn', formatMessage('warn', ...args))
    // }
  },
  
  error: (...args: unknown[]) => {
    // Always log errors
    console.error(...args)
    
    // In production, send to error tracking service
    // if (process.env.NODE_ENV === 'production') {
    //   sendToErrorTrackingService(new Error(formatMessage('error', ...args)), {
    //     level: 'error',
    //     args,
    //   })
    // }
  },
}








