<template>
  <section
    :class="[
      'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      isCompact ? 'py-12' : 'section-spacing-compact',
      props.class
    ]"
    aria-labelledby="features-heading"
  >
    <!-- Feature Header -->
    <MFeatureHeader
      badge-text="Revolutionary Creative Technology"
      title="The Creative Industry's First Complete Multimedia Suite"
      :subtitle="headerSubtitle"
      :compact="isCompact"
    />

    <!-- Trust Indicators Section -->
    <div 
      v-if="showTrustIndicators"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-normal mt-acquaintances"
      role="region"
      aria-labelledby="trust-indicators-heading"
    >
      <h3 id="trust-indicators-heading" class="sr-only">
        Platform Statistics and Trust Indicators
      </h3>

      <MTrustIndicatorCard
        v-for="(indicator, index) in trustIndicators"
        :key="`trust-${index}`"
        :number="indicator.number"
        :label="indicator.label"
        :icon="indicator.icon"
        :description="indicator.description"
        :show-description="isDetailed"
      />
    </div>

    <!-- Key Benefits Section -->
    <div
      v-if="showKeyBenefits"
      class="grid grid-cols-1 md:grid-cols-3 grid-normal mt-acquaintances"
      role="region"
      aria-labelledby="key-benefits-heading"
    >
      <h3 id="key-benefits-heading" class="sr-only">
        Key Platform Benefits and Features
      </h3>

      <MBenefitCard
        v-for="(benefit, index) in keyBenefits"
        :key="`benefit-${index}`"
        :icon="benefit.icon"
        :title="benefit.title"
        :description="benefit.description"
        :category="benefit.category"
        :show-category="isDetailed"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface TrustIndicator {
  number: string
  label: string
  icon: string
  description?: string
}

interface KeyBenefit {
  icon: string
  title: string
  description: string
  category?: string
}

interface OFeaturesSectionProps {
  variant?: 'default' | 'compact' | 'detailed'
  showTrustIndicators?: boolean
  showKeyBenefits?: boolean
  customTrustIndicators?: TrustIndicator[]
  customKeyBenefits?: KeyBenefit[]
  class?: string
}

const props = withDefaults(defineProps<OFeaturesSectionProps>(), {
  variant: 'default',
  showTrustIndicators: true,
  showKeyBenefits: true
})

// Variant checks
const isCompact = computed(() => props.variant === 'compact')
const isDetailed = computed(() => props.variant === 'detailed')

// Header subtitle
const headerSubtitle = 'Break free from scattered tools. Fablecraft replaces 50+ applications with one intelligent platform that understands your entire creative process from world-building to video production, audio scoring, and community publishing.'

// Default trust indicators data
const defaultTrustIndicators: TrustIndicator[] = [
  {
    number: '1M+',
    label: 'Creative Assets Generated',
    icon: 'lucide:palette',
    description: 'Images, videos, and audio files created',
  },
  {
    number: '250K+',
    label: 'Multimedia Projects',
    icon: 'lucide:film',
    description: 'Complete creative productions from concept to final export',
  },
  {
    number: '99.9%',
    label: 'Production Uptime',
    icon: 'lucide:zap',
    description: 'Reliable multimedia rendering and AI services',
  },
  {
    number: '50+',
    label: 'Creative Tools Integrated',
    icon: 'lucide:check-circle',
    description: 'Seamless integration across the entire creative pipeline',
  },
]

// Default key benefits data
const defaultKeyBenefits: KeyBenefit[] = [
  {
    icon: 'lucide:globe',
    title: 'Intelligent World Building',
    description: 'Create interconnected characters, locations, cultures, and factions with AI that understands your entire creative universe across all media formats.',
    category: 'World Building',
  },
  {
    icon: 'lucide:film',
    title: 'Complete Production Pipeline',
    description: 'Transform your written content into storyboards, videos, and audio productions with AI-powered generation trained on your creative style.',
    category: 'Visual & Audio Production',
  },
  {
    icon: 'lucide:share-2',
    title: 'Community & Publishing',
    description: 'Share your creations, collaborate in real-time, and publish across multiple formats. Build your audience and connect with fellow creators.',
    category: 'Community',
  },
]

// Use custom data if provided, otherwise use defaults
const trustIndicators = computed(() => props.customTrustIndicators || defaultTrustIndicators)
const keyBenefits = computed(() => props.customKeyBenefits || defaultKeyBenefits)
</script>