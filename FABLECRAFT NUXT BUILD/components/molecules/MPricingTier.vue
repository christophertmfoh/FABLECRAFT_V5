<template>
  <Card
    :class="cardClasses"
    :aria-label="`${tier.name} pricing plan: ${formattedPrice}${tier.period || ''}`"
    role="article"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <!-- Hover gradient overlay -->
    <div :class="gradientOverlayClasses" />

    <!-- Popular badge -->
    <Badge
      v-if="tier.isPopular && showPopularBadge"
      :class="popularBadgeClasses"
      variant="default"
    >
      Most Popular
    </Badge>

    <!-- Card content -->
    <div :class="contentClasses">
      <!-- Plan name -->
      <Heading
        :level="3"
        variant="h3"
        :class="nameClasses"
        tag="h3"
      >
        {{ tier.name }}
      </Heading>

      <!-- Price and period -->
      <div class="mt-best-friends">
        <APriceDisplay
          :price="tier.price"
          :period="tier.period"
          :size="priceSize"
          :highlighted="tier.isPopular"
          :class="priceClasses"
          :aria-label="`Price: ${formattedPrice}${tier.period ? ` ${tier.period}` : ''}`"
        />
        
        <!-- Description -->
        <Text
          variant="muted"
          :class="descriptionClasses"
        >
          {{ tier.description }}
        </Text>
      </div>

      <!-- Features list -->
      <div :class="featuresContainerClasses">
        <MPricingFeature
          v-for="feature in tier.features"
          :key="feature.id"
          :feature="feature"
          :variant="featureVariant"
          :size="featureSize"
          :highlighted="tier.isPopular"
          @click="handleFeatureClick"
          @expand="handleFeatureExpand"
        />
      </div>

      <!-- CTA Button -->
      <Button
        :variant="ctaVariant"
        :size="ctaSize"
        :class="ctaClasses"
        :aria-label="`Select ${tier.name} plan`"
        @click="handleCtaClick"
      >
        {{ ctaText }}
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { PricingTier, PricingFeature } from '~/composables/usePricingLogic'

interface PricingTierProps {
  /**
   * The pricing tier data
   */
  tier: PricingTier
  
  /**
   * Whether user is authenticated
   * @default false
   */
  isAuthenticated?: boolean
  
  /**
   * Whether to show popular badge
   * @default true
   */
  showPopularBadge?: boolean
  
  /**
   * Visual variant of the pricing card
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'featured'
  
  /**
   * Size of the pricing card
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether animations are enabled
   * @default true
   */
  enableAnimations?: boolean
  
  /**
   * Additional CSS classes
   */
  class?: string
}

interface PricingTierEmits {
  /**
   * Emitted when plan is selected
   */
  planSelect: [tier: PricingTier, source: 'click' | 'keyboard']
  
  /**
   * Emitted when authentication is required
   */
  authRequired: [planId: string]
  
  /**
   * Emitted when navigation is needed
   */
  navigate: [route: string]
  
  /**
   * Emitted when feature is clicked
   */
  featureClick: [feature: PricingFeature]
  
  /**
   * Emitted when feature is expanded
   */
  featureExpand: [featureId: string, expanded: boolean]
}

const props = withDefaults(defineProps<PricingTierProps>(), {
  isAuthenticated: false,
  showPopularBadge: true,
  variant: 'default',
  size: 'md',
  enableAnimations: true
})

const emit = defineEmits<PricingTierEmits>()

// Use pricing logic composable
const { 
  formatPrice, 
  getCtaVariant, 
  getCtaText, 
  handlePlanSelection 
} = usePricingLogic()

// Formatted price for display
const formattedPrice = computed(() => formatPrice(props.tier.price))

// CTA button variant
const ctaVariant = computed(() => getCtaVariant(props.tier, props.isAuthenticated))

// CTA button text
const ctaText = computed(() => getCtaText(props.tier, props.isAuthenticated))

// Price display size
const priceSize = computed(() => {
  const sizeMap = {
    sm: 'md' as const,
    md: 'lg' as const,
    lg: 'xl' as const
  }
  return sizeMap[props.size]
})

// CTA button size
const ctaSize = computed(() => {
  const sizeMap = {
    sm: 'sm' as const,
    md: 'lg' as const,
    lg: 'lg' as const
  }
  return sizeMap[props.size]
})

// Feature variant and size
const featureVariant = computed(() => props.variant === 'compact' ? 'compact' : 'default')
const featureSize = computed(() => props.size === 'sm' ? 'sm' : 'md')

// Event handlers
const handleCardClick = () => {
  // Card click for accessibility - focus management
}

const handleCtaClick = () => {
  handlePlanSelection(props.tier, {
    isAuthenticated: props.isAuthenticated,
    onPlanSelect: (event) => emit('planSelect', event.planDetails, event.source),
    onAuthRequired: (planId) => emit('authRequired', planId),
    onNavigate: (route) => emit('navigate', route),
    source: 'click'
  })
}

const handleFeatureClick = (feature: PricingFeature) => {
  emit('featureClick', feature)
}

const handleFeatureExpand = (featureId: string, expanded: boolean) => {
  emit('featureExpand', featureId, expanded)
}

// Card classes matching React version
const cardClasses = computed(() => {
  const baseClasses = [
    'group surface-elevated backdrop-blur-lg border-border',
    'cursor-pointer overflow-hidden relative flex-1 min-w-[280px] h-full flex flex-col',
    'transition-all duration-500'
  ]
  
  // Popular tier special border
  const popularClasses = props.tier.isPopular ? 'border-primary' : ''
  
  // Animation classes
  const animationClasses = props.enableAnimations 
    ? 'hover:shadow-2xl hover:scale-105 hover:-translate-y-2'
    : ''
  
  return [
    ...baseClasses,
    popularClasses,
    animationClasses,
    props.class
  ].filter(Boolean).join(' ')
})

// Gradient overlay classes
const gradientOverlayClasses = computed(() => {
  const baseClasses = [
    'absolute inset-0 transition-all duration-700',
    'opacity-0 group-hover:opacity-100'
  ]
  
  const gradientStyle = [
    'bg-gradient-to-br',
    'from-primary/5',
    'via-secondary/3',
    'to-primary/2'
  ]
  
  return [
    ...baseClasses,
    ...gradientStyle
  ].join(' ')
})

// Popular badge classes
const popularBadgeClasses = computed(() => {
  return [
    'absolute top-2 right-2 z-20',
    'bg-primary text-primary-foreground',
    'px-3 py-1 rounded-lg text-sm font-semibold',
    'transition-all duration-300',
    'animate-in slide-in-from-top-2'
  ].join(' ')
})

// Content classes
const contentClasses = computed(() => {
  const baseClasses = 'relative z-10 p-6 flex flex-col h-full'
  
  const spacingClasses = props.tier.isPopular ? 'pt-12' : ''
  
  return [
    baseClasses,
    spacingClasses
  ].filter(Boolean).join(' ')
})

// Plan name classes
const nameClasses = computed(() => {
  return 'text-2xl font-bold text-heading-primary transition-colors duration-300'
})

// Price classes
const priceClasses = computed(() => {
  return 'transition-all duration-300'
})

// Description classes
const descriptionClasses = computed(() => {
  return 'mt-best-friends transition-colors duration-300'
})

// Features container classes
const featuresContainerClasses = computed(() => {
  return [
    'text-left mt-friends flex-grow',
    'space-y-2' // Spacing between features
  ].join(' ')
})

// CTA button classes
const ctaClasses = computed(() => {
  const baseClasses = [
    'w-full px-6 py-4 text-lg font-semibold',
    'shadow-xl hover:shadow-2xl rounded-2xl',
    'mt-acquaintances transition-all duration-300'
  ]
  
  // Enhanced styling for popular tier
  const popularClasses = props.tier.isPopular 
    ? 'btn-enhanced gradient-primary text-primary-foreground focus-ring'
    : ''
  
  return [
    ...baseClasses,
    popularClasses
  ].filter(Boolean).join(' ')
})
</script>

<style scoped>
/**
 * MPricingTier Component Styles
 * 
 * Provides glass morphism pricing cards with hover effects
 * and smooth transitions matching the React version.
 */

.pricing-tier {
  /* Ensure proper stacking context */
  position: relative;
}

/* Card hover effects matching React version */
.group:hover .gradient-overlay {
  background: linear-gradient(
    135deg, 
    hsl(var(--orb-primary) / 0.05) 0%, 
    hsl(var(--orb-secondary) / 0.03) 50%, 
    hsl(var(--orb-primary) / 0.02) 100%
  );
}

/* Enhanced shadow effects */
.group:hover {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px hsl(var(--border) / 0.1);
}

/* Popular tier enhancements */
.border-primary {
  box-shadow: 
    0 0 0 1px hsl(var(--primary) / 0.2),
    0 4px 20px hsl(var(--primary) / 0.1);
}

.border-primary:hover {
  box-shadow: 
    0 0 0 1px hsl(var(--primary) / 0.3),
    0 25px 50px -12px hsl(var(--primary) / 0.2);
}

/* CTA button enhancements */
.btn-enhanced {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--primary) / 0.9) 100%
  );
  position: relative;
  overflow: hidden;
}

.btn-enhanced::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-enhanced:hover::before {
  opacity: 1;
}

/* Focus management */
.focus-ring:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Animation performance */
.group {
  will-change: transform, box-shadow;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .group {
    border-width: 2px;
  }
  
  .border-primary {
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .group,
  .group *,
  .transition-all {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

/* Print styles */
@media print {
  .group {
    border: 2px solid #000 !important;
    box-shadow: none !important;
    background: white !important;
  }
  
  .gradient-overlay,
  .backdrop-blur-lg {
    display: none !important;
  }
  
  .popular-badge {
    background: #000 !important;
    color: white !important;
  }
}

/* Loading skeleton animation */
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Entrance animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-entrance {
  animation: slideInUp 0.6s ease-out;
}

/* Stagger animations for multiple cards */
.pricing-grid .group:nth-child(1) {
  animation-delay: 0.1s;
}

.pricing-grid .group:nth-child(2) {
  animation-delay: 0.2s;
}

.pricing-grid .group:nth-child(3) {
  animation-delay: 0.3s;
}

.pricing-grid .group:nth-child(4) {
  animation-delay: 0.4s;
}
</style>