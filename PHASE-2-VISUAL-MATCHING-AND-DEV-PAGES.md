# Phase 2: Visual Matching and Dev Page Organization

## Visual Aesthetic Matching Requirements

### Critical Visual Discrepancies to Fix

Based on the original React components, our Vue implementations need these adjustments:

#### 1. Button Component
**Current Issues:**
- Using `rounded-xl` instead of `rounded-md`
- Missing exact height classes
- Different variant names and hover states

**Required Changes:**
```vue
<!-- components/atoms/Button.vue -->
// Update size classes to match original
const sizeClasses: Record<ComponentSize, string> = {
  xs: 'h-7 px-2 text-xs gap-1',      // Keep our xs
  sm: 'h-9 px-3 text-sm gap-1.5',    // Match original
  md: 'h-10 px-4 text-sm gap-2',     // Match original (default)
  lg: 'h-11 px-8 text-sm gap-2',     // Match original
  xl: 'h-12 px-8 text-base gap-3'    // Keep our xl
}

// Update base styles to match
const buttonClasses = computed(() => 
  cn(
    // Match original base styles exactly
    'inline-flex items-center justify-center',
    'whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    
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
```

#### 2. Badge Component
**Current Issues:**
- Missing hover states
- Different variant definitions

**Required Changes:**
```vue
<!-- components/atoms/Badge.vue -->
const variantClasses = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
  // Keep our additional variants
  success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
  warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
  ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
  accent: 'border-transparent bg-accent text-accent-foreground hover:bg-accent/80'
}

// Base styles should match original
const badgeClasses = computed(() =>
  cn(
    // Match original exactly
    'inline-flex items-center rounded-full border',
    'px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    
    // Variant
    variantClasses[props.variant],
    
    // Custom classes
    props.class
  )
)
```

#### 3. Input Component
**Visual Requirements:**
- Ensure border radius matches design system
- Maintain consistent focus states
- Match original height classes

#### 4. Card Component
**Visual Requirements:**
- Use consistent shadow classes from original
- Match border radius (`rounded-lg` not custom values)
- Ensure hover states match

### Scalability Improvements

#### 1. Implement CVA Pattern
To match the original's scalability, we should create variant files:

```typescript
// components/atoms/button-variants.ts
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

## Dev Page Organization Strategy

### Recommended Approach: Category-Based Pages

Instead of one massive test page, create a structured development environment:

```
pages/
  dev/
    index.vue          # Dashboard with category cards
    icons/
      index.vue        # Icon gallery with search/filter
    buttons/
      index.vue        # All button variants and states
    forms/
      index.vue        # Form components showcase
    typography/
      index.vue        # Headings, text, links
    display/
      index.vue        # Badges, avatars, cards
    layout/
      index.vue        # Containers, sections, dividers
    feedback/
      index.vue        # Alerts, spinners, messages
```

### Main Dashboard (`pages/dev/index.vue`)

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
              <Icon :name="isDark ? 'Sun' : 'Moon'" />
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
              <Icon :name="category.icon" size="lg" class="text-primary" />
            </div>
            
            <!-- Category Info -->
            <Heading as="h3" size="lg" class="mb-2">{{ category.name }}</Heading>
            <Text variant="muted" class="mb-4">{{ category.description }}</Text>
            
            <!-- Component Count -->
            <div class="flex items-center justify-between">
              <Badge variant="secondary">{{ category.count }} items</Badge>
              <Icon name="ArrowRight" size="sm" class="text-muted-foreground group-hover:translate-x-1 transition-transform" />
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
const { isDark, toggleTheme } = useTheme()

const categories = [
  {
    id: 'icons',
    name: 'Icons',
    path: 'icons',
    icon: 'Sparkles',
    description: 'Lucide icons with multiple sizes',
    count: 44,
    progress: 100
  },
  {
    id: 'buttons',
    name: 'Buttons',
    path: 'buttons',
    icon: 'MousePointer',
    description: 'Interactive button components',
    count: 2,
    progress: 100
  },
  {
    id: 'forms',
    name: 'Form Elements',
    path: 'forms',
    icon: 'FileText',
    description: 'Inputs, labels, and messages',
    count: 3,
    progress: 100
  },
  {
    id: 'typography',
    name: 'Typography',
    path: 'typography',
    icon: 'Type',
    description: 'Headings, text, and links',
    count: 3,
    progress: 100
  },
  {
    id: 'display',
    name: 'Display',
    path: 'display',
    icon: 'Layout',
    description: 'Badges, avatars, and cards',
    count: 7,
    progress: 100
  },
  {
    id: 'layout',
    name: 'Layout',
    path: 'layout',
    icon: 'PanelTop',
    description: 'Containers and sections',
    count: 3,
    progress: 100
  },
  {
    id: 'feedback',
    name: 'Feedback',
    path: 'feedback',
    icon: 'MessageSquare',
    description: 'Alerts and loading states',
    count: 3,
    progress: 100
  }
]

const totalComponents = computed(() => 
  categories.reduce((sum, cat) => sum + cat.count, 0)
)
</script>
```

### Category Page Template (`pages/dev/icons/index.vue`)

```vue
<template>
  <div class="min-h-screen bg-background">
    <!-- Header with Back Button -->
    <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <Container>
        <div class="flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            @click="$router.push('/dev')"
          >
            <Icon name="ArrowLeft" size="sm" />
            Back
          </Button>
          <div class="flex-1">
            <Heading as="h1" size="xl">Icons</Heading>
          </div>
          <!-- Search/Filter -->
          <Input
            v-model="searchQuery"
            placeholder="Search icons..."
            class="max-w-xs"
          />
        </div>
      </Container>
    </header>

    <!-- Icon Grid -->
    <main class="py-8">
      <Container>
        <!-- Size Selector -->
        <div class="mb-6 flex gap-2">
          <Button
            v-for="size in sizes"
            :key="size"
            :variant="selectedSize === size ? 'default' : 'outline'"
            size="sm"
            @click="selectedSize = size"
          >
            {{ size }}
          </Button>
        </div>

        <!-- Icons -->
        <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          <div
            v-for="icon in filteredIcons"
            :key="icon"
            class="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            @click="copyIconName(icon)"
          >
            <Icon :name="icon" :size="selectedSize" />
            <Text variant="small" class="text-center break-all">{{ icon }}</Text>
          </div>
        </div>
      </Container>
    </main>

    <!-- Copy Notification -->
    <Transition name="fade">
      <div
        v-if="copied"
        class="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg"
      >
        Copied: {{ copiedIcon }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'

const searchQuery = ref('')
const selectedSize = ref<ComponentSize>('md')
const copied = ref(false)
const copiedIcon = ref('')

const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const allIcons = [
  'ChevronDown', 'ChevronRight', 'Check', 'Circle', 'X', 'Menu', 'ArrowRight',
  'Zap', 'Sparkles', 'Lightbulb', 'PenTool', 'Palette', 'Camera', 'Music',
  // ... all 44 icons
]

const filteredIcons = computed(() => {
  if (!searchQuery.value) return allIcons
  return allIcons.filter(icon => 
    icon.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const copyIconName = async (icon: string) => {
  await navigator.clipboard.writeText(`<Icon name="${icon}" />`)
  copiedIcon.value = icon
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### Benefits of This Approach:

1. **Better Organization**: Each component type has its own dedicated space
2. **Easier Navigation**: Dashboard provides quick access to categories
3. **Scalability**: Easy to add new categories or components
4. **Search/Filter**: Each category can have its own search functionality
5. **Progress Tracking**: Visual indicators show completion status
6. **Interactive**: Copy-to-clipboard, size toggles, theme switching
7. **Performance**: Only loads components for the current category

### Implementation Order:

1. Create the main dashboard first
2. As you complete each component category, create its dedicated page
3. Update the dashboard progress indicators
4. Add search/filter functionality per category
5. Include interactive features (copy, theme toggle, etc.)

This approach is much more maintainable and user-friendly than a single massive page!