<template>
  <footer :class="footerClasses" role="contentinfo">
    <Container size="xl" class="py-16">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Company Section -->
        <CompanyBranding
          :company="companyInfo"
          :show-branding="showBranding"
          :tagline="tagline"
          variant="default"
        />

        <!-- Product Links -->
        <NavigationColumn
          title="Product"
          :links="footerLinks.product"
          @link-click="handleNavigate"
        />

        <!-- Company Links -->
        <NavigationColumn
          title="Company"
          :links="footerLinks.company"
          @link-click="handleNavigate"
        />

        <!-- Newsletter & Support -->
        <div class="space-y-6">
          <NewsletterSignup
            :content="newsletterContent"
            @subscribe="handleNewsletter"
            @success="handleNewsletterSuccess"
            @error="handleNewsletterError"
          />

          <NavigationColumn
            title="Support"
            :links="footerLinks.support"
            variant="compact"
            @link-click="handleNavigate"
          />
        </div>
      </div>

      <!-- Footer Bottom -->
      <FooterBottom
        class="pt-8"
        :default-company="companyInfo.name"
        :legal-links="footerLinks.legal"
        :social-links="socialLinks"
        :follow-text="footerBranding.followText"
        layout="split"
        @legal-click="handleLegalClick"
        @social-click="handleSocialClick"
      />

      <!-- Made with Love -->
      <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8 pt-6">
        <span>{{ footerBranding.madeWithText }}</span>
        <APulsingHeart
          size="md"
          color="primary"
          intensity="strong"
          speed="normal"
        />
        <span>{{ footerBranding.madeForText }}</span>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'
import { useFooterContent } from '~/composables/useFooterContent'

// Props interface
interface FooterProps {
  className?: string
  showBranding?: boolean
  tagline?: string
  variant?: 'default' | 'minimal' | 'dark'
}

// Events interface
interface FooterEmits {
  (e: 'navigate', payload: { type: string; item: string; category: string }): void
  (e: 'newsletter:subscribe' | 'newsletter:success', email: string): void
  (e: 'newsletter:error', error: string): void
  (e: 'social:click', platform: string): void
  (e: 'legal:click', payload: { text: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<FooterProps>(), {
  className: '',
  showBranding: true,
  variant: 'default',
})

const emit = defineEmits<FooterEmits>()

// Footer content composable
const { companyInfo, footerLinks, newsletterContent, socialLinks, footerBranding } =
  useFooterContent()

// Computed properties
const tagline = computed(() => {
  return props.tagline || companyInfo.tagline
})

const footerClasses = computed(() => {
  const baseClasses = 'relative z-10'

  const variantClasses = {
    default: '', // Removed border-t - no weird line at top
    minimal: 'bg-transparent', // Removed border-t
    dark: '', // Removed border-t
  }

  return cn('footer-organism', baseClasses, variantClasses[props.variant], props.className)
})

// Event handlers
const handleNavigate = (payload: { text: string; href?: string; category: string }) => {
  emit('navigate', {
    type: 'footer-navigation',
    item: payload.text,
    category: payload.category,
  })

  // Track navigation event
  trackEvent('footer_navigation', {
    link_text: payload.text,
    link_category: payload.category,
    link_url: payload.href,
  })
}

const handleNewsletter = (email: string) => {
  emit('newsletter:subscribe', email)
}

const handleNewsletterSuccess = (email: string) => {
  emit('newsletter:success', email)

  // Track newsletter signup
  trackEvent('newsletter_signup', {
    method: 'footer_form',
  })
}

const handleNewsletterError = (error: string) => {
  emit('newsletter:error', error)
}

const handleSocialClick = (platform: string) => {
  emit('social:click', platform)

  // Track social click
  trackEvent('social_click', {
    platform: platform,
    location: 'footer',
  })
}

const handleLegalClick = (payload: { text: string; href?: string }) => {
  emit('legal:click', payload)

  // Track legal link click
  trackEvent('legal_click', {
    link_text: payload.text,
    link_url: payload.href,
  })
}

// Simple analytics utility
const trackEvent = (eventName: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}
</script>

<style scoped>
/* Footer organism styling - following header pattern */
.footer-organism {
  @apply w-full;
  transition:
    background-color 300ms ease-in-out,
    border-color 300ms ease-in-out;
}

/* Grid responsive behavior */
.grid {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-4;
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid {
    @apply grid-cols-1 gap-8;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    @apply grid-cols-2 gap-10;
  }
}

/* Made with love section styling */
.made-with-love {
  @apply flex items-center justify-center gap-2 text-sm text-muted-foreground;
  @apply mt-8 pt-6;
  transition: color 300ms ease-in-out;
}

/* Focus management for accessibility */
footer:focus-within {
  @apply outline-none;
}

/* Ensure proper spacing for all child elements */
.footer-organism > * {
  @apply w-full;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .footer-organism {
    @apply border-foreground/50;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .footer-organism,
  .footer-organism *,
  .made-with-love {
    animation: none !important;
    transition: none !important;
  }
}

/* Print optimization */
@media print {
  .footer-organism {
    @apply bg-white text-black border-black;
  }

  .made-with-love {
    @apply text-black border-black/20;
  }
}
</style>
