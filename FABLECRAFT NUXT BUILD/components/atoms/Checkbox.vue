<template>
  <div class="flex items-center">
    <input
      :id="componentId"
      ref="checkboxRef"
      v-model="internalValue"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :aria-checked="internalValue"
      :aria-disabled="disabled"
      :aria-required="required"
      :aria-describedby="description ? `${componentId}-description` : undefined"
      class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      v-bind="$attrs"
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
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface CheckboxProps {
  modelValue?: boolean | string | number
  value?: string | number | boolean
  label?: string
  description?: string
  name?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

// Define props with defaults
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  value: true,
  disabled: false,
  required: false
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  'change': [event: Event]
}>()

// Generate unique ID for accessibility
const componentId = props.id || useComponentId('checkbox')

// Template ref
const checkboxRef = ref<HTMLInputElement>()

// Internal value with v-model support
const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

// Watch for changes to emit change event
watch(internalValue, () => {
  if (checkboxRef.value) {
    const event = new Event('change', { bubbles: true })
    emit('change', event)
  }
})

// Expose checkbox element
defineExpose({
  checkboxRef
})
</script>