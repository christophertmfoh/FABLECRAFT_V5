<template>
  <form :class="formClasses" @submit.prevent="handleSubmit">
    <!-- Name Field -->
    <FormField
      v-model="formData.name"
      label="Full Name"
      type="text"
      placeholder="Enter your full name"
      :required="true"
      :disabled="loading"
      :has-error="!!errors.name"
      :error-message="errors.name"
      autocomplete="name"
      @blur="validateField('name')"
    />

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
      placeholder="Create a password"
      :required="true"
      :disabled="loading"
      :has-error="!!errors.password"
      :error-message="errors.password"
      :show-strength="showPasswordStrength"
      :show-requirements="showPasswordRequirements"
      :min-length="minPasswordLength"
      autocomplete="new-password"
      @blur="validateField('password')"
      @strength-change="handlePasswordStrengthChange"
    />

    <!-- Confirm Password Field -->
    <PasswordField
      v-model="formData.confirmPassword"
      label="Confirm Password"
      placeholder="Confirm your password"
      :required="true"
      :disabled="loading"
      :has-error="!!errors.confirmPassword"
      :error-message="errors.confirmPassword"
      :show-strength="false"
      :show-requirements="false"
      autocomplete="new-password"
      @blur="validateField('confirmPassword')"
    />

    <!-- Terms and Privacy -->
    <div v-if="showTerms" :class="termsClasses">
      <label class="flex items-start gap-3 cursor-pointer">
        <Checkbox
          v-model="formData.acceptTerms"
          :disabled="loading"
          :invalid="!!errors.acceptTerms"
          class="mt-0.5"
        />
        <Text size="sm" class="text-muted-foreground leading-relaxed">
          I agree to the
          <Button
            variant="link"
            size="sm"
            class="h-auto p-0 text-sm underline-offset-4"
            @click="handleTermsClick"
          >
            Terms of Service
          </Button>
          and
          <Button
            variant="link"
            size="sm"
            class="h-auto p-0 text-sm underline-offset-4"
            @click="handlePrivacyClick"
          >
            Privacy Policy
          </Button>
        </Text>
      </label>
      <FormMessage
        v-if="errors.acceptTerms"
        type="error"
        :message="errors.acceptTerms"
        class="mt-1"
      />
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
    <FormMessage
      v-if="message"
      :type="messageType"
      :message="message"
      class="mt-4"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Form data interface
interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

// Validation errors interface
interface SignupFormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
}

// Component props
interface SignupFormProps {
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
  /** Show terms and privacy checkbox */
  showTerms?: boolean
  /** Show password strength indicator */
  showPasswordStrength?: boolean
  /** Show password requirements */
  showPasswordRequirements?: boolean
  /** Minimum password length */
  minPasswordLength?: number
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
const props = withDefaults(defineProps<SignupFormProps>(), {
  loading: false,
  submitVariant: 'default',
  submitSize: 'lg',
  submitText: 'Create Account',
  loadingText: 'Creating account...',
  showTerms: true,
  showPasswordStrength: true,
  showPasswordRequirements: true,
  minPasswordLength: 8,
  spacing: 'md',
  messageType: 'default',
  enableValidation: true,
})

// Define emits
const emit = defineEmits<{
  submit: [data: SignupFormData]
  'terms-click': []
  'privacy-click': []
  'field-change': [field: keyof SignupFormData, value: string | boolean]
  'password-strength-change': [strength: string, score: number]
}>()

// Form data
const formData = reactive<SignupFormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

// Form errors
const errors = reactive<SignupFormErrors>({})

// Validation functions
const validateName = (name: string): string | undefined => {
  if (!name.trim()) return 'Full name is required'
  if (name.trim().length < 2) return 'Name must be at least 2 characters'
  return undefined
}

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
  if (password.length < props.minPasswordLength) {
    return `Password must be at least ${props.minPasswordLength} characters`
  }
  return undefined
}

const validateConfirmPassword = (confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password'
  if (confirmPassword !== formData.password) {
    return 'Passwords do not match'
  }
  return undefined
}

const validateTerms = (acceptTerms: boolean): string | undefined => {
  if (props.showTerms && !acceptTerms) {
    return 'You must accept the terms and conditions'
  }
  return undefined
}

const validateField = (field: keyof SignupFormData) => {
  if (!props.enableValidation) return

  const value = formData[field]
  
  switch (field) {
    case 'name':
      errors.name = validateName(value as string)
      break
    case 'email':
      errors.email = validateEmail(value as string)
      break
    case 'password':
      errors.password = validatePassword(value as string)
      // Re-validate confirm password if it exists
      if (formData.confirmPassword) {
        errors.confirmPassword = validateConfirmPassword(formData.confirmPassword)
      }
      break
    case 'confirmPassword':
      errors.confirmPassword = validateConfirmPassword(value as string)
      break
    case 'acceptTerms':
      errors.acceptTerms = validateTerms(value as boolean)
      break
  }
}

const validateForm = (): boolean => {
  if (!props.enableValidation) return true

  validateField('name')
  validateField('email')
  validateField('password')
  validateField('confirmPassword')
  validateField('acceptTerms')
  
  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword && !errors.acceptTerms
}

// Computed properties
const isFormValid = computed(() => {
  if (!props.enableValidation) {
    const hasRequiredFields = formData.name && formData.email && formData.password && formData.confirmPassword
    const hasAcceptedTerms = props.showTerms ? formData.acceptTerms : true
    return hasRequiredFields && hasAcceptedTerms
  }
  
  const hasRequiredFields = formData.name && formData.email && formData.password && formData.confirmPassword
  const hasAcceptedTerms = props.showTerms ? formData.acceptTerms : true
  const hasNoErrors = !errors.name && !errors.email && !errors.password && !errors.confirmPassword && !errors.acceptTerms
  
  return hasRequiredFields && hasAcceptedTerms && hasNoErrors
})

const formClasses = computed(() => {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  }
  
  return cn(
    'w-full',
    spacingClasses[props.spacing],
    props.class
  )
})

const termsClasses = computed(() => {
  return cn('space-y-2')
})

const submitClasses = computed(() => {
  return cn(
    'w-full',
    'transition-all duration-200',
    'hover:scale-[1.02] active:scale-[0.98]',
    {
      'opacity-50 cursor-not-allowed': !isFormValid.value || props.loading,
    }
  )
})

// Event handlers
const handleSubmit = () => {
  if (!validateForm() || props.loading) return
  
  emit('submit', { ...formData })
}

const handleTermsClick = () => {
  emit('terms-click')
}

const handlePrivacyClick = () => {
  emit('privacy-click')
}

const handlePasswordStrengthChange = (strength: string, score: number) => {
  emit('password-strength-change', strength, score)
}

// Watch for form changes
const watchFields = ['name', 'email', 'password', 'confirmPassword', 'acceptTerms'] as const

watchFields.forEach(field => {
  watch(
    () => formData[field],
    (newValue) => {
      emit('field-change', field, newValue)
      if (props.enableValidation && errors[field]) {
        validateField(field)
      }
    }
  )
})

// Clear errors when form is no longer loading
watch(
  () => props.loading,
  (newLoading) => {
    if (!newLoading) {
      Object.keys(errors).forEach(key => {
        delete errors[key as keyof SignupFormErrors]
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

/* Checkbox label styling */
label {
  transition: all 0.2s ease-in-out;
}

label:hover {
  opacity: 0.9;
}

/* Submit button enhancement */
button[type="submit"] {
  position: relative;
  overflow: hidden;
}

/* Loading state enhancement */
button[type="submit"]:disabled {
  transform: none !important;
}

/* Terms section styling */
.space-y-2 label {
  cursor: pointer;
  user-select: none;
}

/* Smooth field transitions */
.space-y-6 > * {
  transition: transform 0.2s ease-in-out;
}

form:has(.loading) .space-y-6 > *:not(:last-child) {
  opacity: 0.8;
}

/* Enhanced focus styles for accessibility */
label:focus-within {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: 4px;
}
</style>