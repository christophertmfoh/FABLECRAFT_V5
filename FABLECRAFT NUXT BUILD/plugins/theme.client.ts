// Client-side plugin for theme initialization and system preference watching
export default defineNuxtPlugin(() => {
  const { initializeTheme } = useTheme()

  // Initialize theme on client
  initializeTheme()

  // Watch for system preference changes
  if (import.meta.client) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Listen for changes to system color scheme
    mediaQuery.addEventListener('change', e => {
      const { currentTheme, setTheme } = useTheme()

      // Only update if user is using system theme
      if (currentTheme.value === 'system' || !currentTheme.value) {
        const systemTheme = e.matches ? 'dark' : 'light'
        setTheme(systemTheme)
      }
    })
  }
})
