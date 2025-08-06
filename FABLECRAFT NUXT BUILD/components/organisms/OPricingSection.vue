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
        <!-- First line -->
        <div :class="headingClasses">
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
      </div>

      <!-- Subtitle -->
      <Text
        tag="p"
        :size="isCompact ? 'lg' : 'xl'"
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

// Default pricing plans data (matching old build structure)
const defaultPricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 'Free',
    annualPrice: 'Free',
    description: 'Perfect for getting started with your creative projects',
    isPopular: false,
    ctaText: 'Start Free',
    features: [
      { text: '3 Free Projects', included: true },
      { text: 'Limited AI Credits/Month', included: true },
      { text: 'All Basic Features', included: true },
      { text: 'Community Access & Sharing', included: true },
      { text: 'Standard Export & Sharing', included: true }
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 15,
    annualPrice: 12,
    description: 'Perfect for serious creators building their portfolio',
    isPopular: false,
    ctaText: 'Choose Starter',
    features: [
      { text: 'Unlimited Projects', included: true },
      { text: 'Standard AI Credits/Month', included: true },
      { text: 'Advanced Creative Features', included: true },
      { text: 'Basic Collaboration Tools', included: true },
      { text: 'Enhanced Export Options', included: true },
      { text: 'Professional Project Templates', included: true }
    ]
  },
  {
    id: 'professional',
    name: 'Creative Studio',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'Complete multimedia production powerhouse for professionals',
    isPopular: true,
    popularText: 'Most Popular',
    variant: 'highlighted',
    ctaText: 'Unleash Full Power',
    features: [
      { text: 'Unlimited Multimedia Projects', included: true },
      { text: 'Premium AI Credits/Month', included: true },
      { text: 'Pre-vis & Video Generation', included: true },
      { text: 'Full Audio Production Suite & DAW', included: true },
      { text: 'Advanced Collaboration Tools', included: true },
      { text: 'Priority Support & Beta Access', included: true }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 'Contact for Pricing',
    annualPrice: 'Contact for Pricing',
    description: 'Custom solutions for teams and organizations',
    isPopular: false,
    ctaText: 'Contact Sales',
    variant: 'enterprise',
    features: [
      { text: 'Everything in Creative Studio', included: true },
      { text: 'Unlimited AI Credits', included: true },
      { text: 'Custom Integrations & API Access', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'SSO & Advanced Security', included: true },
      { text: 'Custom Training & Onboarding', included: true },
      { text: 'SLA Guarantee', included: true }
    ]
  }
]

// Computed properties
const isCompact = computed(() => props.variant === 'compact')

const pricingPlans = computed(() => props.customPricingPlans || defaultPricingPlans)

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
  emit('planClick', plan)
}

const handleCtaClick = (plan: PricingPlan) => {
  emit('ctaClick', plan)
}
</script>