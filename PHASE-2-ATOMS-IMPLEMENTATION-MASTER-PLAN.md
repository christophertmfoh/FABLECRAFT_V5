# PHASE 2: ATOMS IMPLEMENTATION MASTER PLAN

## Executive Summary

### PHASE 2A: Foundation Setup (Week 1, Days 1-2)
- **Step 1**: Setup Types & Utilities
- **Step 2**: Create Core Composables  
- **Step 3**: Install Dependencies

### PHASE 2B: Critical Atoms (Week 1, Days 3-5)
- **Step 4**: Icon Component (44 icons)
- **Step 5**: Button & GradientButton
- **Step 6**: Spinner Component
- **Step 7**: Card System

### PHASE 2C: Form Components (Week 2, Days 1-2)
- **Step 8**: Input Component
- **Step 9**: Label Component
- **Step 10**: FormMessage Component

### PHASE 2D: Display Components (Week 2, Days 3-4)
- **Step 11**: Badge & BadgeWithDot
- **Step 12**: Typography (Heading, Text, Link)
- **Step 13**: Avatar Component

### PHASE 2E: Layout Components (Week 2, Day 5)
- **Step 14**: Container & Section
- **Step 15**: Divider & Alert
- **Step 16**: Image Component

### PHASE 2F: Testing & Documentation (Week 2, Day 5)
- **Step 17**: Create Dev Dashboard
- **Step 18**: Component Documentation
- **Step 19**: Final Review & Polish

---

## Detailed Implementation Guide

### Step 1: Setup Types & Utilities

Update `types/index.ts`:
```typescript
// Component size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component color variants - matching our theme system
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'

// Additional specific variants
export type BadgeVariant = ComponentVariant | 'default' | 'destructive'

// Base props interface
export interface BaseComponentProps {
  class?: string
  id?: string
}
```

Update `components/atoms/Utils.ts`:
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

### Step 2: Create Core Composables

Create `composables/useComponentId.ts`:
```typescript
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

Create `composables/useComponentClasses.ts`:
```typescript
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

### Step 3: Install Dependencies

```bash
pnpm add @nuxt/icon @iconify-json/lucide clsx tailwind-merge
pnpm add -D @types/node vitest @vue/test-utils @testing-library/vue
```

Update `nuxt.config.ts`:
```typescript
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

### Step 4: Icon Component

Update `components/atoms/Icon.vue`:
```vue
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

// Size in pixels for Nuxt Icon - matching original icon sizing
const sizeMap: Record<ComponentSize, string> = {
  xs: '16px',
  sm: '16px', // Matches [&_svg]:size-4
  md: '20px',
  lg: '24px',
  xl: '32px'
}

const sizeValue = computed(() => sizeMap[props.size])

const iconClasses = computed(() => 
  cn(
    'inline-block shrink-0',
    props.class
  )
)
</script>
```

### Step 5: Button & GradientButton

Update `components/atoms/Button.vue`:
```vue
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
      name="i-lucide-loader-2"
      size="sm"
      class="animate-spin"
    />
    <Icon
      v-else-if="iconLeft"
      :name="iconLeft"
      size="sm"
    />
    
    <span :class="{ 'opacity-0': loading && !$slots.default }">
      <slot />
    </span>
    
    <Icon
      v-if="iconRight && !loading"
      :name="iconRight"
      size="sm"
    />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types'
import { cn } from './Utils'

interface ButtonProps {
  variant?: ComponentVariant | 'destructive' | 'link'
  size?: ComponentSize | 'icon'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: string
  iconRight?: string
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  class?: string
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

// Size classes - exact match to original
const sizeClasses = {
  xs: 'h-8 px-3 text-xs',       // Our addition
  sm: 'h-9 rounded-md px-3',    // Match original
  md: 'h-10 px-4 py-2',         // Match original (default)
  lg: 'h-11 rounded-md px-8',   // Match original
  xl: 'h-12 px-10 text-base',   // Our addition
  icon: 'h-10 w-10'             // Match original
}

// Variant classes - exact match to original styling
const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  // Our theme system additions
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  success: 'bg-success text-success-foreground hover:bg-success/90',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
}

// Combined classes - exact match to original structure
const buttonClasses = computed(() => 
  cn(
    // Base styles - exact match
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    
    // Size
    sizeClasses[props.size as keyof typeof sizeClasses],
    
    // Variant
    variantClasses[props.variant as keyof typeof variantClasses],
    
    // Full width
    props.fullWidth && 'w-full',
    
    // Loading state
    props.loading && 'cursor-wait',
    
    // Custom classes
    props.class
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

Create `components/atoms/GradientButton.vue`:
```vue
<template>
  <Button
    v-bind="buttonProps"
    :class="gradientClasses"
    @click="$emit('click', $event)"
  >
    <div
      v-if="showGradientOverlay"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-md pointer-events-none"
      :class="overlayClasses"
    />
    <span class="relative z-10">
      <slot />
    </span>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types'
import { cn } from './Utils'

interface GradientButtonProps {
  variant?: ComponentVariant | 'destructive' | 'link'
  size?: ComponentSize | 'icon'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: string
  iconRight?: string
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  showGradientOverlay?: boolean
  gradientColors?: string
  gradientDuration?: string
  class?: string
}

const props = withDefaults(defineProps<GradientButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  showGradientOverlay: true,
  gradientColors: 'from-white/20 to-transparent',
  gradientDuration: 'duration-300'
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// Extract button-specific props
const buttonProps = computed(() => {
  const { showGradientOverlay, gradientColors, gradientDuration, class: _, ...rest } = props
  return rest
})

const gradientClasses = computed(() =>
  cn(
    'group relative overflow-hidden',
    props.class
  )
)

const overlayClasses = computed(() =>
  cn(
    'bg-gradient-to-r',
    props.gradientColors,
    props.gradientDuration
  )
)
</script>
```

### Step 6: Spinner Component

Create `components/atoms/Spinner.vue`:
```vue
<template>
  <Icon
    name="i-lucide-loader-2"
    :size="size"
    :class="spinnerClasses"
  />
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface SpinnerProps {
  size?: ComponentSize
  class?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md'
})

const spinnerClasses = computed(() =>
  cn(
    'animate-spin',
    'text-current',
    props.class
  )
)
</script>
```

### Step 7: Card System

Update `components/atoms/Card.vue`:
```vue
<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()

// Match original card styling exactly
const cardClasses = computed(() =>
  cn(
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    props.class
  )
)
</script>
```

Create `components/atoms/CardHeader.vue`:
```vue
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

Create `components/atoms/CardTitle.vue`:
```vue
<template>
  <h3 :class="titleClasses">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardTitleProps {
  class?: string
}

const props = defineProps<CardTitleProps>()

const titleClasses = computed(() =>
  cn(
    'text-2xl font-semibold leading-none tracking-tight',
    props.class
  )
)
</script>
```

Create `components/atoms/CardDescription.vue`:
```vue
<template>
  <p :class="descriptionClasses">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardDescriptionProps {
  class?: string
}

const props = defineProps<CardDescriptionProps>()

const descriptionClasses = computed(() =>
  cn('text-sm text-muted-foreground', props.class)
)
</script>
```

Create `components/atoms/CardContent.vue`:
```vue
<template>
  <div :class="contentClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardContentProps {
  class?: string
}

const props = defineProps<CardContentProps>()

const contentClasses = computed(() =>
  cn('p-6 pt-0', props.class)
)
</script>
```

Create `components/atoms/CardFooter.vue`:
```vue
<template>
  <div :class="footerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardFooterProps {
  class?: string
}

const props = defineProps<CardFooterProps>()

const footerClasses = computed(() =>
  cn('flex items-center p-6 pt-0', props.class)
)
</script>
```

### Step 8: Input Component

Update `components/atoms/Input.vue`:
```vue
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
  class?: string
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

// Match original input styling exactly
const inputClasses = computed(() =>
  cn(
    // Base styles - exact match
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    
    // Error state
    props.error && 'border-destructive focus-visible:ring-destructive',
    
    // Custom classes
    props.class
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

### Step 9: Label Component

Create `components/atoms/Label.vue`:
```vue
<template>
  <label
    :for="htmlFor"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required" class="text-destructive ml-0.5" aria-label="required">*</span>
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
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.error && 'text-destructive',
    props.class
  )
)
</script>
```

### Step 10: FormMessage Component

Create `components/atoms/FormMessage.vue`:
```vue
<template>
  <p
    :id="id"
    :class="messageClasses"
  >
    <Icon
      v-if="showIcon"
      :name="iconName"
      size="xs"
      class="shrink-0"
    />
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface FormMessageProps {
  type?: 'error' | 'success' | 'warning' | 'info'
  id?: string
  showIcon?: boolean
  class?: string
}

const props = withDefaults(defineProps<FormMessageProps>(), {
  type: 'error',
  showIcon: true
})

const iconMap = {
  error: 'i-lucide-alert-triangle',
  success: 'i-lucide-check-circle',
  warning: 'i-lucide-alert-triangle',
  info: 'i-lucide-info'
}

const iconName = computed(() => iconMap[props.type])

const typeClasses = {
  error: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-muted-foreground'
}

const messageClasses = computed(() =>
  cn(
    'text-sm font-medium',
    'flex items-center gap-1.5',
    typeClasses[props.type],
    props.class
  )
)
</script>
```

### Step 11: Badge & BadgeWithDot

Update `components/atoms/Badge.vue`:
```vue
<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BadgeVariant } from '~/types'
import { cn } from './Utils'

interface BadgeProps {
  variant?: BadgeVariant
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
})

// Match original badge styling exactly
const variantClasses = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
  // Our theme additions
  success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
  warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
  ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
  accent: 'border-transparent bg-accent text-accent-foreground hover:bg-accent/80',
  danger: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
}

// Base styles - exact match
const badgeClasses = computed(() =>
  cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    variantClasses[props.variant as keyof typeof variantClasses],
    props.class
  )
)
</script>
```

Create `components/atoms/BadgeWithDot.vue`:
```vue
<template>
  <div class="inline-flex items-center gap-2">
    <span
      :class="dotClasses"
      aria-hidden="true"
    />
    <Badge
      :variant="variant"
      :class="badgeClass"
    >
      <slot />
    </Badge>
  </div>
</template>

<script setup lang="ts">
import type { BadgeVariant } from '~/types'
import { cn } from './Utils'

interface BadgeWithDotProps {
  variant?: BadgeVariant
  dotClass?: string
  badgeClass?: string
  animated?: boolean
}

const props = withDefaults(defineProps<BadgeWithDotProps>(), {
  variant: 'default',
  animated: true
})

// Match original styling
const dotClasses = computed(() =>
  cn(
    'w-2 h-2 rounded-full',
    'bg-current',
    props.animated && 'animate-pulse',
    props.dotClass
  )
)
</script>
```

### Step 12: Typography Components

Create `components/atoms/Heading.vue`:
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

Create `components/atoms/Text.vue`:
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
import { cn } from './Utils'

interface TextProps {
  as?: 'p' | 'span' | 'div'
  variant?: 'body' | 'lead' | 'small' | 'muted'
  class?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  as: 'p',
  variant: 'body'
})

const tag = computed(() => props.as)

const variantClasses = {
  body: 'text-base',
  lead: 'text-lg font-medium',
  small: 'text-sm',
  muted: 'text-sm text-muted-foreground'
}

const textClasses = computed(() =>
  cn(
    'leading-relaxed',
    variantClasses[props.variant],
    props.class
  )
)
</script>
```

Create `components/atoms/Link.vue`:
```vue
<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :target="linkTarget"
    :rel="linkRel"
    :class="linkClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { cn } from './Utils'

interface LinkProps {
  to?: RouteLocationRaw
  href?: string
  external?: boolean
  underline?: boolean
  class?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
  external: false,
  underline: true
})

const NuxtLink = resolveComponent('NuxtLink')
const componentTag = computed(() => {
  if (props.to) return NuxtLink
  return 'a'
})

const linkTarget = computed(() => props.external && props.href ? '_blank' : undefined)
const linkRel = computed(() => props.external && props.href ? 'noopener noreferrer' : undefined)

const linkClasses = computed(() =>
  cn(
    'text-primary hover:text-primary/80',
    'transition-colors duration-200',
    props.underline && 'underline-offset-4 hover:underline',
    props.class
  )
)
</script>
```

### Step 13: Avatar Component

Create `components/atoms/Avatar.vue`:
```vue
<template>
  <div :class="avatarClasses">
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <span
      v-else
      class="font-medium"
    >
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: ComponentSize
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  size: 'md'
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const sizeClasses: Record<ComponentSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg'
}

const avatarClasses = computed(() =>
  cn(
    'relative inline-flex items-center justify-center',
    'rounded-full overflow-hidden',
    'bg-muted text-muted-foreground',
    sizeClasses[props.size],
    props.class
  )
)
</script>
```

### Step 14: Container & Section

Create `components/atoms/Container.vue`:
```vue
<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface ContainerProps {
  width?: 'default' | 'narrow' | 'wide' | 'full'
  padding?: 'default' | 'loose' | 'tight' | 'none'
  class?: string
}

const props = withDefaults(defineProps<ContainerProps>(), {
  width: 'default',
  padding: 'default'
})

const widthClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-5xl',
  wide: 'max-w-screen-2xl',
  full: 'w-full'
}

const paddingClasses = {
  default: 'px-4 sm:px-6 lg:px-8',
  loose: 'px-6 sm:px-8 lg:px-12',
  tight: 'px-4',
  none: ''
}

const containerClasses = computed(() =>
  cn(
    'mx-auto',
    widthClasses[props.width],
    paddingClasses[props.padding],
    props.class
  )
)
</script>
```

Create `components/atoms/Section.vue`:
```vue
<template>
  <component
    :is="tag"
    :class="sectionClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'main'
  spacing?: 'default' | 'hero' | 'compact' | 'custom'
  class?: string
}

const props = withDefaults(defineProps<SectionProps>(), {
  as: 'section',
  spacing: 'default'
})

const tag = computed(() => props.as)

const spacingClasses = {
  default: 'section-spacing',
  hero: 'section-spacing-hero',
  compact: 'section-spacing-compact',
  custom: ''
}

const sectionClasses = computed(() =>
  cn(
    'relative z-10',
    spacingClasses[props.spacing],
    props.class
  )
)
</script>
```

Create `components/atoms/SectionContent.vue`:
```vue
<template>
  <div
    :class="contentClasses"
    :style="contentStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface SectionContentProps {
  align?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'default' | 'loose'
  maxWidth?: string
  class?: string
}

const props = withDefaults(defineProps<SectionContentProps>(), {
  align: 'center',
  spacing: 'default'
})

const spacingClasses = {
  tight: 'space-y-8',
  default: 'space-y-12 lg:space-y-16',
  loose: 'space-y-16 lg:space-y-20'
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const contentClasses = computed(() =>
  cn(
    alignClasses[props.align],
    spacingClasses[props.spacing],
    props.maxWidth && 'mx-auto',
    props.class
  )
)

const contentStyle = computed(() => ({
  maxWidth: props.maxWidth
}))
</script>
```

### Step 15: Divider & Alert

Create `components/atoms/Divider.vue`:
```vue
<template>
  <div
    v-if="orientation === 'horizontal'"
    :class="horizontalClasses"
  />
  <div
    v-else
    :class="verticalClasses"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  class?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  variant: 'solid'
})

const variantClasses = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted'
}

const horizontalClasses = computed(() =>
  cn(
    'w-full h-px',
    'border-t border-border',
    variantClasses[props.variant],
    props.class
  )
)

const verticalClasses = computed(() =>
  cn(
    'h-full w-px',
    'border-l border-border',
    variantClasses[props.variant],
    props.class
  )
)
</script>
```

Create `components/atoms/Alert.vue`:
```vue
<template>
  <div
    role="alert"
    :class="alertClasses"
  >
    <Icon
      v-if="showIcon"
      :name="iconName"
      size="sm"
      class="flex-shrink-0"
    />
    <div class="flex-1">
      <slot />
    </div>
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      class="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
      aria-label="Dismiss alert"
    >
      <Icon name="i-lucide-x" size="sm" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  showIcon?: boolean
  dismissible?: boolean
  class?: string
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  showIcon: true,
  dismissible: false
})

defineEmits<{
  dismiss: []
}>()

const iconMap = {
  info: 'i-lucide-info',
  success: 'i-lucide-check-circle',
  warning: 'i-lucide-alert-triangle',
  error: 'i-lucide-alert-triangle'
}

const iconName = computed(() => iconMap[props.variant])

// Using theme colors instead of hardcoded values
const variantClasses = {
  info: 'bg-blue-50/50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-800',
  success: 'bg-green-50/50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-100 dark:border-green-800',
  warning: 'bg-yellow-50/50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-100 dark:border-yellow-800',
  error: 'bg-red-50/50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-800'
}

const alertClasses = computed(() =>
  cn(
    'flex items-start gap-3',
    'p-4 rounded-lg border',
    variantClasses[props.variant],
    props.class
  )
)
</script>
```

### Step 16: Image Component

Create `components/atoms/Image.vue`:
```vue
<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :class="imageClasses"
    :modifiers="modifiers"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface ImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
  rounded?: boolean
  class?: string
  modifiers?: Record<string, any>
}

const props = withDefaults(defineProps<ImageProps>(), {
  loading: 'lazy',
  rounded: false,
  modifiers: () => ({ quality: 80, format: 'webp' })
})

const imageClasses = computed(() =>
  cn(
    'max-w-full h-auto',
    props.rounded && 'rounded-lg',
    props.class
  )
)
</script>
```

### Step 17: Create Dev Dashboard

Create `pages/dev/index.vue`:
```vue
<template>
  <div class="min-h-screen bg-background">
    <!-- Fixed Header -->
    <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <Container>
        <div class="flex h-16 items-center justify-between">
          <Heading as="h1" size="xl">Component Library</Heading>
          <div class="flex items-center gap-4">
            <Badge>{{ totalComponents }} components</Badge>
            <Button size="sm" variant="outline" @click="toggleTheme">
              <Icon :name="`i-lucide-${isDark ? 'sun' : 'moon'}`" />
            </Button>
          </div>
        </div>
      </Container>
    </header>

    <!-- Category Grid -->
    <main class="py-8">
      <Container>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/dev/${category.path}`"
            class="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all"
          >
            <!-- Category Icon -->
            <div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <Icon :name="`i-lucide-${category.icon}`" size="lg" class="text-primary" />
            </div>
            
            <!-- Category Info -->
            <Heading as="h3" size="lg" class="mb-2">{{ category.name }}</Heading>
            <Text variant="muted" class="mb-4">{{ category.description }}</Text>
            
            <!-- Component Count -->
            <div class="flex items-center justify-between">
              <Badge variant="secondary">{{ category.count }} items</Badge>
              <Icon name="i-lucide-arrow-right" size="sm" class="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            
            <!-- Progress Indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div 
                class="h-full bg-primary transition-all"
                :style="{ width: `${category.progress}%` }"
              />
            </div>
          </NuxtLink>
        </div>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle: toggleTheme } = useTheme()

const categories = [
  {
    id: 'icons',
    name: 'Icons',
    path: 'icons',
    icon: 'sparkles',
    description: 'Lucide icons with multiple sizes',
    count: 44,
    progress: 0
  },
  {
    id: 'buttons',
    name: 'Buttons',
    path: 'buttons',
    icon: 'mouse-pointer',
    description: 'Interactive button components',
    count: 2,
    progress: 0
  },
  {
    id: 'forms',
    name: 'Form Elements',
    path: 'forms',
    icon: 'file-text',
    description: 'Inputs, labels, and messages',
    count: 3,
    progress: 0
  },
  {
    id: 'typography',
    name: 'Typography',
    path: 'typography',
    icon: 'type',
    description: 'Headings, text, and links',
    count: 3,
    progress: 0
  },
  {
    id: 'display',
    name: 'Display',
    path: 'display',
    icon: 'layout',
    description: 'Badges, avatars, and cards',
    count: 7,
    progress: 0
  },
  {
    id: 'layout',
    name: 'Layout',
    path: 'layout',
    icon: 'panel-top',
    description: 'Containers and sections',
    count: 3,
    progress: 0
  },
  {
    id: 'feedback',
    name: 'Feedback',
    path: 'feedback',
    icon: 'message-square',
    description: 'Alerts and loading states',
    count: 3,
    progress: 0
  }
]

const totalComponents = computed(() => 
  categories.reduce((sum, cat) => sum + cat.count, 0)
)
</script>
```

### Step 18: Component Documentation

Create README files for each component with usage examples.

### Step 19: Final Review & Polish

- [ ] Test all components with different themes
- [ ] Verify accessibility (ARIA attributes, keyboard navigation)
- [ ] Check TypeScript types are properly exported
- [ ] Ensure SSR compatibility
- [ ] Validate responsive behavior
- [ ] Document any browser-specific considerations

---

## Final File Structure

```
components/
  atoms/
    Icon.vue ✓
    Button.vue ✓
    GradientButton.vue ✓
    Spinner.vue ✓
    Input.vue ✓
    Label.vue ✓
    FormMessage.vue ✓
    Badge.vue ✓
    BadgeWithDot.vue ✓
    Card.vue ✓
    CardHeader.vue ✓
    CardTitle.vue ✓
    CardDescription.vue ✓
    CardContent.vue ✓
    CardFooter.vue ✓
    Heading.vue ✓
    Text.vue ✓
    Link.vue ✓
    Avatar.vue ✓
    Container.vue ✓
    Section.vue ✓
    SectionContent.vue ✓
    Divider.vue ✓
    Alert.vue ✓
    Image.vue ✓
    Utils.ts ✓

composables/
  useComponentId.ts ✓
  useComponentClasses.ts ✓

types/
  index.ts ✓

pages/
  dev/
    index.vue ✓
    icons/
      index.vue (to be created)
    buttons/
      index.vue (to be created)
    forms/
      index.vue (to be created)
    typography/
      index.vue (to be created)
    display/
      index.vue (to be created)
    layout/
      index.vue (to be created)
    feedback/
      index.vue (to be created)
```

## Completion Checklist

- [ ] All components match original visual design
- [ ] Theme system properly integrated (no hardcoded colors)
- [ ] TypeScript types are correct and exported
- [ ] SSR-safe implementations
- [ ] Accessibility features included
- [ ] Dev pages created for each category
- [ ] Documentation completed
- [ ] All 44 icons configured
- [ ] Performance optimized