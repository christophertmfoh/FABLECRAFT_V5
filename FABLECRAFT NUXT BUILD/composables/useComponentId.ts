/**
 * SSR-safe unique ID generator
 * Uses a consistent approach for server and client
 */
export const useComponentId = (prefix: string = 'fc'): string => {
  // Use useState to ensure consistent IDs between server and client
  const counter = useState(`id-counter-${prefix}`, () => 0)
  counter.value++
  return `${prefix}-${counter.value}`
}
