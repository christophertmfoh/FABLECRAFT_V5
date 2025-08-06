<template>
  <div
    id="app-root"
    class="min-h-screen bg-background transition-colors duration-300"
    :class="[currentTheme, { 'theme-transition': isThemeTransitioning }]"
  >
    <!-- Background Effects Layer -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Paper Texture -->
      <PaperTexture v-if="paperTextureEnabled" />

      <!-- Background Orbs -->
      <BackgroundOrbs v-if="orbsEnabled" performance-mode="high" />

      <!-- Firefly Effect -->
      <FireflyEffect v-if="firefliesEnabled" :count="fireflyCount" performance-mode="high" />
    </div>

    <!-- Main Content Layer -->
    <div class="relative z-10">
      <!-- Skip to Content Link (Accessibility) -->
      <VisuallyHidden>
        <a href="#main-content" class="skip-link"> Skip to main content </a>
      </VisuallyHidden>

      <!-- Navigation Header -->
      <NavigationHeader
        :is-authenticated="isAuthenticated"
        :user="user"
        @auth:click="handleAuth"
        @auth:logout="handleLogout"
        @navigate="handleNavigate"
        @logo:click="handleHome"
      />

      <!-- Main Content -->
      <main id="main-content" class="relative z-20">
        <!-- Hero Section -->
        <Section spacing="none" class="hero-section">
          <div class="py-20 sm:py-28">
            <OHeroSection
              id="hero"
              variant="default"
              @primary:click="handleNewProject"
              @secondary:click="handleExploreExamples"
              @badge:click="handleBadgeClick"
            />
          </div>
        </Section>

        <!-- Features Section -->
        <Section spacing="none" class="features-section">
          <div class="py-20 sm:py-28">
            <OFeaturesSection
              id="features"
              variant="default"
              :show-trust-indicators="true"
              :show-key-benefits="true"
            />
          </div>
        </Section>

        <!-- Process Section -->
        <Section spacing="none" class="process-section">
          <div class="py-20 sm:py-28">
            <Container size="xl">
              <OProcessSection
                id="process"
                variant="default"
                @step-click="handleProcessStepClick"
              />
            </Container>
          </div>
        </Section>

        <!-- Testimonials Section -->
        <Section spacing="none" class="testimonials-section">
          <div class="py-20 sm:py-28">
            <OTestimonialsSection
              id="testimonials"
              variant="default"
              @testimonial-click="handleTestimonialClick"
            />
          </div>
        </Section>

        <!-- Pricing Section -->
        <Section spacing="none" class="pricing-section">
          <div class="py-20 sm:py-28">
            <OPricingSection
              id="pricing"
              variant="default"
              @plan-click="handlePlanClick"
              @cta-click="handlePricingCtaClick"
            />
          </div>
        </Section>

        <!-- CTA Section -->
        <Section spacing="none" class="cta-section">
          <div class="py-20 sm:py-28">
            <OCtaSection
              id="cta"
              variant="default"
              @primary-cta-click="handlePrimaryCtaClick"
              @secondary-cta-click="handleSecondaryCtaClick"
            />
          </div>
        </Section>
      </main>

      <!-- Footer Section -->
      <Footer
        id="footer"
        class="relative z-30"
        :show-branding="true"
        variant="default"
        @navigate="handleFooterNavigation"
        @newsletter:subscribe="handleNewsletterSubscribe"
        @newsletter:success="handleNewsletterSuccess"
        @newsletter:error="handleNewsletterError"
        @social:click="handleSocialClick"
        @legal:click="handleLegalClick"
      />
    </div>

    <!-- Scroll Progress Indicator (optional) -->
    <div v-if="showScrollProgress" class="fixed top-0 left-0 w-full h-1 bg-primary/20 z-[100]">
      <div
        class="h-full bg-primary transition-all duration-100"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { logger } from '~/utils/logger'

// Core Nuxt 3 composables
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

// Authentication
const user = useSupabaseUser()

// Compute authentication state
const isAuthenticated = computed(() => !!user.value)

// Theme system
const { currentTheme, isDark, isThemeTransitioning, setThemeWithTransition } = useTheme()

// Visual effects state (using useState for SSR compatibility)
const orbsEnabled = useState('orbs-enabled', () => false)
const firefliesEnabled = useState('fireflies-enabled', () => true)
const fireflyCount = useState('firefly-count', () => 15)
const paperTextureEnabled = useState('paper-texture-enabled', () => true)

// Scroll progress
const showScrollProgress = ref(false)
const scrollProgress = ref(0)

// Header classes removed - now handled by ONavigationHeader component

// Analytics composable (ready for implementation)
// const { trackPageView, trackEvent } = useAnalytics()

// Navigation handlers
const handleAuth = () => {
  // Navigate to auth page or trigger auth modal
  navigateTo('/auth')
}

const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    // Optionally show success message
    logger.log('Logged out successfully')
  } catch (error) {
    logger.error('Error during logout:', error)
  }
}

const handleNavigate = (view: string) => {
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

const handleHome = () => {
  navigateTo('/')
}

// Hero section event handlers
const handleNewProject = () => {
  // Navigate to project creation or open project modal
  navigateTo('/projects/new')
}

const handleExploreExamples = () => {
  // Navigate to examples/templates page
  navigateTo('/examples')
}

const handleBadgeClick = () => {
  // Optional: Navigate to product announcement or features
  navigateTo('/features')
}

// Scroll handling
const handleScroll = () => {
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

// Footer event handlers
const handleFooterNavigation = (payload: { type: string; item: string; category: string }) => {
  logger.log('Footer navigation:', payload)
  // Future: Handle footer navigation routing
}

const handleNewsletterSubscribe = (email: string) => {
  logger.log('Newsletter subscription:', email)
  // Future: Handle newsletter subscription API call
}

const handleNewsletterSuccess = (email: string) => {
  logger.log('Newsletter subscription successful:', email)
  // Future: Show success notification
}

const handleNewsletterError = (error: string) => {
  logger.log('Newsletter subscription error:', error)
  // Future: Show error notification
}

const handleSocialClick = (platform: string) => {
  logger.log('Social media click:', platform)
  // Future: Handle social media analytics
}

const handleLegalClick = (payload: { text: string; href?: string }) => {
  logger.log('Legal link click:', payload)
  // Future: Handle legal page navigation
}

// Process section event handlers
const handleProcessStepClick = (stepNumber: number, stepData: { title: string; description: string; detail?: string; category?: string }) => {
  logger.log('Process step click:', { stepNumber, stepData })
  // Future: Handle process step interactions - could show detailed view, navigate to specific feature, etc.
}

// Testimonials section event handlers
const handleTestimonialClick = (testimonial: { id: string; name: string; role: string; content: string; rating: number }) => {
  logger.log('Testimonial click:', testimonial)
  // Future: Handle testimonial interactions - could show full testimonial, navigate to case study, etc.
}

// Pricing section event handlers
const handlePlanClick = (plan: { id: string; name: string; price: string | number; description: string }) => {
  logger.log('Pricing plan click:', plan)
  // Future: Handle plan interactions - could show detailed comparison, features breakdown, etc.
}

const handlePricingCtaClick = (plan: { id: string; name: string; price: string | number; ctaText?: string }) => {
  logger.log('Pricing CTA click:', plan)
  // Future: Handle pricing CTA - could navigate to signup, payment flow, contact sales, etc.
  
  // Example routing based on plan type
  if (plan.id === 'enterprise') {
    // Could navigate to contact sales page
    logger.log('Navigating to contact sales for enterprise plan')
  } else if (plan.id === 'free') {
    // Could navigate directly to signup
    logger.log('Navigating to free signup')
  } else {
    // Could navigate to payment flow
    logger.log('Navigating to payment flow for paid plan')
  }
}

// CTA section event handlers
const handlePrimaryCtaClick = () => {
  logger.log('Primary CTA click: Start Creating Free')
  // Future: Navigate to signup flow or dashboard
  // For now, could navigate to sign up page
  // navigateTo('/signup')
  
  // Or if user is already authenticated, go to dashboard
  if (isAuthenticated.value) {
    logger.log('User authenticated, navigating to dashboard')
    // navigateTo('/dashboard')
  } else {
    logger.log('User not authenticated, navigating to signup')
    // navigateTo('/signup?plan=free')
  }
}

const handleSecondaryCtaClick = () => {
  logger.log('Secondary CTA click: Watch Demo')
  // Future: Open demo video, navigate to demo page, or trigger demo modal
  // Could be a video modal, YouTube embed, or dedicated demo page
  // Example: openDemoModal() or navigateTo('/demo')
  logger.log('Opening demo experience')
}

// Component mount lifecycle
onMounted(() => {
  // Add scroll listener if progress bar is enabled
  if (showScrollProgress.value) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Track page view
  // trackPageView({ page: 'landing' })

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    orbsEnabled.value = false
    firefliesEnabled.value = false
  }
})

// Cleanup
onUnmounted(() => {
  if (showScrollProgress.value) {
    window.removeEventListener('scroll', handleScroll)
  }
})

// SEO and Meta tags
useHead({
  title: 'Fablecraft - Modern Web Development Foundation',
  meta: [
    {
      name: 'description',
      content:
        'A comprehensive foundation for building modern web applications with Nuxt 3, Vue 3, and TypeScript.',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    // Open Graph
    {
      property: 'og:title',
      content: 'Fablecraft - Modern Web Development Foundation',
    },
    {
      property: 'og:description',
      content:
        'A comprehensive foundation for building modern web applications with Nuxt 3, Vue 3, and TypeScript.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Fablecraft',
    },
    {
      name: 'twitter:description',
      content: 'Modern web development foundation',
    },
  ],
  bodyAttrs: {
    class: computed(() => `${currentTheme.value} ${isDark.value ? 'dark' : 'light'}`),
  },
  // Structured data for SEO
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Fablecraft',
        description: 'Modern web development foundation',
        url: 'https://fablecraft.dev',
      }),
    },
  ],
})

// Route meta for analytics
definePageMeta({
  name: 'landing',
  layout: false, // We're not using a layout wrapper for now
})

// Expose utilities for child components
provide('landingPage', {
  scrollProgress: readonly(scrollProgress),
})
</script>

<style scoped>
/* Scoped styles for landing page specific needs */
.skip-link {
  @apply absolute -top-full left-4 z-[200] bg-primary text-primary-foreground px-4 py-2 rounded;
}

.skip-link:focus {
  @apply top-4;
}

/* Organism Section Spacing - Consistent & Professional */
.hero-section,
.features-section,
.process-section,
.testimonials-section,
.pricing-section,
.cta-section {
  @apply relative;
}

/* Remove any conflicting background patterns for clean spacing */
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%);
  opacity: 0.02;
  pointer-events: none;
}

/* Ensure organisms have consistent internal spacing */
.hero-section > div,
.features-section > div,
.process-section > div,
.testimonials-section > div,
.pricing-section > div,
.cta-section > div {
  @apply w-full;
}

/* Responsive organism spacing adjustments */
@media (max-width: 768px) {
  .hero-section > div,
  .features-section > div,
  .process-section > div,
  .testimonials-section > div,
  .pricing-section > div,
  .cta-section > div {
    @apply py-16;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .hero-section > div,
  .features-section > div,
  .process-section > div,
  .testimonials-section > div,
  .pricing-section > div,
  .cta-section > div {
    @apply py-24;
  }
}

@media (min-width: 1025px) {
  .hero-section > div,
  .features-section > div,
  .process-section > div,
  .testimonials-section > div,
  .pricing-section > div,
  .cta-section > div {
    @apply py-28;
  }
}
</style>
