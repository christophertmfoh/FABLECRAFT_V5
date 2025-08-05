<template>
  <div :class="footerBottomClasses">
    <div :class="contentContainerClasses">
      <!-- Copyright and Legal Section -->
      <div :class="copyrightSectionClasses">
        <slot name="copyright">
          <!-- Default copyright content if no slot provided -->
          <div class="flex flex-col sm:flex-row items-center gap-4 text-sm text-foreground/50">
            <CopyrightText :company="defaultCompany" :start-year="startYear" />
            <LegalLinks
              v-if="legalLinks.length > 0"
              :links="legalLinks"
              layout="horizontal"
              separator="•"
              :show-separators="true"
              @link-click="handleLegalClick"
            />
          </div>
        </slot>
      </div>

      <!-- Social Media Section -->
      <div :class="socialSectionClasses">
        <slot name="social">
          <!-- Default social content if no slot provided -->
          <SocialLinks
            v-if="socialLinks.length > 0"
            :links="socialLinks"
            :follow-text="followText"
            layout="horizontal"
            icon-size="md"
            icon-variant="default"
            spacing="normal"
            alignment="right"
            @social-click="handleSocialClick"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'
import type { SocialLink } from '~/composables/useFooterContent'

// Types
type LegalLinkItem = string | { text: string; href?: string }

// Props interface
interface FooterBottomProps {
  defaultCompany?: string
  startYear?: number
  legalLinks?: LegalLinkItem[]
  socialLinks?: SocialLink[]
  followText?: string
  layout?: 'stacked' | 'split' | 'centered'
  variant?: 'default' | 'minimal' | 'detailed'
  class?: string
}

// Events interface
interface FooterBottomEmits {
  (e: 'legal-click', payload: { text: string; href?: string; type: 'legal' }): void
  (e: 'social-click', payload: { platform: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<FooterBottomProps>(), {
  defaultCompany: 'Fablecraft',
  legalLinks: () => [],
  socialLinks: () => [],
  followText: 'Follow us',
  layout: 'split',
  variant: 'default',
  class: '',
})

const emit = defineEmits<FooterBottomEmits>()

// Computed properties
const footerBottomClasses = computed(() => {
  const variantClasses = {
    default: 'pt-8 border-t border-border/20',
    minimal: 'pt-6 border-t border-border/10',
    detailed: 'pt-10 border-t border-border/30',
  }

  return cn('footer-bottom', 'w-full', variantClasses[props.variant], props.class)
})

const contentContainerClasses = computed(() => {
  const layoutClasses = {
    stacked: 'flex flex-col items-center gap-6',
    split: 'flex flex-col md:flex-row items-center justify-between gap-6',
    centered: 'flex flex-col items-center text-center gap-4',
  }

  return cn('footer-bottom-content', 'w-full', layoutClasses[props.layout])
})

const copyrightSectionClasses = computed(() => {
  const layoutClasses = {
    stacked: 'order-1 w-full text-center',
    split: 'order-1 md:order-1 flex-1 text-left',
    centered: 'order-1 w-full text-center',
  }

  return cn('copyright-section', layoutClasses[props.layout])
})

const socialSectionClasses = computed(() => {
  const layoutClasses = {
    stacked: 'order-2 w-full text-center',
    split: 'order-2 md:order-2 flex-shrink-0 text-right',
    centered: 'order-2 w-full text-center',
  }

  return cn('social-section', layoutClasses[props.layout])
})

// Event handlers
const handleLegalClick = (payload: { text: string; href?: string; type: 'legal' }) => {
  emit('legal-click', payload)
}

const handleSocialClick = (payload: { platform: string; href?: string }) => {
  emit('social-click', payload)
}
</script>

<style scoped>
/* Footer bottom styling */
.footer-bottom {
  @apply w-full;
}

.footer-bottom-content {
  @apply w-full;
}

/* Section styling */
.copyright-section,
.social-section {
  @apply flex items-center;
}

/* Layout specific adjustments */
.footer-bottom .flex-col .copyright-section {
  @apply justify-center;
}

.footer-bottom .flex-col .social-section {
  @apply justify-center;
}

/* Responsive behavior */
@media (max-width: 768px) {
  /* Force stacked layout on mobile */
  .footer-bottom-content.md\:flex-row {
    @apply flex-col items-center text-center gap-4;
  }

  .copyright-section {
    @apply text-center w-full;
  }

  .social-section {
    @apply text-center w-full;
  }
}

/* Ensure proper spacing */
.footer-bottom-content > * {
  @apply min-w-0; /* Prevent flex items from overflowing */
}

/* Border styling variants */
.footer-bottom.border-t {
  border-top-width: 1px;
  border-top-style: solid;
}

.border-border\/20 {
  border-color: hsl(var(--border) / 0.2);
}

.border-border\/10 {
  border-color: hsl(var(--border) / 0.1);
}

.border-border\/30 {
  border-color: hsl(var(--border) / 0.3);
}

/* Focus management */
.footer-bottom:focus-within {
  @apply outline-none;
}

/* Text color consistency */
.text-foreground\/50 {
  color: hsl(var(--foreground) / 0.5);
}
</style>
