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
    <div :class="ctaCardClasses">
      <!-- Advanced Background Effects -->
      <div class="absolute inset-0 rounded-3xl overflow-hidden">
        <!-- Primary Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20"></div>
        
        <!-- Secondary Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/95"></div>
        
        <!-- Animated Glow Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 animate-pulse"></div>
        
        <!-- Glassmorphism Backdrop -->
        <div class="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-white/5"></div>
        
        <!-- Border Glow -->
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-[1px]">
          <div class="w-full h-full rounded-3xl bg-background/50"></div>
        </div>
      </div>

      <!-- Content Container -->
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
          class="mt-8 mb-8"
          @primary:click="handlePrimaryCtaClick"
          @secondary:click="handleSecondaryCtaClick"
        />
        
        <!-- Trust Signal -->
        <Text
          v-if="trustSignal"
          tag="p"
          size="sm"
          class="text-muted-foreground/80 text-center mt-6 font-medium"
        >
          {{ trustSignal }}
        </Text>
      </div>
    </div>
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
    // Container & Layout
    'relative overflow-hidden mt-16',
    'rounded-3xl',
    
    // Modern Shadows & Elevation
    'shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)]',
    'dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)]',
    
    // Premium Interactions
    'transition-all duration-700 ease-out',
    'hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.35)]',
    'dark:hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.5)]',
    'hover:scale-[1.01] hover:-translate-y-1',
    'group cursor-default',
    
    // Performance
    'transform-gpu will-change-transform',
  ]
  
  return baseClasses
})

const iconContainerClasses = computed(() => [
  // Layout & Size
  'w-24 h-24 mx-auto mb-8',
  'flex items-center justify-center',
  
  // Modern Glass Effect
  'bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10',
  'backdrop-blur-sm border border-primary/20',
  'rounded-2xl',
  
  // Advanced Shadows
  'shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)]',
  'dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3)]',
  
  // Premium Interactions
  'transition-all duration-500 ease-out',
  'hover:bg-gradient-to-br hover:from-primary/20 hover:via-primary/10 hover:to-accent/20',
  'hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.15)]',
  'dark:hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.4)]',
  'hover:scale-110 hover:rotate-2',
  'group-hover:scale-105',
  
  // Performance
  'transform-gpu will-change-transform',
])

const iconClasses = computed(() => [
  'text-primary transition-all duration-300 ease-out',
  'group-hover:scale-110 group-hover:text-primary/90',
])

const mainHeadingClasses = computed(() => [
  'font-black leading-[1.1] tracking-tight mb-8',
  'text-balance', // Better text wrapping
])

const supportingCopyClasses = computed(() => [
  'text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium mb-8',
  'text-balance', // Better text wrapping
])

// Event handlers
const handlePrimaryCtaClick = () => {
  emit('primaryCtaClick')
}

const handleSecondaryCtaClick = () => {
  emit('secondaryCtaClick')
}
</script>