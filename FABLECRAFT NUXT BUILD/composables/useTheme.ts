// Centralized theme management composable for SSR-safe theming
export const useTheme = () => {
  // Use cookie for SSR persistence
  const themeCookie = useCookie<string>('theme', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })
  
  // Available themes from the theme system
  const themes = [
    { name: 'light', label: 'Light', category: 'Core' },
    { name: 'dark', label: 'Dark', category: 'Core' },
    { name: 'arctic-focus', label: 'Arctic Focus', category: 'Classic Light' },
    { name: 'golden-hour', label: 'Golden Hour', category: 'Classic Light' },
    { name: 'midnight-ink', label: 'Midnight Ink', category: 'Classic Dark' },
    { name: 'forest-manuscript', label: 'Forest Manuscript', category: 'Classic Dark' },
    { name: 'starlit-prose', label: 'Starlit Prose', category: 'Classic Dark' },
    { name: 'coffee-house', label: 'Coffee House', category: 'Classic Dark' },
    { name: 'sunset-coral', label: 'Sunset Coral', category: 'Modern Light' },
    { name: 'lavender-dusk', label: 'Lavender Dusk', category: 'Modern Light' },
    { name: 'moonlit-garden', label: 'Moonlit Garden', category: 'Modern Light' },
    { name: 'cherry-lacquer', label: 'Cherry Lacquer', category: 'Modern Dark' },
    { name: 'dragons-hoard', label: 'Dragon\'s Hoard', category: 'Modern Dark' },
    { name: 'halloween', label: 'Halloween', category: 'Specialty' },
    { name: 'netrunner', label: 'Netrunner', category: 'Specialty' },
    { name: 'system', label: 'System', category: 'Auto' }
  ]
  
  // Theme categories
  const themeCategories = [
    'Core',
    'Classic Light', 
    'Classic Dark',
    'Modern Light',
    'Modern Dark',
    'Specialty',
    'Auto'
  ]
  
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
    if (process.client) {
      document.documentElement.setAttribute('data-theme', themeName)
      // Also update localStorage for redundancy
      localStorage.setItem('theme', themeName)
    }
  }
  
  // Initialize theme on client
  const initializeTheme = () => {
    if (!process.client) return
    
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
  
  return {
    themes,
    themeCategories,
    currentTheme: readonly(currentTheme),
    setTheme,
    initializeTheme
  }
}