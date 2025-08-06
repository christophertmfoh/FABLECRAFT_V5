<template>
  <form :class="formClasses" @submit.prevent="handleSubmit">
    <!-- Email Field -->
    <FormField
      v-model="formData.email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :required="true"
      :disabled="loading"
      :has-error="!!errors.email"
      :error-message="errors.email"
      autocomplete="email"
      @blur="validateField('email')"
    />

    <!-- Password Field -->
    <PasswordField
      v-model="formData.password"
      label="Password"
      placeholder="Enter your password"
      :required="true"
      :disabled="loading"
      :has-error="!!errors.password"
      :error-message="errors.password"
      :show-strength="false"
      :show-requirements="false"
      autocomplete="current-password"
      @blur="validateField('password')"
    />

    <!-- Forgot Password Link -->
    <div v-if="showForgotPassword" :class="forgotPasswordClasses">
      <Button
        variant="link"
        size="sm"
        :disabled="loading"
        class="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
        @click="handleForgotPassword"
      >
        Forgot your password?
      </Button>
    </div>

    <!-- Submit Button -->
    <Button
      type="submit"
      :variant="submitVariant"
      :size="submitSize"
      :disabled="!isFormValid || loading"
      :class="submitClasses"
    >
      <template v-if="loading" #leading>
        <Spinner size="sm" class="text-current" />
      </template>
      <template v-else-if="submitIcon" #leading>
        <AtomIcon :name="submitIcon" class="h-4 w-4" />
      </template>

      {{ loading ? loadingText : submitText }}
    </Button>

    <!-- Form Message -->
    <FormMessage v-if="message" :type="messageType" :message="message" class="mt-4" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Form data interface
interface LoginFormData {
  email: string
  password: string
}

// Validation errors interface
interface LoginFormErrors {
  email?: string
  password?: string
}

// Component props
interface LoginFormProps {
  /** Form loading state */
  loading?: boolean
  /** Submit button variant */
  submitVariant?: 'default' | 'outline' | 'secondary'
  /** Submit button size */
  submitSize?: 'sm' | 'default' | 'lg'
  /** Submit button text */
  submitText?: string
  /** Loading state text */
  loadingText?: string
  /** Submit button icon */
  submitIcon?: string
  /** Show forgot password link */
  showForgotPassword?: boolean
  /** Form spacing */
  spacing?: 'sm' | 'md' | 'lg'
  /** Form message */
  message?: string
  /** Form message type */
  messageType?: 'error' | 'success' | 'warning' | 'info' | 'default'
  /** Enable client-side validation */
  enableValidation?: boolean
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<LoginFormProps>(), {
  loading: false,
  submitVariant: 'default',
  submitSize: 'lg',
  submitText: 'Sign In',
  loadingText: 'Signing in...',
  showForgotPassword: true,
  spacing: 'md',
  messageType: 'default',
  enableValidation: true,
})

// Define emits
const emit = defineEmits<{
  submit: [data: LoginFormData]
  'forgot-password': []
  'field-change': [field: keyof LoginFormData, value: string]
}>()

// Form data
const formData = reactive<LoginFormData>({
  email: '',
  password: '',
})

// Form errors
const errors = reactive<LoginFormErrors>({})

// Validation functions
const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }

  return undefined
}

const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required'
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return undefined
}

const validateField = (field: keyof LoginFormData) => {
  if (!props.enableValidation) return

  const value = formData[field]

  switch (field) {
    case 'email':
      errors.email = validateEmail(value)
      break
    case 'password':
      errors.password = validatePassword(value)
      break
  }
}

const validateForm = (): boolean => {
  if (!props.enableValidation) return true

  validateField('email')
  validateField('password')

  return !errors.email && !errors.password
}

// Computed properties
const isFormValid = computed(() => {
  if (!props.enableValidation) {
    return formData.email && formData.password
  }

  return formData.email && formData.password && !errors.email && !errors.password
})

const formClasses = computed(() => {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  }

  return cn('w-full', spacingClasses[props.spacing], props.class)
})

const forgotPasswordClasses = computed(() => {
  return cn('flex justify-end')
})

const submitClasses = computed(() => {
  return cn('w-full', 'transition-all duration-200', 'hover:scale-[1.02] active:scale-[0.98]', {
    'opacity-50 cursor-not-allowed': !isFormValid.value || props.loading,
  })
})

// Event handlers
const handleSubmit = () => {
  if (!validateForm() || props.loading) return

  emit('submit', { ...formData })
}

const handleForgotPassword = () => {
  emit('forgot-password')
}

// Watch for form changes
watch(
  () => formData.email,
  newValue => {
    emit('field-change', 'email', newValue)
    if (props.enableValidation && errors.email) {
      validateField('email')
    }
  }
)

watch(
  () => formData.password,
  newValue => {
    emit('field-change', 'password', newValue)
    if (props.enableValidation && errors.password) {
      validateField('password')
    }
  }
)

// Clear errors when form is no longer loading
watch(
  () => props.loading,
  newLoading => {
    if (!newLoading) {
      // Clear form errors when loading stops (successful submission)
      Object.keys(errors).forEach(key => {
        const errorKey = key as keyof LoginFormErrors
        errors[errorKey] = undefined
      })
    }
  }
)
</script>

<style scoped>
/* Form animation */
form {
  transition: opacity 0.3s ease-in-out;
}

form:has(button:disabled) {
  transition: all 0.2s ease-in-out;
}

/* Submit button enhancement */
button[type='submit'] {
  position: relative;
  overflow: hidden;
}

/* Loading state enhancement */
button[type='submit']:disabled {
  transform: none !important;
}

/* Focus trap for form */
form:focus-within {
  outline: none;
}

/* Smooth field transitions */
.space-y-6 > * {
  transition: transform 0.2s ease-in-out;
}

form:has(.loading) .space-y-6 > *:not(:last-child) {
  opacity: 0.8;
}
</style>
