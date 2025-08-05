<template>
  <div :class="socialLinksClasses">
    <!-- Follow Text Label -->
    <span 
      v-if="followText" 
      :class="labelClasses"
      :id="labelId"
    >
      {{ followText }}
    </span>

    <!-- Social Icons Group -->
    <div 
      :class="iconsContainerClasses"
      role="group"
      :aria-labelledby="followText ? labelId : undefined"
      :aria-label="followText ? undefined : 'Social media links'"
    >
      <SocialIcon
        v-for="socialLink in links"
        :key="socialLink.label"
        :icon="socialLink.icon"
        :label="socialLink.label"
        :href="socialLink.href"
        :size="iconSize"
        :variant="iconVariant"
        @click="handleSocialClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'
import type { SocialLink } from '~/composables/useFooterContent'

// Props interface
interface SocialLinksProps {
  links: SocialLink[]
  followText?: string
  layout?: 'horizontal' | 'vertical' | 'grid'
  iconSize?: 'sm' | 'md' | 'lg'
  iconVariant?: 'default' | 'subtle' | 'solid'
  spacing?: 'tight' | 'normal' | 'loose'
  alignment?: 'left' | 'center' | 'right'
  class?: string
}

// Events interface
interface SocialLinksEmits {
  (e: 'social-click', payload: { platform: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<SocialLinksProps>(), {
  layout: 'horizontal',
  iconSize: 'md',
  iconVariant: 'default',
  spacing: 'normal',
  alignment: 'left',
  class: ''
})

const emit = defineEmits<SocialLinksEmits>()

// Generate unique ID for label
const labelId = `social-links-label-${Math.random().toString(36).substr(2, 9)}`

// Computed properties
const socialLinksClasses = computed(() => {
  const alignmentClasses = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right'
  }

  const layoutClasses = {
    horizontal: 'flex flex-col',
    vertical: 'flex flex-col',
    grid: 'grid'
  }

  return cn(
    'social-links',
    layoutClasses[props.layout],
    alignmentClasses[props.alignment],
    'items-center gap-4',
    props.class
  )
})

const labelClasses = computed(() => {
  return cn(
    'text-sm text-foreground/60',
    props.alignment === 'center' && 'text-center',
    props.alignment === 'right' && 'text-right'
  )
})

const iconsContainerClasses = computed(() => {
  const layoutClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col',
    grid: 'grid grid-cols-3'
  }

  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-6'
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return cn(
    'social-icons-container',
    layoutClasses[props.layout],
    spacingClasses[props.spacing],
    alignmentClasses[props.alignment],
    'items-center'
  )
})

// Event handlers
const handleSocialClick = (payload: { platform: string; href?: string }) => {
  emit('social-click', payload)
  
  // Track social media clicks for analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      'social_platform': payload.platform.toLowerCase(),
      'link_url': payload.href
    })
  }
}
</script>

<style scoped>
/* Social links container styling */
.social-links {
  @apply w-full;
}

/* Icons container specific styling */
.social-icons-container {
  @apply flex-wrap;
}

/* Grid layout specific styling */
.social-links.grid .social-icons-container {
  @apply grid-cols-3 sm:grid-cols-5 gap-3;
  max-width: fit-content;
}

/* Vertical layout specific styling */
.social-links.vertical .social-icons-container {
  @apply flex-col;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .social-icons-container {
    @apply gap-3;
  }
  
  /* Stack horizontally on small screens for vertical layout */
  .social-links.vertical .social-icons-container {
    @apply flex-row flex-wrap justify-center;
  }
}

/* Focus management for keyboard navigation */
.social-icons-container:focus-within {
  @apply outline-none;
}

/* Hover effects for the container */
.social-icons-container:hover {
  /* Optional: Add container-level hover effects */
}

/* Animation for social icons appearing */
.social-icons-container > * {
  animation: fadeInUp 0.3s ease-out;
  animation-fill-mode: both;
}

.social-icons-container > *:nth-child(1) { animation-delay: 0.1s; }
.social-icons-container > *:nth-child(2) { animation-delay: 0.2s; }
.social-icons-container > *:nth-child(3) { animation-delay: 0.3s; }
.social-icons-container > *:nth-child(4) { animation-delay: 0.4s; }
.social-icons-container > *:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .social-icons-container > * {
    animation: none;
  }
}
</style>