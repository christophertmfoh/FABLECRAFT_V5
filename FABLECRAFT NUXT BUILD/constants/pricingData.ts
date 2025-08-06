import type { PricingTier } from '~/composables/usePricingLogic'

/**
 * Default pricing tiers with 4-tier structure
 * Matches the React implementation exactly
 */
export const defaultPricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    period: '',
    description: 'Get started with limited features',
    isPopular: false,
    ctaText: 'Start Free',
    features: [
      { id: 'projects-3', text: '3 Free Projects', included: true },
      {
        id: 'ai-credits-limited',
        text: 'Limited Free AI Credits/Month',
        included: true,
      },
      { id: 'basic-features', text: 'All Basic Features', included: true },
      {
        id: 'community-access',
        text: 'Community Access & Sharing',
        included: true,
      },
      {
        id: 'standard-export',
        text: 'Standard Export & Sharing',
        included: true,
      },
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$15',
    period: '/month',
    description: 'Perfect for serious creators',
    isPopular: false,
    ctaText: 'Choose Starter',
    features: [
      { id: 'projects-unlimited', text: 'Unlimited Projects', included: true },
      {
        id: 'ai-credits-standard',
        text: 'Standard AI Credits/Month',
        included: true,
      },
      {
        id: 'advanced-features',
        text: 'Advanced Creative Features',
        included: true,
      },
      {
        id: 'basic-collaboration',
        text: 'Basic Collaboration Tools',
        included: true,
      },
      {
        id: 'enhanced-export',
        text: 'Enhanced Export Options',
        included: true,
      },
      {
        id: 'project-templates',
        text: 'Professional Project Templates',
        included: true,
      },
    ],
  },
  {
    id: 'professional',
    name: 'Creative Studio',
    price: '$29',
    period: '/month',
    description: 'Complete multimedia production powerhouse',
    isPopular: true,
    ctaText: 'Unleash Full Power',
    features: [
      {
        id: 'projects-unlimited',
        text: 'Unlimited Multimedia Projects',
        included: true,
      },
      {
        id: 'ai-credits-premium',
        text: 'Premium AI Credits/Month',
        included: true,
      },
      {
        id: 'video-generation',
        text: 'Pre-vis & Video Generation',
        included: true,
      },
      {
        id: 'audio-suite',
        text: 'Full Audio Production Suite & DAW',
        included: true,
      },
      {
        id: 'priority-support',
        text: 'Priority Support & Beta Access',
        included: true,
      },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact for Pricing',
    period: '',
    description: 'Custom solutions for teams and organizations',
    isPopular: false,
    ctaText: 'Contact Sales',
    features: [
      {
        id: 'everything-included',
        text: 'Everything in Creative Studio',
        included: true,
      },
      { id: 'unlimited-credits', text: 'Unlimited AI Credits', included: true },
      {
        id: 'custom-integrations',
        text: 'Custom Integrations & API Access',
        included: true,
      },
      {
        id: 'dedicated-support',
        text: 'Dedicated Account Manager',
        included: true,
      },
      { id: 'sso-security', text: 'SSO & Advanced Security', included: true },
      {
        id: 'custom-training',
        text: 'Custom Training & Onboarding',
        included: true,
      },
      { id: 'sla-guarantee', text: 'SLA Guarantee', included: true },
    ],
  },
]

/**
 * Alternative pricing tiers for different contexts
 */
export const compactPricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    description: 'Get started with basic features',
    isPopular: false,
    ctaText: 'Start Free',
    features: [
      { id: 'projects-3', text: '3 Projects', included: true },
      { id: 'basic-features', text: 'Basic Features', included: true },
      { id: 'community-access', text: 'Community Access', included: true },
    ],
  },
  {
    id: 'professional',
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Everything you need for professional work',
    isPopular: true,
    ctaText: 'Go Pro',
    features: [
      { id: 'projects-unlimited', text: 'Unlimited Projects', included: true },
      { id: 'ai-credits-premium', text: 'Premium AI Credits', included: true },
      { id: 'priority-support', text: 'Priority Support', included: true },
      { id: 'advanced-features', text: 'Advanced Features', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'Custom solutions for teams',
    isPopular: false,
    ctaText: 'Contact Sales',
    features: [
      { id: 'everything-included', text: 'Everything in Pro', included: true },
      { id: 'unlimited-credits', text: 'Unlimited Credits', included: true },
      { id: 'custom-integrations', text: 'Custom Integrations', included: true },
      { id: 'dedicated-support', text: 'Dedicated Support', included: true },
    ],
  },
]

/**
 * Feature categories for better organization
 */
export const featureCategories = {
  projects: [
    'projects-3',
    'projects-unlimited',
  ],
  ai: [
    'ai-credits-limited',
    'ai-credits-standard', 
    'ai-credits-premium',
    'unlimited-credits',
  ],
  features: [
    'basic-features',
    'advanced-features',
    'video-generation',
    'audio-suite',
  ],
  collaboration: [
    'community-access',
    'basic-collaboration',
    'custom-integrations',
  ],
  support: [
    'priority-support',
    'dedicated-support',
    'custom-training',
    'sla-guarantee',
  ],
  export: [
    'standard-export',
    'enhanced-export',
    'project-templates',
  ],
  security: [
    'sso-security',
  ],
} as const

/**
 * Utility functions for pricing data
 */
export const pricingUtils = {
  /**
   * Get tier by ID
   */
  getTierById: (id: string, tiers = defaultPricingTiers): PricingTier | undefined => {
    return tiers.find(tier => tier.id === id)
  },

  /**
   * Get popular tier
   */
  getPopularTier: (tiers = defaultPricingTiers): PricingTier | undefined => {
    return tiers.find(tier => tier.isPopular)
  },

  /**
   * Get tiers by feature
   */
  getTiersByFeature: (featureId: string, tiers = defaultPricingTiers): PricingTier[] => {
    return tiers.filter(tier =>
      tier.features.some(feature => 
        feature.id === featureId && feature.included
      )
    )
  },

  /**
   * Calculate feature coverage
   */
  getFeatureCoverage: (tier: PricingTier): number => {
    const includedFeatures = tier.features.filter(f => f.included).length
    return (includedFeatures / tier.features.length) * 100
  },

  /**
   * Sort tiers by price (numeric)
   */
  sortTiersByPrice: (tiers = defaultPricingTiers): PricingTier[] => {
    return [...tiers].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]/g, '')) || 0
      const priceB = parseFloat(b.price.replace(/[^0-9.-]/g, '')) || 0
      
      // Special handling for free and enterprise tiers
      if (a.price.toLowerCase() === 'free') return -1
      if (b.price.toLowerCase() === 'free') return 1
      if (a.price.toLowerCase().includes('contact')) return 1
      if (b.price.toLowerCase().includes('contact')) return -1
      
      return priceA - priceB
    })
  },

  /**
   * Validate pricing tier data
   */
  validateTier: (tier: PricingTier): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!tier.id) errors.push('Missing tier ID')
    if (!tier.name) errors.push('Missing tier name')
    if (!tier.price) errors.push('Missing tier price')
    if (!tier.description) errors.push('Missing tier description')
    if (!tier.ctaText) errors.push('Missing CTA text')
    if (!tier.features?.length) errors.push('Missing features')

    tier.features?.forEach((feature, index) => {
      if (!feature.id) errors.push(`Feature ${index + 1}: Missing ID`)
      if (!feature.text) errors.push(`Feature ${index + 1}: Missing text`)
      if (typeof feature.included !== 'boolean') {
        errors.push(`Feature ${index + 1}: Missing included boolean`)
      }
    })

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  /**
   * Validate all tiers
   */
  validateAllTiers: (tiers = defaultPricingTiers): { isValid: boolean; errors: Record<string, string[]> } => {
    const errors: Record<string, string[]> = {}
    
    tiers.forEach(tier => {
      const validation = pricingUtils.validateTier(tier)
      if (!validation.isValid) {
        errors[tier.id] = validation.errors
      }
    })

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

/**
 * Export default tiers as the main export
 */
export default defaultPricingTiers