<template>
  <div :class="signupClasses">
    <!-- Newsletter Header -->
    <h3 class="newsletter-title">
      {{ content.title }}
    </h3>

    <!-- Newsletter Description -->
    <p class="newsletter-description">
      {{ content.description }}
    </p>

    <!-- Newsletter Form -->
    <form class="newsletter-form" novalidate @submit="handleSubmit">
      <!-- Email Input and Button Row -->
      <div class="input-group">
        <div class="input-container">
          <Label for="newsletter-email" class="sr-only">
            {{ content.placeholder }}
          </Label>
          <Input
            id="newsletter-email"
            ref="emailInput"
            v-model="email"
            type="email"
            :placeholder="content.placeholder"
            :class="inputClasses"
            :disabled="isLoading"
            :aria-invalid="!!error"
            :aria-describedby="error ? 'newsletter-error' : 'newsletter-disclaimer'"
            autocomplete="email"
            @input="handleInput"
          />
        </div>

        <Button
          type="submit"
          size="sm"
          :class="buttonClasses"
          :disabled="!canSubmit"
          :aria-label="`${content.buttonText} to newsletter`"
        >
          <Spinner v-if="isLoading" class="w-4 h-4 mr-2" aria-hidden="true" />
          {{ isLoading ? 'Subscribing...' : content.buttonText }}
        </Button>
      </div>

      <!-- Error Message -->
      <div v-if="error" id="newsletter-error" class="error-message" role="alert" aria-live="polite">
        {{ error }}
      </div>

      <!-- Success Message -->
      <div v-if="isSuccess" class="success-message" role="alert" aria-live="polite">
        <AtomIcon
          name="lucide:check-circle"
          class="w-4 h-4 mr-2 text-success"
          aria-hidden="true"
        />
        Thanks for subscribing! Check your email to confirm.
      </div>

      <!-- Disclaimer -->
      <p id="newsletter-disclaimer" class="disclaimer">
        {{ content.disclaimer }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { cn } from '~/components/atoms/Utils'
import { useNewsletter } from '~/composables/useNewsletter'
import type { NewsletterContent } from '~/composables/useFooterContent'

// Props interface
interface NewsletterSignupProps {
  content: NewsletterContent
  variant?: 'default' | 'compact' | 'inline'
  class?: string
}

// Events interface
interface NewsletterSignupEmits {
  (e: 'subscribe' | 'success', email: string): void
  (e: 'error', error: string): void
}

// Component setup
const props = withDefaults(defineProps<NewsletterSignupProps>(), {
  variant: 'default',
  class: '',
})

const emit = defineEmits<NewsletterSignupEmits>()

// Newsletter composable
const {
  email,
  isLoading,
  isSuccess,
  error,
  canSubmit,
  setEmail,
  handleSubmit: submitNewsletter,
} = useNewsletter()

// Refs
const emailInput = ref<HTMLInputElement>()

// Computed properties
const signupClasses = computed(() => {
  const variantClasses = {
    default: 'space-y-3',
    compact: 'space-y-2',
    inline: 'space-y-2',
  }

  return cn('newsletter-signup', variantClasses[props.variant], props.class)
})

const inputClasses = computed(() => {
  return cn('text-sm flex-1', {
    'border-red-300 focus:border-red-500 focus:ring-red-500': !!error.value,
    'border-green-300 focus:border-green-500 focus:ring-green-500': isSuccess.value,
  })
})

const buttonClasses = computed(() => {
  return cn(
    'px-4 whitespace-nowrap',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    {
      'opacity-50 cursor-not-allowed': !canSubmit.value,
    }
  )
})

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setEmail(target.value)
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  const result = await submitNewsletter()

  if (result.success) {
    emit('subscribe', email.value)
    emit('success', email.value)

    // Focus back to input for next use
    await nextTick()
    emailInput.value?.focus()
  } else {
    emit('error', result.error || 'Subscription failed')
  }
}
</script>

<style scoped>
/* Newsletter signup styling */
.newsletter-signup {
  @apply w-full max-w-sm;
}

.newsletter-title {
  @apply text-sm font-semibold text-foreground uppercase tracking-wider;
}

.newsletter-description {
  @apply text-sm text-foreground/60;
}

.newsletter-form {
  @apply space-y-3;
}

.input-group {
  @apply flex gap-2;
}

.input-container {
  @apply flex-1 min-w-0;
}

/* Screen reader only label */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

/* Error message styling */
.error-message {
  @apply text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2;
}

/* Success message styling */
.success-message {
  @apply text-xs text-success bg-success/10 border border-success/20 rounded-md px-3 py-2 flex items-center;
}

/* Disclaimer styling */
.disclaimer {
  @apply text-xs text-foreground/50 leading-relaxed;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .input-group {
    @apply flex-col gap-2;
  }

  .newsletter-title {
    @apply text-xs;
  }

  .newsletter-description {
    @apply text-xs;
  }
}

/* Focus management */
.newsletter-form:focus-within {
  @apply outline-none;
}

/* Disabled state styling */
input:disabled {
  @apply opacity-50 cursor-not-allowed;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Animation for state changes */
.error-message,
.success-message {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
