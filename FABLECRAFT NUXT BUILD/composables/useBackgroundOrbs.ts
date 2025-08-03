/**
 * Composable for managing background orbs across the application
 * Provides centralized control over orb effects
 */

interface OrbOptions {
  enabled?: boolean
  performanceMode?: 'low' | 'medium' | 'high'
  orbCount?: {
    primary?: number
    secondary?: number
    tertiary?: number
  }
}

export const useBackgroundOrbs = () => {
  // Global orb state
  const orbsEnabled = useState<boolean>('orbs-enabled', () => true)
  const performanceMode = useState<'low' | 'medium' | 'high'>('orbs-performance', () => 'medium')
  const orbCount = useState('orbs-count', () => ({
    primary: 1,
    secondary: 1,
    tertiary: 1
  }))

  // Auto-detect performance mode
  const detectPerformance = () => {
    if (!process.client) return 'medium'
    
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low'
    }
    
    // Check device memory (if available)
    const memory = (navigator as any).deviceMemory
    if (memory) {
      if (memory < 4) return 'low'
      if (memory >= 8) return 'high'
    }
    
    // Check CPU cores (if available)
    const cores = navigator.hardwareConcurrency
    if (cores) {
      if (cores < 4) return 'low'
      if (cores >= 8) return 'high'
    }
    
    return 'medium'
  }

  // Initialize performance mode
  const initializePerformance = () => {
    if (process.client && performanceMode.value === 'medium') {
      performanceMode.value = detectPerformance() as 'low' | 'medium' | 'high'
    }
  }

  // Toggle orbs on/off
  const toggleOrbs = () => {
    orbsEnabled.value = !orbsEnabled.value
  }

  // Set performance mode
  const setPerformanceMode = (mode: 'low' | 'medium' | 'high') => {
    performanceMode.value = mode
    
    // Adjust orb count based on performance mode
    switch (mode) {
      case 'low':
        orbCount.value = { primary: 1, secondary: 1, tertiary: 0 }
        break
      case 'medium':
        orbCount.value = { primary: 1, secondary: 1, tertiary: 1 }
        break
      case 'high':
        orbCount.value = { primary: 1, secondary: 2, tertiary: 2 }
        break
    }
  }

  // Update orb configuration
  const updateOrbConfig = (options: OrbOptions) => {
    if (options.enabled !== undefined) {
      orbsEnabled.value = options.enabled
    }
    if (options.performanceMode) {
      setPerformanceMode(options.performanceMode)
    }
    if (options.orbCount) {
      orbCount.value = { ...orbCount.value, ...options.orbCount }
    }
  }

  // Get current configuration
  const getConfig = () => ({
    enabled: orbsEnabled.value,
    performanceMode: performanceMode.value,
    orbCount: orbCount.value
  })

  return {
    // State
    orbsEnabled: readonly(orbsEnabled),
    performanceMode: readonly(performanceMode),
    orbCount: readonly(orbCount),
    
    // Methods
    initializePerformance,
    toggleOrbs,
    setPerformanceMode,
    updateOrbConfig,
    getConfig,
    detectPerformance
  }
}