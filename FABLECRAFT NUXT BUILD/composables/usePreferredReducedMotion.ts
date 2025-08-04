// Composable to detect user's reduced motion preference
export const usePreferredReducedMotion = () => {
  const reducedMotion = ref(false)
  
  if (import.meta.client) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    reducedMotion.value = mediaQuery.matches
    
    // Listen for changes
    const updateMotionPreference = (e: MediaQueryListEvent) => {
      reducedMotion.value = e.matches
    }
    
    onMounted(() => {
      mediaQuery.addEventListener('change', updateMotionPreference)
    })
    
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    })
  }
  
  return readonly(reducedMotion)
}