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
        <!-- Login Content Area -->
        <Section spacing="none" class="login-section">
          <div class="py-20 sm:py-28">
            <Container size="md">
              <!-- Space for login content goes here -->
              <div class="text-center">
                <Heading as="h1" size="h1-compact" class="mb-4">
                  Login
                </Heading>
                <Text size="lg" variant="muted" class="max-w-md mx-auto">
                  Content goes here
                </Text>
              </div>
            </Container>
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

// Navigation handlers
const handleAuth = () => {
  // Navigate to auth page or trigger auth modal
  navigateTo('/auth')
}

const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
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

const handleSocialClick = (platform: string) => {
  logger.log('Social media click:', platform)
}

const handleLegalClick = (payload: { text: string; href?: string }) => {
  logger.log('Legal link click:', payload)
}
</script>