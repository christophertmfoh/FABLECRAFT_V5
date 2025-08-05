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
        class="pt-8 border-t border-border/20"
        :default-company="companyInfo.name"
        :legal-links="footerLinks.legal"
        :social-links="socialLinks"
        :follow-text="footerBranding.followText"
        layout="split"
        @legal-click="handleLegalClick"
        @social-click="handleSocialClick"
      />

      <!-- Made with Love -->
      <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8 pt-6 border-t border-border/10">
        <span>{{ footerBranding.madeWithText }}</span>
        <AnimatedOrb 
          size="md" 
          animation="pulse"
          :colors="{
            primary: 'hsl(var(--orb-primary))',
            secondary: 'hsl(var(--orb-secondary))'
          }"
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
  (e: 'newsletter:subscribe', email: string): void
  (e: 'newsletter:success', email: string): void
  (e: 'newsletter:error', error: string): void
  (e: 'social:click', platform: string): void
  (e: 'legal:click', payload: { text: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<FooterProps>(), {
  className: '',
  showBranding: true,
  variant: 'default'
})

const emit = defineEmits<FooterEmits>()

// Footer content composable
const {
  companyInfo,
  footerLinks,
  newsletterContent,
  socialLinks,
  footerBranding
} = useFooterContent()

// Computed properties
const tagline = computed(() => {
  return props.tagline || companyInfo.tagline
})

const footerClasses = computed(() => {
  const variantClasses = {
    default: 'relative z-10 bg-gradient-to-t from-muted/30 to-transparent border-t border-border',
    minimal: 'relative z-10 bg-transparent border-t border-border/50',
    dark: 'relative z-10 bg-background border-t border-border'
  }

  return cn(
    'footer-organism',
    variantClasses[props.variant],
    props.className
  )
})

// Event handlers
const handleNavigate = (payload: { text: string; href?: string; category: string }) => {
  emit('navigate', {
    type: 'footer-navigation',
    item: payload.text,
    category: payload.category
  })
  
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'footer_navigation', {
      'link_text': payload.text,
      'link_category': payload.category,
      'link_url': payload.href
    })
  }
}

const handleNewsletter = (email: string) => {
  emit('newsletter:subscribe', email)
}

const handleNewsletterSuccess = (email: string) => {
  emit('newsletter:success', email)
  
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      'method': 'footer_form'
    })
  }
}

const handleNewsletterError = (error: string) => {
  emit('newsletter:error', error)
}

const handleSocialClick = (payload: { platform: string; href?: string }) => {
  emit('social:click', payload.platform)
  
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      'social_platform': payload.platform.toLowerCase(),
      'click_location': 'footer'
    })
  }
}

const handleLegalClick = (payload: { text: string; href?: string; type: 'legal' }) => {
  emit('legal:click', {
    text: payload.text,
    href: payload.href
  })
  
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'legal_link_click', {
      'link_text': payload.text,
      'link_url': payload.href
    })
  }
}
</script>

<style scoped>
/* Footer organism styling */
.footer-organism {
  @apply w-full;
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
  @apply mt-8 pt-6 border-t border-border/10;
}

/* Background gradient variants */
.footer-organism.bg-gradient-to-t {
  background: linear-gradient(to top, hsl(var(--muted) / 0.3), transparent);
}

/* Border styling */
.border-border {
  border-color: hsl(var(--border));
}

.border-border\/20 {
  border-color: hsl(var(--border) / 0.2);
}

.border-border\/10 {
  border-color: hsl(var(--border) / 0.1);
}

/* Muted foreground color */
.text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
  
  .border-border\/20,
  .border-border\/10 {
    @apply border-foreground/30;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .footer-organism * {
    animation: none !important;
    transition: none !important;
  }
}
</style>