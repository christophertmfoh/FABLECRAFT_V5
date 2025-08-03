# 🎯 PHASE 2: ATOMS IMPLEMENTATION PLAN
## Building the Foundation Components for Fablecraft Landing Page

### 📋 Overview
Phase 2 focuses on creating the atomic building blocks - the smallest, most reusable components that will form the foundation of our entire component system. These atoms must be:
- **SSR-Safe**: Work perfectly with Nuxt 3's server-side rendering
- **Theme-Aware**: Integrate with our Phase 1 CSS variable system
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA
- **Performance-Optimized**: Minimal bundle size, efficient rendering
- **Type-Safe**: Full TypeScript support with proper interfaces

---

## 🏗️ PHASE 2 IMPLEMENTATION ORDER

### 🔧 STEP 1: Utility Setup & Dependencies
**Why First**: All atoms depend on these utilities and types
**Contains**: Type definitions, utility functions, composables
**Validation**: TypeScript compiles without errors, utilities work in components

### ⚛️ STEP 2: BaseButton Component
**Why Second**: Most used component across all sections (8/8 usage)
**Contains**: All button variants, states, and animations
**Validation**: All variants render correctly with theme switching

### 📝 STEP 3: BaseInput Component  
**Why Third**: Form foundation needed for newsletter, auth, search
**Contains**: Text input with all states, validation support
**Validation**: v-model works, accessibility features functional

### 🎯 STEP 4: BaseIcon Component
**Why Fourth**: Icons used in buttons, cards, navigation (7+ icons per section)
**Contains**: Dynamic icon loading, size variants, animations
**Validation**: All Lucide icons render, animations work

### 🏷️ STEP 5: BaseBadge Component
**Why Fifth**: Used in hero, features, pricing sections
**Contains**: Badge variants including pulse animation
**Validation**: Pulse animation performs at 60fps

### 📦 STEP 6: BaseCard Component
**Why Sixth**: Container for most content sections
**Contains**: Elevation levels, hover effects, theme integration
**Validation**: Backdrop blur and shadows work across themes

### 📄 STEP 7: Additional Base Components
**Why Last**: Supporting components for complete atom library
**Contains**: BaseHeading, BaseText, BaseDivider
**Validation**: Typography scales properly, theme integration works

---

## 📐 DETAILED IMPLEMENTATION SPECS

### 🔧 STEP 1: Utility Setup & Dependencies

#### 1.1 Install Required Packages
```bash
# Core utilities
pnpm add clsx tailwind-merge
pnpm add -D @types/node

# Icon library
pnpm add lucide-vue-next

# Vue utilities
pnpm add @vueuse/core @vueuse/nuxt
```

#### 1.2 Create Type Definitions
**File**: `types/components.ts`
```typescript
// Component size variants used across all atoms
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component color variants matching our theme system
export type ComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'ghost' 
  | 'outline'

// Shared props interface for all components
export interface BaseComponentProps {
  class?: string
  id?: string
}

// Animation types for components
export type AnimationType = 'none' | 'pulse' | 'bounce' | 'spin' | 'ping'
```

#### 1.3 Create Utility Functions
**File**: `utils/cn.ts`
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 * Combines clsx for conditionals and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**File**: `utils/helpers.ts`
```typescript
/**
 * Generate unique IDs for accessibility
 */
export function useId(prefix: string = 'fc'): string {
  const nuxtApp = useNuxtApp()
  const instance = getCurrentInstance()
  
  // Use instance UID if available (SSR-safe)
  const id = instance?.uid || Math.random().toString(36).substring(2, 9)
  return `${prefix}-${id}`
}

/**
 * Format currency with locale support
 */
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numAmount)
}
```

#### 1.4 Create Component Composables
**File**: `composables/useComponentClasses.ts`
```typescript
import { computed, type ComputedRef } from 'vue'
import type { ComponentSize, ComponentVariant } from '~/types/components'

export function useComponentClasses(
  size: Ref<ComponentSize>,
  variant: Ref<ComponentVariant>
): ComputedRef<Record<string, string>> {
  return computed(() => ({
    // Size classes
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
    xl: 'text-xl px-8 py-4',
    
    // Variant classes using CSS variables
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border-2 border-current hover:bg-accent hover:text-accent-foreground',
  }))
}
```

**Validation Checklist**:
- [ ] TypeScript configuration recognizes all types
- [ ] Utility functions work in both server and client contexts
- [ ] No hydration mismatches with ID generation
- [ ] Composables are auto-imported by Nuxt

---

### ⚛️ STEP 2: BaseButton Component

**File**: `components/base/BaseButton.vue`
```vue
<template>
  <component
    :is="computedTag"
    :type="type"
    :to="to"
    :href="href"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <BaseIcon
      v-if="loading && loadingPosition === 'start'"
      name="Loader2"
      :size="iconSize"
      class="animate-spin"
      aria-hidden="true"
    />
    
    <!-- Icon start -->
    <BaseIcon
      v-else-if="iconStart && !loading"
      :name="iconStart"
      :size="iconSize"
      aria-hidden="true"
    />
    
    <!-- Content -->
    <span :class="contentClasses">
      <slot />
    </span>
    
    <!-- Icon end -->
    <BaseIcon
      v-if="iconEnd && !loading"
      :name="iconEnd"
      :size="iconSize"
      aria-hidden="true"
    />
    
    <!-- Loading spinner end -->
    <BaseIcon
      v-if="loading && loadingPosition === 'end'"
      name="Loader2"
      :size="iconSize"
      class="animate-spin"
      aria-hidden="true"
    />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant, BaseComponentProps } from '~/types/components'
import type { LucideIcon } from 'lucide-vue-next'

interface ButtonProps extends BaseComponentProps {
  variant?: ComponentVariant
  size?: ComponentSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingPosition?: 'start' | 'end'
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  // Icon props
  iconStart?: keyof typeof LucideIcon
  iconEnd?: keyof typeof LucideIcon
  
  // Link props
  to?: RouteLocationRaw
  href?: string
  external?: boolean
  
  // Accessibility
  ariaLabel?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  loadingPosition: 'start',
  fullWidth: false,
  rounded: 'xl',
  external: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed tag based on props
const computedTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// Size mappings
const sizeClasses = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
}

// Icon size mappings
const iconSize = computed(() => {
  const sizes: Record<ComponentSize, ComponentSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'lg',
  }
  return sizes[props.size]
})

// Variant mappings using theme CSS variables
const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent',
  success: 'bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning',
  danger: 'bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:ring-danger',
  ghost: 'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
  outline: 'border-2 border-current hover:bg-accent hover:text-accent-foreground focus-visible:ring-current',
}

// Rounded mappings
const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

// Combined button classes
const buttonClasses = computed(() => {
  return cn(
    // Base classes
    'inline-flex items-center justify-center font-semibold transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    
    // Hover transform
    'hover:scale-105 hover:-translate-y-0.5',
    
    // Shadow progression
    'shadow-md hover:shadow-lg active:shadow-sm',
    
    // Size classes
    sizeClasses[props.size],
    
    // Variant classes
    variantClasses[props.variant],
    
    // Rounded classes
    roundedClasses[props.rounded],
    
    // Full width
    props.fullWidth && 'w-full',
    
    // Loading state
    props.loading && 'cursor-wait',
    
    // Custom classes
    props.class
  )
})

// Content classes for loading state
const contentClasses = computed(() => {
  return cn(
    'inline-flex items-center',
    props.loading && 'opacity-0'
  )
})

// Click handler
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
```

**Validation Checklist**:
- [ ] All 8 variants render with correct theme colors
- [ ] Hover animations work smoothly at 60fps
- [ ] Loading state shows spinner and disables interaction
- [ ] Works as button, NuxtLink, and anchor tag
- [ ] Keyboard navigation and focus states work
- [ ] ARIA attributes properly set

---

### 📝 STEP 3: BaseInput Component

**File**: `components/base/BaseInput.vue`
```vue
<template>
  <div :class="wrapperClasses">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-danger ml-1">*</span>
    </label>
    
    <!-- Input wrapper -->
    <div class="relative">
      <!-- Leading icon -->
      <div
        v-if="iconStart"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <BaseIcon
          :name="iconStart"
          size="sm"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>
      
      <!-- Input field -->
      <input
        :id="inputId"
        ref="inputRef"
        v-model="modelValue"
        :type="computedType"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :aria-label="ariaLabel || label"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : hint ? hintId : undefined"
        :class="inputClasses"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Trailing icons -->
      <div
        v-if="hasTrailingIcons"
        class="absolute inset-y-0 right-0 flex items-center pr-3 gap-2"
      >
        <!-- Clear button -->
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          :aria-label="clearAriaLabel"
          class="p-1 rounded hover:bg-accent/20 transition-colors"
          @click="handleClear"
        >
          <BaseIcon
            name="X"
            size="xs"
            class="text-muted-foreground hover:text-foreground"
          />
        </button>
        
        <!-- Password toggle -->
        <button
          v-if="type === 'password'"
          type="button"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          class="p-1 rounded hover:bg-accent/20 transition-colors"
          @click="togglePassword"
        >
          <BaseIcon
            :name="showPassword ? 'EyeOff' : 'Eye'"
            size="sm"
            class="text-muted-foreground hover:text-foreground"
          />
        </button>
        
        <!-- End icon -->
        <BaseIcon
          v-else-if="iconEnd"
          :name="iconEnd"
          size="sm"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>
    </div>
    
    <!-- Helper text -->
    <p
      v-if="hint && !error"
      :id="hintId"
      :class="hintClasses"
    >
      {{ hint }}
    </p>
    
    <!-- Error message -->
    <p
      v-if="error"
      :id="errorId"
      :class="errorClasses"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize, BaseComponentProps } from '~/types/components'
import type { LucideIcon } from 'lucide-vue-next'

interface InputProps extends BaseComponentProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search'
  size?: ComponentSize
  name?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  
  // State props
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  
  // Icon props
  iconStart?: keyof typeof LucideIcon
  iconEnd?: keyof typeof LucideIcon
  
  // HTML5 attributes
  autocomplete?: string
  
  // Accessibility
  ariaLabel?: string
  clearAriaLabel?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  clearAriaLabel: 'Clear input',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'clear': []
}>()

// Template refs
const inputRef = ref<HTMLInputElement>()

// Local state
const isFocused = ref(false)
const showPassword = ref(false)

// Model value with v-model support
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Generate IDs for accessibility
const inputId = useId('input')
const errorId = useId('error')
const hintId = useId('hint')

// Computed type for password visibility
const computedType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// Check if we have trailing icons
const hasTrailingIcons = computed(() => {
  return props.clearable || props.type === 'password' || props.iconEnd
})

// Size mappings
const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
}

// Wrapper classes
const wrapperClasses = computed(() => {
  return cn('w-full', props.class)
})

// Label classes
const labelClasses = computed(() => {
  return cn(
    'block font-medium mb-2',
    {
      'text-xs': props.size === 'xs',
      'text-sm': props.size === 'sm',
      'text-base': props.size === 'md',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
    },
    'text-foreground'
  )
})

// Input classes
const inputClasses = computed(() => {
  return cn(
    // Base classes
    'w-full rounded-xl border bg-background/50 backdrop-blur-sm',
    'text-foreground placeholder:text-muted-foreground',
    'transition-all duration-300',
    
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
    
    // Size classes
    sizeClasses[props.size],
    
    // Icon padding
    props.iconStart && 'pl-10',
    hasTrailingIcons.value && 'pr-10',
    
    // State classes
    {
      'border-border': !props.error && !isFocused.value,
      'border-primary': isFocused.value && !props.error,
      'border-danger focus:ring-danger': props.error,
      'opacity-50 cursor-not-allowed': props.disabled,
      'cursor-default': props.readonly,
    }
  )
})

// Icon classes
const iconClasses = computed(() => {
  return cn(
    'text-muted-foreground',
    props.error && 'text-danger'
  )
})

// Hint classes
const hintClasses = computed(() => {
  return cn(
    'mt-2 text-sm text-muted-foreground'
  )
})

// Error classes
const errorClasses = computed(() => {
  return cn(
    'mt-2 text-sm text-danger'
  )
})

// Event handlers
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleClear = () => {
  modelValue.value = ''
  emit('clear')
  inputRef.value?.focus()
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Expose focus method
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>
```

**Validation Checklist**:
- [ ] v-model binding works correctly
- [ ] Password visibility toggle functions
- [ ] Clear button appears/works when clearable
- [ ] Error states display correctly
- [ ] Focus ring matches theme colors
- [ ] Accessible with screen readers

---

### 🎯 STEP 4: BaseIcon Component

**File**: `components/base/BaseIcon.vue`
```vue
<template>
  <component
    :is="IconComponent"
    :class="iconClasses"
    :stroke-width="strokeWidth"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import type { ComponentSize } from '~/types/components'

interface IconProps {
  name: keyof typeof icons
  size?: ComponentSize | number
  strokeWidth?: number
  animated?: boolean
  animationType?: 'spin' | 'pulse' | 'bounce' | 'ping'
  class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  strokeWidth: 2,
  animated: false,
  animationType: 'spin',
})

// Get the icon component
const IconComponent = computed(() => {
  const icon = icons[props.name]
  if (!icon) {
    console.warn(`Icon "${props.name}" not found`)
    return icons.HelpCircle
  }
  return icon
})

// Size mappings
const sizeMap: Record<ComponentSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
}

// Animation classes
const animationMap = {
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  ping: 'animate-ping',
}

// Computed classes
const iconClasses = computed(() => {
  const classes = ['inline-block']
  
  // Size classes
  if (typeof props.size === 'string') {
    classes.push(sizeMap[props.size as ComponentSize])
  } else {
    // Custom size
    const size = `${props.size}px`
    return cn(classes, props.class, {
      width: size,
      height: size,
    })
  }
  
  // Animation classes
  if (props.animated && props.animationType) {
    classes.push(animationMap[props.animationType])
  }
  
  // Transition for hover effects
  classes.push('transition-transform duration-300')
  
  return cn(classes, props.class)
})
</script>
```

**Validation Checklist**:
- [ ] All Lucide icons render correctly
- [ ] Size variants work properly
- [ ] Animation types perform smoothly
- [ ] Custom sizes work with number input
- [ ] Tree-shaking works (only used icons bundled)

---

### 🏷️ STEP 5: BaseBadge Component

**File**: `components/base/BaseBadge.vue`
```vue
<template>
  <component
    :is="tag"
    :class="badgeClasses"
  >
    <!-- Pulse dot -->
    <span
      v-if="variant === 'pulse'"
      class="absolute -top-1 -right-1"
    >
      <span class="relative flex h-3 w-3">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
        />
        <span
          class="relative inline-flex rounded-full h-3 w-3 bg-primary"
        />
      </span>
    </span>
    
    <!-- Icon -->
    <BaseIcon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      aria-hidden="true"
    />
    
    <!-- Content -->
    <slot />
    
    <!-- Close button -->
    <button
      v-if="closable"
      type="button"
      :aria-label="closeAriaLabel"
      class="ml-1 -mr-1 p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      @click="$emit('close')"
    >
      <BaseIcon
        name="X"
        :size="iconSize"
        aria-hidden="true"
      />
    </button>
  </component>
</template>

<script setup lang="ts">
import type { ComponentSize, ComponentVariant, BaseComponentProps } from '~/types/components'
import type { LucideIcon } from 'lucide-vue-next'

interface BadgeProps extends BaseComponentProps {
  variant?: ComponentVariant | 'pulse'
  size?: ComponentSize
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  tag?: 'span' | 'div'
  icon?: keyof typeof LucideIcon
  closable?: boolean
  closeAriaLabel?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  size: 'md',
  rounded: 'full',
  tag: 'span',
  closable: false,
  closeAriaLabel: 'Remove badge',
})

defineEmits<{
  close: []
}>()

// Size mappings
const sizeClasses = {
  xs: 'px-2 py-0.5 text-xs gap-1',
  sm: 'px-2.5 py-0.5 text-sm gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-3.5 py-1.5 text-base gap-2',
  xl: 'px-4 py-2 text-lg gap-2',
}

// Icon size mappings
const iconSize = computed(() => {
  const sizes: Record<ComponentSize, ComponentSize> = {
    xs: 'xs',
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
    xl: 'md',
  }
  return sizes[props.size]
})

// Variant classes
const variantClasses = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  ghost: 'bg-transparent text-foreground border-border',
  outline: 'bg-transparent text-foreground border-current',
  pulse: 'bg-primary/10 text-primary border-primary/20',
}

// Rounded classes
const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Combined badge classes
const badgeClasses = computed(() => {
  return cn(
    // Base classes
    'inline-flex items-center font-medium border backdrop-blur-sm',
    'transition-all duration-300',
    
    // Size classes
    sizeClasses[props.size],
    
    // Variant classes
    variantClasses[props.variant],
    
    // Rounded classes
    roundedClasses[props.rounded],
    
    // Pulse variant specific
    props.variant === 'pulse' && 'relative pr-8',
    
    // Custom classes
    props.class
  )
})
</script>
```

**Validation Checklist**:
- [ ] All variants display with correct colors
- [ ] Pulse animation runs at 60fps
- [ ] Close button works and emits event
- [ ] Icon integration works properly
- [ ] Backdrop blur effect applies correctly

---

### 📦 STEP 6: BaseCard Component

**File**: `components/base/BaseCard.vue`
```vue
<template>
  <component
    :is="tag"
    :class="cardClasses"
    @click="handleClick"
  >
    <!-- Background gradient effect -->
    <div
      v-if="gradient"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
      :style="gradientStyle"
    />
    
    <!-- Content wrapper -->
    <div class="relative z-10">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { BaseComponentProps } from '~/types/components'

interface CardProps extends BaseComponentProps {
  tag?: 'div' | 'article' | 'section'
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  border?: boolean
  interactive?: boolean
  gradient?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  tag: 'div',
  elevation: 'md',
  padding: 'lg',
  rounded: 'xl',
  border: true,
  interactive: false,
  gradient: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Elevation (shadow) classes
const elevationClasses = {
  none: '',
  sm: 'shadow-sm hover:shadow-md',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl',
  xl: 'shadow-xl hover:shadow-2xl',
}

// Padding classes
const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

// Rounded classes
const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

// Gradient style using theme orb colors
const gradientStyle = computed(() => ({
  background: `linear-gradient(135deg, 
    hsl(var(--orb-primary) / 0.05) 0%, 
    hsl(var(--orb-secondary) / 0.03) 50%, 
    hsl(var(--orb-primary) / 0.02) 100%
  )`,
}))

// Combined card classes
const cardClasses = computed(() => {
  return cn(
    // Base classes
    'relative bg-card/95 backdrop-blur-lg transition-all duration-500',
    
    // Border
    props.border && 'border border-border',
    
    // Elevation
    elevationClasses[props.elevation],
    
    // Padding
    paddingClasses[props.padding],
    
    // Rounded
    roundedClasses[props.rounded],
    
    // Interactive states
    props.interactive && [
      'cursor-pointer',
      'hover:scale-105 hover:-translate-y-2',
      'group',
    ],
    
    // Overflow hidden for gradient effect
    props.gradient && 'overflow-hidden',
    
    // Custom classes
    props.class
  )
})

// Click handler
const handleClick = (event: MouseEvent) => {
  if (props.interactive) {
    emit('click', event)
  }
}
</script>
```

**Validation Checklist**:
- [ ] Backdrop blur works across browsers
- [ ] Shadow elevation transitions smoothly
- [ ] Interactive hover transform works
- [ ] Gradient orb effect displays correctly
- [ ] Border respects theme colors

---

### 📄 STEP 7: Additional Base Components

#### 7.1 BaseHeading Component
**File**: `components/base/BaseHeading.vue`
```vue
<template>
  <component
    :is="tag"
    :class="headingClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { BaseComponentProps } from '~/types/components'

interface HeadingProps extends BaseComponentProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  gradient?: boolean
}

const props = withDefaults(defineProps<HeadingProps>(), {
  as: 'h2',
  size: 'lg',
  weight: 'bold',
  gradient: false,
})

// Use semantic tag
const tag = computed(() => props.as)

// Size classes using golden ratio scale
const sizeClasses = {
  xs: 'text-golden-xs',
  sm: 'text-golden-sm',
  md: 'text-golden-base',
  lg: 'text-golden-lg',
  xl: 'text-golden-xl',
  '2xl': 'text-golden-2xl',
  '3xl': 'text-golden-3xl',
  '4xl': 'text-golden-4xl',
  '5xl': 'text-golden-5xl',
}

// Weight classes
const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

// Combined heading classes
const headingClasses = computed(() => {
  return cn(
    // Base classes
    'text-heading-primary leading-tight',
    
    // Size
    sizeClasses[props.size],
    
    // Weight
    weightClasses[props.weight],
    
    // Gradient effect
    props.gradient && [
      'bg-gradient-to-r from-primary via-primary/80 to-primary/60',
      'bg-clip-text text-transparent',
    ],
    
    // Custom classes
    props.class
  )
})
</script>
```

#### 7.2 BaseText Component
**File**: `components/base/BaseText.vue`
```vue
<template>
  <component
    :is="tag"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { ComponentSize, BaseComponentProps } from '~/types/components'

interface TextProps extends BaseComponentProps {
  tag?: 'p' | 'span' | 'div'
  size?: ComponentSize
  muted?: boolean
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
}

const props = withDefaults(defineProps<TextProps>(), {
  tag: 'p',
  size: 'md',
  muted: false,
  weight: 'normal',
  align: 'left',
})

// Size classes
const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

// Combined text classes
const textClasses = computed(() => {
  return cn(
    // Size
    sizeClasses[props.size],
    
    // Color
    props.muted ? 'text-muted-foreground' : 'text-foreground',
    
    // Weight
    `font-${props.weight}`,
    
    // Alignment
    `text-${props.align}`,
    
    // Leading
    'leading-relaxed',
    
    // Custom classes
    props.class
  )
})
</script>
```

#### 7.3 BaseDivider Component
**File**: `components/base/BaseDivider.vue`
```vue
<template>
  <div
    :class="wrapperClasses"
    role="separator"
    :aria-orientation="orientation"
  >
    <div :class="lineClasses" />
    <div v-if="$slots.default" :class="contentClasses">
      <slot />
    </div>
    <div v-if="$slots.default" :class="lineClasses" />
  </div>
</template>

<script setup lang="ts">
import type { BaseComponentProps } from '~/types/components'

interface DividerProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  variant: 'solid',
})

// Wrapper classes
const wrapperClasses = computed(() => {
  return cn(
    'relative',
    props.orientation === 'horizontal' ? 'flex items-center' : 'inline-flex flex-col items-center',
    props.class
  )
})

// Line classes
const lineClasses = computed(() => {
  const base = 'bg-border'
  const variants = {
    solid: '',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  }
  
  if (props.orientation === 'horizontal') {
    return cn(base, 'h-px flex-1', variants[props.variant])
  }
  
  return cn(base, 'w-px flex-1', variants[props.variant])
})

// Content classes
const contentClasses = computed(() => {
  return cn(
    'px-4 text-sm text-muted-foreground',
    props.orientation === 'horizontal' ? 'py-0' : 'py-4'
  )
})
</script>
```

**Validation Checklist for Additional Components**:
- [ ] BaseHeading gradient text works across themes
- [ ] BaseText respects theme text colors
- [ ] BaseDivider renders correctly in both orientations
- [ ] All components are SSR-safe
- [ ] TypeScript types are properly exported

---

## 🧪 TESTING REQUIREMENTS

### Unit Tests (Vitest)
Each component needs tests for:
- [ ] Props validation and defaults
- [ ] Event emission
- [ ] Computed properties
- [ ] Accessibility attributes
- [ ] Theme integration

### Visual Tests
- [ ] All variants render correctly
- [ ] Dark mode compatibility
- [ ] Responsive behavior
- [ ] Animation performance

### Integration Tests
- [ ] Components work together (Button with Icon)
- [ ] Form components integrate properly
- [ ] Theme switching doesn't break styling

---

## 📚 USAGE EXAMPLES

### Button Examples
```vue
<!-- Primary button with icon -->
<BaseButton icon-start="Zap" @click="handleClick">
  Get Started
</BaseButton>

<!-- Loading state -->
<BaseButton :loading="isLoading" variant="accent">
  Save Changes
</BaseButton>

<!-- Link button -->
<BaseButton to="/features" variant="ghost" icon-end="ArrowRight">
  Learn More
</BaseButton>
```

### Input Examples
```vue
<!-- Email input with validation -->
<BaseInput
  v-model="email"
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  icon-start="Mail"
  :error="emailError"
  required
/>

<!-- Password with toggle -->
<BaseInput
  v-model="password"
  type="password"
  label="Password"
  hint="Must be at least 8 characters"
/>
```

### Card with Badge
```vue
<BaseCard interactive gradient @click="selectPlan">
  <BaseBadge variant="pulse" class="mb-4">
    Most Popular
  </BaseBadge>
  <BaseHeading as="h3" size="xl">
    Pro Plan
  </BaseHeading>
  <BaseText muted>
    Everything you need to scale
  </BaseText>
</BaseCard>
```

---

## ✅ PHASE 2 COMPLETION CHECKLIST

### Setup & Configuration
- [ ] All dependencies installed
- [ ] TypeScript types created
- [ ] Utility functions tested
- [ ] Composables auto-importing

### Components Completed
- [ ] BaseButton - All variants, states, animations
- [ ] BaseInput - Form integration, validation
- [ ] BaseIcon - Dynamic loading, animations
- [ ] BaseBadge - Pulse effect, variants
- [ ] BaseCard - Elevation, gradient effects
- [ ] BaseHeading - Typography scale
- [ ] BaseText - Theme colors
- [ ] BaseDivider - Both orientations

### Quality Assurance
- [ ] All components SSR-safe
- [ ] Theme switching works
- [ ] Accessibility validated
- [ ] Performance optimized
- [ ] TypeScript fully typed

### Documentation
- [ ] Component API documented
- [ ] Usage examples provided
- [ ] Props tables complete
- [ ] Migration notes from React

---

## 🚀 NEXT STEPS

With Phase 2 complete, you'll have a solid foundation of atomic components. Phase 3 will combine these atoms into molecules like:
- SearchBar (Input + Button + Icon)
- FeatureCard (Card + Icon + Heading + Text)
- PricingCard (Card + Badge + Button + List)
- TestimonialCard (Card + Text + Avatar)

These atoms are designed to work together seamlessly while maintaining the design system consistency established in Phase 1.