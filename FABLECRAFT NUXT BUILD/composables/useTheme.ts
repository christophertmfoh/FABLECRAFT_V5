// Centralized theme management composable for SSR-safe theming
import { themes, themeCategories, getTheme, isThemeDark, themeTransition } from '../constants/data'

export const useTheme = () => {
  // Use cookie for SSR persistence
  const themeCookie = useCookie<string>('theme', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })
  
  // Current theme state
  const currentTheme = useState<string>('currentTheme', () => {
    // SSR: Use cookie value if available
    if (themeCookie.value) {
      return themeCookie.value
    }
    // Default to light theme
    return 'light'
  })
  
  // Set theme function
  const setTheme = (themeName: string) => {
    // Update state
    currentTheme.value = themeName
    
    // Update cookie for SSR
    themeCookie.value = themeName
    
    // Update DOM if on client
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', themeName)
      // Also update localStorage for redundancy
      localStorage.setItem('theme', themeName)
    }
  }
  
  // Initialize theme on client
  const initializeTheme = () => {
    if (!import.meta.client) return
    
    const savedTheme = themeCookie.value || localStorage.getItem('theme')
    
    if (savedTheme && savedTheme !== 'system') {
      setTheme(savedTheme)
    } else {
      // Handle system theme
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
      const systemTheme = prefersLight ? 'light' : 'dark'
      setTheme(systemTheme)
    }
  }
  
  // Add theme transition class
  const addThemeTransition = () => {
    if (!import.meta.client) return
    
    document.documentElement.classList.add(themeTransition.class)
    setTimeout(() => {
      document.documentElement.classList.remove(themeTransition.class)
    }, themeTransition.duration)
  }
  
  // Enhanced setTheme with transition
  const setThemeWithTransition = (themeName: string) => {
    addThemeTransition()
    setTheme(themeName)
  }
  
  // Get current theme object
  const currentThemeObject = computed(() => {
    return getTheme(currentTheme.value) || themes[0]
  })
  
  // Check if current theme is dark
  const isDark = computed(() => {
    return isThemeDark(currentTheme.value)
  })
  
  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    setThemeWithTransition(newTheme)
  }
  
  return {
    themes: readonly(themes),
    themeCategories: readonly(themeCategories),
    currentTheme: readonly(currentTheme),
    currentThemeObject: readonly(currentThemeObject),
    isDark: readonly(isDark),
    setTheme,
    setThemeWithTransition,
    toggleTheme,
    initializeTheme,
    getTheme,
    isThemeDark
  }
}