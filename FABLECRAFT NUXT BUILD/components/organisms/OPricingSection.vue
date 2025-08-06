<template>
  <section :class="sectionClasses" aria-label="Pricing Section">
    <!-- Pricing Header -->
    <div class="text-center heading-group space-y-3">
      <!-- Badge -->
      <MHeroBadge
        :text="headerBadgeText"
        :variant="'default'"
        :size="isCompact ? 'sm' : 'base'"
        :dot-color="'primary'"
        :clickable="false"
      />

      <!-- Custom heading with forced line break -->
      <div class="heading-group flex flex-col pb-2 text-center space-y-2" role="heading" aria-level="2">
        <h2 :class="headingClasses">
          <!-- First line -->
          <div class="text-foreground">
            {{ headerTitle }}
          </div>
          <!-- Second line with gradient -->
          <AGradientText
            tag="div"
            :variant="gradientVariant"
            direction="to-r"
            intensity="normal"
            class="inline-block transition-all duration-300"
          >
            {{ headerHighlightText }}
          </AGradientText>
        </h2>
      </div>

      <!-- Subtitle -->
      <Text
        v-if="headerSubtitle"
        tag="p"
        :size="isCompact ? 'base' : 'lg'"
        :class="subtitleClasses"
      >
        {{ headerSubtitle }}
      </Text>
    </div>

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
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-normal mt-8 auto-rows-fr gap-6"
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
        @click="handlePlanClick"
        @cta-click="handleCtaClick"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
  headerSubtitle: 'Choose the perfect plan for your creative journey. Start with our free tier and upgrade as your projects grow.',
  gradientVariant: 'primary',
  annualLabel: 'Yearly',
  monthlyLabel: 'Monthly',
  showDiscount: true,
  discountText: '-20%',
  class: ''
})

// Define emits
const emit = defineEmits<{
  planClick: [plan: PricingPlan]
  ctaClick: [plan: PricingPlan]
}>()

// Reactive state
const isAnnual = ref(true)

// Simplified pricing plans data for uniform layout
const defaultPricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 'Free',
    annualPrice: 'Free',
    description: 'Perfect for beginners',
    isPopular: false,
    ctaText: 'Start Free',
    features: [
      { text: '3 Projects', included: true },
      { text: 'Basic AI Features', included: true },
      { text: 'Community Access', included: true },
      { text: 'Standard Export', included: true }
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 15,
    annualPrice: 12,
    description: 'For serious creators',
    isPopular: false,
    ctaText: 'Choose Starter',
    features: [
      { text: 'Unlimited Projects', included: true },
      { text: 'Standard AI Credits', included: true },
      { text: 'Advanced Features', included: true },
      { text: 'Enhanced Export', included: true }
    ]
  },
  {
    id: 'professional',
    name: 'Creative Studio',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'Complete creative suite',
    isPopular: true,
    popularText: 'Most Popular',
    variant: 'highlighted',
    ctaText: 'Unleash Full Power',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Premium AI Credits', included: true },
      { text: 'Media Production', included: true },
      { text: 'Priority Support', included: true }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    description: 'For teams at scale',
    isPopular: false,
    ctaText: 'Contact Sales',
    variant: 'enterprise',
    features: [
      { text: 'Everything in Studio', included: true },
      { text: 'Unlimited AI Credits', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Dedicated Support', included: true }
    ]
  }
]

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
  const validPlans = plans.filter(plan => 
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
  props.class
])

const headingClasses = computed(() => [
  'transition-all duration-300 font-black tracking-tight drop-shadow-sm text-foreground',
  isCompact.value ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'
])

const subtitleClasses = computed(() => [
  'text-muted-foreground font-medium transition-all duration-300 text-center max-w-4xl mx-auto',
  isCompact.value ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
])

// Helper methods
const getCurrentPrice = (plan: PricingPlan) => {
  return isAnnual.value ? plan.annualPrice : plan.monthlyPrice
}

const getCurrentPeriod = (plan: PricingPlan) => {
  if (typeof plan.monthlyPrice === 'string' && plan.monthlyPrice.toLowerCase().includes('free')) {
    return ''
  }
  if (typeof plan.monthlyPrice === 'string' && 
      (plan.monthlyPrice.toLowerCase().includes('contact') || 
       plan.monthlyPrice.toLowerCase().includes('custom'))) {
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
  emit('planClick', plan)
}

const handleCtaClick = (plan: PricingPlan) => {
  // Validate plan data before emitting
  if (!plan || !plan.id) {
    console.warn('OPricingSection: Invalid plan data in CTA click handler')
    return
  }
  emit('ctaClick', plan)
}
</script>