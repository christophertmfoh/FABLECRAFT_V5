// Client-side plugin for theme initialization
export default defineNuxtPlugin(() => {
  const { initializeTheme } = useTheme()

  // Initialize theme on client
  initializeTheme()
  
  // Note: System theme watching is handled in the useTheme composable
})
