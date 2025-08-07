<template>
  <section :class="sectionClasses" aria-label="Call to Action Section">
    <!-- CTA Header - Using MFeatureHeader for consistency -->
    <MFeatureHeader
      :badge-text="headerBadgeText"
      :badge-variant="'default'"
      :badge-size="isCompact ? 'sm' : 'default'"
      :badge-dot-color="'primary'"
      :badge-clickable="false"
      :title="headerTitle"
      :highlight-text="headerHighlightText"
      :subtitle="headerSubtitle"
      :heading-tag="'h2'"
      :heading-size="isCompact ? 'h3' : 'h2'"
      :heading-variant="'default'"
      :gradient-variant="gradientVariant"
      :gradient-direction="'to-r'"
      :gradient-intensity="'normal'"
      :heading-spacing="'normal'"
    />

    <!-- Main CTA Card -->
    <GlassCard variant="heavy" :hover="true" :class="ctaCardClasses">
      <div class="relative p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
        <!-- Icon Container (optional) -->
        <div v-if="showIcon && !isCompact" :class="iconContainerClasses" aria-hidden="true">
          <AtomIcon :name="ctaIcon" :size="iconSize" :class="iconClasses" />
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

        <!-- CTA Hero-Style Button Group -->
        <MHeroActions
          :primary-text="primaryCtaText"
          :secondary-text="secondaryCtaText"
          :primary-icon="primaryCtaIcon"
          :secondary-icon="secondaryCtaIcon"
          :primary-variant="primaryCtaVariant"
          :secondary-variant="secondaryCtaVariant"
          :button-size="ctaButtonSize === 'base' ? 'default' : ctaButtonSize"
          :layout="ctaLayout === 'horizontal' ? 'horizontal' : ctaLayout === 'vertical' ? 'vertical' : 'responsive'"
          :alignment="'center'"
          :spacing="ctaSpacing"
          :group-label="'Call to action buttons'"
          class="mt-8 mb-8"
          @primary:click="handlePrimaryCtaClick"
          @secondary:click="handleSecondaryCtaClick"
        />

        <!-- Trust Signal -->
        <Text v-if="trustSignal" tag="p" size="sm" class="text-muted-foreground text-center mt-6">
          {{ trustSignal }}
        </Text>
      </div>
    </GlassCard>
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
  headerSubtitle:
    "Join thousands of creators who've replaced entire workflows with one intelligent platform. From concept to publication, from script to screen—all in one revolutionary suite.",
  gradientVariant: 'primary',
  mainHeadline: 'Start Creating Today',
  supportingCopy:
    'Transform your creative process with AI-powered tools that adapt to your unique storytelling style.',
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
const headingTag = computed(() => (isCompact.value ? 'h3' : 'h2'))
const mainHeadingSize = computed(() => {
  if (isCompact.value) return 'h3'
  return 'h2'
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

const ctaCardClasses = computed(() => [
  // Container spacing
  'mt-16',

  // Enhanced styling that works with GlassCard
  'rounded-2xl',
  'overflow-hidden',
])

const iconContainerClasses = computed(() => [
  // Layout & Size - centered
  'w-20 h-20 mx-auto mb-8',
  'flex items-center justify-center',

  // Design system styling
  'bg-primary/10 hover:bg-primary/20',
  'border border-primary/20',
  'rounded-2xl',

  // Smooth interactions
  'transition-all duration-500 ease-out',
  'hover:scale-110 hover:rotate-2',
  'shadow-sm hover:shadow-md',
])

const iconClasses = computed(() => ['text-primary transition-all duration-300 ease-out'])

const mainHeadingClasses = computed(() => [
  'font-black leading-[1.1] tracking-tight mb-8',
  'text-center', // Ensure center alignment
])

const supportingCopyClasses = computed(() => [
  'text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8',
  'text-center', // Ensure center alignment
])

// Event handlers
const handlePrimaryCtaClick = () => {
  emit('primaryCtaClick')
}

const handleSecondaryCtaClick = () => {
  emit('secondaryCtaClick')
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
