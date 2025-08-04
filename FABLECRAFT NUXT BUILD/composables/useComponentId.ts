/**
 * SSR-safe unique ID generator
 * Uses Nuxt 3.10+ built-in useId when available
 */
export const useComponentId = (prefix: string = 'fc'): string => {
  // Check if Nuxt 3.10+ useId is available
  if (typeof useId === 'function') {
    return useId()
  }
  
  // Fallback for older Nuxt versions
  if (import.meta.server) {
    // Use a counter in SSR for deterministic IDs
    const counter = useState(`id-counter-${prefix}`, () => 0)
    counter.value++
    return `${prefix}-ssr-${counter.value}`
  }
  
  // Client-side random ID
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}