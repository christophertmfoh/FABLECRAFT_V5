// Centralized theme management composable for SSR-safe theming
import { themes, themeCategories, getTheme, isThemeDark, themeTransition } from '../constants/data'
import { getCurrentInstance } from 'vue'

export const useTheme = () => {
  // Use cookie for SSR persistence
  const themeCookie = useCookie<string>('theme', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 365, // 1 year
    default: () => 'system', // Default to system theme
  })

  // Current theme state
  const currentTheme = useState<string>('currentTheme', () => {
    // SSR: Use cookie value if available, otherwise default to system
    return themeCookie.value || 'system'
  })

  // System theme detection
  const systemTheme = ref<'light' | 'dark'>('light')

  // Initialize system theme detection on client
  if (import.meta.client) {
    // Set initial system theme
    systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      systemTheme.value = e.matches ? 'dark' : 'light'
      // If current theme is system, update DOM
      if (currentTheme.value === 'system') {
        updateDOMTheme()
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Only cleanup if we're in a component context
    const instance = getCurrentInstance()
    if (instance) {
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      })
    }
  }

  // Resolved theme (what actually gets applied to DOM)
  const resolvedTheme = computed(() => {
    if (currentTheme.value === 'system') {
      return systemTheme.value
    }
    return currentTheme.value
  })

  // Update DOM with current theme
  const updateDOMTheme = () => {
    if (!import.meta.client) return

    const resolved = resolvedTheme.value
    document.documentElement.setAttribute('data-theme', resolved)

    // Also update localStorage for redundancy
    localStorage.setItem('theme', currentTheme.value)
  }

  // Set theme function
  const setTheme = (themeName: string) => {
    // Update state
    currentTheme.value = themeName

    // Update cookie for SSR
    themeCookie.value = themeName

    // Update DOM if on client
    updateDOMTheme()
  }

  // Initialize theme on client
  const initializeTheme = () => {
    if (!import.meta.client) return

    let themeToSet = currentTheme.value

    // Check localStorage as fallback
    const localStorageTheme = localStorage.getItem('theme')
    if (!themeCookie.value && localStorageTheme) {
      themeToSet = localStorageTheme
    }

    // If still no theme or invalid theme, default to system
    const validThemes = themes.map(t => t.name).concat(['system'])
    if (!themeToSet || !validThemes.includes(themeToSet)) {
      themeToSet = 'system'
    }

    // Set the theme (this will update DOM and cookie)
    setTheme(themeToSet)
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
    return isThemeDark(resolvedTheme.value)
  })

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    setThemeWithTransition(newTheme)
  }

  // Auto-initialize theme on client
  if (import.meta.client) {
    // Use nextTick to ensure DOM is ready
    nextTick(() => {
      initializeTheme()
    })
  }

  return {
    themes: readonly(themes),
    themeCategories: readonly(themeCategories),
    currentTheme: readonly(currentTheme),
    resolvedTheme: readonly(resolvedTheme),
    systemTheme: readonly(systemTheme),
    currentThemeObject: readonly(currentThemeObject),
    isDark: readonly(isDark),
    setTheme,
    setThemeWithTransition,
    toggleTheme,
    initializeTheme,
    getTheme,
    isThemeDark,
  }
}
