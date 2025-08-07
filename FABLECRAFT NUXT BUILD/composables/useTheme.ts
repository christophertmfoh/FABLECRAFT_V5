// Centralized theme management composable for SSR-safe theming
import { getCurrentInstance } from 'vue'
import { themes, themeCategories, getTheme, isThemeDark, themeTransition } from '../constants/data'

// Client-only CSS loader for per-theme CSS chunks (lazy themes)
const loadedThemeCssNames = new Set<string>()
// Note: import.meta.glob evaluated at build time; safe to declare here
const themeCssModules = import.meta.glob('~/assets/css/themes/*.css')

async function preloadThemeCssIfNeeded(themeName: string): Promise<void> {
  if (!import.meta.client) return
  if (!themeName || themeName === 'system' || themeName === 'light' || themeName === 'dark') return
  if (loadedThemeCssNames.has(themeName)) return

  const entry = Object.entries(themeCssModules).find(([path]) => path.endsWith(`${themeName}.css`))
  if (!entry) return
  const [, loader] = entry
  try {
    await loader()
    loadedThemeCssNames.add(themeName)
  } catch {
    // Silently ignore; base theme variables still apply
  }
}

export const useTheme = () => {
  // Use cookie for SSR persistence
  const themeCookie = useCookie<string>('theme', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 365, // 1 year
    default: () => 'system', // Default to system theme
  })

  // ✅ FIXED: Simple SSR-safe theme state initialization
  const currentTheme = useState<string>('currentTheme', () => {
    return themeCookie.value || 'system'
  })

  // System theme detection
  const systemTheme = ref<'light' | 'dark'>('light')

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

  }

  // ✅ FIXED: Simple resolved theme with SSR safety
  const resolvedTheme = computed(() => {
    if (currentTheme.value === 'system') {
      // On server, default to light; on client, use actual system preference
      return import.meta.client ? systemTheme.value : 'light'
    }
    return currentTheme.value
  })

  // ✅ FIXED: Update DOM with current theme
  const updateDOMTheme = () => {
    if (!import.meta.client) return

    const resolved = resolvedTheme.value
    document.documentElement.setAttribute('data-theme', resolved)

    // Also update localStorage for redundancy
    localStorage.setItem('theme', currentTheme.value)
  }

  // Set theme function (preload CSS chunk before applying to DOM)
  const setTheme = async (themeName: string) => {
    if (import.meta.client) {
      await preloadThemeCssIfNeeded(themeName)
    }

    // Update state
    currentTheme.value = themeName

    // Update cookie for SSR
    themeCookie.value = themeName

    // Update DOM if on client
    updateDOMTheme()
  }

  // ✅ FIXED: Initialize theme on client
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

    // Preload CSS (client) to avoid flash, then set the theme
    void setTheme(themeToSet)
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
  const setThemeWithTransition = async (themeName: string) => {
    addThemeTransition()
    await setTheme(themeName)
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
    void setThemeWithTransition(newTheme)
  }

  // Auto-initialize removed; initialization is handled by the client plugin to avoid duplicate work.

  return {
    themes: readonly(themes),
    themeCategories: readonly(themeCategories),
    currentTheme: readonly(currentTheme),
    resolvedTheme: readonly(resolvedTheme),
    systemTheme: readonly(systemTheme),
    currentThemeObject: readonly(currentThemeObject),
    isDark: readonly(isDark),
    // Note: Removed isHydrated - simplified hydration approach
    setTheme,
    setThemeWithTransition,
    toggleTheme,
    initializeTheme,
    getTheme,
    isThemeDark,
  }
}
