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
        <!-- Auth Dual Card Section -->
        <Section spacing="none" class="auth-section">
          <div class="py-20 sm:py-28">
            <Container size="lg">
              <AuthDualCard
                :active-mode="activeAuthMode"
                layout="horizontal"
                size="lg"
                card-variant="light"
                :login-loading="loginLoading"
                :signup-loading="signupLoading"
                :login-message="loginMessage"
                :login-message-type="loginMessageType"
                :signup-message="signupMessage"
                :signup-message-type="signupMessageType"
                :show-social-login="true"
                :social-providers="['google', 'github']"
                :show-trust-indicators="true"
                :trust-badges="['ssl', 'privacy', 'secure']"
                footer-message="Secure authentication powered by FABLECRAFT"
                @login-submit="handleLoginSubmit"
                @signup-submit="handleSignupSubmit"
                @social-login="handleSocialLogin"
                @forgot-password="handleForgotPassword"
                @terms-click="handleTermsClick"
                @privacy-click="handleAuthPrivacyClick"
                @mode-toggle="handleModeToggle"
                @badge-click="handleBadgeClick"
                @login-field-change="handleLoginFieldChange"
                @signup-field-change="handleSignupFieldChange"
                @password-strength-change="handlePasswordStrengthChange"
              />
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
import { ref } from 'vue'
import { logger } from '~/utils/logger'

// Types
type AuthMode = 'login' | 'signup'
type SocialProvider = 'google' | 'github' | 'apple' | 'microsoft'

interface LoginFormData {
  email: string
  password: string
}

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

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
// Orbs removed
const paperTextureEnabled = useState('paper-texture-enabled', () => true)

// Auth form state
const activeAuthMode = ref<AuthMode>('login')
const loginLoading = ref(false)
const signupLoading = ref(false)
const loginMessage = ref('')
const loginMessageType = ref<'error' | 'success' | 'warning' | 'info' | 'default'>('default')
const signupMessage = ref('')
const signupMessageType = ref<'error' | 'success' | 'warning' | 'info' | 'default'>('default')

// Navigation handlers
const handleAuth = () => {
  if (process.client) {
    const { open } = useAuthOverlay()
    open('login')
  }
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

const handleSocialClick = (payload: { platform: string; href?: string }) => {
  logger.log('Social media click:', payload.platform)
}

const handleLegalClick = (payload: { text: string; href?: string }) => {
  logger.log('Legal link click:', payload)
}

// Auth event handlers
const handleLoginSubmit = async (data: LoginFormData) => {
  loginLoading.value = true
  loginMessage.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      loginMessage.value = error.message
      loginMessageType.value = 'error'
    } else {
      loginMessage.value = 'Login successful! Redirecting...'
      loginMessageType.value = 'success'
      // Redirect to dashboard or home
      setTimeout(() => router.push('/'), 1000)
    }
  } catch (error: any) {
    loginMessage.value = 'An unexpected error occurred'
    loginMessageType.value = 'error'
    logger.error('Login error:', error)
  } finally {
    loginLoading.value = false
  }
}

const handleSignupSubmit = async (data: SignupFormData) => {
  signupLoading.value = true
  signupMessage.value = ''

  try {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    })

    if (error) {
      signupMessage.value = error.message
      signupMessageType.value = 'error'
    } else {
      signupMessage.value = 'Account created! Please check your email to verify your account.'
      signupMessageType.value = 'success'
    }
  } catch (error: any) {
    signupMessage.value = 'An unexpected error occurred'
    signupMessageType.value = 'error'
    logger.error('Signup error:', error)
  } finally {
    signupLoading.value = false
  }
}

const handleSocialLogin = async (provider: SocialProvider) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      const message = `Failed to sign in with ${provider}`
      if (activeAuthMode.value === 'login') {
        loginMessage.value = message
        loginMessageType.value = 'error'
      } else {
        signupMessage.value = message
        signupMessageType.value = 'error'
      }
    }
  } catch (error: any) {
    logger.error('Social login error:', error)
  }
}

const handleForgotPassword = () => {
  // Navigate to forgot password page or show modal
  router.push('/forgot-password')
}

const handleTermsClick = () => {
  // Navigate to terms of service
  router.push('/terms')
}

const handleAuthPrivacyClick = () => {
  // Navigate to privacy policy
  router.push('/privacy')
}

const handleModeToggle = (mode: AuthMode) => {
  activeAuthMode.value = mode
  // Clear any existing messages when switching modes
  loginMessage.value = ''
  signupMessage.value = ''
}

const handleBadgeClick = (badge: string) => {
  logger.log('Trust badge clicked:', badge)
  // Could show info modal about security features
}

const handleLoginFieldChange = (field: keyof LoginFormData, value: string) => {
  // Clear login message when user starts typing
  if (loginMessage.value) {
    loginMessage.value = ''
  }
}

const handleSignupFieldChange = (field: keyof SignupFormData, value: string | boolean) => {
  // Clear signup message when user starts typing
  if (signupMessage.value) {
    signupMessage.value = ''
  }
}

const handlePasswordStrengthChange = (strength: string, score: number) => {
  logger.log('Password strength:', { strength, score })
}
</script>
