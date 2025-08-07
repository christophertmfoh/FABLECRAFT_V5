// Centralized theme management composable for SSR-safe theming
import { getCurrentInstance } from 'vue'
import { themes, themeCategories, getTheme, isThemeDark, themeTransition } from '../constants/data'

export const useTheme = () => {
  // Use cookie for SSR persistence
  const themeCookie = useCookie<string>('theme', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 365, // 1 year
    default: () => 'system', // Default to system theme
  })

  // ✅ HYDRATION FIX: Use SSR-safe theme state initialization
  const currentTheme = useState<string>('currentTheme', () => {
    // Always start with 'system' on SSR to avoid hydration mismatch
    return import.meta.server ? 'system' : (themeCookie.value || 'system')
  })

  // ✅ HYDRATION FIX: System theme detection with SSR safety
  const systemTheme = ref<'light' | 'dark'>('light')
  
  // ✅ HYDRATION FIX: Flag to track if client hydration is complete
  const isHydrated = ref(false)

  // Initialize system theme detection on client only
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

    // Cleanup listener on unmount (only if in component context)
    if (getCurrentInstance()) {
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      })
    }

    // Mark as hydrated after initial setup
    nextTick(() => {
      isHydrated.value = true
    })
  }

  // ✅ HYDRATION FIX: Resolved theme with hydration safety
  const resolvedTheme = computed(() => {
    // During SSR or before hydration, always use 'light' to prevent mismatch
    if (import.meta.server || !isHydrated.value) {
      return currentTheme.value === 'system' ? 'light' : currentTheme.value
    }
    
    // After hydration, use actual system preference
    if (currentTheme.value === 'system') {
      return systemTheme.value
    }
    return currentTheme.value
  })

  // ✅ HYDRATION FIX: Update DOM with current theme (hydration-safe)
  const updateDOMTheme = () => {
    if (!import.meta.client || !isHydrated.value) return

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

  // ✅ HYDRATION FIX: Initialize theme on client (hydration-safe)
  const initializeTheme = () => {
    if (!import.meta.client) return

    // Wait for hydration to complete before initializing
    if (!isHydrated.value) {
      nextTick(() => {
        if (isHydrated.value) {
          initializeTheme()
        }
      })
      return
    }

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
    isHydrated: readonly(isHydrated), // ✅ HYDRATION FIX: Expose hydration state
    setTheme,
    setThemeWithTransition,
    toggleTheme,
    initializeTheme,
    getTheme,
    isThemeDark,
  }
}
