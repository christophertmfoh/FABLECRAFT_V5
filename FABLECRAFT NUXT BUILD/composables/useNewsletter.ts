import { computed, reactive, readonly } from 'vue'

// Types
export interface NewsletterState {
  email: string
  isLoading: boolean
  isSuccess: boolean
  error: string | null
}

export interface NewsletterEmit {
  (e: 'subscribe' | 'success', email: string): void
  (e: 'error', error: string): void
}

/**
 * Newsletter Subscription Composable
 *
 * Handles newsletter subscription state, validation, and form submission.
 * Provides reactive state management for newsletter signup components.
 */
export const useNewsletter = () => {
  // Reactive state
  const state = reactive<NewsletterState>({
    email: '',
    isLoading: false,
    isSuccess: false,
    error: null,
  })

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Computed validation
  const isValidEmail = computed(() => {
    return emailRegex.test(state.email.trim())
  })

  const canSubmit = computed(() => {
    return isValidEmail.value && !state.isLoading
  })

  // Validation helpers
  const validateEmail = (email: string): string | null => {
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      return 'Email is required'
    }

    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address'
    }

    if (trimmedEmail.length > 254) {
      return 'Email address is too long'
    }

    return null
  }

  // Actions
  const setEmail = (email: string) => {
    state.email = email
    // Clear error when user starts typing
    if (state.error) {
      state.error = null
    }
  }

  const clearForm = () => {
    state.email = ''
    state.error = null
    state.isSuccess = false
  }

  const resetState = () => {
    state.isLoading = false
    state.isSuccess = false
    state.error = null
  }

  // Main subscription function
  const subscribe = async (email?: string): Promise<{ success: boolean; error?: string }> => {
    const emailToSubmit = email || state.email

    // Validate email
    const validationError = validateEmail(emailToSubmit)
    if (validationError) {
      state.error = validationError
      return { success: false, error: validationError }
    }

    // Set loading state
    state.isLoading = true
    state.error = null

    try {
      // Simulate API call (replace with actual newsletter service)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // For demo purposes, randomly simulate success/failure
      const shouldSucceed = Math.random() > 0.2 // 80% success rate

      if (shouldSucceed) {
        state.isSuccess = true
        state.email = emailToSubmit.trim()

        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          if (state.isSuccess) {
            clearForm()
          }
        }, 5000)

        return { success: true }
      } else {
        throw new Error('Newsletter service temporarily unavailable. Please try again later.')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      state.error = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      state.isLoading = false
    }
  }

  // Form submit handler
  const handleSubmit = async (event?: Event): Promise<void> => {
    if (event) {
      event.preventDefault()
    }

    await subscribe()
  }

  // Return reactive state and methods
  return {
    // State
    state: readonly(state),

    // Computed
    isValidEmail,
    canSubmit,

    // Actions
    setEmail,
    clearForm,
    resetState,
    subscribe,
    handleSubmit,
    validateEmail,

    // Convenience getters
    email: computed(() => state.email),
    isLoading: computed(() => state.isLoading),
    isSuccess: computed(() => state.isSuccess),
    error: computed(() => state.error),
  }
}
