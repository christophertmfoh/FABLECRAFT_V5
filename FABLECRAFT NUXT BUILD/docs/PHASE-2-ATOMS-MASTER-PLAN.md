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

### **Step 2: Create Core Composables**

#### Create `composables/useId.ts`:
```typescript
/**
 * Generate SSR-safe unique IDs for accessibility
 */
export function useId(prefix: string = 'fc'): string {
  const instance = getCurrentInstance()
  
  // Use instance UID if available (SSR-safe)
  const id = instance?.uid || Math.random().toString(36).substring(2, 9)
  return `${prefix}-${id}`
}
```

#### Create `composables/useComponentClasses.ts`:
```typescript
import { computed, type Ref, type ComputedRef } from 'vue'
import type { ComponentSize, ComponentVariant } from '~/types'

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

### **Step 3: Install Dependencies**
```bash
# Run this command
pnpm add lucide-vue-next clsx tailwind-merge @vueuse/core
pnpm add -D @types/node vitest @vue/test-utils @testing-library/vue
```

---

## ⚡ **PHASE 2B: CRITICAL ATOMS**

### **Step 4: Icon Component**

#### Update `components/atoms/Icon.vue`:
```vue
<template>
  <component
    :is="iconComponent"
    :class="iconClasses"
    :width="sizeValue"
    :height="sizeValue"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
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

// Dynamic icon import from lucide-vue-next
const iconComponent = computed(() => 
  defineAsyncComponent(() => 
    import('lucide-vue-next').then(module => module[props.name])
  )
)

// Size mappings using CSS variables
const sizeMap: Record<ComponentSize, number> = {
  xs: 16,  // --space-2
  sm: 20,  // --space-2.5
  md: 24,  // --space-3
  lg: 32,  // --space-4
  xl: 40   // --space-5
}

const sizeValue = computed(() => sizeMap[props.size])

const iconClasses = computed(() => 
  cn(
    'inline-block',
    'text-current',
    props.class
  )
)
</script>
```

**Icons Required (44 total)**:
- Navigation: ChevronDown, ChevronRight, Check, Circle, X, Menu, ArrowRight
- Features: Zap, Sparkles, Lightbulb, PenTool, Palette, Camera, Music, Share2, Film, Globe, CheckCircle, Star
- Brand: Feather, BookOpen, Users, User, UserCircle, LogOut
- Theme: Sun, Moon, Monitor
- Social: Twitter, Facebook, Instagram, Linkedin, Youtube
- Utility: AlertTriangle, RefreshCw, Home, Download, Heart, Mail, Loader2

### **Step 5: Button & GradientButton**

#### Update `components/atoms/Button.vue`:
```vue
<template>
  <component
    :is="componentTag"
    :type="type"
    :to="to"
    :href="href"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Spinner
      v-if="loading"
      :size="iconSize"
      class="mr-2"
    />
    <Icon
      v-else-if="iconLeft"
      :name="iconLeft"
      :size="iconSize"
      class="mr-2"
    />
    
    <slot />
    
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

// Computed component type
const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// Size classes
const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-8 text-lg',
  icon: 'h-10 w-10 p-0'
}

// Icon size mapping
const iconSize = computed(() => {
  const sizes: Record<ComponentSize, ComponentSize> = {
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
    icon: 'md'
  }
  return sizes[props.size] || 'sm'
})

// Variant classes using CSS variables
const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border-2 border-current bg-transparent hover:bg-accent'
}

// Combined classes
const buttonClasses = computed(() => 
  cn(
    // Base styles
    'inline-flex items-center justify-center',
    'rounded-xl font-semibold',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-105 hover:-translate-y-0.5',
    'shadow-md hover:shadow-lg active:shadow-sm',
    
    // Size
    sizeClasses[props.size],
    
    // Variant
    variantClasses[props.variant],
    
    // Full width
    props.fullWidth && 'w-full',
    
    // Loading
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
  <svg
    :class="spinnerClasses"
    :width="sizeValue"
    :height="sizeValue"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
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

const sizeMap: Record<ComponentSize, number> = {
  xs: 16,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
}

const sizeValue = computed(() => sizeMap[props.size])

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
  class?: string
}

const props = defineProps<CardProps>()

const cardClasses = computed(() =>
  cn(
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    props.class
  )
)
</script>
```

Create additional card sub-components in the same file:

```vue
<!-- Add these components to Card.vue -->
<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
// ... existing Card component code ...

// Export sub-components
export const CardHeader = defineComponent({
  name: 'CardHeader',
  props: {
    class: String
  },
  setup(props, { slots }) {
    const classes = computed(() =>
      cn('flex flex-col space-y-1.5 p-6', props.class)
    )
    return () => h('div', { class: classes.value }, slots.default?.())
  }
})

export const CardTitle = defineComponent({
  name: 'CardTitle',
  props: {
    class: String
  },
  setup(props, { slots }) {
    const classes = computed(() =>
      cn('text-2xl font-semibold leading-none tracking-tight', props.class)
    )
    return () => h('h3', { class: classes.value }, slots.default?.())
  }
})

export const CardDescription = defineComponent({
  name: 'CardDescription',
  props: {
    class: String
  },
  setup(props, { slots }) {
    const classes = computed(() =>
      cn('text-sm text-muted-foreground', props.class)
    )
    return () => h('p', { class: classes.value }, slots.default?.())
  }
})

export const CardContent = defineComponent({
  name: 'CardContent',
  props: {
    class: String
  },
  setup(props, { slots }) {
    const classes = computed(() =>
      cn('p-6 pt-0', props.class)
    )
    return () => h('div', { class: classes.value }, slots.default?.())
  }
})

export const CardFooter = defineComponent({
  name: 'CardFooter',
  props: {
    class: String
  },
  setup(props, { slots }) {
    const classes = computed(() =>
      cn('flex items-center p-6 pt-0', props.class)
    )
    return () => h('div', { class: classes.value }, slots.default?.())
  }
})
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
    :aria-invalid="error"
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
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  placeholder?: string
  size?: ComponentSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

// Generate SSR-safe ID
const inputId = computed(() => props.id || useId('input'))

// Size classes
const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-4 text-lg'
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
    props.disabled && 'cursor-not-allowed opacity-50'
  )
)

// Input handler
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>
```

### **Step 9: Label Component**

#### Create `components/atoms/Label.vue`:
```vue
<template>
  <label
    :for="for"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required" class="text-destructive ml-1">*</span>
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
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-destructive text-destructive-foreground',
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
  size: 'lg'
})

const tag = computed(() => props.as)

// Golden ratio sizing
const sizeClasses = {
  xs: 'text-golden-xs',
  sm: 'text-golden-sm',
  md: 'text-golden-md',
  lg: 'text-golden-lg',
  xl: 'text-golden-xl',
  '2xl': 'text-golden-2xl',
  '3xl': 'text-golden-3xl',
  '4xl': 'text-golden-4xl',
  '5xl': 'text-golden-5xl'
}

const headingClasses = computed(() =>
  cn(
    'font-bold leading-tight tracking-tight',
    sizeClasses[props.size],
    props.gradient && 'bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent',
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
    :class="linkClasses"
    v-bind="linkAttrs"
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

const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  return 'a'
})

const linkAttrs = computed(() => {
  if (props.external && props.href) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return {}
})

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
    <img
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

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
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
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Icon name="Heart" /></Button>
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
├── useId.ts
└── useVariants.ts

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