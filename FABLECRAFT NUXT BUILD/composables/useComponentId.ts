/**
 * SSR-safe unique ID generator
 * Uses Vue 3's built-in useId() for consistent server/client IDs
 */
export const useComponentId = (prefix: string = 'fc'): string => {
  // Use Vue's built-in useId() which is SSR-safe by design
  const id = useId()
  return prefix ? `${prefix}-${id}` : id
}
