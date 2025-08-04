# 🚀 PHASE 2: NUXT 3 ATOMS IMPLEMENTATION PLAN
## Complete Guide for Building Production-Ready Vue 3 Atomic Components

### 📋 FINAL ATOM AUDIT RESULTS

After comprehensive analysis, here are ALL atoms needed:

## ✅ **COMPLETE ATOMS INVENTORY (17 Total)**

### **Core UI Atoms (10)**
1. **BaseIcon** - Dynamic icon component with Lucide icons
2. **BaseButton** - Standard button with variants
3. **GradientButton** - Special CTA button with gradient overlay
4. **BaseInput** - Form input with validation states
5. **BaseLabel** - Form label with accessibility
6. **BaseBadge** - Status/tag component
7. **BadgeWithDot** - Badge with animated indicator
8. **BaseSpinner** - Loading indicator
9. **BaseAvatar** - User avatar with fallback
10. **BaseDivider** - Visual separator

### **Typography Atoms (3)**
11. **BaseHeading** - Semantic headings (h1-h6)
12. **BaseText** - Body text with variants
13. **BaseLink** - Consistent link styling

### **Layout Atoms (2)**
14. **BaseContainer** - Responsive container
15. **BaseSection** - Section wrapper with spacing

### **Feedback Atoms (2)**
16. **FormMessage** - Form validation messages
17. **BaseAlert** - Alert/notification component

---

## 🏗️ **NUXT 3 PROJECT STRUCTURE**

```
FABLECRAFT NUXT BUILD/
├── components/
│   └── base/                    # All atomic components
│       ├── BaseIcon.vue
│       ├── BaseButton.vue
│       ├── GradientButton.vue
│       ├── BaseInput.vue
│       ├── BaseLabel.vue
│       ├── BaseBadge.vue
│       ├── BadgeWithDot.vue
│       ├── BaseSpinner.vue
│       ├── BaseAvatar.vue
│       ├── BaseDivider.vue
│       ├── BaseHeading.vue
│       ├── BaseText.vue
│       ├── BaseLink.vue
│       ├── BaseContainer.vue
│       ├── BaseSection.vue
│       ├── FormMessage.vue
│       └── BaseAlert.vue
├── composables/
│   ├── useComponentClasses.ts   # Shared class management
│   ├── useId.ts                 # SSR-safe ID generation
│   └── useVariants.ts           # Variant system
├── utils/
│   ├── cn.ts                    # Class merging utility
│   └── helpers.ts               # General helpers
└── types/
    └── components.ts            # Shared component types
```

---

## 📐 **IMPLEMENTATION ORDER (BY PRIORITY)**

### **🔴 PHASE 2A: Critical Foundation (Week 1)**

#### **Step 1: Setup Utilities & Types**
```typescript
// ~/types/components.ts
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

```typescript
// ~/utils/cn.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```typescript
// ~/composables/useId.ts
export function useId(prefix = 'fc'): string {
  const instance = getCurrentInstance()
  return `${prefix}-${instance?.uid || Math.random().toString(36).substring(2, 9)}`
}
```

#### **Step 2: BaseIcon Component**
```vue
<!-- ~/components/base/BaseIcon.vue -->
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
import type { ComponentSize } from '~/types/components'

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

#### **Step 3: BaseButton Component**
```vue
<!-- ~/components/base/BaseButton.vue -->
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
    <BaseSpinner
      v-if="loading"
      :size="iconSize"
      class="mr-2"
    />
    <BaseIcon
      v-else-if="iconLeft"
      :name="iconLeft"
      :size="iconSize"
      class="mr-2"
    />
    
    <slot />
    
    <BaseIcon
      v-if="iconRight && !loading"
      :name="iconRight"
      :size="iconSize"
      class="ml-2"
    />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types/components'

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

### **🟡 PHASE 2B: Form & Input Components (Week 1-2)**

#### **Step 4: BaseInput Component**
```vue
<!-- ~/components/base/BaseInput.vue -->
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
import type { ComponentSize } from '~/types/components'

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

### **🟢 PHASE 2C: Display Components (Week 2)**

#### **Step 5: BaseBadge Component**
```vue
<!-- ~/components/base/BaseBadge.vue -->
<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { ComponentVariant } from '~/types/components'

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

#### **Step 6: BadgeWithDot Component**
```vue
<!-- ~/components/base/BadgeWithDot.vue -->
<template>
  <div class="inline-flex items-center gap-2">
    <span
      :class="dotClasses"
      aria-hidden="true"
    />
    <BaseBadge
      :variant="variant"
      :class="badgeClass"
    >
      <slot />
    </BaseBadge>
  </div>
</template>

<script setup lang="ts">
import type { ComponentVariant } from '~/types/components'

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

---

## 🎯 **NUXT/VUE BEST PRACTICES CHECKLIST**

### **✅ Component Guidelines**
- [ ] Use `<script setup>` syntax for all components
- [ ] Define props with TypeScript interfaces
- [ ] Use `withDefaults` for prop defaults
- [ ] Emit events with typed `defineEmits`
- [ ] Use `computed` for reactive classes
- [ ] Implement proper v-model with `modelValue`
- [ ] Use `getCurrentInstance` for SSR-safe IDs
- [ ] Leverage auto-imports (no need to import `ref`, `computed`)

### **✅ Performance Optimizations**
- [ ] Use `defineAsyncComponent` for icon loading
- [ ] Implement `ClientOnly` wrapper where needed
- [ ] Use CSS variables for theming (no runtime JS)
- [ ] Minimize bundle with tree-shakable imports
- [ ] Leverage Nuxt's auto-import for components

### **✅ Accessibility Requirements**
- [ ] Proper ARIA attributes on all components
- [ ] Keyboard navigation support
- [ ] Focus management and visible indicators
- [ ] Screen reader announcements
- [ ] Color contrast compliance

### **✅ Testing Strategy**
- [ ] Unit tests with Vitest
- [ ] Component tests with @testing-library/vue
- [ ] Visual regression with Chromatic
- [ ] Accessibility tests with axe-core

---

## 📦 **DEPENDENCIES TO INSTALL**

```bash
# Core dependencies
pnpm add lucide-vue-next clsx tailwind-merge @vueuse/core

# Development dependencies
pnpm add -D @types/node vitest @vue/test-utils @testing-library/vue
```

---

## 🚀 **IMPLEMENTATION WORKFLOW**

### **Day 1-2: Foundation**
1. Set up types and utilities
2. Create BaseIcon with all 40+ icons
3. Implement BaseButton with all variants
4. Create GradientButton extending BaseButton

### **Day 3-4: Forms**
5. Build BaseInput with validation states
6. Create BaseLabel with accessibility
7. Implement FormMessage component
8. Add BaseSpinner for loading states

### **Day 5-6: Display**
9. Create BaseBadge with variants
10. Build BadgeWithDot composite
11. Implement BaseHeading with golden ratio
12. Add BaseText with variants

### **Day 7: Layout & Polish**
13. Create BaseContainer and BaseSection
14. Build remaining utility components
15. Set up component documentation
16. Create visual test page

---

## ⚠️ **CRITICAL NUXT CONSIDERATIONS**

1. **Auto-imports**: Components in `~/components/base/` are auto-imported
2. **SSR Safety**: Use `ClientOnly` for browser-only features
3. **Hydration**: Ensure consistent server/client rendering
4. **Performance**: Leverage Nuxt's built-in optimizations
5. **TypeScript**: Full type safety with Vue 3 + TypeScript

This plan ensures every atom is built correctly for Nuxt 3 with proper Vue patterns, no React code contamination, and production-ready quality.