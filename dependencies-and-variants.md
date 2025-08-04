# Dependencies and Component Variants for Nuxt Build

## Required Dependencies to Install

### Core UI Dependencies
```bash
pnpm add @iconify-json/lucide  # For Lucide icons with @nuxt/icon
pnpm add class-variance-authority  # For managing component variants
pnpm add @vueuse/motion  # For animations (optional, can use CSS)
pnpm add @headlessui/vue  # For accessible dropdown menus
```

### Already Installed in Nuxt Build
- ✅ `clsx` - Class name utility
- ✅ `tailwind-merge` - Tailwind class merging
- ✅ `@nuxt/icon` - Icon system
- ✅ `@vueuse/core` & `@vueuse/nuxt` - Vue composables
- ✅ `@nuxtjs/tailwindcss` - Tailwind CSS

### Additional CSS Dependencies
```bash
pnpm add tailwindcss-animate  # For animation utilities
```

## Component Variants Needed

### 1. Button Component (Multiple Variants)
```typescript
// Button variants needed:
variants: {
  variant: {
    default: 'primary style',
    secondary: 'secondary style',
    destructive: 'danger/delete style',
    outline: 'bordered style',
    ghost: 'minimal hover style',
    link: 'text link style'
  },
  size: {
    sm: 'small - h-9 px-3',
    default: 'medium - h-10 px-4',
    lg: 'large - h-11 px-8',
    icon: 'square icon - h-10 w-10'
  }
}
```

### 2. Card Component (Is it Atom or Molecule?)
**Answer**: Card is technically a **molecule** because it's composed of multiple atoms:
- Card container (atom)
- CardHeader (atom)
- CardTitle (atom)
- CardDescription (atom)
- CardContent (atom)
- CardFooter (atom)

But we implement them as a card "system" of related atoms.

### 3. GlassCard Variants
```typescript
variants: {
  variant: {
    light: '95% opacity, medium blur',
    heavy: '90% opacity, large blur',
    elevated: 'elevated with xl blur'
  }
}
```

### 4. Badge Variants
```typescript
variants: {
  variant: {
    default: 'primary colors',
    secondary: 'secondary colors',
    destructive: 'danger colors',
    outline: 'bordered style'
  }
}
// Plus enhanced landing style with backdrop blur
```

### 5. Input Types (Not Variants, Different Types)
```typescript
types: [
  'text',
  'email',
  'password',
  'number',
  'tel',
  'url',
  'search',
  'date',
  'time',
  'file'
]
```

### 6. Icon Sizes (Through Icon Component)
```typescript
sizes: {
  xs: 'w-3 h-3',    // 12px
  sm: 'w-4 h-4',    // 16px
  md: 'w-5 h-5',    // 20px
  lg: 'w-6 h-6',    // 24px
  xl: 'w-8 h-8',    // 32px
  '2xl': 'w-10 h-10' // 40px
}
```

### 7. Container/Section Variants
```typescript
// Container widths
widths: {
  default: 'max-w-7xl',
  narrow: 'max-w-5xl',
  wide: 'max-w-screen-2xl',
  full: 'w-full'
}

// Section spacing
spacing: {
  default: 'section-spacing',      // 128px
  hero: 'section-spacing-hero',    // 96px
  compact: 'section-spacing-compact', // 64px
  custom: 'no spacing class'
}
```

### 8. Heading Levels & Sizes
```typescript
// Polymorphic h1-h6
levels: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// Size variants
sizes: {
  display: 'text-golden-4xl sm:text-golden-5xl lg:text-6xl xl:text-7xl',
  h1: 'text-golden-3xl sm:text-golden-4xl lg:text-golden-5xl xl:text-6xl',
  h2: 'text-golden-2xl sm:text-golden-3xl lg:text-golden-4xl',
  h3: 'text-2xl',
  h4: 'text-golden-lg',
  compact: 'text-3xl sm:text-4xl lg:text-5xl'
}
```

### 9. Avatar Sizes
```typescript
sizes: {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
}
```

### 10. IconContainer/IconBox Sizes
```typescript
sizes: {
  sm: 'w-12 h-12',  // Trust indicators
  md: 'w-16 h-16',  // Feature cards
  lg: 'w-24 h-24',  // Process steps
  xl: 'w-28 h-28'   // Large process steps
}
```

## Multiple Instances Needed

### Icons (30 unique icons)
Each icon is used through the single Icon component, but we need all 30 Lucide icons available.

### Dropdown Menu Components
The dropdown system needs 8 related components that work together:
- DropdownMenu (root)
- DropdownMenuTrigger
- DropdownMenuContent
- DropdownMenuItem
- DropdownMenuLabel
- DropdownMenuSeparator
- DropdownMenuCheckboxItem
- DropdownMenuRadioItem

### Form Components
Multiple related atoms for forms:
- Input (with 10 types)
- Label
- FormMessage (error/helper variants)
- Checkbox
- Radio

## Architecture Decisions

### What's an Atom vs Molecule?

**Atoms** (indivisible):
- Button
- Input
- Icon
- Badge
- Label
- Spinner

**Molecules** (composed of atoms):
- Card (container + header + content + footer)
- BadgeWithDot (badge + dot)
- FeatureListItem (icon + text)
- NavigationLogo (container + icon + text)
- NewsletterForm (input + button)

**Organisms** (composed of molecules):
- NavigationHeader
- HeroSection
- PricingSection
- FooterSection

### Implementation Strategy

1. **Use CVA (class-variance-authority)** for components with multiple variants
2. **Create component systems** (like Card) where related atoms work together
3. **Use polymorphic components** where needed (Button as button/link, Heading as h1-h6)
4. **Keep atoms pure** - they should not contain other atoms (except Icon which is special)
5. **Use composition** for molecules - combine atoms to create more complex components

## Tailwind Config Updates Needed

```javascript
// tailwind.config.ts additions
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Add more animations as needed
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'), // After installing
  ]
}
```