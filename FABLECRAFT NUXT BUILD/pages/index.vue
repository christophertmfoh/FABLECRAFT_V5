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
        <OHeroSection
          id="hero"
          variant="default"
          class="hero-section"
          @primary:click="handleNewProject"
          @secondary:click="handleExploreExamples"
          @badge:click="handleBadgeClick"
        />

        <!-- Features Section -->
        <OFeaturesSection
          id="features"
          variant="default"
          :show-trust-indicators="true"
          :show-key-benefits="true"
        />

        <!-- Process Section -->
        <Section id="process" spacing="lg" class="process-section bg-muted/30">
          <Container size="xl">
            <!-- Process Component Placeholder -->
            <div
              class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg"
            >
              <span class="text-muted-foreground">Process Section</span>
            </div>
          </Container>
        </Section>

        <!-- Testimonials Section -->
        <Section id="testimonials" spacing="lg" class="testimonials-section">
          <Container size="lg">
            <!-- Testimonials Component Placeholder -->
            <div
              class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg"
            >
              <span class="text-muted-foreground">Testimonials Section</span>
            </div>
          </Container>
        </Section>

        <!-- Pricing Section -->
        <PricingSection
          :is-authenticated="isAuthenticated"
          @plan-select="handlePlanSelect"
          @auth-required="handleAuthRequired"  
          @navigate="handleNavigate"
          @feature-click="handleFeatureClick"
          @feature-expand="handleFeatureExpand"
          @section-view="handlePricingSectionView"
        />

        <!-- CTA Section -->
        <Section id="cta" spacing="lg" class="cta-section">
          <Container size="md">
            <!-- CTA Component Placeholder -->
            <div
              class="min-h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg"
            >
              <span class="text-muted-foreground">CTA Section</span>
            </div>
          </Container>
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

// Pricing section event handlers
const handlePlanSelect = (event: any) => {
  logger.log('Plan selected:', event)
  // Handle plan selection - redirect to checkout or dashboard
  if (event.planDetails.id === 'enterprise') {
    navigateTo('/contact')
  } else if (isAuthenticated.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/auth')
  }
}

const handleAuthRequired = (planId: string) => {
  logger.log('Authentication required for plan:', planId)
  // Store selected plan and redirect to auth
  navigateTo(`/auth?plan=${planId}`)
}

const handleFeatureClick = (feature: any, tierId: string) => {
  logger.log('Feature clicked:', { feature: feature.text, tier: tierId })
  // Optional: Track feature interest for analytics
}

const handleFeatureExpand = (featureId: string, expanded: boolean, tierId: string) => {
  logger.log('Feature expanded:', { featureId, expanded, tier: tierId })
  // Optional: Track feature detail engagement
}

const handlePricingSectionView = () => {
  logger.log('Pricing section viewed')
  // Optional: Track pricing section visibility for analytics
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

/* Section-specific background patterns (optional) */
.hero-section {
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%);
  opacity: 0.03;
  pointer-events: none;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .mobile-spacing {
    @apply space-y-8;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .tablet-spacing {
    @apply space-y-12;
  }
}

@media (min-width: 1025px) {
  .desktop-spacing {
    @apply space-y-16;
  }
}
</style>
