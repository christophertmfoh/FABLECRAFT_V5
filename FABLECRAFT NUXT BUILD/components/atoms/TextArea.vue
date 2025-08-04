<template>
  <div :class="rootClasses">
    <!-- Leading content -->
    <div v-if="$slots.leading || leadingIcon || avatar" :class="leadingClasses">
      <slot name="leading">
        <AtomIcon
          v-if="leadingIcon && !avatar"
          :name="leadingIcon"
          :class="leadingIconClasses"
        />
        <Avatar
          v-else-if="avatar"
          v-bind="avatar"
          :size="avatarSize"
          :class="leadingAvatarClasses"
        />
      </slot>
    </div>

    <!-- Textarea element -->
    <textarea
      :id="id || componentId"
      ref="textareaRef"
      v-model="modelValue"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :class="textareaClasses"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    />

    <!-- Trailing content -->
    <div v-if="$slots.trailing || trailingIcon || loading" :class="trailingClasses">
      <slot name="trailing">
        <AtomIcon
          v-if="(loading && trailing) || (loading && !leading && !trailing)"
          :name="loadingIcon"
          :class="trailingIconClasses"
        />
        <AtomIcon
          v-else-if="trailingIcon && !loading"
          :name="trailingIcon"
          :class="trailingIconClasses"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'
import AtomIcon from './AtomIcon.vue'

// Avatar props type definition (matching other components)
interface AvatarProps {
  src?: string
  alt?: string
  icon?: string
  text?: string
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

// TextArea variants using CVA
const textareaVariants = cva(
  'w-full rounded-md border-0 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors',
  {
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs gap-1',
        sm: 'px-2.5 py-1.5 text-xs gap-1.5',
        md: 'px-2.5 py-1.5 text-sm gap-1.5',
        lg: 'px-3 py-2 text-sm gap-2',
        xl: 'px-3 py-2 text-base gap-2'
      },
      variant: {
        outline: 'text-foreground bg-background ring ring-inset ring-border',
        soft: 'text-foreground bg-muted/50 hover:bg-muted focus:bg-muted disabled:bg-muted/50',
        subtle: 'text-foreground bg-muted ring ring-inset ring-border',
        ghost: 'text-foreground bg-transparent hover:bg-muted focus:bg-muted disabled:bg-transparent',
        none: 'text-foreground bg-transparent'
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
        neutral: ''
      },
      leading: {
        true: ''
      },
      trailing: {
        true: ''
      },
      loading: {
        true: ''
      },
      highlight: {
        true: ''
      },
      autoresize: {
        true: 'resize-none'
      }
    },
    compoundVariants: [
      // Color variants for outline and subtle
      {
        color: 'primary',
        variant: ['outline', 'subtle'],
        class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary'
      },
      {
        color: 'primary',
        highlight: true,
        class: 'ring ring-inset ring-primary'
      },
      {
        color: 'neutral',
        variant: ['outline', 'subtle'],
        class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted'
      },
      {
        color: 'neutral',
        highlight: true,
        class: 'ring ring-inset ring-inverted'
      },
      // Padding adjustments for leading content
      {
        leading: true,
        size: 'xs',
        class: 'ps-7'
      },
      {
        leading: true,
        size: 'sm',
        class: 'ps-8'
      },
      {
        leading: true,
        size: 'md',
        class: 'ps-9'
      },
      {
        leading: true,
        size: 'lg',
        class: 'ps-10'
      },
      {
        leading: true,
        size: 'xl',
        class: 'ps-11'
      },
      // Padding adjustments for trailing content
      {
        trailing: true,
        size: 'xs',
        class: 'pe-7'
      },
      {
        trailing: true,
        size: 'sm',
        class: 'pe-8'
      },
      {
        trailing: true,
        size: 'md',
        class: 'pe-9'
      },
      {
        trailing: true,
        size: 'lg',
        class: 'pe-10'
      },
      {
        trailing: true,
        size: 'xl',
        class: 'pe-11'
      },
      // Loading animations
      {
        loading: true,
        leading: true,
        class: {
          leadingIcon: 'animate-spin'
        }
      },
      {
        loading: true,
        leading: false,
        trailing: true,
        class: {
          trailingIcon: 'animate-spin'
        }
      }
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'outline'
    }
  }
)

// Component props
interface TextAreaProps extends VariantProps<typeof textareaVariants> {
  id?: string
  name?: string
  placeholder?: string
  modelValue?: string | null
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  rows?: number
  maxrows?: number
  maxlength?: number
  autofocus?: boolean
  autofocusDelay?: number
  autocomplete?: string
  spellcheck?: boolean
  autoresize?: boolean
  autoresizeDelay?: number
  highlight?: boolean
  icon?: string
  leadingIcon?: string
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: string
  avatar?: AvatarProps
  class?: string | Record<string, boolean> | string[]
  ui?: {
    root?: string | Record<string, boolean> | string[]
    base?: string | Record<string, boolean> | string[]
    leading?: string | Record<string, boolean> | string[]
    leadingIcon?: string | Record<string, boolean> | string[]
    leadingAvatar?: string | Record<string, boolean> | string[]
    leadingAvatarSize?: string | Record<string, boolean> | string[]
    trailing?: string | Record<string, boolean> | string[]
    trailingIcon?: string | Record<string, boolean> | string[]
  }
}

// Define props with defaults
const props = withDefaults(defineProps<TextAreaProps>(), {
  rows: 3,
  maxrows: 0,
  autofocusDelay: 0,
  autoresizeDelay: 0,
  loadingIcon: 'i-lucide-loader-circle',
  spellcheck: true
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  blur: [event: FocusEvent]
  change: [event: Event]
}>()

// Generate component ID
const componentId = useComponentId()

// Template refs
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Model value handling
const modelValue = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value || null)
})

// Determine icon positioning
const leading = computed(() => {
  return props.icon || props.leadingIcon || props.avatar || props.leading
})

const trailing = computed(() => {
  return props.icon || props.trailingIcon || props.loading || props.trailing
})

const leadingIconName = computed(() => {
  return props.leadingIcon || props.icon
})

const trailingIconName = computed(() => {
  return props.trailingIcon || (props.icon && props.trailing)
})

// Avatar size mapping
const avatarSizeMap: Record<string, string> = {
  xs: '3xs',
  sm: '3xs',
  md: '2xs',
  lg: '2xs',
  xl: 'xs'
}

const avatarSize = computed(() => avatarSizeMap[props.size || 'md'])

// Compute classes
const rootClasses = computed(() => {
  return cn(
    'relative inline-flex items-start',
    props.ui?.root
  )
})

const textareaClasses = computed(() => {
  return cn(
    textareaVariants({
      size: props.size,
      variant: props.variant,
      color: props.color,
      leading: leading.value,
      trailing: trailing.value,
      loading: props.loading,
      highlight: props.highlight,
      autoresize: props.autoresize
    }),
    props.ui?.base,
    props.class
  )
})

const leadingClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'ps-2 inset-y-1',
    sm: 'ps-2.5 inset-y-1.5',
    md: 'ps-2.5 inset-y-1.5',
    lg: 'ps-3 inset-y-2',
    xl: 'ps-3 inset-y-2'
  }
  
  return cn(
    'absolute start-0 flex items-start',
    sizeClasses[props.size || 'md'],
    props.ui?.leading
  )
})

const leadingIconClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'size-4',
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-5',
    xl: 'size-6'
  }
  
  return cn(
    'shrink-0 text-muted-foreground',
    sizeClasses[props.size || 'md'],
    props.loading && props.leading && 'animate-spin',
    props.ui?.leadingIcon
  )
})

const leadingAvatarClasses = computed(() => {
  return cn(
    'shrink-0',
    props.ui?.leadingAvatar
  )
})

const trailingClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'pe-2 inset-y-1',
    sm: 'pe-2.5 inset-y-1.5',
    md: 'pe-2.5 inset-y-1.5',
    lg: 'pe-3 inset-y-2',
    xl: 'pe-3 inset-y-2'
  }
  
  return cn(
    'absolute end-0 flex items-start',
    sizeClasses[props.size || 'md'],
    props.ui?.trailing
  )
})

const trailingIconClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'size-4',
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-5',
    xl: 'size-6'
  }
  
  return cn(
    'shrink-0 text-muted-foreground',
    sizeClasses[props.size || 'md'],
    (props.loading && !props.leading) || (props.loading && props.trailing) ? 'animate-spin' : '',
    props.ui?.trailingIcon
  )
})

// Auto-resize functionality
const resizeTextarea = () => {
  if (!textareaRef.value || !props.autoresize) return
  
  // Reset height to auto to get the correct scrollHeight
  textareaRef.value.style.height = 'auto'
  
  // Calculate new height
  let newHeight = textareaRef.value.scrollHeight
  
  // Apply max height constraint if specified
  if (props.maxrows && props.maxrows > 0) {
    const lineHeight = parseInt(window.getComputedStyle(textareaRef.value).lineHeight)
    const maxHeight = lineHeight * props.maxrows
    newHeight = Math.min(newHeight, maxHeight)
  }
  
  // Set the new height
  textareaRef.value.style.height = `${newHeight}px`
}

// Watch for content changes
watch(modelValue, () => {
  if (props.autoresize) {
    if (props.autoresizeDelay > 0) {
      setTimeout(resizeTextarea, props.autoresizeDelay)
    } else {
      nextTick(resizeTextarea)
    }
  }
})

// Lifecycle hooks
onMounted(() => {
  // Handle autofocus
  if (props.autofocus && textareaRef.value) {
    if (props.autofocusDelay > 0) {
      setTimeout(() => textareaRef.value?.focus(), props.autofocusDelay)
    } else {
      textareaRef.value.focus()
    }
  }
  
  // Initial resize if needed
  if (props.autoresize) {
    nextTick(resizeTextarea)
  }
})

// Expose textarea ref
defineExpose({
  textareaRef
})
</script>