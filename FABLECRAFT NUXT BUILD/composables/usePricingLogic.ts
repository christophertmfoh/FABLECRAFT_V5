import { ref, computed, type Ref } from 'vue'

/**
 * Pricing Feature Interface
 */
export interface PricingFeature {
  id: string
  text: string
  included: boolean
  highlight?: boolean
  tooltip?: string
}

/**
 * Pricing Tier Interface
 */
export interface PricingTier {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  isPopular?: boolean
  ctaText: string
  ctaVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  ribbon?: string
  customIcon?: string
}

/**
 * Plan Selection Event Data
 */
export interface PlanSelectionEvent {
  planId: string
  planDetails: PricingTier
  timestamp: Date
  source: 'click' | 'keyboard' | 'programmatic'
}

/**
 * Pricing Logic Composable
 * 
 * Provides reusable logic for pricing components including:
 * - Price formatting and validation
 * - Plan selection handling
 * - CTA button variants
 * - Analytics event tracking
 * - Authentication state management
 */
export function usePricingLogic() {
  // State
  const selectedTier = ref<string | null>(null)
  const isLoading = ref(false)
  const expandedFeatures = ref<Set<string>>(new Set())

  /**
   * Format price value with currency and handle special cases
   */
  const formatPrice = (price: string | number, currency = '$'): string => {
    const priceStr = typeof price === 'number' ? price.toString() : price
    
    // Handle special pricing cases
    const specialCases = ['free', 'contact', 'custom', 'enterprise']
    if (specialCases.some(special => priceStr.toLowerCase().includes(special))) {
      return priceStr
    }
    
    // Handle numeric pricing
    const numericPrice = priceStr.replace(/[^0-9.-]/g, '')
    if (!isNaN(Number(numericPrice)) && !priceStr.includes(currency)) {
      return `${currency}${numericPrice}`
    }
    
    return priceStr
  }

  /**
   * Format period with proper prefix
   */
  const formatPeriod = (period?: string): string => {
    if (!period) return ''
    return period.startsWith('/') ? period : `/${period}`
  }

  /**
   * Get the appropriate CTA button variant based on tier and auth state
   */
  const getCtaVariant = (
    tier: PricingTier, 
    isAuthenticated: boolean = false
  ): 'primary' | 'secondary' | 'outline' | 'ghost' => {
    // Custom variant override
    if (tier.ctaVariant) return tier.ctaVariant
    
    // Popular tier gets primary variant
    if (tier.isPopular) return 'primary'
    
    // Free tier gets secondary for unauthenticated users
    if (tier.id === 'free' && !isAuthenticated) return 'secondary'
    
    // Enterprise/contact tiers get outline
    if (tier.price.toLowerCase().includes('contact') || 
        tier.id === 'enterprise') return 'outline'
    
    // Default to primary for authenticated users, secondary for others
    return isAuthenticated ? 'primary' : 'secondary'
  }

  /**
   * Get CTA button text based on tier and authentication state
   */
  const getCtaText = (
    tier: PricingTier, 
    isAuthenticated: boolean = false
  ): string => {
    // Use custom CTA text if provided
    if (tier.ctaText) return tier.ctaText
    
    // Authentication-based text
    if (!isAuthenticated) {
      if (tier.id === 'free') return 'Start Free'
      return 'Get Started'
    }
    
    // Authenticated user text
    if (tier.id === 'free') return 'Continue Free'
    if (tier.price.toLowerCase().includes('contact')) return 'Contact Sales'
    
    return 'Upgrade Now'
  }

  /**
   * Handle plan selection with analytics and state management
   */
  const handlePlanSelection = (
    tier: PricingTier,
    options: {
      isAuthenticated?: boolean
      onPlanSelect?: (event: PlanSelectionEvent) => void
      onAuthRequired?: (planId: string) => void
      onNavigate?: (route: string) => void
      source?: 'click' | 'keyboard' | 'programmatic'
    } = {}
  ) => {
    const {
      isAuthenticated = false,
      onPlanSelect,
      onAuthRequired,
      onNavigate,
      source = 'click'
    } = options

    // Update selected tier state
    selectedTier.value = tier.id

    // Create selection event
    const selectionEvent: PlanSelectionEvent = {
      planId: tier.id,
      planDetails: tier,
      timestamp: new Date(),
      source
    }

    // Handle different tier types
    if (tier.price.toLowerCase().includes('contact') || tier.id === 'enterprise') {
      // Enterprise - navigate to contact/sales
      onNavigate?.('contact')
      onPlanSelect?.(selectionEvent)
      return
    }

    if (!isAuthenticated) {
      // User needs to authenticate
      onAuthRequired?.(tier.id)
      return
    }

    // Authenticated flow
    if (tier.id === 'free') {
      onNavigate?.('dashboard')
    } else {
      onNavigate?.('checkout')
    }

    onPlanSelect?.(selectionEvent)
  }

  /**
   * Toggle expanded state for feature details
   */
  const toggleFeatureExpansion = (featureId: string) => {
    const expanded = expandedFeatures.value
    if (expanded.has(featureId)) {
      expanded.delete(featureId)
    } else {
      expanded.add(featureId)
    }
  }

  /**
   * Check if a feature is expanded
   */
  const isFeatureExpanded = (featureId: string): boolean => {
    return expandedFeatures.value.has(featureId)
  }

  /**
   * Get popular tier from tiers array
   */
  const getPopularTier = (tiers: PricingTier[]): PricingTier | undefined => {
    return tiers.find(tier => tier.isPopular)
  }

  /**
   * Sort tiers with popular tier first
   */
  const sortTiersByPopularity = (tiers: PricingTier[]): PricingTier[] => {
    return [...tiers].sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1
      if (!a.isPopular && b.isPopular) return 1
      return 0
    })
  }

  /**
   * Validate pricing tier data
   */
  const validateTier = (tier: PricingTier): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!tier.id) errors.push('Tier ID is required')
    if (!tier.name) errors.push('Tier name is required')
    if (!tier.price) errors.push('Tier price is required')
    if (!tier.description) errors.push('Tier description is required')
    if (!tier.features || tier.features.length === 0) {
      errors.push('Tier must have at least one feature')
    }
    if (!tier.ctaText) errors.push('CTA text is required')

    // Validate features
    tier.features?.forEach((feature, index) => {
      if (!feature.id) errors.push(`Feature ${index + 1} missing ID`)
      if (!feature.text) errors.push(`Feature ${index + 1} missing text`)
      if (typeof feature.included !== 'boolean') {
        errors.push(`Feature ${index + 1} missing included boolean`)
      }
    })

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Calculate recommended tier based on feature requirements
   */
  const getRecommendedTier = (
    tiers: PricingTier[],
    requiredFeatures: string[]
  ): PricingTier | null => {
    const suitableTiers = tiers.filter(tier =>
      requiredFeatures.every(reqFeature =>
        tier.features.some(feature =>
          feature.text.toLowerCase().includes(reqFeature.toLowerCase()) &&
          feature.included
        )
      )
    )

    // Return the cheapest suitable tier, or popular if no specific match
    return suitableTiers.length > 0 
      ? suitableTiers[0] 
      : getPopularTier(tiers) || null
  }

  return {
    // State
    selectedTier: computed(() => selectedTier.value),
    isLoading: computed(() => isLoading.value),
    expandedFeatures: computed(() => expandedFeatures.value),

    // Formatting functions
    formatPrice,
    formatPeriod,

    // UI logic
    getCtaVariant,
    getCtaText,

    // Event handling
    handlePlanSelection,
    toggleFeatureExpansion,
    isFeatureExpanded,

    // Utility functions
    getPopularTier,
    sortTiersByPopularity,
    validateTier,
    getRecommendedTier,

    // State setters
    setLoading: (loading: boolean) => { isLoading.value = loading },
    clearSelection: () => { selectedTier.value = null },
    clearExpandedFeatures: () => { expandedFeatures.value.clear() }
  }
}