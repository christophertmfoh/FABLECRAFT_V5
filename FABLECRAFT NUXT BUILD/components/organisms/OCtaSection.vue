<template>
  <section :class="sectionClasses" aria-label="Call to Action Section">
    <!-- CTA Header - Using MFeatureHeader for consistency -->
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
      :heading-size="isCompact ? 'sm' : 'lg'"
      :heading-variant="'default'"
      :gradient-variant="gradientVariant"
      :gradient-direction="'to-r'"
      :gradient-intensity="'normal'"
      :heading-spacing="'normal'"
    />

    <!-- Main CTA Card -->
    <Card :class="ctaCardClasses" variant="default">
              <div class="relative z-10 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
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

        <!-- CTA Hero-Style Button Group -->
        <MHeroActions
          :primary-text="primaryCtaText"
          :secondary-text="secondaryCtaText"
          :primary-icon="primaryCtaIcon"
          :secondary-icon="secondaryCtaIcon"
          :primary-variant="primaryCtaVariant"
          :secondary-variant="secondaryCtaVariant"
          :button-size="ctaButtonSize"
          :layout="ctaLayout"
          :alignment="'center'"
          :spacing="ctaSpacing"
          :group-label="'Call to action buttons'"
          class="mt-acquaintances mb-8"
          @primary:click="handlePrimaryCtaClick"
          @secondary:click="handleSecondaryCtaClick"
        />
        
        <!-- Trust Signal -->
        <Text
          v-if="trustSignal"
          tag="p"
          size="sm"
          class="text-muted-foreground text-center mt-6"
        >
          {{ trustSignal }}
        </Text>
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



const ctaCardClasses = computed(() => {
  const baseClasses = [
    'relative overflow-hidden',
    'bg-gradient-to-br from-card via-background to-card/50',
    'border border-border/50 backdrop-blur-sm',
    'shadow-2xl hover:shadow-3xl',
    'transition-all duration-700 ease-out',
    'hover:scale-[1.02] hover:-translate-y-2',
    'mt-acquaintances',
    'rounded-2xl',
    // Premium glow effect
    'before:absolute before:inset-0 before:rounded-2xl',
    'before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-accent/5',
    'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700',
  ]
  
  if (props.theme === 'gradient') {
    baseClasses.push('bg-gradient-to-br from-primary/5 via-card/95 to-accent/10')
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