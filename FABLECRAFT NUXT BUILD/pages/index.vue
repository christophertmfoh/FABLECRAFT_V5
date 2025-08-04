<template>
  <div 
    id="app-root"
    class="min-h-screen transition-colors duration-300"
    :class="[
      currentTheme,
      { 'theme-transition': isThemeTransitioning }
    ]"
  >
    <!-- Background Effects Layer -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Paper Texture -->
      <PaperTexture v-if="paperTextureEnabled" />
      
      <!-- Background Orbs -->
      <BackgroundOrbs v-if="orbsEnabled" />
      
      <!-- Firefly Effect -->
      <FireflyEffect v-if="firefliesEnabled" :count="fireflyCount" />
    </div>

    <!-- Main Content Layer -->
    <div class="relative z-10">
      <!-- Skip to Content Link (Accessibility) -->
      <VisuallyHidden>
        <a href="#main-content" class="skip-link">
          Skip to main content
        </a>
      </VisuallyHidden>

      <!-- Header Section -->
      <header 
        id="header"
        class="relative z-50"
        :class="headerClasses"
      >
        <Container size="xl" class="py-4 md:py-6">
          <!-- Header Component Placeholder -->
          <div class="min-h-[64px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <span class="text-muted-foreground">Header Component</span>
          </div>
        </Container>
      </header>

      <!-- Main Content -->
      <main 
        id="main-content"
        class="relative z-20"
      >
        <!-- Hero Section -->
        <Section 
          id="hero"
          spacing="xl"
          class="hero-section"
        >
          <Container size="xl">
            <!-- Hero Component Placeholder -->
            <div class="min-h-[600px] md:min-h-[700px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">Hero Section</span>
            </div>
          </Container>
        </Section>

        <!-- Features Section -->
        <Section 
          id="features"
          spacing="lg"
          class="features-section"
        >
          <Container size="xl">
            <!-- Features Component Placeholder -->
            <div class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">Features Section</span>
            </div>
          </Container>
        </Section>

        <!-- Process Section -->
        <Section 
          id="process"
          spacing="lg"
          class="process-section bg-muted/30"
        >
          <Container size="xl">
            <!-- Process Component Placeholder -->
            <div class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">Process Section</span>
            </div>
          </Container>
        </Section>

        <!-- Testimonials Section -->
        <Section 
          id="testimonials"
          spacing="lg"
          class="testimonials-section"
        >
          <Container size="lg">
            <!-- Testimonials Component Placeholder -->
            <div class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">Testimonials Section</span>
            </div>
          </Container>
        </Section>

        <!-- Pricing Section -->
        <Section 
          id="pricing"
          spacing="lg"
          class="pricing-section bg-muted/20"
        >
          <Container size="xl">
            <!-- Pricing Component Placeholder -->
            <div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">Pricing Section</span>
            </div>
          </Container>
        </Section>

        <!-- CTA Section -->
        <Section 
          id="cta"
          spacing="lg"
          class="cta-section"
        >
          <Container size="md">
            <!-- CTA Component Placeholder -->
            <div class="min-h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <span class="text-muted-foreground">CTA Section</span>
            </div>
          </Container>
        </Section>
      </main>

      <!-- Footer Section -->
      <footer 
        id="footer"
        class="relative z-30 bg-card border-t"
      >
        <Container size="xl" class="py-8 md:py-12">
          <!-- Footer Component Placeholder -->
          <div class="min-h-[200px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <span class="text-muted-foreground">Footer Component</span>
          </div>
        </Container>
      </footer>
    </div>

    <!-- Scroll Progress Indicator (optional) -->
    <div 
      v-if="showScrollProgress"
      class="fixed top-0 left-0 w-full h-1 bg-primary/20 z-[100]"
    >
      <div 
        class="h-full bg-primary transition-all duration-100"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Core Nuxt 3 composables
const route = useRoute()
const router = useRouter()

// Theme system
const { 
  currentTheme, 
  isDark,
  isThemeTransitioning,
  setThemeWithTransition 
} = useTheme()

// Visual effects state (using useState for SSR compatibility)
const orbsEnabled = useState('orbs-enabled', () => true)
const firefliesEnabled = useState('fireflies-enabled', () => true)
const fireflyCount = useState('firefly-count', () => 12)
const paperTextureEnabled = useState('paper-texture-enabled', () => true)

// Scroll progress
const showScrollProgress = ref(false)
const scrollProgress = ref(0)

// Header classes for sticky behavior
const headerClasses = computed(() => ({
  'sticky top-0 bg-background/95 backdrop-blur-md border-b': true,
  'shadow-sm': scrollProgress.value > 5
}))

// Analytics composable (ready for implementation)
// const { trackPageView, trackEvent } = useAnalytics()

// Scroll handling
const handleScroll = () => {
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
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
      content: 'A comprehensive foundation for building modern web applications with Nuxt 3, Vue 3, and TypeScript.' 
    },
    { 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1' 
    },
    // Open Graph
    { 
      property: 'og:title', 
      content: 'Fablecraft - Modern Web Development Foundation' 
    },
    { 
      property: 'og:description', 
      content: 'A comprehensive foundation for building modern web applications with Nuxt 3, Vue 3, and TypeScript.' 
    },
    { 
      property: 'og:type', 
      content: 'website' 
    },
    // Twitter Card
    { 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    },
    { 
      name: 'twitter:title', 
      content: 'Fablecraft' 
    },
    { 
      name: 'twitter:description', 
      content: 'Modern web development foundation' 
    },
  ],
  bodyAttrs: {
    class: computed(() => `${currentTheme.value} ${isDark.value ? 'dark' : 'light'}`)
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
        url: 'https://fablecraft.dev'
      })
    }
  ]
})

// Route meta for analytics
definePageMeta({
  name: 'landing',
  layout: false // We're not using a layout wrapper for now
})

// Expose utilities for child components
provide('landingPage', {
  scrollProgress: readonly(scrollProgress),
  headerClasses: readonly(headerClasses)
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