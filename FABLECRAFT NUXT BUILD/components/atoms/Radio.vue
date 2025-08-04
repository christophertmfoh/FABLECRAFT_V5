<template>
  <div class="flex items-center">
    <input
      :id="componentId"
      ref="radioRef"
      v-model="internalValue"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :checked="isChecked"
      :aria-checked="isChecked"
      :aria-disabled="disabled"
      :aria-required="required"
      :aria-describedby="description ? `${componentId}-description` : undefined"
      class="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      v-bind="$attrs"
      @change="handleChange"
    >
    <div v-if="label || description || $slots.default" class="ml-3">
      <label
        v-if="label || $slots.default"
        :for="componentId"
        class="font-medium text-default"
        :class="{ 'cursor-not-allowed opacity-50': disabled }"
      >
        <slot>{{ label }}</slot>
      </label>
      <p
        v-if="description"
        :id="`${componentId}-description`"
        class="text-sm text-muted-foreground"
        :class="{ 'opacity-50': disabled }"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface RadioProps {
  modelValue?: string | number | boolean | null
  value: string | number | boolean
  label?: string
  description?: string
  name?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

// Define props - value is required for radio buttons
const props = defineProps<RadioProps>()

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  'change': [event: Event]
}>()

// Generate unique ID for accessibility
const componentId = props.id || useComponentId('radio')

// Template ref
const radioRef = ref<HTMLInputElement>()

// Check if this radio is currently selected
const isChecked = computed(() => {
  return props.modelValue === props.value
})

// Internal value for v-model
const internalValue = computed({
  get() {
    return props.value
  },
  set() {
    // For radio buttons, we emit the value when selected
    emit('update:modelValue', props.value)
  }
})

// Handle change event
const handleChange = (event: Event) => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
    emit('change', event)
  }
}

// Expose radio element
defineExpose({
  radioRef
})
</script>