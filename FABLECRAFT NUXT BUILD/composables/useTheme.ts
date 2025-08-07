// ✅ PHASE 2: Optimized theme composable with granular cached data
// Uses Nuxt 3.18+ data layer optimizations for better header performance

export const useTheme = () => {
  // Use new granular cached data for better performance
  const { data: currentTheme } = useAsyncData('current-theme', () => {
    // Client-only theme detection to avoid hydration mismatches
    if (process.client) {
      return localStorage.getItem('theme') || 'system'
    }
    return 'system'
  }, {
    server: false, // Client-only for theme to avoid SSR hydration issues
    default: () => 'system',
    // ✅ PHASE 2: Use granular caching for consistent header state
    transform: (theme: string) => theme || 'system'
  })
  
  const setTheme = (theme: string) => {
    if (process.client) {
      currentTheme.value = theme
      localStorage.setItem('theme', theme)
      
      // Apply theme class to document for immediate visual feedback
      document.documentElement.className = theme
    }
  }
  
  // ✅ PHASE 2: Reactive theme detection for better UX
  const isDark = computed(() => {
    const theme = currentTheme.value
    if (theme === 'system') {
      return process.client ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
    }
    return theme.includes('dark') || theme === 'dark'
  })
  
  return {
    currentTheme: readonly(currentTheme),
    isDark: readonly(isDark),
    setTheme
  }
}
