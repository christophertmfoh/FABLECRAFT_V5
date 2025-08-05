<template>
  <section
    :class="heroSectionClasses"
    :aria-labelledby="headingId"
    role="banner"
  >
    <Container size="xl">
      <!-- Hero Content -->
      <div class="hero-content">
        <!-- Hero Badge -->
        <MHeroBadge
          :text="badgeText"
          :variant="badgeVariant"
          :size="badgeSize"
          :dot-color="badgeDotColor"
          :dot-speed="badgeDotSpeed"
          :clickable="badgeClickable"
          @click="handleBadgeClick"
        />

        <!-- Hero Heading -->
        <MHeroHeading
          :title="title"
          :highlight-text="highlightText"
          :subheading="description"
          :heading-tag="headingTag"
          :heading-id="headingId"
          :variant="headingVariant"
          :size="headingSize"
          :alignment="alignment"
          :gradient-variant="gradientVariant"
          :gradient-direction="gradientDirection"
          :gradient-intensity="gradientIntensity"
          :gradient-animation="gradientAnimation"
          :spacing="headingSpacing"
        />

        <!-- Hero Actions -->
        <MHeroActions
          :primary-text="primaryButtonText"
          :secondary-text="secondaryButtonText"
          :primary-icon="primaryButtonIcon"
          :secondary-icon="secondaryButtonIcon"
          :primary-variant="primaryButtonVariant"
          :secondary-variant="secondaryButtonVariant"
          :button-size="buttonSize"
          :layout="buttonLayout"
          :alignment="alignment"
          :spacing="buttonSpacing"
          :primary-disabled="primaryDisabled"
          :secondary-disabled="secondaryDisabled"
          :group-label="buttonGroupLabel"
          :class="actionsClasses"
          @primary:click="handlePrimaryClick"
          @secondary:click="handleSecondaryClick"
        />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface HeroSectionProps {
  // Content props
  badgeText?: string
  title?: string
  highlightText?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  
  // Visual props
  variant?: 'default' | 'compact' | 'dramatic'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  alignment?: 'left' | 'center' | 'right'
  
  // Badge props
  badgeVariant?: 'default' | 'accent' | 'secondary' | 'outline'
  badgeSize?: 'sm' | 'base' | 'md' | 'lg'
  badgeDotColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  badgeDotSpeed?: 'slow' | 'normal' | 'fast'
  badgeClickable?: boolean
  
  // Heading props
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingId?: string
  headingVariant?: 'default' | 'compact' | 'dramatic'
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  headingSpacing?: 'tight' | 'normal' | 'relaxed'
  
  // Gradient props
  gradientVariant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  gradientIntensity?: 'subtle' | 'normal' | 'vibrant'
  gradientAnimation?: 'none' | 'shimmer' | 'pulse' | 'flow'
  
  // Button props  
  primaryButtonIcon?: string
  secondaryButtonIcon?: string
  primaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  secondaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  buttonSize?: 'sm' | 'default' | 'lg' | 'icon'
  buttonLayout?: 'stacked' | 'inline' | 'responsive'
  buttonSpacing?: 'tight' | 'normal' | 'relaxed'
  buttonGroupLabel?: string
  primaryDisabled?: boolean
  secondaryDisabled?: boolean
  
  // Layout props
  spacing?: 'tight' | 'normal' | 'relaxed' | 'spacious'
  background?: 'default' | 'gradient' | 'transparent'
  className?: string
}

// Events interface
interface HeroSectionEmits {
  (e: 'primary:click', event: MouseEvent): void
  (e: 'secondary:click', event: MouseEvent): void  
  (e: 'badge:click', event: MouseEvent): void
}

// Component setup
const props = withDefaults(defineProps<HeroSectionProps>(), {
  // Default content
  badgeText: 'End-to-End Creative Production Suite',
  title: 'Where Creative Visions ',
  highlightText: 'Become Reality',
  description: `The world's first complete multimedia creative suite. Transform ideas into novels, screenplays, graphic novels, and D&D campaigns. From concept to publication, from script to screen, all powered by AI that understands your creative universe.`,
  primaryButtonText: 'Start Creating Free',
  secondaryButtonText: 'Explore Examples',
  
  // Default styling
  variant: 'default',
  size: 'xl',
  alignment: 'center',  // Keep center alignment for hero section
  
  // Default badge settings
  badgeVariant: 'default',
  badgeSize: 'base',  // Perfect middle ground between sm and md
  badgeDotColor: 'primary',
  badgeDotSpeed: 'normal',
  badgeClickable: false,
  
  // Default heading settings
  headingTag: 'h1',
  headingId: 'hero-heading',
  headingVariant: 'default',
  headingSize: '2xl',  // Updated to match React original's golden ratio typography
  headingSpacing: 'relaxed',  // Increased from 'normal' to prevent text clipping
  
  // Default gradient settings
  gradientVariant: 'primary',
  gradientDirection: 'to-r',
  gradientIntensity: 'normal',
  gradientAnimation: 'none',
  
  // Default button settings
  primaryButtonIcon: 'lucide:zap',
  secondaryButtonIcon: 'lucide:sparkles',
  primaryButtonVariant: 'default',
  secondaryButtonVariant: 'outline',
  buttonSize: 'lg',
  buttonLayout: 'responsive',
  buttonSpacing: 'normal',
  buttonGroupLabel: 'Hero action buttons',
  primaryDisabled: false,
  secondaryDisabled: false,
  
  // Default layout settings
  spacing: 'normal',
  background: 'default',
  className: ''
})

const emit = defineEmits<HeroSectionEmits>()

// Computed properties
const heroSectionClasses = computed(() => {
  const variantClasses = {
    default: 'hero-ambient-glow py-16 sm:py-20 lg:py-24',
    compact: 'py-8 sm:py-12 lg:py-16',
    dramatic: 'hero-ambient-glow py-20 sm:py-24 lg:py-32'
  }
  
  const backgroundClasses = {
    default: 'relative z-10',
    gradient: 'relative z-10 bg-gradient-to-b from-background/50 to-background',
    transparent: 'relative z-10 bg-transparent'
  }

  return cn(
    'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'transition-all duration-300',
    variantClasses[props.variant],
    backgroundClasses[props.background],
    props.className
  )
})

const actionsClasses = computed(() => {
  const spacingClasses = {
    tight: 'mt-6',
    normal: 'mt-8',
    relaxed: 'mt-12',
    spacious: 'mt-16'
  }

  return cn(
    'transition-all duration-300',
    spacingClasses[props.spacing]
  )
})

// Event handlers
const handlePrimaryClick = (event: MouseEvent) => {
  emit('primary:click', event)
}

const handleSecondaryClick = (event: MouseEvent) => {
  emit('secondary:click', event)
}

const handleBadgeClick = (event: MouseEvent) => {
  emit('badge:click', event)
}
</script>

<style scoped>
/* Hero section styling with optimized theme integration */
.hero-content {
  @apply text-center max-w-5xl mx-auto;
  display: flex;
  flex-direction: column;
  /* Removed uniform gap - using individual spacing for better hierarchy */
}

/* Individual element spacing for optimal visual hierarchy */
.hero-content > *:not(:first-child) {
  margin-top: var(--space-lg); /* Default 20px spacing */
}

/* Tighter spacing between badge and heading (closely related) */
.hero-content > :nth-child(2) {
  margin-top: var(--space-md); /* 16px - badge to heading */
}

/* Moderate spacing before action buttons (reduced from 3xl to xl) */
.hero-content > :nth-child(3) {
  margin-top: var(--space-xl); /* 24px - heading to buttons for better cohesion */
}

/* Enhanced hero ambient glow effect - optimized */
.hero-ambient-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    hsl(var(--primary) / 0.15) 0%,
    transparent 70%
  );
  transform: translateX(-50%);
  filter: blur(60px);
  z-index: -1;
  pointer-events: none;
  opacity: 1;
}

/* Responsive spacing optimizations */
@media (max-width: 640px) {
  .hero-content > *:not(:first-child) {
    margin-top: var(--space-md); /* Reduced spacing on mobile */
  }
  
  .hero-content > :nth-child(2) {
    margin-top: var(--space-sm); /* Tighter badge to heading on mobile */
  }
  
  .hero-content > :nth-child(3) {
    margin-top: var(--space-lg); /* Reduced from xl to lg on mobile */
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .hero-content > *:not(:first-child) {
    margin-top: var(--space-lg); /* Standard spacing on tablet */
  }
  
  .hero-content > :nth-child(3) {
    margin-top: var(--space-xl); /* Reduced from 2xl to xl on tablet */
  }
}

@media (min-width: 1025px) {
  .hero-content > *:not(:first-child) {
    margin-top: var(--space-xl); /* Larger spacing on desktop */
  }
  
  .hero-content > :nth-child(3) {
    margin-top: var(--space-2xl); /* Reduced from 4xl to 2xl on desktop for better cohesion */
  }
}

/* Enhanced focus management */
.hero-section:focus-within {
  outline: none;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }
  
  .hero-ambient-glow::before {
    animation: none;
    filter: none;
    opacity: 0.3;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .hero-ambient-glow::before {
    display: none;
  }
}

/* Print optimization */
@media print {
  .hero-ambient-glow::before {
    display: none;
  }
  
  .hero-content {
    gap: 1.5rem;
  }
}

/* Theme-reactive dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .hero-ambient-glow::before {
    opacity: 0.6;
  }
}
</style>