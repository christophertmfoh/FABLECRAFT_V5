// Theme system configuration and metadata
// Central source of truth for all theme-related data

export interface Theme {
  name: string
  label: string
  category:
    | 'Core'
    | 'Classic Light'
    | 'Classic Dark'
    | 'Modern Light'
    | 'Modern Dark'
    | 'Specialty'
    | 'Auto'
  description?: string
  colorScheme: 'light' | 'dark' | 'auto'
  preview?: {
    primary: string
    secondary: string
    background: string
  }
}

export const themes: Theme[] = [
  // Core Themes
  {
    name: 'light',
    label: 'Light',
    category: 'Core',
    description: 'Default light theme with burgundy and parchment',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(350, 70%, 40%)',
      secondary: 'hsl(35, 40%, 85%)',
      background: 'hsl(45, 25%, 96%)',
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    category: 'Core',
    description: 'Default dark theme with amber and charcoal',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(35, 75%, 55%)',
      secondary: 'hsl(220, 20%, 25%)',
      background: 'hsl(220, 15%, 13%)',
    },
  },

  // Classic Light Themes
  {
    name: 'arctic-focus',
    label: 'Arctic Focus',
    category: 'Classic Light',
    description: 'Cool blues and whites for focused work',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(200, 70%, 45%)',
      secondary: 'hsl(210, 20%, 90%)',
      background: 'hsl(210, 25%, 98%)',
    },
  },
  {
    name: 'golden-hour',
    label: 'Golden Hour',
    category: 'Classic Light',
    description: 'Warm yellows for creative inspiration',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(45, 80%, 50%)',
      secondary: 'hsl(40, 30%, 85%)',
      background: 'hsl(50, 30%, 97%)',
    },
  },

  // Classic Dark Themes
  {
    name: 'midnight-ink',
    label: 'Midnight Ink',
    category: 'Classic Dark',
    description: 'Deep blue-black for night work',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(210, 70%, 65%)',
      secondary: 'hsl(220, 30%, 30%)',
      background: 'hsl(220, 25%, 10%)',
    },
  },
  {
    name: 'forest-manuscript',
    label: 'Forest Manuscript',
    category: 'Classic Dark',
    description: 'Green and brown nature theme',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(120, 40%, 55%)',
      secondary: 'hsl(30, 30%, 35%)',
      background: 'hsl(120, 15%, 12%)',
    },
  },
  {
    name: 'starlit-prose',
    label: 'Starlit Prose',
    category: 'Classic Dark',
    description: 'Purple cosmic writing environment',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(270, 60%, 65%)',
      secondary: 'hsl(250, 30%, 35%)',
      background: 'hsl(250, 20%, 11%)',
    },
  },
  {
    name: 'coffee-house',
    label: 'Coffee House',
    category: 'Classic Dark',
    description: 'Warm browns for cozy writing',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(25, 65%, 60%)',
      secondary: 'hsl(20, 30%, 35%)',
      background: 'hsl(20, 15%, 13%)',
    },
  },

  // Modern Light Themes
  {
    name: 'sunset-coral',
    label: 'Sunset Coral',
    category: 'Modern Light',
    description: 'Warm coral and gold sunset',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(15, 75%, 55%)',
      secondary: 'hsl(35, 40%, 85%)',
      background: 'hsl(25, 25%, 96%)',
    },
  },
  {
    name: 'lavender-dusk',
    label: 'Lavender Dusk',
    category: 'Modern Light',
    description: 'Soft lavender and grey',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(270, 50%, 60%)',
      secondary: 'hsl(260, 20%, 85%)',
      background: 'hsl(260, 20%, 96%)',
    },
  },
  {
    name: 'moonlit-garden',
    label: 'Moonlit Garden',
    category: 'Modern Light',
    description: 'Mystical moonlit blues',
    colorScheme: 'light',
    preview: {
      primary: 'hsl(220, 60%, 50%)',
      secondary: 'hsl(210, 30%, 85%)',
      background: 'hsl(210, 25%, 96%)',
    },
  },

  // Modern Dark Themes
  {
    name: 'cherry-lacquer',
    label: 'Cherry Lacquer',
    category: 'Modern Dark',
    description: 'Luxury deep red',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(350, 70%, 55%)',
      secondary: 'hsl(340, 30%, 30%)',
      background: 'hsl(340, 20%, 10%)',
    },
  },
  {
    name: 'dragons-hoard',
    label: "Dragon's Hoard",
    category: 'Modern Dark',
    description: 'Fantasy gold treasures',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(45, 85%, 60%)',
      secondary: 'hsl(40, 40%, 35%)',
      background: 'hsl(40, 25%, 12%)',
    },
  },

  // Specialty Themes
  {
    name: 'halloween',
    label: 'Halloween',
    category: 'Specialty',
    description: 'Spooky orange and black',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(25, 90%, 55%)',
      secondary: 'hsl(0, 0%, 20%)',
      background: 'hsl(0, 0%, 8%)',
    },
  },
  {
    name: 'netrunner',
    label: 'Netrunner',
    category: 'Specialty',
    description: 'Electric yellow and cyan cyberpunk',
    colorScheme: 'dark',
    preview: {
      primary: 'hsl(55, 100%, 60%)',
      secondary: 'hsl(180, 80%, 50%)',
      background: 'hsl(220, 30%, 10%)',
    },
  },

  // System Adaptation
  {
    name: 'system',
    label: 'System',
    category: 'Auto',
    description: 'Follow system color preference',
    colorScheme: 'auto',
  },
]

// Theme categories for grouping
export const themeCategories = [
  'Core',
  'Classic Light',
  'Classic Dark',
  'Modern Light',
  'Modern Dark',
  'Specialty',
  'Auto',
] as const

// Get themes by category
export const getThemesByCategory = (category: Theme['category']): Theme[] => {
  return themes.filter(theme => theme.category === category)
}

// Get theme by name
export const getTheme = (name: string): Theme | undefined => {
  return themes.find(theme => theme.name === name)
}

// Check if theme is dark
export const isThemeDark = (themeName: string): boolean => {
  const theme = getTheme(themeName)
  if (!theme) return false

  if (theme.colorScheme === 'auto') {
    // For system theme, check current preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  return theme.colorScheme === 'dark'
}

// Default themes
export const defaultLightTheme = 'light'
export const defaultDarkTheme = 'dark'

// Theme transition settings
export const themeTransition = {
  duration: 300, // milliseconds
  class: 'theme-transition',
}

// Visual effects configuration per theme
export const themeEffectsConfig: Record<string, { fireflies?: number; orbs?: number }> = {
  light: { fireflies: 12, orbs: 3 },
  dark: { fireflies: 8, orbs: 2 },
  'arctic-focus': { fireflies: 6, orbs: 2 },
  'golden-hour': { fireflies: 15, orbs: 4 },
  'midnight-ink': { fireflies: 10, orbs: 3 },
  'forest-manuscript': { fireflies: 12, orbs: 3 },
  'starlit-prose': { fireflies: 20, orbs: 5 },
  'coffee-house': { fireflies: 8, orbs: 2 },
  'sunset-coral': { fireflies: 15, orbs: 4 },
  'lavender-dusk': { fireflies: 10, orbs: 3 },
  'moonlit-garden': { fireflies: 12, orbs: 4 },
  'cherry-lacquer': { fireflies: 8, orbs: 2 },
  'dragons-hoard': { fireflies: 15, orbs: 5 },
  halloween: { fireflies: 20, orbs: 3 },
  netrunner: { fireflies: 25, orbs: 6 },
}

// Export type for use in components
export type ThemeName = (typeof themes)[number]['name']
export type ThemeCategory = (typeof themeCategories)[number]
