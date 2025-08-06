/**
 * SSR-safe unique ID generator
 * Uses Nuxt 3.10+ built-in useId
 */
export const useComponentId = (prefix: string = 'fc'): string => {
  // Use Nuxt's built-in useId for consistent SSR/client IDs
  const id = useId()
  return prefix ? `${prefix}-${id}` : id
}
