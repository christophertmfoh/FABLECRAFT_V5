<template>
  <div
    id="app-root"
    class="min-h-screen bg-background transition-colors duration-300"
    :class="[currentTheme, { 'theme-transition': isThemeTransitioning }]"
  >
    <!-- Background Effects Layer - CLIENT ONLY for Performance -->
    <!-- These are decorative and don't need SSR -->
    <ClientOnly>
      <div class="fixed inset-0 pointer-events-none z-0">
        <!-- Lazy load each effect component -->
        <LazyPaperTexture v-if="paperTextureEnabled" />
                  <LazyGradientNoiseBackdrop />
          <LazyVignetteOverlay strength="subtle" />
      </div>
      
      <!-- Fallback while effects load (invisible placeholder) -->
      <template #fallback>
        <div class="fixed inset-0 pointer-events-none z-0" />
      </template>
    </ClientOnly>

    <!-- Main Content Layer -->
    <div class="relative z-10">
      <!-- Skip to Content Link (Accessibility) - Keep SSR -->
      <VisuallyHidden>
        <a href="#main-content" class="skip-link">Skip to main content</a>
      </VisuallyHidden>

      <!-- Navigation Header - KEEP SSR (lightweight, needed immediately) -->
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
        <!-- Hero Section - KEEP SSR (critical for SEO and first impression) -->
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

        <!-- Below-the-fold Content - LAZY LOAD for Performance -->
        <!-- All sections still render, just progressively -->
        <ClientOnly>
          <!-- Optional: Show subtle loading state while sections load -->
          <template #fallback>
            <div class="space-y-20 py-20">
              <!-- Minimal skeleton that matches your section heights -->
              <div 
                v-for="i in 5" 
                :key="i"
                class="h-96 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent animate-pulse"
              />
            </div>
          </template>

          <!-- Features Section - Lazy Loaded -->
          <Section spacing="none" class="features-section">
            <div class="py-20 sm:py-28">
              <LazyOFeaturesSection
                id="features"
                variant="default"
                :show-trust-indicators="true"
                :show-key-benefits="true"
              />
            </div>
          </Section>

          <!-- Process Section - Lazy Loaded -->
          <Section spacing="none" class="process-section">
            <div class="py-20 sm:py-28">
              <Container size="xl">
                <LazyOProcessSection
                  id="process"
                  variant="default"
                  @step-click="handleProcessStepClick"
                />
              </Container>
            </div>
          </Section>

          <!-- Testimonials Section - Lazy Loaded -->
          <Section spacing="none" class="testimonials-section">
            <div class="py-20 sm:py-28">
              <LazyOTestimonialsSection
                id="testimonials"
                variant="default"
                @testimonial-click="handleTestimonialClick"
              />
            </div>
          </Section>

          <!-- Pricing Section - Lazy Loaded -->
          <Section spacing="none" class="pricing-section">
            <div class="py-20 sm:py-28">
              <LazyOPricingSection
                id="pricing"
                variant="default"
                @plan-click="handlePlanClick"
                @cta-click="handlePricingCtaClick"
              />
            </div>
          </Section>

          <!-- CTA Section - Lazy Loaded -->
          <Section spacing="none" class="cta-section">
            <div class="py-20 sm:py-28">
              <LazyOCtaSection
                id="cta"
                variant="default"
                @primary-cta-click="handlePrimaryCtaClick"
                @secondary-cta-click="handleSecondaryCtaClick"
              />
            </div>
          </Section>
        </ClientOnly>
      </main>

      <!-- Footer Section - Lazy Loaded (not critical for initial view) -->
      <ClientOnly>
        <LazyFooter
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
      </ClientOnly>
    </div>

    <!-- Scroll Progress Indicator - CLIENT ONLY (interactive feature) -->
    <ClientOnly>
      <div 
        v-if="showScrollProgress" 
        class="fixed top-0 left-0 w-full h-1 bg-primary/20 z-[100]"
      >
        <div
          class="h-full bg-primary transition-all duration-100"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { logger } from '~/utils/logger'

// ===== PERFORMANCE CRITICAL SECTION =====
// Avoid blocking operations during SSR

// Core Nuxt 3 composables

// CRITICAL FIX: Only initialize Supabase on client
// This prevents blocking API calls during SSR
const supabase = import.meta.client ? useSupabaseClient() : null
const user = import.meta.client ? useSupabaseUser() : ref(null)

// Compute authentication state safely
const isAuthenticated = computed(() => !!user?.value)

// Theme system (lightweight, OK for SSR)
const { currentTheme, isDark, isThemeTransitioning } = useTheme()

// Visual effects state (using useState for SSR compatibility)
// Default to false for most effects to improve initial load
// Fireflies removed
// Fireflies removed
const paperTextureEnabled = useState('paper-texture-enabled', () => false) // Changed to false by default

// Scroll progress (client-only feature)
const showScrollProgress = ref(false)
const scrollProgress = ref(0)

// ===== EVENT HANDLERS (No changes needed) =====
// Navigation handlers
const handleAuth = () => {
  navigateTo('/auth')
}

const handleLogout = async () => {
  if (!supabase) return
  
  try {
    await supabase.auth.signOut()
    logger.log('Logged out successfully')
  } catch (error) {
    logger.error('Error during logout:', error)
  }
}

const handleNavigate = (view: string) => {
  if (process.server) return
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

const handleHome = () => {
  if (process.server) return
  navigateTo('/')
}

// Hero section event handlers
const handleNewProject = () => {
  if (process.server) return
  navigateTo('/projects/new')
}

const handleExploreExamples = () => {
  if (process.server) return
  navigateTo('/examples')
}

const handleBadgeClick = () => {
  if (process.server) return
  navigateTo('/features')
}

// Scroll handling (client-only)
const handleScroll = () => {
  if (!import.meta.client) return
  
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

// Footer event handlers
const handleFooterNavigation = (payload: { type: string; item: string; category: string }) => {
  logger.log('Footer navigation:', payload)
}

const handleNewsletterSubscribe = (email: string) => {
  logger.log('Newsletter subscription:', email)
}

const handleNewsletterSuccess = (email: string) => {
  logger.log('Newsletter subscription successful:', email)
}

const handleNewsletterError = (error: string) => {
  logger.log('Newsletter subscription error:', error)
}

const handleSocialClick = (payload: { platform: string; href?: string }) => {
  logger.log('Social media click:', payload.platform)
}

const handleLegalClick = (payload: { text: string; href?: string }) => {
  logger.log('Legal link click:', payload)
}

// Process section event handlers
const handleProcessStepClick = (
  stepNumber: number,
  stepData: { title: string; description: string; detail?: string; category?: string }
) => {
  logger.log('Process step click:', { stepNumber, stepData })
}

// Testimonials section event handlers
const handleTestimonialClick = (testimonial: {
  id: string
  name: string
  role: string
  content: string
  rating: number
}) => {
  logger.log('Testimonial click:', testimonial)
}

// Pricing section event handlers
const handlePlanClick = (plan: any) => {
  logger.log('Pricing plan click:', plan)
}

const handlePricingCtaClick = (plan: any) => {
  logger.log('Pricing CTA click:', plan)
  
  if (plan.id === 'enterprise') {
    logger.log('Navigating to contact sales for enterprise plan')
  } else if (plan.id === 'free') {
    logger.log('Navigating to free signup')
  } else {
    logger.log('Navigating to payment flow for paid plan')
  }
}

// CTA section event handlers
const handlePrimaryCtaClick = () => {
  if (process.server) return
  logger.log('Primary CTA click: Start Creating Free')
  
  if (isAuthenticated.value) {
    logger.log('User authenticated, navigating to dashboard')
    // navigateTo('/dashboard')
  } else {
    logger.log('User not authenticated, navigating to signup')
    // navigateTo('/signup?plan=free')
  }
}

const handleSecondaryCtaClick = () => {
  if (process.server) return
  logger.log('Secondary CTA click: Watch Demo')
  logger.log('Opening demo experience')
}

// ===== LIFECYCLE HOOKS =====
// Component mount lifecycle - CLIENT ONLY operations
onMounted(() => {
  // Enable visual effects after initial load for better UX
  setTimeout(() => {
    // Gradually enable effects for smooth experience
    paperTextureEnabled.value = true
    
    setTimeout(() => {
      // Fireflies removed
    }, 500)
    
    setTimeout(() => {
      // Only enable orbs if user doesn't prefer reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Orbs removed
    }, 1000)
  }, 100)
  
  // Add scroll listener if progress bar is enabled
  if (showScrollProgress.value) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    // Orbs removed
    // Fireflies removed
    paperTextureEnabled.value = false
  }
})

// Cleanup
onUnmounted(() => {
  if (showScrollProgress.value && import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})

// ===== SEO AND META TAGS =====
// These are important for SSR
useSeoMeta({
  title: 'Fablecraft - Create Amazing Stories with AI',
  description: "Transform your ideas into captivating stories with Fablecraft's AI-powered storytelling platform. Create, collaborate, and share your narratives.",
  ogTitle: 'Fablecraft - AI-Powered Storytelling Platform',
  ogDescription: 'Transform your ideas into captivating stories with AI. Start creating for free.',
  ogType: 'website',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Fablecraft - Create Amazing Stories',
  twitterDescription: 'AI-powered storytelling platform for creators',
})

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
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
        '@type': 'WebApplication',
        name: 'Fablecraft',
        description: 'AI-powered storytelling platform',
        url: 'https://fablecraft.dev',
        applicationCategory: 'CreativeWork',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
  ],
})

// Route meta for analytics
definePageMeta({
  name: 'landing',
  layout: false, // No layout wrapper for performance
  // Keep SSR enabled - we're optimizing it, not disabling it
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

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  background-size: 1000px 100%;
}
</style>
