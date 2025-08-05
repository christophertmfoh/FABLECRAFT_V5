/**
 * Logger utility for consistent logging across the application
 * Simple wrapper around console methods to allow easy enable/disable in production
 */

// Simple logger that wraps console methods
// In production, you can disable logging by setting NUXT_PUBLIC_ENABLE_LOGS=false
export const logger = {
  log: console.log.bind(console, '[FABLECRAFT]'),
  warn: console.warn.bind(console, '[FABLECRAFT WARN]'),
  error: console.error.bind(console, '[FABLECRAFT ERROR]'),
  debug: console.debug.bind(console, '[FABLECRAFT DEBUG]'),
  time: (label: string) => console.time(`[FABLECRAFT PERF] ${label}`),
  timeEnd: (label: string) => console.timeEnd(`[FABLECRAFT PERF] ${label}`),
  table: (data: any) => {
    console.log('[FABLECRAFT TABLE]')
    console.table(data)
  },
  group: (label: string) => console.group(`[FABLECRAFT] ${label}`),
  groupEnd: () => console.groupEnd(),
}

// Export the same logger as devLog for backward compatibility
export const devLog = logger