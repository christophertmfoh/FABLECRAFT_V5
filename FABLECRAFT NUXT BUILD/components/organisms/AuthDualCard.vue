<template>
  <div :class="containerClasses">
    <!-- Dual Card Layout -->
    <div :class="cardsContainerClasses">
      <!-- Login Card -->
      <div :class="loginCardWrapperClasses">
        <LoginCard
          :loading="loginLoading"
          :title="loginTitle"
          :subtitle="loginSubtitle"
          :card-variant="cardVariant"
          :show-social-login="showSocialLogin"
          :social-providers="socialProviders"
          :social-button-variant="socialButtonVariant"
          :submit-variant="submitVariant"
          :show-forgot-password="showForgotPassword"
          :show-toggle-links="showToggleLinks"
          :show-trust-indicators="showTrustIndicators"
          :trust-badges="trustBadges"
          :form-message="loginMessage"
          :form-message-type="loginMessageType"
          :spacing="cardSpacing"
          :class="loginCardClasses"
          @login-submit="handleLoginSubmit"
          @social-login="handleSocialLogin"
          @forgot-password="handleForgotPassword"
          @mode-toggle="handleModeToggle"
          @privacy-click="handlePrivacyClick"
          @badge-click="handleBadgeClick"
          @field-change="handleLoginFieldChange"
        />
      </div>

      <!-- Signup Card -->
      <div :class="signupCardWrapperClasses">
        <SignupCard
          :loading="signupLoading"
          :title="signupTitle"
          :subtitle="signupSubtitle"
          :card-variant="cardVariant"
          :show-social-login="showSocialLogin"
          :social-providers="socialProviders"
          :social-button-variant="socialButtonVariant"
          :submit-variant="submitVariant"
          :show-terms="showTerms"
          :show-password-strength="showPasswordStrength"
          :show-password-requirements="showPasswordRequirements"
          :min-password-length="minPasswordLength"
          :show-toggle-links="showToggleLinks"
          :show-trust-indicators="showTrustIndicators"
          :trust-badges="trustBadges"
          :form-message="signupMessage"
          :form-message-type="signupMessageType"
          :spacing="cardSpacing"
          :class="signupCardClasses"
          @signup-submit="handleSignupSubmit"
          @social-login="handleSocialLogin"
          @terms-click="handleTermsClick"
          @privacy-click="handlePrivacyClick"
          @mode-toggle="handleModeToggle"
          @trust-privacy-click="handleTrustPrivacyClick"
          @badge-click="handleBadgeClick"
          @field-change="handleSignupFieldChange"
          @password-strength-change="handlePasswordStrengthChange"
        />
      </div>
    </div>

    <!-- Optional Footer Message -->
    <div v-if="footerMessage" :class="footerClasses">
      <Text size="sm" variant="muted" class="text-center">
        {{ footerMessage }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/components/atoms/Utils'

// Types
type SocialProvider = 'google' | 'github' | 'apple' | 'microsoft'
type AuthMode = 'login' | 'signup'

// Form data interfaces
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

// Component props
interface AuthDualCardProps {
  /** Active mode */
  activeMode?: AuthMode
  /** Layout direction */
  layout?: 'horizontal' | 'vertical' | 'stacked'
  /** Container size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Card variant */
  cardVariant?: 'light' | 'heavy' | 'elevated'
  /** Card spacing */
  cardSpacing?: 'sm' | 'md' | 'lg'
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg' | 'xl'

  // Login configuration
  /** Login loading state */
  loginLoading?: boolean
  /** Login title */
  loginTitle?: string
  /** Login subtitle */
  loginSubtitle?: string
  /** Login message */
  loginMessage?: string
  /** Login message type */
  loginMessageType?: 'error' | 'success' | 'warning' | 'info' | 'default'

  // Signup configuration
  /** Signup loading state */
  signupLoading?: boolean
  /** Signup title */
  signupTitle?: string
  /** Signup subtitle */
  signupSubtitle?: string
  /** Signup message */
  signupMessage?: string
  /** Signup message type */
  signupMessageType?: 'error' | 'success' | 'warning' | 'info' | 'default'

  // Shared configuration
  /** Show social login */
  showSocialLogin?: boolean
  /** Social providers */
  socialProviders?: SocialProvider[]
  /** Social button variant */
  socialButtonVariant?: 'default' | 'outline' | 'secondary'
  /** Submit button variant */
  submitVariant?: 'default' | 'outline' | 'secondary'
  /** Show forgot password */
  showForgotPassword?: boolean
  /** Show toggle links */
  showToggleLinks?: boolean
  /** Show terms checkbox */
  showTerms?: boolean
  /** Show password strength */
  showPasswordStrength?: boolean
  /** Show password requirements */
  showPasswordRequirements?: boolean
  /** Minimum password length */
  minPasswordLength?: number
  /** Show trust indicators */
  showTrustIndicators?: boolean
  /** Trust badges */
  trustBadges?: string[]

  /** Footer message */
  footerMessage?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<AuthDualCardProps>(), {
  activeMode: 'login',
  layout: 'horizontal',
  size: 'lg',
  cardVariant: 'light',
  cardSpacing: 'md',
  gap: 'lg',
  loginLoading: false,
  loginTitle: 'Welcome back',
  loginSubtitle: 'Sign in to your account to continue',
  loginMessageType: 'default',
  signupLoading: false,
  signupTitle: 'Create your account',
  signupSubtitle: 'Join FABLECRAFT and start your storytelling journey',
  signupMessageType: 'default',
  showSocialLogin: true,
  socialProviders: () => ['google', 'github'],
  socialButtonVariant: 'outline',
  submitVariant: 'default',
  showForgotPassword: true,
  showToggleLinks: true,
  showTerms: true,
  showPasswordStrength: true,
  showPasswordRequirements: true,
  minPasswordLength: 8,
  showTrustIndicators: true,
  trustBadges: () => ['ssl', 'privacy', 'secure'],
})

// Define emits
const emit = defineEmits<{
  'login-submit': [data: LoginFormData]
  'signup-submit': [data: SignupFormData]
  'social-login': [provider: SocialProvider]
  'forgot-password': []
  'terms-click': []
  'privacy-click': []
  'trust-privacy-click': []
  'badge-click': [badge: string]
  'mode-toggle': [mode: AuthMode]
  'login-field-change': [field: keyof LoginFormData, value: string]
  'signup-field-change': [field: keyof SignupFormData, value: string | boolean]
  'password-strength-change': [strength: string, score: number]
}>()

// Style variants
const containerVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-5xl',
      xl: 'max-w-6xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

const cardsContainerVariants = cva('w-full', {
  variants: {
    layout: {
      horizontal: 'grid grid-cols-1 lg:grid-cols-2',
      vertical: 'flex flex-col',
      stacked: 'relative',
    },
    gap: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
    gap: 'lg',
  },
})

// Computed classes
const containerClasses = computed(() => {
  return cn(containerVariants({ size: props.size }), 'mx-auto px-4 py-8', props.class)
})

const cardsContainerClasses = computed(() => {
  return cn(
    cardsContainerVariants({
      layout: props.layout,
      gap: props.gap,
    }),
    'items-start'
  )
})

const loginCardWrapperClasses = computed(() => {
  const baseClasses = 'w-full'

  if (props.layout === 'stacked') {
    return cn(baseClasses, 'absolute inset-0 transition-all duration-500 ease-in-out', {
      'opacity-100 z-10 transform translate-x-0': props.activeMode === 'login',
      'opacity-0 z-0 transform -translate-x-full': props.activeMode === 'signup',
    })
  }

  return cn(baseClasses, 'transition-all duration-300 ease-in-out', {
    'lg:order-1': props.layout === 'horizontal',
    'opacity-100': props.activeMode === 'login',
    'opacity-70 scale-95': props.activeMode === 'signup' && props.layout === 'horizontal',
  })
})

const signupCardWrapperClasses = computed(() => {
  const baseClasses = 'w-full'

  if (props.layout === 'stacked') {
    return cn(baseClasses, 'absolute inset-0 transition-all duration-500 ease-in-out', {
      'opacity-100 z-10 transform translate-x-0': props.activeMode === 'signup',
      'opacity-0 z-0 transform translate-x-full': props.activeMode === 'login',
    })
  }

  return cn(baseClasses, 'transition-all duration-300 ease-in-out', {
    'lg:order-2': props.layout === 'horizontal',
    'opacity-100': props.activeMode === 'signup',
    'opacity-70 scale-95': props.activeMode === 'login' && props.layout === 'horizontal',
  })
})

const loginCardClasses = computed(() => {
  return cn('h-full', {
    'shadow-2xl': props.activeMode === 'login',
    'shadow-lg': props.activeMode === 'signup',
  })
})

const signupCardClasses = computed(() => {
  return cn('h-full', {
    'shadow-2xl': props.activeMode === 'signup',
    'shadow-lg': props.activeMode === 'login',
  })
})

const footerClasses = computed(() => {
  const gapClasses = {
    sm: 'mt-4',
    md: 'mt-6',
    lg: 'mt-8',
    xl: 'mt-12',
  }

  return cn(gapClasses[props.gap], 'border-t border-border/30 pt-4')
})

// Event handlers
const handleLoginSubmit = (data: LoginFormData) => {
  emit('login-submit', data)
}

const handleSignupSubmit = (data: SignupFormData) => {
  emit('signup-submit', data)
}

const handleSocialLogin = (provider: SocialProvider) => {
  emit('social-login', provider)
}

const handleForgotPassword = () => {
  emit('forgot-password')
}

const handleTermsClick = () => {
  emit('terms-click')
}

const handlePrivacyClick = () => {
  emit('privacy-click')
}

const handleTrustPrivacyClick = () => {
  emit('trust-privacy-click')
}

const handleBadgeClick = (badge: string) => {
  emit('badge-click', badge)
}

const handleModeToggle = (mode: AuthMode) => {
  emit('mode-toggle', mode)
}

const handleLoginFieldChange = (field: keyof LoginFormData, value: string) => {
  emit('login-field-change', field, value)
}

const handleSignupFieldChange = (field: keyof SignupFormData, value: string | boolean) => {
  emit('signup-field-change', field, value)
}

const handlePasswordStrengthChange = (strength: string, score: number) => {
  emit('password-strength-change', strength, score)
}
</script>

<style scoped>
/* Dual card container animations */
.grid {
  animation: containerSlideIn 0.8s ease-out;
}

@keyframes containerSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card focus effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active card enhancement */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Hover effects for inactive cards */
.opacity-70:hover {
  opacity: 0.85;
  transform: scale(0.98);
}

/* Stacked layout transitions */
.absolute {
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Responsive grid adjustments */
@media (max-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* Disable complex animations on mobile for performance */
  .opacity-70 {
    opacity: 1;
    transform: none;
  }

  .transition-all {
    transition: none;
  }
}

/* Enhanced focus states for accessibility */
.grid:focus-within {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 4px;
  border-radius: 8px;
}

/* Container spacing adjustments */
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .px-4 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .px-4 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Loading state for entire container */
.loading {
  pointer-events: none;
  user-select: none;
}

.loading * {
  animation-play-state: paused;
}
</style>
