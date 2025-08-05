<template>
  <div :class="brandingClasses">
    <!-- Company Logo and Name -->
    <div v-if="showBranding" class="company-header">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="logo-container">
          <AtomIcon
            name="lucide:feather"
            class="w-6 h-6 text-primary-foreground"
            aria-hidden="true"
          />
        </div>
        <span class="company-name">
          {{ company.name }}
        </span>
      </div>
    </div>

    <!-- Company Tagline and Description -->
    <p class="company-description">{{ displayTagline }}. {{ company.description }}</p>

    <!-- Contact Information Slot -->
    <div class="contact-section">
      <slot name="contact">
        <!-- Default contact info if no slot provided -->
        <div class="space-y-3">
          <ContactInfo icon="lucide:mail" :text="company.contact.email" type="email" />
          <ContactInfo icon="lucide:phone" :text="company.contact.phone" type="phone" />
          <ContactInfo icon="lucide:map-pin" :text="company.contact.location" type="address" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'
import type { CompanyInfo } from '~/composables/useFooterContent'

// Props interface
interface CompanyBrandingProps {
  company: CompanyInfo
  showBranding?: boolean
  tagline?: string
  variant?: 'default' | 'compact' | 'detailed'
  class?: string
}

// Component setup
const props = withDefaults(defineProps<CompanyBrandingProps>(), {
  showBranding: true,
  variant: 'default',
  class: '',
})

// Computed properties
const displayTagline = computed(() => {
  return props.tagline || props.company.tagline
})

const brandingClasses = computed(() => {
  const variantClasses = {
    default: 'space-y-6',
    compact: 'space-y-4',
    detailed: 'space-y-8',
  }

  return cn('company-branding', variantClasses[props.variant], props.class)
})
</script>

<style scoped>
/* Company header styling */
.company-header {
  margin-bottom: 1.5rem;
}

/* Theme-reactive logo container */
.logo-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center shadow-lg;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
  transition: all 0.3s ease;
}

.group:hover .logo-container {
  @apply shadow-xl scale-105;
}

/* Theme-reactive company name with enhanced gradient */
.company-name {
  @apply text-2xl font-bold;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background 300ms ease-in-out;
}

/* Enhanced company description with theme support */
.company-description {
  @apply text-foreground/70 text-sm leading-relaxed max-w-xs;
  transition: color 300ms ease-in-out;
}

/* Contact section */
.contact-section {
  @apply space-y-3;
}

/* Responsive variants with theme awareness */
.company-branding.compact {
  @apply space-y-3;
}

.company-branding.compact .company-description {
  @apply text-xs;
}

.company-branding.compact .logo-container {
  @apply w-10 h-10;
}

.company-branding.compact .company-name {
  @apply text-xl;
}

.company-branding.detailed {
  @apply space-y-6;
}

.company-branding.detailed .company-description {
  @apply text-base max-w-sm;
}

/* Enhanced responsive adjustments */
@media (max-width: 768px) {
  .company-name {
    @apply text-xl;
  }

  .logo-container {
    @apply w-10 h-10;
  }

  .company-description {
    @apply text-xs;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .company-name {
    background: hsl(var(--primary));
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    background-clip: unset;
    @apply text-primary;
  }

  .company-description {
    @apply text-foreground/90;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .logo-container,
  .company-name,
  .company-description {
    transition: none !important;
  }

  .group:hover .logo-container {
    @apply scale-100;
  }
}

/* Print styles */
@media print {
  .logo-container {
    @apply shadow-none bg-gray-200;
  }

  .company-name {
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    background-clip: unset;
    @apply text-black;
  }

  .company-description {
    @apply text-gray-700;
  }
}
</style>
