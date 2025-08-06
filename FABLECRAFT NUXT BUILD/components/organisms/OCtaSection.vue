<template>
  <section :class="sectionClasses" aria-label="Call to Action Section">
    <!-- CTA Header -->
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

    <!-- Main CTA Card -->
    <Card :class="ctaCardClasses" variant="default">
      <div class="p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
        <!-- Icon Container (optional) -->
        <div
          v-if="showIcon && !isCompact"
          :class="iconContainerClasses"
          aria-hidden="true"
        >
          <AtomIcon
            :name="ctaIcon"
            :size="iconSize"
            :class="iconClasses"
          />
        </div>

        <!-- Main Headline -->
        <Heading
          :id="`cta-main-heading`"
          :tag="headingTag"
          :size="mainHeadingSize"
          :class="mainHeadingClasses"
        >
          <AGradientText
            tag="span"
            :variant="mainGradientVariant"
            direction="to-r"
            intensity="normal"
            class="bg-clip-text text-transparent"
          >
            {{ mainHeadline }}
          </AGradientText>
        </Heading>

        <!-- Supporting Copy -->
        <Text
          v-if="supportingCopy"
          tag="p"
          :size="supportingCopySize"
          :class="supportingCopyClasses"
        >
          {{ supportingCopy }}
        </Text>

        <!-- CTA Button Group -->
        <div class="mt-acquaintances mb-8">
          <MCtaButtonGroup
            :primary-text="primaryCtaText"
            :primary-variant="primaryCtaVariant"
            :primary-icon="primaryCtaIcon"
            :secondary-text="secondaryCtaText"
            :secondary-variant="secondaryCtaVariant"
            :secondary-icon="secondaryCtaIcon"
            :button-size="ctaButtonSize"
            :layout="ctaLayout"
            :spacing="ctaSpacing"
            :trust-signal="trustSignal"
            @primary-click="handlePrimaryCtaClick"
            @secondary-click="handleSecondaryCtaClick"
          />
        </div>
      </div>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface CtaSectionProps {
  variant?: 'default' | 'compact' | 'minimal'
  
  // Header content
  headerBadgeText?: string
  headerTitle?: string
  headerHighlightText?: string
  headerSubtitle?: string
  gradientVariant?: 'primary' | 'secondary' | 'accent'
  
  // Main content
  mainHeadline?: string
  supportingCopy?: string
  mainGradientVariant?: 'primary' | 'secondary' | 'accent'
  
  // Icon
  showIcon?: boolean
  ctaIcon?: string
  
  // CTA buttons
  primaryCtaText?: string
  primaryCtaVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  primaryCtaIcon?: string
  secondaryCtaText?: string
  secondaryCtaVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  secondaryCtaIcon?: string
  ctaButtonSize?: 'sm' | 'base' | 'lg' | 'xl'
  ctaLayout?: 'horizontal' | 'vertical' | 'responsive'
  ctaSpacing?: 'tight' | 'normal' | 'loose'
  
  // Trust signal
  trustSignal?: string
  
  // Styling
  theme?: 'gradient' | 'solid' | 'outline'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<CtaSectionProps>(), {
  variant: 'default',
  headerBadgeText: 'Ready to Begin?',
  headerTitle: 'Ready to Revolutionize',
  headerHighlightText: 'Creative Production?',
  headerSubtitle: 'Join thousands of creators who\'ve replaced entire workflows with one intelligent platform. From concept to publication, from script to screen—all in one revolutionary suite.',
  gradientVariant: 'primary',
  mainHeadline: 'Start Creating Today',
  supportingCopy: 'Transform your creative process with AI-powered tools that adapt to your unique storytelling style.',
  mainGradientVariant: 'primary',
  showIcon: true,
  ctaIcon: 'lucide:zap',
  primaryCtaText: 'Start Creating Free',
  primaryCtaVariant: 'default',
  primaryCtaIcon: 'lucide:arrow-right',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaVariant: 'outline',
  secondaryCtaIcon: 'lucide:play',
  ctaButtonSize: 'lg',
  ctaLayout: 'responsive',
  ctaSpacing: 'normal',
  trustSignal: 'Free to start • Complete multimedia suite • No vendor lock-in',
  theme: 'gradient',
})

// Define emits
const emit = defineEmits<{
  primaryCtaClick: []
  secondaryCtaClick: []
}>()

// Computed properties
const isCompact = computed(() => props.variant === 'compact')
const isMinimal = computed(() => props.variant === 'minimal')

// Dynamic sizing based on variant
const headingTag = computed(() => isCompact.value ? 'h3' : 'h2')
const mainHeadingSize = computed(() => {
  if (isCompact.value) return '2xl'
  return '4xl'
})
const supportingCopySize = computed(() => {
  if (isCompact.value) return 'base'
  return 'lg'
})
const iconSize = computed(() => {
  if (isCompact.value) return 'lg'
  return '2xl'
})

// Styling classes
const sectionClasses = computed(() => [
  'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  props.class,
])

const headingClasses = computed(() => [
  'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
  'font-black leading-[1.1] tracking-tight',
  'text-center',
])

const subtitleClasses = computed(() => [
  'text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center',
])

const ctaCardClasses = computed(() => {
  const baseClasses = [
    'bg-card border-border mt-acquaintances',
    'natural-depth gentle-hover',
    'hover:shadow-xl transition-all duration-500',
  ]
  
  if (props.theme === 'gradient') {
    baseClasses.push('bg-gradient-to-br from-card via-card/95 to-accent/30')
  }
  
  return baseClasses
})

const iconContainerClasses = computed(() => [
  'w-20 h-20 bg-primary/10 hover:bg-primary/20 rounded-2xl',
  'flex items-center justify-center mx-auto mb-6',
  'transition-all duration-500',
  'hover:scale-110 hover:rotate-3 hover:shadow-lg',
])

const iconClasses = computed(() => [
  'text-primary hover:scale-110 transition-transform duration-300',
])

const mainHeadingClasses = computed(() => [
  'font-black leading-[1.1] tracking-tight mb-6',
])

const supportingCopyClasses = computed(() => [
  'text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium mb-6',
])

// Event handlers
const handlePrimaryCtaClick = () => {
  emit('primaryCtaClick')
}

const handleSecondaryCtaClick = () => {
  emit('secondaryCtaClick')
}
</script>