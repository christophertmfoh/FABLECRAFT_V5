# Features Section Migration Plan

## Description

The Features Section is a prominent landing page component that showcases platform capabilities through trust indicators (statistics) and key benefits. It consists of a header with badge and title, a grid of 4 trust indicator cards with stats, and a grid of 3 benefit cards highlighting core features.

## Visual Elements & Behaviors

- **Header**: Badge with pulsing dot, large golden-ratio typography heading, descriptive subtitle
- **Trust Indicators**: 4 cards in a responsive grid showing platform statistics
- **Key Benefits**: 3 cards highlighting main features with icons and descriptions
- **Interactions**: Hover effects with scale, rotation, and color transitions
- **Responsive**: Mobile (1 col) → Tablet (2 cols) → Desktop (4 cols for indicators, 3 cols for benefits)

## Implementation Strategy: Nuxt/Vue Approach vs React Patterns

### React Patterns to Transform:

- `memo()` → Vue's built-in reactivity (no need for explicit memoization)
- Props interfaces → Vue 3 `defineProps` with TypeScript
- `.map()` renders → `v-for` directives
- `className` → `:class` bindings
- `aria-labelledby` → Same in Vue (accessibility preserved)
- Lucide React icons → Nuxt Icon with Lucide collection

### Vue 3 Advantages to Leverage:

- Composition API for cleaner logic separation
- `v-for` with `:key` for list rendering
- Scoped slots if needed for customization
- Built-in transition system for animations
- Auto-imports for components and composables

## Atoms Required

| Atom            | Status    | Notes                                             |
| --------------- | --------- | ------------------------------------------------- |
| Badge           | ✅ Exists | Located at `components/atoms/Badge.vue`           |
| Card            | ✅ Exists | Located at `components/atoms/Card.vue`            |
| CardTitle       | ✅ Exists | Located at `components/atoms/CardTitle.vue`       |
| CardDescription | ✅ Exists | Located at `components/atoms/CardDescription.vue` |
| APulsingDot     | ✅ Exists | Located at `components/atoms/APulsingDot.vue`     |
| Heading         | ✅ Exists | Located at `components/atoms/Heading.vue`         |
| Text            | ✅ Exists | Located at `components/atoms/Text.vue`            |
| IconContainer   | ✅ Exists | Located at `components/atoms/IconContainer.vue`   |

## Molecules Required

| Molecule            | Status            | Notes                                      |
| ------------------- | ----------------- | ------------------------------------------ |
| MTrustIndicatorCard | ❌ Needs Creation | Stat card with icon, number, label         |
| MBenefitCard        | ❌ Needs Creation | Feature card with icon, title, description |
| MFeatureHeader      | ❌ Needs Creation | Section header with badge, title, subtitle |

## Organism Structure

```
OFeaturesSection
├── MFeatureHeader
│   ├── div.flex (badge container)
│   │   ├── APulsingDot
│   │   └── Badge
│   ├── Heading (h2)
│   └── Text (p.description)
├── div.grid (trust indicators)
│   └── MTrustIndicatorCard (v-for × 4)
│       ├── Card
│       ├── IconContainer
│       ├── Text (number)
│       └── Text (label)
└── div.grid (key benefits)
    └── MBenefitCard (v-for × 3)
        ├── IconContainer
        ├── Heading (h4)
        ├── Badge (optional category)
        └── Text (description)
```

## Props & Events

```typescript
interface FeaturesSectionProps {
  variant?: 'default' | 'compact' | 'detailed'
  showTrustIndicators?: boolean
  showKeyBenefits?: boolean
  customTrustIndicators?: TrustIndicator[]
  customKeyBenefits?: KeyBenefit[]
  class?: string
}

interface TrustIndicator {
  number: string
  label: string
  icon: string // Icon name for Nuxt Icon
  description?: string
}

interface KeyBenefit {
  icon: string // Icon name for Nuxt Icon
  title: string
  description: string
  category?: string
}

// No events emitted by this component
```

## State Management

- **Local State Only**: No global state needed
- **Props**: Configuration passed from parent
- **Reactive Data**: Trust indicators and benefits arrays
- **No Composables Needed**: Self-contained component

## Design Tokens & Styling

### Spacing System (from old build):

- Section spacing: `section-spacing-compact` (64px)
- Grid gaps: `grid-normal` (24px)
- Friendship levels: `mt-best-friends`, `mt-friends`, `mt-acquaintances`
- Component padding: `p-comfortable` (24px)

### Typography:

- Heading: `text-golden-3xl` to `text-golden-5xl` (responsive)
- Subtitle: `text-golden-lg` to `text-golden-2xl` (responsive)
- Card text uses standard text sizes

### Effects & Animations:

- `natural-depth`: Subtle card depth effect
- `gentle-hover`: Lift on hover with shadow
- Scale and rotate transforms on hover
- Transition duration: 300-500ms

### Colors (theme-aware):

- Background: `bg-card`, `bg-accent/50`
- Text: `text-foreground`, `text-muted-foreground`
- Primary accents: `bg-primary/10`, `text-primary`
- Borders: `border-border`, `hover:border-primary/50`

## Accessibility Requirements

- Semantic HTML: `<section>`, `<h2>`, `<h3>`, `<h4>`
- ARIA labels: `aria-labelledby` for section and cards
- ARIA descriptions: `aria-describedby` for benefit cards
- Screen reader only headings for subsections
- Focus states: Ring utilities for keyboard navigation
- Minimum touch targets: 44px for interactive elements

## Implementation Order

1. Create `MFeatureHeader` molecule
2. Create `MTrustIndicatorCard` molecule
3. Create `MBenefitCard` molecule
4. Build `OFeaturesSection` organism
5. Integrate into `pages/index.vue`
6. Test responsive breakpoints
7. Verify accessibility
8. Add visual effects and animations
