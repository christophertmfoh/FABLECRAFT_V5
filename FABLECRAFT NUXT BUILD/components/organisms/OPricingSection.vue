<template>
  <section :class="sectionClasses" aria-label="Pricing Section">
    <!-- Pricing Header -->
    <MFeatureHeader
      :badge-text="headerBadgeText"
      :badge-variant="'default'"
      :badge-size="isCompact ? 'sm' : 'base'"
      :badge-dot-color="'primary'"
      :badge-clickable="false"
      :title="headerTitle"
      :highlight-text="headerHighlightText"
      :subtitle="headerSubtitle"
      :heading-tag="'h2'"
      :heading-size="isCompact ? 'lg' : 'lg'"
      :heading-variant="'default'"
      :gradient-variant="gradientVariant === 'default' ? 'primary' : gradientVariant"
      :gradient-direction="'to-r'"
      :gradient-intensity="'normal'"
      :heading-spacing="'normal'"
    />

    <!-- Pricing Toggle -->
    <div class="mt-acquaintances">
      <PricingToggle
        v-model="isAnnual"
        :annual-label="annualLabel"
        :monthly-label="monthlyLabel"
        :show-discount="showDiscount"
        :discount-text="discountText"
        size="base"
        class="mb-12"
      />
    </div>

    <!-- Pricing Cards Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-normal mt-8 auto-rows-fr gap-6 pt-3 px-3"
      role="region"
      aria-label="Pricing plans comparison"
    >
      <MPricingCard
        v-for="(plan, index) in pricingPlans"
        :key="`pricing-plan-${index}`"
        :name="plan.name"
        :price="getCurrentPrice(plan)"
        :period="getCurrentPeriod(plan)"
        :description="plan.description"
        :features="plan.features"
        :cta-text="plan.ctaText"
        :is-popular="plan.isPopular"
        :popular-text="plan.popularText"
        :variant="plan.variant"
        :features-title="plan.featuresTitle"
        @click="() => handlePlanClick(plan)"
        @cta-click="() => handleCtaClick(plan)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PRICING_CONFIG } from '~/constants/pricing'

// Types
interface PricingFeature {
  text: string
  included?: boolean
  tooltip?: string
}

interface PricingPlan {
  id: string
  name: string
  monthlyPrice: string | number
  annualPrice: string | number
  description: string
  features: PricingFeature[]
  ctaText?: string
  isPopular?: boolean
  popularText?: string
  variant?: 'default' | 'highlighted' | 'enterprise'
  featuresTitle?: string
}

// Component props
interface PricingProps {
  variant?: 'default' | 'compact'
  customPricingPlans?: PricingPlan[]
  headerBadgeText?: string
  headerTitle?: string
  headerHighlightText?: string
  headerSubtitle?: string
  gradientVariant?: 'default' | 'primary' | 'secondary'
  annualLabel?: string
  monthlyLabel?: string
  showDiscount?: boolean
  discountText?: string
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<PricingProps>(), {
  variant: 'default',
  headerBadgeText: 'Simple, Transparent Pricing',
  headerTitle: 'Start Free.',
  headerHighlightText: 'Scale With Your Stories',
  headerSubtitle:
    'Choose the perfect plan for your creative journey. Start with our free tier and upgrade as your projects grow.',
  gradientVariant: 'primary',
  annualLabel: 'Yearly',
  monthlyLabel: 'Monthly',
  showDiscount: true,
  discountText: '-20%',
  class: '',
})

// Define emits
const emit = defineEmits<{
  planClick: [plan: PricingPlan]
  ctaClick: [plan: PricingPlan]
}>()

// Reactive state
const isAnnual = ref(true)

// Transform pricing config to match component format
const defaultPricingPlans: PricingPlan[] = Object.entries(PRICING_CONFIG.plans).map(([key, plan]) => ({
  id: plan.id,
  name: plan.name,
  monthlyPrice: plan.prices.monthly === 0 ? 'Free' : (plan.prices.monthly === 'custom' ? 'Custom' : plan.prices.monthly),
  annualPrice: plan.prices.yearly === 0 ? 'Free' : (plan.prices.yearly === 'custom' ? 'Custom' : Math.floor(plan.prices.yearly / 12)),
  description: plan.description,
  isPopular: plan.isPopular || false,
  popularText: plan.popularText,
  variant: plan.id === 'pro' ? 'highlighted' : (plan.id === 'enterprise' ? 'enterprise' : 'default'),
  ctaText: plan.ctaText,
  features: plan.features.map(f => ({ text: f, included: true })),
}))

// Computed properties
const isCompact = computed(() => props.variant === 'compact')

// Add validation for custom pricing plans
const pricingPlans = computed(() => {
  const plans = props.customPricingPlans || defaultPricingPlans

  // Validate that plans array is not empty and has valid structure
  if (!Array.isArray(plans) || plans.length === 0) {
    console.warn('OPricingSection: Invalid pricing plans data, falling back to defaults')
    return defaultPricingPlans
  }

  // Validate each plan has required properties
  const validPlans = plans.filter(
    plan =>
      plan &&
      typeof plan === 'object' &&
      plan.id &&
      plan.name &&
      plan.description &&
      Array.isArray(plan.features)
  )

  if (validPlans.length !== plans.length) {
    console.warn('OPricingSection: Some pricing plans have invalid structure')
  }

  return validPlans.length > 0 ? validPlans : defaultPricingPlans
})

const sectionClasses = computed(() => [
  'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  props.class,
])

const headingClasses = computed(() => [
  'transition-all duration-300 font-black tracking-tight drop-shadow-sm text-foreground',
  isCompact.value ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl',
])

const subtitleClasses = computed(() => [
  'text-muted-foreground font-medium transition-all duration-300 text-center max-w-4xl mx-auto',
  isCompact.value ? 'text-base sm:text-lg' : 'text-lg sm:text-xl',
])

// Helper methods
const getCurrentPrice = (plan: PricingPlan) => {
  return isAnnual.value ? plan.annualPrice : plan.monthlyPrice
}

const getCurrentPeriod = (plan: PricingPlan) => {
  if (typeof plan.monthlyPrice === 'string' && plan.monthlyPrice.toLowerCase().includes('free')) {
    return ''
  }
  if (
    typeof plan.monthlyPrice === 'string' &&
    (plan.monthlyPrice.toLowerCase().includes('contact') ||
      plan.monthlyPrice.toLowerCase().includes('custom'))
  ) {
    return ''
  }
  return isAnnual.value ? '/year' : '/month'
}

// Event handlers
const handlePlanClick = (plan: PricingPlan) => {
  // Validate plan data before emitting
  if (!plan || !plan.id) {
    console.warn('OPricingSection: Invalid plan data in click handler')
    return
  }
  
  // Navigate to pricing page with selected plan
  navigateTo(`/pricing?plan=${plan.id}`)
}

const handleCtaClick = (plan: PricingPlan) => {
  // Validate plan data before emitting
  if (!plan || !plan.id) {
    console.warn('OPricingSection: Invalid plan data in CTA click handler')
    return
  }
  
  // Navigate to pricing page with selected plan
  navigateTo(`/pricing?plan=${plan.id}`)
}
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
