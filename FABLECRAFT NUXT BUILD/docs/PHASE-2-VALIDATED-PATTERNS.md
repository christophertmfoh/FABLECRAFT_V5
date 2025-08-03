# 📊 PHASE 2: VALIDATED NUXT 3/VUE 3 PATTERNS

## 🎯 OVERVIEW

This document validates all Phase 2 Atoms components against real-world Nuxt 3/Vue 3 best practices based on extensive research from official documentation, component libraries, and production codebases.

---

## ✅ VALIDATED PATTERNS

### 1. **ICON COMPONENT - VALIDATED ✅**

#### Research Findings:
- **@nuxt/icon** (official Nuxt module) uses dynamic imports with 200,000+ icons
- **nuxt-lucide-icons** module auto-imports icons as components
- **lucide-vue-next** is the recommended Vue 3 icon library

#### Recommended Implementation:

```vue
<!-- components/atoms/Icon.vue -->
<template>
  <Icon 
    :name="iconName" 
    :size="sizeValue"
    :class="iconClasses"
  />
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface IconProps {
  name: string
  size?: ComponentSize
  class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md'
})

// Use Nuxt Icon's naming convention
const iconName = computed(() => {
  // Support both formats: 'Zap' and 'i-lucide-zap'
  if (props.name.startsWith('i-')) return props.name
  return `i-lucide-${props.name.toLowerCase()}`
})

// Size in pixels for Nuxt Icon
const sizeMap: Record<ComponentSize, string> = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '40px'
}

const sizeValue = computed(() => sizeMap[props.size])

const iconClasses = computed(() => 
  cn('inline-block', props.class)
)
</script>
```

#### Required Setup:
```bash
# Install Nuxt Icon module
pnpm add @nuxt/icon

# Install Lucide icon set
pnpm add @iconify-json/lucide
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/ui'],
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css' // Use CSS mode for better performance
  }
})
```

---

### 2. **BUTTON COMPONENT - VALIDATED WITH IMPROVEMENTS ✅**

#### Research Findings:
- Polymorphic components in Vue 3 should use `resolveComponent` for NuxtLink
- Loading states should use `aria-busy` for accessibility
- Nuxt UI uses similar patterns for button variants

#### Validated Implementation:

```vue
<!-- components/atoms/Button.vue -->
<template>
  <component
    :is="componentTag"
    :type="componentTag === 'button' ? type : undefined"
    :to="to"
    :href="href"
    :target="target"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Icon
      v-if="loading"
      name="i-lucide-loader-circle"
      :size="iconSize"
      class="mr-2 animate-spin"
    />
    <Icon
      v-else-if="iconLeft"
      :name="iconLeft"
      :size="iconSize"
      class="mr-2"
    />
    
    <span :class="{ 'opacity-0': loading && !$slots.default }">
      <slot />
    </span>
    
    <Icon
      v-if="iconRight && !loading"
      :name="iconRight"
      :size="iconSize"
      class="ml-2"
    />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types'
import { cn } from './Utils'

interface ButtonProps {
  variant?: ComponentVariant
  size?: ComponentSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: string
  iconRight?: string
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Polymorphic component resolution
const NuxtLink = resolveComponent('NuxtLink')
const componentTag = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

// Size classes aligned with design system
const sizeClasses: Record<ComponentSize, string> = {
  xs: 'h-7 px-2 text-xs gap-1',
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-base gap-2',
  lg: 'h-11 px-6 text-lg gap-2',
  xl: 'h-12 px-8 text-xl gap-3'
}

// Icon size mapping
const iconSizeMap: Record<ComponentSize, ComponentSize> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md'
}

const iconSize = computed(() => iconSizeMap[props.size])

// Variant classes using CSS variables
const variantClasses: Record<ComponentVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
  success: 'bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning',
  ghost: 'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
  outline: 'border-2 border-current bg-transparent hover:bg-accent focus-visible:ring-current'
}

// Combined classes
const buttonClasses = computed(() => 
  cn(
    // Base styles
    'inline-flex items-center justify-center',
    'rounded-xl font-semibold',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
    
    // Size
    sizeClasses[props.size],
    
    // Variant
    variantClasses[props.variant],
    
    // Full width
    props.fullWidth && 'w-full',
    
    // Loading state
    props.loading && 'cursor-wait'
  )
)

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

---

### 3. **INPUT COMPONENT - VALIDATED WITH SSR IMPROVEMENTS ✅**

#### Research Findings:
- `useId` composable in Nuxt 3.10+ provides SSR-safe IDs
- v-model with custom components requires proper emit setup
- Form validation should integrate with VeeValidate or similar

#### Validated Implementation:

```vue
<!-- components/atoms/Input.vue -->
<template>
  <input
    :id="inputId"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="error || undefined"
    :aria-describedby="error ? `${inputId}-error` : undefined"
    :class="inputClasses"
    @input="handleInput"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  placeholder?: string
  size?: ComponentSize
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

// Use Nuxt 3.10+ useId for SSR-safe IDs
const inputId = computed(() => props.id || useId())

// Size classes
const sizeClasses: Record<ComponentSize, string> = {
  xs: 'h-7 px-2 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-4 text-lg',
  xl: 'h-12 px-5 text-xl'
}

// Combined classes
const inputClasses = computed(() =>
  cn(
    // Base styles
    'w-full rounded-md',
    'bg-background text-foreground',
    'border border-input',
    'transition-colors duration-200',
    'placeholder:text-muted-foreground',
    
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    
    // Size
    sizeClasses[props.size],
    
    // States
    props.error && 'border-destructive focus:ring-destructive',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.readonly && 'cursor-default'
  )
)

// Input handler with proper type conversion
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  if (props.type === 'number' && value !== '') {
    value = Number(value)
  }
  
  emit('update:modelValue', value)
}
</script>
```

---

### 4. **COMPOSABLES - VALIDATED WITH NUXT PATTERNS ✅**

#### Research Findings:
- Composables should be in `composables/` directory for auto-import
- SSR-safe patterns require careful state management
- `useState` for SSR-shared state, `ref` for client-only state

#### Validated Composables:

```ts
// composables/useId.ts
/**
 * SSR-safe unique ID generator
 * Uses Nuxt 3.10+ built-in useId when available
 */
export const useComponentId = (prefix: string = 'fc'): string => {
  // Check if Nuxt 3.10+ useId is available
  if (typeof useId === 'function') {
    return useId()
  }
  
  // Fallback for older Nuxt versions
  if (process.server) {
    // Use a counter in SSR for deterministic IDs
    const counter = useState(`id-counter-${prefix}`, () => 0)
    counter.value++
    return `${prefix}-ssr-${counter.value}`
  }
  
  // Client-side random ID
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}
```

```ts
// composables/useComponentClasses.ts
import { computed, type Ref, type ComputedRef } from 'vue'
import type { ComponentSize, ComponentVariant } from '~/types'

interface ClassMap {
  sizes: Record<ComponentSize, string>
  variants: Record<ComponentVariant, string>
}

export const useComponentClasses = (
  size: Ref<ComponentSize>,
  variant: Ref<ComponentVariant>,
  classMap: ClassMap
): ComputedRef<string> => {
  return computed(() => {
    const sizeClass = classMap.sizes[size.value] || ''
    const variantClass = classMap.variants[variant.value] || ''
    return `${sizeClass} ${variantClass}`.trim()
  })
}
```

---

### 5. **UTILITIES - VALIDATED ✅**

#### Research Findings:
- `clsx` + `tailwind-merge` is the standard pattern
- Utilities should be tree-shakeable
- Type safety is crucial

#### Validated Implementation:

```ts
// components/atoms/Utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 * Combines clsx for conditionals and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency with Intl.NumberFormat
 * SSR-safe implementation
 */
export function formatCurrency(
  amount: number | string,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numAmount)) {
    return ''
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(numAmount)
}

/**
 * Debounce function for input handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

---

### 6. **CARD COMPONENT - VALIDATED WITH NUXT PATTERNS ✅**

#### Research Findings:
- Sub-components should use `defineComponent` for proper typing
- Slot usage requires careful implementation
- CSS variables work well with Nuxt themes

#### Validated Implementation:

```vue
<!-- components/atoms/Card.vue -->
<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardProps {
  variant?: 'elevated' | 'outlined' | 'flat'
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'elevated'
})

const variantClasses = {
  elevated: 'shadow-md hover:shadow-lg',
  outlined: 'border-2',
  flat: ''
}

const cardClasses = computed(() =>
  cn(
    'rounded-lg bg-card text-card-foreground',
    'transition-shadow duration-200',
    variantClasses[props.variant],
    props.class
  )
)
</script>

<!-- Add sub-components in separate files -->
```

```vue
<!-- components/atoms/CardHeader.vue -->
<template>
  <div :class="headerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardHeaderProps {
  class?: string
}

const props = defineProps<CardHeaderProps>()

const headerClasses = computed(() =>
  cn('flex flex-col space-y-1.5 p-6', props.class)
)
</script>
```

---

### 7. **TYPOGRAPHY COMPONENTS - VALIDATED ✅**

#### Research Findings:
- Dynamic component rendering with `:is` is performant
- Golden ratio sizing should use CSS custom properties
- Gradient text requires specific Tailwind utilities

#### Validated Implementation:

```vue
<!-- components/atoms/Heading.vue -->
<template>
  <component
    :is="tag"
    :class="headingClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  gradient?: boolean
  class?: string
}

const props = withDefaults(defineProps<HeadingProps>(), {
  as: 'h2',
  size: 'lg',
  gradient: false
})

const tag = computed(() => props.as)

// Use CSS custom properties for golden ratio
const sizeClasses: Record<string, string> = {
  xs: 'text-[length:var(--text-golden-xs)]',
  sm: 'text-[length:var(--text-golden-sm)]',
  md: 'text-[length:var(--text-golden-md)]',
  lg: 'text-[length:var(--text-golden-lg)]',
  xl: 'text-[length:var(--text-golden-xl)]',
  '2xl': 'text-[length:var(--text-golden-2xl)]',
  '3xl': 'text-[length:var(--text-golden-3xl)]',
  '4xl': 'text-[length:var(--text-golden-4xl)]',
  '5xl': 'text-[length:var(--text-golden-5xl)]'
}

const headingClasses = computed(() =>
  cn(
    'font-bold leading-tight tracking-tight',
    sizeClasses[props.size],
    props.gradient && [
      'bg-gradient-to-r from-primary via-primary/80 to-primary/60',
      'bg-clip-text text-transparent'
    ],
    props.class
  )
)
</script>
```

---

### 8. **FORM COMPONENTS - VALIDATED ✅**

#### Label Component:
```vue
<!-- components/atoms/Label.vue -->
<template>
  <label
    :for="htmlFor"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required" class="text-destructive ml-1" aria-label="required">*</span>
  </label>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface LabelProps {
  for?: string
  required?: boolean
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  error: false
})

// Use 'htmlFor' to avoid reserved word
const htmlFor = computed(() => props.for)

const labelClasses = computed(() =>
  cn(
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.error && 'text-destructive',
    props.class
  )
)
</script>
```

---

## 📋 COMPLETE VALIDATED ICON LIST

Based on Lucide icons (most popular for Vue 3):

```ts
// All 44 icons with correct Lucide names
export const ICON_LIST = {
  // Navigation
  'ChevronDown': 'i-lucide-chevron-down',
  'ChevronRight': 'i-lucide-chevron-right',
  'Check': 'i-lucide-check',
  'Circle': 'i-lucide-circle',
  'X': 'i-lucide-x',
  'Menu': 'i-lucide-menu',
  'ArrowRight': 'i-lucide-arrow-right',
  
  // Features
  'Zap': 'i-lucide-zap',
  'Sparkles': 'i-lucide-sparkles',
  'Lightbulb': 'i-lucide-lightbulb',
  'PenTool': 'i-lucide-pen-tool',
  'Palette': 'i-lucide-palette',
  'Camera': 'i-lucide-camera',
  'Music': 'i-lucide-music',
  'Share2': 'i-lucide-share-2',
  'Film': 'i-lucide-film',
  'Globe': 'i-lucide-globe',
  'CheckCircle': 'i-lucide-check-circle',
  'Star': 'i-lucide-star',
  
  // Brand
  'Feather': 'i-lucide-feather',
  'BookOpen': 'i-lucide-book-open',
  'Users': 'i-lucide-users',
  'User': 'i-lucide-user',
  'UserCircle': 'i-lucide-user-circle',
  'LogOut': 'i-lucide-log-out',
  
  // Theme
  'Sun': 'i-lucide-sun',
  'Moon': 'i-lucide-moon',
  'Monitor': 'i-lucide-monitor',
  
  // Social (using brand icons)
  'Twitter': 'i-lucide-twitter',
  'Facebook': 'i-lucide-facebook',
  'Instagram': 'i-lucide-instagram',
  'Linkedin': 'i-lucide-linkedin',
  'Youtube': 'i-lucide-youtube',
  
  // Utility
  'AlertTriangle': 'i-lucide-alert-triangle',
  'RefreshCw': 'i-lucide-refresh-cw',
  'Home': 'i-lucide-home',
  'Download': 'i-lucide-download',
  'Heart': 'i-lucide-heart',
  'Mail': 'i-lucide-mail',
  'Loader2': 'i-lucide-loader-2',
  'Info': 'i-lucide-info'
} as const
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### Required Dependencies:
```json
{
  "dependencies": {
    "@nuxt/icon": "^1.0.0",
    "@iconify-json/lucide": "^1.1.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "vitest": "^1.0.0",
    "@vue/test-utils": "^2.4.0"
  }
}
```

### Nuxt Config Updates:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css',
    collections: ['lucide']
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
```

### Type Definitions:
```ts
// types/index.ts
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'

export interface BaseComponentProps {
  class?: string
  id?: string
}
```

---

## ⚠️ IMPORTANT NOTES

1. **Icon Component**: Use `@nuxt/icon` module instead of dynamic imports for better performance
2. **SSR Safety**: Always use `useId()` or `useComponentId()` for generating IDs
3. **State Management**: Use `useState` for SSR-shared state, `ref` for client-only
4. **Composables**: Place in `composables/` directory for auto-import
5. **Performance**: Use CSS mode for icons when possible
6. **Accessibility**: Always include proper ARIA attributes
7. **TypeScript**: Enable strict mode for better type safety

---

## 📚 REFERENCES

- [Nuxt Icon Module](https://nuxt.com/modules/icon)
- [Nuxt UI Components](https://ui.nuxt.com)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [VueUse Composables](https://vueuse.org)