<template>
  <GlassCard :variant="cardVariant" :hover="false" :class="cardClasses">
    <!-- Card Header -->
    <div :class="headerClasses">
      <Heading :as="headingLevel" size="h2-compact" class="text-center">
        {{ title }}
      </Heading>
      <Text v-if="subtitle" size="base" variant="muted" class="text-center mt-2">
        {{ subtitle }}
      </Text>
    </div>

    <!-- Social Login Section -->
    <div v-if="showSocialLogin" :class="socialSectionClasses">
      <SocialLoginGroup
        :providers="socialProviders"
        :loading="loading"
        :button-variant="socialButtonVariant"
        :button-size="socialButtonSize"
        :show-divider="true"
        :divider-text="dividerText"
        @social-login="handleSocialLogin"
      />
    </div>

    <!-- Login Form Section -->
    <div :class="formSectionClasses">
      <LoginForm
        :loading="loading"
        :submit-variant="submitVariant"
        :submit-size="submitSize"
        :submit-text="submitText"
        :loading-text="loadingText"
        :show-forgot-password="showForgotPassword"
        :message="formMessage"
        :message-type="formMessageType"
        :enable-validation="enableValidation"
        @submit="handleLoginSubmit"
        @forgot-password="handleForgotPassword"
        @field-change="handleFieldChange"
      />
    </div>

    <!-- Toggle Links Section -->
    <div v-if="showToggleLinks" :class="toggleSectionClasses">
      <AuthToggleLinks
        current-mode="login"
        :text-size="toggleTextSize"
        :link-size="toggleLinkSize"
        :show-icon="showToggleIcon"
        @toggle="handleModeToggle"
      />
    </div>

    <!-- Trust Indicators Section -->
    <div v-if="showTrustIndicators" :class="trustSectionClasses">
      <TrustIndicators
        :show-badges="showTrustBadges"
        :badges="trustBadges"
        :show-message="showTrustMessage"
        :message="trustMessage"
        :show-privacy-note="showPrivacyNote"
        :privacy-text="privacyText"
        :size="trustIndicatorSize"
        @privacy-click="handlePrivacyClick"
        @badge-click="handleBadgeClick"
      />
    </div>
  </GlassCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Social provider type
type SocialProvider = 'google' | 'github' | 'apple' | 'microsoft'

// Form data interface
interface LoginFormData {
  email: string
  password: string
}

// Component props
interface LoginCardProps {
  /** Card title */
  title?: string
  /** Card subtitle */
  subtitle?: string
  /** Card variant */
  cardVariant?: 'light' | 'heavy' | 'elevated'
  /** Heading level */
  headingLevel?: 'h1' | 'h2' | 'h3'
  /** Loading state */
  loading?: boolean
  /** Show social login */
  showSocialLogin?: boolean
  /** Social providers */
  socialProviders?: SocialProvider[]
  /** Social button variant */
  socialButtonVariant?: 'default' | 'outline' | 'secondary'
  /** Social button size */
  socialButtonSize?: 'sm' | 'default' | 'lg'
  /** Divider text */
  dividerText?: string
  /** Submit button variant */
  submitVariant?: 'default' | 'outline' | 'secondary'
  /** Submit button size */
  submitSize?: 'sm' | 'default' | 'lg'
  /** Submit button text */
  submitText?: string
  /** Loading text */
  loadingText?: string
  /** Show forgot password */
  showForgotPassword?: boolean
  /** Show toggle links */
  showToggleLinks?: boolean
  /** Toggle text size */
  toggleTextSize?: 'xs' | 'sm' | 'base'
  /** Toggle link size */
  toggleLinkSize?: 'sm' | 'default' | 'lg'
  /** Show toggle icon */
  showToggleIcon?: boolean
  /** Show trust indicators */
  showTrustIndicators?: boolean
  /** Show trust badges */
  showTrustBadges?: boolean
  /** Trust badges to show */
  trustBadges?: string[]
  /** Show trust message */
  showTrustMessage?: boolean
  /** Trust message */
  trustMessage?: string
  /** Show privacy note */
  showPrivacyNote?: boolean
  /** Privacy text */
  privacyText?: string
  /** Trust indicator size */
  trustIndicatorSize?: 'sm' | 'md' | 'lg'
  /** Form message */
  formMessage?: string
  /** Form message type */
  formMessageType?: 'error' | 'success' | 'warning' | 'info' | 'default'
  /** Enable form validation */
  enableValidation?: boolean
  /** Card spacing */
  spacing?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<LoginCardProps>(), {
  title: 'Welcome back',
  subtitle: 'Sign in to your account to continue',
  cardVariant: 'light',
  headingLevel: 'h2',
  loading: false,
  showSocialLogin: true,
  socialProviders: () => ['google', 'github'],
  socialButtonVariant: 'outline',
  socialButtonSize: 'default',
  dividerText: 'OR',
  submitVariant: 'default',
  submitSize: 'lg',
  submitText: 'Sign In',
  loadingText: 'Signing in...',
  showForgotPassword: true,
  showToggleLinks: true,
  toggleTextSize: 'sm',
  toggleLinkSize: 'sm',
  showToggleIcon: false,
  showTrustIndicators: true,
  showTrustBadges: true,
  trustBadges: () => ['ssl', 'privacy'],
  showTrustMessage: false,
  showPrivacyNote: true,
  privacyText: 'Your data is secure and protected.',
  trustIndicatorSize: 'sm',
  formMessageType: 'default',
  enableValidation: true,
  spacing: 'md',
})

// Define emits
const emit = defineEmits<{
  'login-submit': [data: LoginFormData]
  'social-login': [provider: SocialProvider]
  'forgot-password': []
  'mode-toggle': [mode: 'login' | 'signup']
  'privacy-click': []
  'badge-click': [badge: string]
  'field-change': [field: keyof LoginFormData, value: string]
}>()

// Computed classes
const cardClasses = computed(() => {
  const spacingClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
  }

  return cn(
    'w-full max-w-md mx-auto',
    spacingClasses[props.spacing],
    'border border-border/50',
    'shadow-lg',
    props.class
  )
})

const headerClasses = computed(() => {
  const spacingClasses = {
    sm: 'mb-6',
    md: 'mb-8',
    lg: 'mb-10',
  }

  return cn(spacingClasses[props.spacing])
})

const socialSectionClasses = computed(() => {
  const spacingClasses = {
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
  }

  return cn(spacingClasses[props.spacing])
})

const formSectionClasses = computed(() => {
  const spacingClasses = {
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
  }

  return cn(spacingClasses[props.spacing])
})

const toggleSectionClasses = computed(() => {
  const spacingClasses = {
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
  }

  return cn(spacingClasses[props.spacing])
})

const trustSectionClasses = computed(() => {
  return cn('pt-4 border-t border-border/30')
})

// Event handlers
const handleLoginSubmit = (data: LoginFormData) => {
  emit('login-submit', data)
}

const handleSocialLogin = (provider: SocialProvider) => {
  emit('social-login', provider)
}

const handleForgotPassword = () => {
  emit('forgot-password')
}

const handleModeToggle = (mode: 'login' | 'signup') => {
  emit('mode-toggle', mode)
}

const handlePrivacyClick = () => {
  emit('privacy-click')
}

const handleBadgeClick = (badge: string) => {
  emit('badge-click', badge)
}

const handleFieldChange = (field: keyof LoginFormData, value: string) => {
  emit('field-change', field, value)
}
</script>

<style scoped>
/* Card entrance animation */
.glass-card {
  animation: cardSlideIn 0.6s ease-out;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Section transition effects */
.mb-6,
.mb-8,
.mb-10 {
  transition: all 0.3s ease-in-out;
}

/* Header animation */
.text-center {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading state */
.loading .mb-6 > *:not(:last-child) {
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
}

/* Trust indicators border */
.border-t {
  transition: border-color 0.3s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .max-w-md {
    max-width: calc(100vw - 2rem);
  }
}
</style>
