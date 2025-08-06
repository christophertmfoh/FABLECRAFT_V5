<template>
  <Card
    :class="cardClasses"
    variant="default"
    role="article"
    :aria-label="`${name} pricing plan`"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Popular badge -->
    <PopularBadge
      :show="isPopular"
      :text="popularText"
      position="top-right"
      variant="primary"
      size="sm"
    />

    <!-- Hover background effect -->
    <div :class="hoverEffectClasses" aria-hidden="true" />

    <div class="p-comfortable relative z-10 flex flex-col h-full text-center">
      <!-- 1. Subscription Type (Fixed Height) -->
      <div class="h-16 flex items-center justify-center mb-6">
        <div
          class="relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/40 group-hover:from-primary/15 group-hover:via-primary/8 group-hover:to-primary/15"
        >
          <Heading
            :id="`pricing-plan-${planId}`"
            tag="h3"
            size="2xl"
            class="font-black text-primary text-center tracking-tight drop-shadow-sm relative z-10"
          >
            {{ name }}
          </Heading>
          <!-- Subtle shine effect on hover -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- 2. Price (Fixed Height) -->
      <div class="h-16 flex items-center justify-center mb-4">
        <div class="flex items-baseline justify-center">
          <Text tag="span" size="3xl" class="font-black text-foreground">
            {{ cleanPrice }}
          </Text>
          <Text
            v-if="period && !isCustomPricing"
            tag="span"
            size="base"
            class="text-muted-foreground ml-1"
          >
            {{ period }}
          </Text>
        </div>
      </div>

      <!-- 3. Description (Fixed Height) -->
      <div class="h-12 flex items-center justify-center mb-6">
        <Text tag="p" size="base" class="text-muted-foreground text-center">
          {{ description }}
        </Text>
      </div>

      <!-- 4. Features (Fixed Height) -->
      <div class="h-44 mb-6">
        <Text tag="h4" size="base" class="font-semibold text-foreground mb-4 text-center">
          {{ featuresTitle }}
        </Text>

        <ul
          class="space-y-3 text-left h-32"
          role="list"
          :aria-labelledby="`pricing-plan-${planId}`"
        >
          <MPricingFeature
            v-for="(feature, index) in features"
            :key="`feature-${index}`"
            :text="feature.text"
            :included="feature.included"
            :tooltip="feature.tooltip"
            :size="featureSize"
          />
        </ul>
      </div>

      <!-- 5. Button (Fixed Position) -->
      <div class="mt-auto">
        <Button
          :variant="ctaVariant"
          size="lg"
          class="w-full font-semibold"
          @click="handleCtaClick"
        >
          {{ ctaText }}
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useComponentId } from '~/composables/useComponentId'

// Types
interface PricingFeature {
  text: string
  included?: boolean
  tooltip?: string
}

// Component props
interface PricingCardProps {
  name: string
  price: string | number
  period?: string
  description: string
  features: PricingFeature[]
  ctaText?: string
  isPopular?: boolean
  popularText?: string
  variant?: 'default' | 'highlighted' | 'enterprise'
  featuresTitle?: string
  featureSize?: 'xs' | 'sm' | 'base' | 'lg'
  planId?: string
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<PricingCardProps>(), {
  period: '/month',
  ctaText: 'Get Started',
  isPopular: false,
  popularText: 'Most Popular',
  variant: 'default',
  featuresTitle: "What's included:",
  featureSize: 'sm',
  class: '',
})

// Define emits
const emit = defineEmits<{
  click: [plan: PricingCardProps]
  ctaClick: [plan: PricingCardProps]
}>()

// Generate unique ID for this card
const planId = useComponentId('pricing-plan')

// Computed properties
const isCustomPricing = computed(
  () =>
    typeof props.price === 'string' &&
    (props.price.toLowerCase().includes('custom') || props.price.toLowerCase().includes('contact'))
)

const cleanPrice = computed(() => {
  if (isCustomPricing.value) {
    return props.price
  }

  // Don't add $ to "Free"
  if (typeof props.price === 'string' && props.price.toLowerCase() === 'free') {
    return props.price
  }

  if (typeof props.price === 'number') {
    return `$${props.price}`
  }

  return props.price.startsWith('$') ? props.price : `$${props.price}`
})

const cardClasses = computed(() => [
  'group cursor-pointer transition-all duration-300',
  'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
  'border-border hover:border-primary/50',
  'natural-depth gentle-hover',
  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
  'bg-card/90 backdrop-blur-sm',
  'overflow-hidden relative h-full',
  'flex flex-col',
  {
    'border-primary shadow-lg': props.isPopular,
    'bg-gradient-to-br from-card via-card to-primary/5': props.variant === 'highlighted',
  },
  props.class,
])

const hoverEffectClasses = computed(() => [
  'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none',
  'bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5',
])

const ctaVariant = computed(() => {
  return props.isPopular || props.variant === 'highlighted' ? 'default' : 'outline'
})

// Event handlers
const handleClick = () => {
  emit('click', props)
}

const handleCtaClick = (event: Event) => {
  event.stopPropagation()
  emit('ctaClick', props)
}
</script>
