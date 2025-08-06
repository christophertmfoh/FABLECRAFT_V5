# Component: OProcessSection

## Purpose

Migrate the ProcessSteps component from React to Nuxt 3, maintaining pixel-perfect visual fidelity to the original 6-stage multimedia production pipeline design. This section showcases FABLECRAFT's creative production workflow from "Ideation & World Building" to "Publishing & Community" with enhanced interactivity and animations.

## Technical Strategy

- **Vue 3 Composition API patterns**: Replace React state with Vue refs/reactive for hover states and intersection observer
- **State management approach**: Local reactive state for step hover interactions and scroll-based reveal animations
- **Event handling migration**: Vue native events for step hover/focus, click interactions, and category badge reveals

## Component Inventory

### Atoms Required ✅

- [x] **APulsingDot** - Status: **existing** (components/atoms/APulsingDot.vue) - _For badge animation_
- [x] **Badge** - Status: **existing** (components/atoms/Badge.vue) - _Main badge + category badges_
- [x] **AtomIcon** - Status: **existing** (components/atoms/AtomIcon.vue) - _Lucide icons_
- [x] **Text** - Status: **existing** (components/atoms/Text.vue) - _All text elements_
- [x] **Heading** - Status: **existing** (components/atoms/Heading.vue) - _Step titles_
- [x] **Container** - Status: **existing** (components/atoms/Container.vue) - _Section wrapper_
- [x] **Section** - Status: **existing** (components/atoms/Section.vue) - _Main section_

### Molecules Required

- [x] **MHeroBadge** - Status: **existing** (components/molecules/MHeroBadge.vue) - _Reuse exact pattern_
- [x] **MHeroHeading** - Status: **existing** (components/molecules/MHeroHeading.vue) - _Reuse exact pattern_
- [ ] **MProcessStepCard** - Status: **create** - _Individual step with icon, content, hover effects_

### Organisms Required

- [ ] **OProcessSection** - Status: **create** - _Main orchestrating component_

## API Design

### OProcessSection Props

```typescript
interface ProcessSectionProps {
  // Header configuration (following MFeatureHeader pattern)
  badgeText?: string // Default: "How It Works"
  title?: string // Default: "Your Complete Creative Production Pipeline"
  highlightText?: string // For gradient highlight in title
  subtitle?: string // Default: "Follow our proven 6-stage multimedia..."

  // Process steps configuration
  steps?: ProcessStep[]
  customSteps?: ProcessStep[] // Allow override of default 6 steps

  // Visual configuration
  variant?: 'default' | 'compact' // Match existing pattern
  showCategoryBadges?: boolean // Control category badge display
  showConnectionLine?: boolean // Desktop gradient connection line
  enableHoverEffects?: boolean // Control interaction animations

  // Badge configuration (consistent with MFeatureHeader)
  badgeVariant?: 'default' | 'accent' | 'secondary' | 'outline'
  badgeSize?: 'sm' | 'base' | 'md' | 'lg'
  badgeDotColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'

  // Heading configuration
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  headingVariant?: 'default' | 'compact' | 'dramatic'
  gradientVariant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'

  // Accessibility
  className?: string
}

interface ProcessStep {
  icon: string // Lucide icon name ('lucide:lightbulb', 'lucide:pen-tool', etc.)
  title: string
  description: string
  detail: string // Hover reveal text
  category?: string // Badge text that appears on hover
}
```

### OProcessSection Emits

```typescript
interface ProcessSectionEmits {
  (e: 'step:hover', stepIndex: number, event: MouseEvent): void
  (e: 'step:click', stepIndex: number, step: ProcessStep, event: MouseEvent): void
  (e: 'step:focus', stepIndex: number, event: FocusEvent): void
  (e: 'badge:click', event: MouseEvent): void
}
```

### OProcessSection Slots

```vue
<!-- Header customization slot -->
<template #header="{ badgeText, title, subtitle }">
  <!-- Custom header override -->
</template>

<!-- Individual step customization -->
<template #step="{ step, index, isHovered }">
  <!-- Custom step card override -->
</template>

<!-- Connection line customization -->
<template #connection-line>
  <!-- Custom connection design -->
</template>
```

## State Architecture

### Local State (ref/reactive)

```typescript
// Step interaction state
const hoveredStepIndex = ref<number | null>(null)
const focusedStepIndex = ref<number | null>(null)
const stepsVisible = ref<boolean[]>([]) // For scroll reveal animation

// Intersection observer state
const sectionRef = ref<HTMLElement>()
const stepRefs = ref<HTMLElement[]>([])
const isInViewport = ref(false)

// Animation state (respecting prefers-reduced-motion)
const animationsEnabled = ref(true)
const revealDelay = ref(0) // Staggered reveal timing
```

### Shared State (composables)

```typescript
// Intersection observer for reveal animations
const { observeElement, unobserveElement } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '-100px 0px',
  onIntersect: handleStepReveal,
})

// Preferred motion for accessibility
const { prefersReducedMotion } = usePreferredReducedMotion()

// Mouse/touch tracking for enhanced hover effects
const { mousePosition } = useMousePosition()
```

### Global State (Pinia stores)

```typescript
// Analytics tracking (if needed)
const analyticsStore = useAnalyticsStore()

// User interaction patterns (for optimization)
const interactionStore = useInteractionStore()
```

## Content Migration

### Exact Content from Original

```typescript
const defaultProcessSteps: ProcessStep[] = [
  {
    icon: 'lucide:lightbulb',
    title: 'Ideation & World Building',
    description: 'From concept to living universes',
    detail:
      'Transform inspiration into rich creative concepts with AI-guided brainstorming and interconnected world creation',
    category: 'Foundation',
  },
  {
    icon: 'lucide:pen-tool',
    title: 'Content Creation',
    description: 'Write across multiple formats',
    detail:
      "Craft novels, screenplays, poetry, and D&D campaigns with AI that understands your world's context",
    category: 'Writing & Scripting',
  },
  {
    icon: 'lucide:palette',
    title: 'Visual Development',
    description: 'From words to visual concepts',
    detail: 'Generate storyboards, concept art, and character designs from your written content',
    category: 'Visual Design',
  },
  {
    icon: 'lucide:camera',
    title: 'Video Production',
    description: 'Bring storyboards to life',
    detail:
      'Create professional pre-vis sequences and generate image-to-video content for demos and productions',
    category: 'Video Production',
  },
  {
    icon: 'lucide:music',
    title: 'Audio & Post-Production',
    description: 'Complete with sound and polish',
    detail:
      'Generate voices, compose scores, and finalize your multimedia projects with professional editing tools',
    category: 'Audio & Finishing',
  },
  {
    icon: 'lucide:share-2',
    title: 'Publishing & Community',
    description: 'Share and collaborate globally',
    detail: 'Publish across platforms, build communities, and collaborate with creators worldwide',
    category: 'Distribution',
  },
]
```

## Implementation Strategy

### Visual Specifications (Exact Migration)

- **Header**: Use existing `MFeatureHeader` pattern with `MHeroBadge` + `MHeroHeading`
- **Badge**: "How It Works" with pulsing primary dot (existing APulsingDot component)
- **Grid Layout**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6` (responsive 1→2→3→6)
- **Connection Line**: `bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20` (desktop only)
- **Step Cards**: `w-24 h-24 lg:w-28 lg:h-28` icon containers with exact hover animations
- **Spacing**: Use existing `grid-normal`, `mt-acquaintances`, `mt-best-friends`, `mt-friends`

### Animation Migration (Exact Replication)

```typescript
// Hover effects (from original)
const stepHoverEffects = {
  container: 'hover:shadow-xl hover:scale-105 hover:-translate-y-2 hover:rotate-3',
  icon: 'hover:bg-primary/20 hover:scale-110',
  title: 'hover:text-primary',
  description: 'hover:text-foreground',
  detail: 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0',
  category: 'opacity-0 group-hover:opacity-100',
}

// Step numbering (exact positioning)
const stepNumberBadge =
  'absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold z-20'
```

### Component Hierarchy

```
OProcessSection (organism)
├── Header Section
│   ├── MHeroBadge (existing molecule) → APulsingDot + Badge
│   └── MHeroHeading (existing molecule) → Heading + Text
├── Connection Line (desktop)
│   └── <div /> (gradient background)
└── Steps Grid
    └── MProcessStepCard × 6 (new molecule)
        ├── Step Number Badge (absolute positioned)
        ├── Icon Container → AtomIcon (existing atom)
        ├── Content Block
        │   ├── Heading (step title)
        │   ├── Text (description)
        │   ├── Text (detail - hover reveal)
        │   └── Badge (category - hover reveal)
        └── Hover/Focus States
```

## CSS Classes Migration

### Custom Spacing (Preserve Exact Classes)

```css
/* Use existing mathematical spacing system */
.mt-best-friends {
  /* existing */
}
.mt-friends {
  /* existing */
}
.mt-acquaintances {
  /* existing */
}
.grid-normal {
  /* existing */
}
.section-spacing-compact {
  /* existing */
}
```

### New Step-Specific Classes

```css
/* Process step hover animations */
.process-step-card {
  @apply transition-all duration-500 cursor-pointer relative group;
  @apply focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2;
}

.process-step-hover {
  @apply group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-3;
}

.process-icon-container {
  @apply w-24 h-24 lg:w-28 lg:h-28 bg-card/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl;
  @apply flex items-center justify-center mx-auto shadow-lg border border-border;
  @apply transition-all duration-500 relative z-10;
}

.process-detail-reveal {
  @apply opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0;
  @apply transition-all duration-500;
}
```

## Quality Checklist

- [ ] **TypeScript**: Complete interface coverage, zero `any` types, strict ProcessStep interface
- [ ] **Accessibility**: WCAG 2.2 AA compliance, step navigation with arrow keys, screen reader support
- [ ] **Performance**: Intersection observer efficiency, `will-change` properties, efficient re-renders
- [ ] **Responsive**: Mobile-first grid system `1→2→3→6`, connection line desktop-only
- [ ] **Animation**: Respect `prefers-reduced-motion`, smooth 60fps hover effects, staggered reveals
- [ ] **Integration**: Seamless with existing theme system, reuse all existing molecules/atoms
- [ ] **Visual Fidelity**: Pixel-perfect match to original React component design

## Integration Points

- **Header Pattern**: Identical to `OFeaturesSection` using `MFeatureHeader` structure
- **Theme System**: Uses existing CSS variables and design tokens
- **Spacing System**: Leverages mathematical spacing (`mt-best-friends`, etc.)
- **Icon System**: AtomIcon with Lucide icon collection
- **Grid System**: Consistent with existing responsive patterns
- **Animation System**: Follows existing transition and transform patterns

## Migration Validation

### Visual Comparison Checklist

- [ ] Badge with pulsing dot matches original positioning and animation
- [ ] Step grid layout responsive behavior identical across breakpoints
- [ ] Icon containers size and styling exactly match original
- [ ] Hover effects: scale, rotation, translation values identical
- [ ] Text hierarchy and spacing match original mathematical system
- [ ] Category badges appear/disappear with same timing
- [ ] Connection line gradient and positioning accurate
- [ ] Step numbering badges positioned and styled correctly
