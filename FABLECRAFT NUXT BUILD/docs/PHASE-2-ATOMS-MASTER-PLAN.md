# 🎯 PHASE 2: ATOMS IMPLEMENTATION MASTER PLAN

## 📋 EXECUTIVE SUMMARY - PHASES & STEPS

### **PHASE 2A: Foundation Setup**
- **Step 1**: Setup Types & Utilities
- **Step 2**: Create Core Composables
- **Step 3**: Install Dependencies

### **PHASE 2B: Critical Atoms**
- **Step 4**: Icon Component (with 44 icons)
- **Step 5**: Button & GradientButton
- **Step 6**: Spinner Component
- **Step 7**: Card System

### **PHASE 2C: Form Components**
- **Step 8**: Input Component
- **Step 9**: Label Component
- **Step 10**: FormMessage Component

### **PHASE 2D: Display Components**
- **Step 11**: Badge & BadgeWithDot
- **Step 12**: Typography (Heading, Text, Link)
- **Step 13**: Avatar Component

### **PHASE 2E: Layout Components**
- **Step 14**: Container & Section
- **Step 15**: Divider & Alert
- **Step 16**: Image Component

### **PHASE 2F: Testing & Documentation**
- **Step 17**: Create Visual Test Page
- **Step 18**: Component Documentation
- **Step 19**: Final Review & Polish

---

# 📚 DETAILED IMPLEMENTATION GUIDE

## 🔧 **PHASE 2A: FOUNDATION SETUP**

### **Step 1: Setup Types & Utilities**

#### Update `types/index.ts`:
```typescript
// Component size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component color variants
export type ComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'

// Base props interface
export interface BaseComponentProps {
  class?: string
  id?: string
}

// Animation types
export type AnimationType = 'none' | 'pulse' | 'bounce' | 'spin' | 'ping'
```

#### Update `components/atoms/Utils.ts`:
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

### **Step 2: Create Core Composables**

#### Create `composables/useComponentId.ts`:
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

#### Create `composables/useComponentClasses.ts`:
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

### **Step 3: Install Dependencies**
```bash
# Install icon module and dependencies
pnpm add @nuxt/icon @iconify-json/lucide clsx tailwind-merge

# Install dev dependencies
pnpm add -D @types/node vitest @vue/test-utils @testing-library/vue
```

#### Update `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css', // Use CSS mode for better performance
    collections: ['lucide']
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
```

---

## ⚡ **PHASE 2B: CRITICAL ATOMS**

### **Step 4: Icon Component**

#### Update `components/atoms/Icon.vue`:
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

**Icons Required (44 total)**:
```typescript
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

### **Step 5: Button & GradientButton**

#### Update `components/atoms/Button.vue`:
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

#### Create `components/atoms/GradientButton.vue`:
```vue
<template>
  <Button
    v-bind="$props"
    :class="gradientClasses"
    @click="$emit('click', $event)"
  >
    <div 
      v-if="showGradientOverlay"
      class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
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
  showGradientOverlay?: boolean
  gradientColors?: string
  gradientDuration?: string
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

const gradientClasses = computed(() =>
  cn(
    'group relative overflow-hidden',
    props.gradientDuration
  )
)
</script>
```

### **Step 6: Spinner Component**

#### Create `components/atoms/Spinner.vue`:
```vue
<template>
  <Icon
    name="i-lucide-loader-circle"
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

### **Step 7: Card System**

#### Update `components/atoms/Card.vue`:
```vue
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
```

Create additional card sub-components:

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

```vue
<!-- components/atoms/CardTitle.vue -->
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
  cn('text-2xl font-semibold leading-none tracking-tight', props.class)
)
</script>
```

```vue
<!-- components/atoms/CardDescription.vue -->
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

```vue
<!-- components/atoms/CardContent.vue -->
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

```vue
<!-- components/atoms/CardFooter.vue -->
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

---

## 📝 **PHASE 2C: FORM COMPONENTS**

### **Step 8: Input Component**

#### Update `components/atoms/Input.vue`:
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

### **Step 9: Label Component**

#### Create `components/atoms/Label.vue`:
```vue
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

### **Step 10: FormMessage Component**

#### Create `components/atoms/FormMessage.vue`:
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
      class="mr-1"
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
  error: 'AlertTriangle',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  info: 'Info'
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
    'flex items-center',
    typeClasses[props.type],
    props.class
  )
)
</script>
```

---

## 🎨 **PHASE 2D: DISPLAY COMPONENTS**

### **Step 11: Badge & BadgeWithDot**

#### Update `components/atoms/Badge.vue`:
```vue
<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { ComponentVariant } from '~/types'
import { cn } from './Utils'

interface BadgeProps {
  variant?: ComponentVariant | 'default'
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
})

// Variant classes
const variantClasses = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-destructive text-destructive-foreground',
  ghost: 'bg-transparent',
  outline: 'border border-current bg-transparent'
}

// Combined classes
const badgeClasses = computed(() =>
  cn(
    // Base styles
    'inline-flex items-center',
    'px-2.5 py-0.5',
    'text-xs font-semibold',
    'rounded-full',
    'transition-all duration-200',
    
    // Variant
    variantClasses[props.variant],
    
    // Custom classes
    props.class
  )
)
</script>
```

#### Create `components/atoms/BadgeWithDot.vue`:
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
import type { ComponentVariant } from '~/types'
import { cn } from './Utils'

interface BadgeWithDotProps {
  variant?: ComponentVariant | 'default'
  dotClass?: string
  badgeClass?: string
  animated?: boolean
}

const props = withDefaults(defineProps<BadgeWithDotProps>(), {
  variant: 'default',
  animated: true
})

// Dot classes
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

### **Step 12: Typography Components**

#### Create `components/atoms/Heading.vue`:
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

#### Create `components/atoms/Text.vue`:
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

#### Create `components/atoms/Link.vue`:
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

### **Step 13: Avatar Component**

#### Create `components/atoms/Avatar.vue`:
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

---

## 🏗️ **PHASE 2E: LAYOUT COMPONENTS**

### **Step 14: Container & Section**

#### Create `components/atoms/Container.vue`:
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

#### Create `components/atoms/Section.vue`:
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

#### Create `components/atoms/SectionContent.vue`:
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

### **Step 15: Divider & Alert**

#### Create `components/atoms/Divider.vue`:
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

#### Create `components/atoms/Alert.vue`:
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
      <Icon name="X" size="sm" />
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
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  error: 'AlertTriangle'
}

const iconName = computed(() => iconMap[props.variant])

const variantClasses = {
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  success: 'bg-green-50 text-green-900 border-green-200',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
  error: 'bg-red-50 text-red-900 border-red-200'
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

### **Step 16: Image Component**

#### Create `components/atoms/Image.vue`:
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

---

## 🧪 **PHASE 2F: TESTING & DOCUMENTATION**

### **Step 17: Create Visual Test Page**

#### Create `pages/atoms-test.vue`:
```vue
<template>
  <div class="min-h-screen bg-background p-8">
    <Container>
      <Heading as="h1" size="4xl" class="mb-8">
        Atoms Component Library
      </Heading>

      <!-- Icons Section -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Icons</Heading>
        <div class="grid grid-cols-8 gap-4">
          <div
            v-for="icon in iconList"
            :key="icon"
            class="flex flex-col items-center gap-2 p-4 border rounded"
          >
            <Icon :name="icon" size="md" />
            <Text variant="small">{{ icon }}</Text>
          </div>
        </div>
      </Section>

      <!-- Buttons Section -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Buttons</Heading>
        
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>

          <div class="flex flex-wrap gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>

          <div class="flex flex-wrap gap-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button iconLeft="Zap">With Icon</Button>
            <Button iconRight="ArrowRight">Continue</Button>
          </div>

          <div class="flex flex-wrap gap-4">
            <GradientButton>Gradient Button</GradientButton>
            <GradientButton variant="secondary">Secondary Gradient</GradientButton>
          </div>
        </div>
      </Section>

      <!-- Forms Section -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Form Components</Heading>
        
        <div class="max-w-md space-y-4">
          <div>
            <Label for="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="formData.email"
            />
          </div>

          <div>
            <Label for="password" required>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model="formData.password"
              error
            />
            <FormMessage type="error">Password is required</FormMessage>
          </div>
        </div>
      </Section>

      <!-- Badges Section -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Badges</Heading>
        
        <div class="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <BadgeWithDot>With Dot</BadgeWithDot>
        </div>
      </Section>

      <!-- Typography Section -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Typography</Heading>
        
        <div class="space-y-4">
          <Heading as="h1" size="5xl">Heading 5xl</Heading>
          <Heading as="h2" size="4xl">Heading 4xl</Heading>
          <Heading as="h3" size="3xl">Heading 3xl</Heading>
          <Heading as="h4" size="2xl" gradient>Gradient Heading</Heading>
          
          <Text variant="lead">This is lead text - slightly larger and emphasized.</Text>
          <Text>This is body text - the default paragraph style.</Text>
          <Text variant="small">This is small text - for less important content.</Text>
          <Text variant="muted">This is muted text - for supplementary information.</Text>
          
          <Link href="#">This is a link</Link>
        </div>
      </Section>

      <!-- Other Components -->
      <Section spacing="compact">
        <Heading as="h2" size="2xl" class="mb-4">Other Components</Heading>
        
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <Avatar name="John Doe" />
            <Avatar name="Jane Smith" size="lg" />
            <Avatar src="/placeholder-avatar.jpg" alt="User" />
          </div>

          <Divider />

          <Alert variant="info">This is an info alert</Alert>
          <Alert variant="success" dismissible>This is a success alert</Alert>
          <Alert variant="warning">This is a warning alert</Alert>
          <Alert variant="error">This is an error alert</Alert>

          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Card content goes here</Text>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </Container>
  </div>
</template>

<script setup lang="ts">
const formData = ref({
  email: '',
  password: ''
})

const iconList = [
  'Zap', 'Sparkles', 'Feather', 'Sun', 'Moon', 'Star',
  'Heart', 'Home', 'User', 'Settings', 'Search', 'Menu'
]
</script>
```

### **Step 18: Component Documentation**

Create a README for each component with usage examples.

### **Step 19: Final Review & Polish**

- Test all components with different themes
- Verify accessibility
- Check TypeScript types
- Ensure SSR compatibility
- Validate all 44 icons work

---

## 📁 **FINAL FILE STRUCTURE**

```
components/
└── atoms/
    ├── Alert.vue
    ├── Avatar.vue
    ├── Badge.vue ✓
    ├── BadgeWithDot.vue
    ├── Button.vue ✓
    ├── Card.vue ✓
    ├── CardContent.vue
    ├── CardDescription.vue
    ├── CardFooter.vue
    ├── CardHeader.vue
    ├── Container.vue
    ├── Divider.vue
    ├── FormMessage.vue
    ├── GradientButton.vue
    ├── Heading.vue
    ├── Icon.vue ✓
    ├── Image.vue
    ├── Input.vue ✓
    ├── Label.vue
    ├── Link.vue
    ├── Section.vue
    ├── SectionContent.vue
    ├── Spinner.vue
    ├── Text.vue
    └── Utils.ts ✓

composables/
├── useComponentClasses.ts
├── useComponentId.ts
└── useVariants.ts (optional)

types/
└── index.ts ✓

pages/
└── atoms-test.vue
```

✓ = Already exists (needs updating)

---

## ✅ **COMPLETION CHECKLIST**

- [ ] All 20 atoms implemented
- [ ] All 44 icons tested
- [ ] TypeScript types complete
- [ ] SSR-safe implementation
- [ ] Theme system integrated
- [ ] Accessibility verified
- [ ] Visual test page working
- [ ] Documentation complete

This master plan contains everything needed to implement Phase 2 atoms correctly in Nuxt 3!