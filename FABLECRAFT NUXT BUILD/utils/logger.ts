/**
 * Logger utility for consistent logging across the application
 * Automatically disables logs in production unless explicitly enabled
 */

const isDevelopment = process.env.NODE_ENV === 'development'
const isDebugEnabled = process.env.NUXT_PUBLIC_DEBUG === 'true'

export const logger = {
  /**
   * Log general information
   */
  log: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.log('[FABLECRAFT]', ...args)
    }
  },

  /**
   * Log warnings
   */
  warn: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.warn('[FABLECRAFT WARN]', ...args)
    }
  },

  /**
   * Log errors - always shown even in production
   */
  error: (...args: any[]) => {
    console.error('[FABLECRAFT ERROR]', ...args)
  },

  /**
   * Log debug information - only in development
   */
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug('[FABLECRAFT DEBUG]', ...args)
    }
  },

  /**
   * Log performance metrics
   */
  time: (label: string) => {
    if (isDevelopment || isDebugEnabled) {
      console.time(`[FABLECRAFT PERF] ${label}`)
    }
  },

  timeEnd: (label: string) => {
    if (isDevelopment || isDebugEnabled) {
      console.timeEnd(`[FABLECRAFT PERF] ${label}`)
    }
  },

  /**
   * Log table data - useful for debugging arrays/objects
   */
  table: (data: any) => {
    if (isDevelopment || isDebugEnabled) {
      console.log('[FABLECRAFT TABLE]')
      console.table(data)
    }
  },

  /**
   * Group related logs
   */
  group: (label: string) => {
    if (isDevelopment || isDebugEnabled) {
      console.group(`[FABLECRAFT] ${label}`)
    }
  },

  groupEnd: () => {
    if (isDevelopment || isDebugEnabled) {
      console.groupEnd()
    }
  },
}

// Export a development-only logger for strict development logging
export const devLog = isDevelopment ? logger : {
  log: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
  time: () => {},
  timeEnd: () => {},
  table: () => {},
  group: () => {},
  groupEnd: () => {},
}