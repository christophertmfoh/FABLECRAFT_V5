<template>
  <FormField
    v-model="modelValue"
    :label="label"
    :type="inputType"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :message="message"
    :message-type="messageType"
    :error-message="errorMessage"
    :has-error="hasError"
    :spacing="spacing"
    :id="id"
    :class="class"
    v-bind="$attrs"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
    @input="handleInput"
  >
    <!-- Password toggle in trailing slot -->
    <template #trailing>
      <PasswordToggle
        :is-visible="isPasswordVisible"
        :variant="toggleVariant"
        :size="toggleSize"
        :disabled="disabled"
        @toggle="handleToggleVisibility"
      />
    </template>

    <!-- Password strength indicator -->
    <template v-if="showStrength && modelValue" #help>
      <div :class="strengthContainerClasses">
        <div class="flex items-center gap-2 mb-1">
          <Text size="sm" :class="strengthTextClasses">
            Password strength: {{ strengthLabel }}
          </Text>
          <div :class="strengthBarClasses">
            <div v-for="(segment, index) in 4" :key="index" :class="getSegmentClasses(index)" />
          </div>
        </div>

        <!-- Password requirements -->
        <div v-if="showRequirements" class="space-y-1">
          <div
            v-for="requirement in requirements"
            :key="requirement.key"
            :class="getRequirementClasses(requirement.met)"
          >
            <AtomIcon
              :name="requirement.met ? 'lucide:check' : 'lucide:x'"
              class="h-3 w-3 flex-shrink-0"
            />
            <Text size="xs">{{ requirement.text }}</Text>
          </div>
        </div>
      </div>
    </template>
  </FormField>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Password strength levels
type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

// Password requirement interface
interface PasswordRequirement {
  key: string
  text: string
  met: boolean
  regex?: RegExp
  minLength?: number
}

// Component props
interface PasswordFieldProps {
  /** Field label text */
  label?: string
  /** Input placeholder */
  placeholder?: string
  /** Whether field is required */
  required?: boolean
  /** Whether field is disabled */
  disabled?: boolean
  /** Whether field is readonly */
  readonly?: boolean
  /** Custom message to display */
  message?: string
  /** Message type */
  messageType?: 'error' | 'success' | 'warning' | 'info' | 'default'
  /** Error message override */
  errorMessage?: string
  /** Whether field has error */
  hasError?: boolean
  /** Field spacing */
  spacing?: 'sm' | 'md' | 'lg'
  /** Custom input ID */
  id?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
  /** Toggle button variant */
  toggleVariant?: 'default' | 'ghost' | 'subtle'
  /** Toggle button size */
  toggleSize?: 'sm' | 'md' | 'lg'
  /** Show password strength indicator */
  showStrength?: boolean
  /** Show password requirements */
  showRequirements?: boolean
  /** Minimum password length */
  minLength?: number
}

// Define props with defaults
const props = withDefaults(defineProps<PasswordFieldProps>(), {
  label: 'Password',
  placeholder: 'Enter your password',
  required: false,
  disabled: false,
  readonly: false,
  messageType: 'default',
  hasError: false,
  spacing: 'md',
  toggleVariant: 'default',
  toggleSize: 'md',
  showStrength: false,
  showRequirements: false,
  minLength: 8,
})

// Define model
const modelValue = defineModel<string>()

// Define emits
const emit = defineEmits<{
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
  'strength-change': [strength: PasswordStrength, score: number]
}>()

// Internal state
const isPasswordVisible = ref(false)

// Computed properties
const inputType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

const passwordStrength = computed((): { strength: PasswordStrength; score: number } => {
  if (!modelValue.value) return { strength: 'weak', score: 0 }

  const password = modelValue.value
  let score = 0

  // Length check
  if (password.length >= props.minLength) score += 1
  if (password.length >= 12) score += 1

  // Character variety
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  // Determine strength
  let strength: PasswordStrength = 'weak'
  if (score >= 2) strength = 'fair'
  if (score >= 4) strength = 'good'
  if (score >= 6) strength = 'strong'

  return { strength, score }
})

const strengthLabel = computed(() => {
  const { strength } = passwordStrength.value
  return strength.charAt(0).toUpperCase() + strength.slice(1)
})

const requirements = computed((): PasswordRequirement[] => {
  const password = modelValue.value || ''

  return [
    {
      key: 'length',
      text: `At least ${props.minLength} characters`,
      met: password.length >= props.minLength,
    },
    {
      key: 'lowercase',
      text: 'Contains lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      key: 'uppercase',
      text: 'Contains uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      key: 'number',
      text: 'Contains number',
      met: /[0-9]/.test(password),
    },
    {
      key: 'special',
      text: 'Contains special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ]
})

// Style classes
const strengthContainerClasses = computed(() => {
  return cn('mt-2 space-y-2')
})

const strengthTextClasses = computed(() => {
  const { strength } = passwordStrength.value
  const colorClasses = {
    weak: 'text-destructive',
    fair: 'text-warning',
    good: 'text-primary',
    strong: 'text-success',
  }
  return cn('font-medium', colorClasses[strength])
})

const strengthBarClasses = computed(() => {
  return cn('flex gap-1 flex-1 h-1.5')
})

const getSegmentClasses = (index: number) => {
  const { score } = passwordStrength.value
  const isActive = index < Math.ceil(score / 1.5)

  const baseClasses = 'flex-1 rounded-full transition-colors duration-300'
  const strengthColors = {
    0: 'bg-muted',
    1: 'bg-destructive',
    2: 'bg-warning',
    3: 'bg-primary',
    4: 'bg-success',
  }

  const colorScore = Math.min(score, 4)
  return cn(baseClasses, isActive ? strengthColors[colorScore] : 'bg-muted')
}

const getRequirementClasses = (met: boolean) => {
  return cn(
    'flex items-center gap-2 text-xs transition-colors duration-200',
    met ? 'text-success' : 'text-muted-foreground'
  )
}

// Event handlers
const handleToggleVisibility = (visible: boolean) => {
  isPasswordVisible.value = visible
}

const handleInput = (event: Event) => {
  emit('input', event)

  // Emit strength change
  if (props.showStrength) {
    const { strength, score } = passwordStrength.value
    emit('strength-change', strength, score)
  }
}
</script>

<style scoped>
/* Smooth transitions for password strength indicators */
.transition-colors {
  transition-property: color, background-color;
}

/* Requirement list animations */
.space-y-1 > * {
  transition: all 0.2s ease-in-out;
}

/* Strength bar animation */
.flex.gap-1 > * {
  transition: background-color 0.3s ease-in-out;
}
</style>
