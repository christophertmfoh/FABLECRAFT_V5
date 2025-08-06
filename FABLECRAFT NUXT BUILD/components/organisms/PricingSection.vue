<template>
  <Section
    id="pricing"
    :class="sectionClasses"
    spacing="lg"
    :aria-labelledby="sectionTitleId"
    role="region"
  >
    <div :class="containerClasses">
      <!-- Header -->
      <MPricingHeader
        :title="title"
        :description="description"
        :badge-text="badgeText"
        :badge-variant="badgeVariant"
        :show-pulsing-dot="showPulsingDot"
        :alignment="headerAlignment"
        :spacing="headerSpacing"
        :class="headerClasses"
      >
        <!-- Optional subtitle slot -->
        <template v-if="$slots.subtitle" #subtitle>
          <slot name="subtitle" />
        </template>
      </MPricingHeader>

      <!-- Pricing Cards Grid -->
      <div 
        :class="gridClasses"
        role="group"
        :aria-label="'Available pricing plans'"
      >
        <MPricingTier
          v-for="(tier, index) in sortedTiers"
          :key="tier.id"
          :tier="tier"
          :is-authenticated="isAuthenticated"
          :show-popular-badge="showPopularBadge"
          :variant="cardVariant"
          :size="cardSize"
          :enable-animations="enableAnimations"
          :class="getCardClasses(tier, index)"
          @plan-select="handlePlanSelect"
          @auth-required="handleAuthRequired"
          @navigate="handleNavigate"
          @feature-click="handleFeatureClick"
          @feature-expand="handleFeatureExpand"
        />
      </div>

      <!-- Optional additional content -->
      <div v-if="$slots.footer" :class="footerClasses">
        <slot name="footer" />
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { defaultPricingTiers } from '~/constants/pricingData'
import type { PricingTier, PricingFeature, PlanSelectionEvent } from '~/composables/usePricingLogic'

interface PricingSectionProps {
  /**
   * Array of pricing tiers to display
   */
  tiers?: PricingTier[]
  
  /**
   * Section title
   * @default 'Start Free, Scale with Your Stories'
   */
  title?: string
  
  /**
   * Section description
   * @default 'Whether you are writing your first novel or managing an entire creative universe, we have a plan that grows with your ambition.'
   */
  description?: string
  
  /**
   * Badge text
   * @default 'Simple, Transparent Pricing'
   */
  badgeText?: string
  
  /**
   * Badge variant
   * @default 'secondary'
   */
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  
  /**
   * Whether to show the pulsing dot animation
   * @default true
   */
  showPulsingDot?: boolean
  
  /**
   * Whether to show popular badges
   * @default true
   */
  showPopularBadge?: boolean
  
  /**
   * Visual variant of the pricing section
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'enterprise'
  
  /**
   * Size of the pricing cards
   * @default 'md'
   */
  cardSize?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether animations are enabled
   * @default true
   */
  enableAnimations?: boolean
  
  /**
   * Whether user is authenticated
   * @default false
   */
  isAuthenticated?: boolean
  
  /**
   * Current user data
   */
  currentUser?: any
  
  /**
   * Header text alignment
   * @default 'center'
   */
  headerAlignment?: 'left' | 'center' | 'right'
  
  /**
   * Header spacing
   * @default 'normal'
   */
  headerSpacing?: 'compact' | 'normal' | 'relaxed'
  
  /**
   * Grid layout variant
   * @default 'responsive'
   */
  gridLayout?: 'stack' | 'scroll' | 'responsive'
  
  /**
   * Additional CSS classes
   */
  class?: string
}

interface PricingSectionEmits {
  /**
   * Emitted when a plan is selected
   */
  planSelect: [event: PlanSelectionEvent]
  
  /**
   * Emitted when authentication is required
   */
  authRequired: [planId: string]
  
  /**
   * Emitted when navigation is needed
   */
  navigate: [route: string]
  
  /**
   * Emitted when a feature is clicked
   */
  featureClick: [feature: PricingFeature, tierId: string]
  
  /**
   * Emitted when a feature is expanded
   */
  featureExpand: [featureId: string, expanded: boolean, tierId: string]
  
  /**
   * Emitted when section becomes visible
   */
  sectionView: []
  
  /**
   * Emitted when a tier card becomes visible
   */
  tierView: [tierId: string]
}

const props = withDefaults(defineProps<PricingSectionProps>(), {
  title: 'Start Free, Scale with Your Stories',
  description: 'Whether you are writing your first novel or managing an entire creative universe, we have a plan that grows with your ambition.',
  badgeText: 'Simple, Transparent Pricing',
  badgeVariant: 'secondary',
  showPulsingDot: true,
  showPopularBadge: true,
  variant: 'default',
  cardSize: 'md',
  enableAnimations: true,
  isAuthenticated: false,
  headerAlignment: 'center',
  headerSpacing: 'normal',
  gridLayout: 'responsive'
})

const emit = defineEmits<PricingSectionEmits>()

// Use pricing logic composable
const { sortTiersByPopularity } = usePricingLogic()

// Generate unique ID for accessibility
const sectionTitleId = computed(() => 'pricing-section-title')

// Sort tiers with popular first
const sortedTiers = computed(() => {
  const tiersToUse = props.tiers || defaultPricingTiers
  return sortTiersByPopularity(tiersToUse)
})

// Card variant based on section variant
const cardVariant = computed(() => {
  const variantMap = {
    default: 'default' as const,
    compact: 'compact' as const,
    enterprise: 'featured' as const
  }
  return variantMap[props.variant]
})

// Event handlers
const handlePlanSelect = (tier: PricingTier, source: 'click' | 'keyboard') => {
  const event: PlanSelectionEvent = {
    planId: tier.id,
    planDetails: tier,
    timestamp: new Date(),
    source
  }
  emit('planSelect', event)
}

const handleAuthRequired = (planId: string) => {
  emit('authRequired', planId)
}

const handleNavigate = (route: string) => {
  emit('navigate', route)
}

const handleFeatureClick = (feature: PricingFeature) => {
  // Find which tier this feature belongs to
  const tiersToUse = props.tiers || defaultPricingTiers
  const tier = tiersToUse.find(t => 
    t.features.some(f => f.id === feature.id)
  )
  emit('featureClick', feature, tier?.id || '')
}

const handleFeatureExpand = (featureId: string, expanded: boolean) => {
  // Find which tier this feature belongs to
  const tiersToUse = props.tiers || defaultPricingTiers
  const tier = tiersToUse.find(t => 
    t.features.some(f => f.id === featureId)
  )
  emit('featureExpand', featureId, expanded, tier?.id || '')
}

// Classes
const sectionClasses = computed(() => {
  const baseClasses = 'pricing-section relative z-10 bg-muted/20'
  
  const variantClasses = {
    default: '',
    compact: 'py-16',
    enterprise: 'bg-gradient-to-b from-background to-muted/30'
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    props.class
  ].filter(Boolean).join(' ')
})

const containerClasses = computed(() => {
  const baseClasses = 'max-w-7xl mx-auto px-8'
  
  const spacingClasses = {
    default: 'section-spacing-compact',
    compact: 'py-12',
    enterprise: 'py-20'
  }
  
  return [
    baseClasses,
    spacingClasses[props.variant]
  ].join(' ')
})

const headerClasses = computed(() => {
  const baseClasses = 'text-center'
  
  const spacingClasses = {
    compact: 'mb-8',
    normal: 'mb-12',
    relaxed: 'mb-16'
  }
  
  return [
    baseClasses,
    spacingClasses[props.headerSpacing]
  ].join(' ')
})

const gridClasses = computed(() => {
  const baseClasses = 'pricing-grid'
  
  const layoutClasses = {
    stack: 'flex flex-col gap-6 max-w-md mx-auto',
    scroll: 'flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:grid lg:grid-cols-4',
    responsive: 'flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-acquaintances overflow-x-auto lg:overflow-visible'
  }
  
  const variantClasses = {
    default: '',
    compact: 'max-w-4xl',
    enterprise: 'lg:grid-cols-3'
  }
  
  return [
    baseClasses,
    layoutClasses[props.gridLayout],
    variantClasses[props.variant]
  ].filter(Boolean).join(' ')
})

const footerClasses = computed(() => {
  return 'mt-16 text-center'
})

// Get individual card classes with stagger animation
const getCardClasses = (tier: PricingTier, index: number) => {
  const baseClasses = 'pricing-card'
  
  const animationClasses = props.enableAnimations 
    ? `animate-entrance animation-delay-${index + 1}`
    : ''
  
  const popularClasses = tier.isPopular 
    ? 'pricing-card--popular'
    : ''
  
  return [
    baseClasses,
    animationClasses,
    popularClasses
  ].filter(Boolean).join(' ')
}

// Intersection Observer for analytics
if (process.client) {
  const sectionElement = ref<HTMLElement>()
  
  onMounted(() => {
    // Section visibility tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            emit('sectionView')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (sectionElement.value) {
      observer.observe(sectionElement.value)
    }
    
    onUnmounted(() => {
      observer.disconnect()
    })
  })
}
</script>

<style scoped>
/**
 * PricingSection Organism Styles
 * 
 * Provides layout and styling for the complete pricing section
 * with responsive behavior and animation support.
 */

.pricing-section {
  /* Ensure proper stacking context */
  position: relative;
}

/* Grid layout for responsive behavior */
.pricing-grid {
  /* Smooth scrolling for mobile */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Mobile scroll indicators */
.pricing-grid::-webkit-scrollbar {
  height: 4px;
}

.pricing-grid::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 2px;
}

.pricing-grid::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 2px;
}

/* Card animation delays */
.pricing-card.animation-delay-1 {
  animation-delay: 0.1s;
}

.pricing-card.animation-delay-2 {
  animation-delay: 0.2s;
}

.pricing-card.animation-delay-3 {
  animation-delay: 0.3s;
}

.pricing-card.animation-delay-4 {
  animation-delay: 0.4s;
}

/* Popular card enhancement */
.pricing-card--popular {
  position: relative;
  z-index: 10;
}

@media (min-width: 1024px) {
  .pricing-card--popular {
    transform: scale(1.05);
  }
}

/* Responsive grid behavior */
@media (min-width: 1024px) {
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    overflow: visible;
  }
  
  .pricing-grid.max-w-4xl {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-entrance {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .pricing-section {
    border-top: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .pricing-grid {
    scroll-behavior: auto;
  }
  
  .animate-entrance,
  .pricing-card {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Print styles */
@media print {
  .pricing-section {
    background: white !important;
    color: black !important;
  }
  
  .pricing-grid {
    display: block !important;
    overflow: visible !important;
  }
  
  .pricing-card {
    margin-bottom: 2rem;
    page-break-inside: avoid;
  }
}

/* Focus management for accessibility */
.pricing-section:focus-within {
  outline: none;
}

/* Container queries for responsive design */
@container (min-width: 768px) {
  .pricing-grid {
    gap: 1.5rem;
  }
}

@container (min-width: 1024px) {
  .pricing-grid {
    gap: 2rem;
  }
}

/* Loading state styles */
.pricing-section.loading {
  opacity: 0.7;
  pointer-events: none;
}

.pricing-section.loading .pricing-card {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* Error state styles */
.pricing-section.error {
  opacity: 0.5;
}

.pricing-section.error .pricing-card {
  filter: grayscale(100%);
}

/* Success state for plan selection */
.pricing-section.plan-selected .pricing-card:not(.selected) {
  opacity: 0.6;
  filter: grayscale(50%);
}

.pricing-section.plan-selected .pricing-card.selected {
  transform: scale(1.02);
  box-shadow: 0 0 0 2px hsl(var(--primary));
}
</style>