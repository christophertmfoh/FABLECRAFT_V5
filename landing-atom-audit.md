# Landing Page Atoms - Consolidated Implementation List

This document contains the complete, deduplicated list of atomic UI elements to be implemented in Nuxt/Vue, organized by atom type. Each atom is listed only once with all its visual specifications from the legacy React codebase.

## Form Input Atoms

### 1. Input
**Base Component**: `<input>`
**Visual Specifications**:
- Height: `h-10` (40px)
- Width: `w-full`
- Border: `border border-input`
- Border Radius: `rounded-md`
- Background: `bg-background`
- Padding: `px-3 py-2`
- Font Size: `text-sm`
- Placeholder: `placeholder:text-muted-foreground`
- Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Disabled: `disabled:cursor-not-allowed disabled:opacity-50`
- File variant: `file:border-0 file:bg-transparent file:text-sm file:font-medium`

**Types to support**: text, email, password, number, tel, url, search, date, time, file

### 2. Label
**Base Component**: `<label>`
**Visual Specifications**:
- Font Size: `text-sm`
- Font Weight: `font-medium`
- Line Height: `leading-none`
- Disabled state: `peer-disabled:cursor-not-allowed peer-disabled:opacity-70`

## Button & Clickable Atoms

### 1. Button
**Base Component**: `<button>` / `<a>` (polymorphic)
**Visual Specifications**:
- Base classes: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`

**Size Variants**:
- `sm`: `h-9 rounded-md px-3`
- `default`: `h-10 px-4 py-2`
- `lg`: `h-11 rounded-md px-8`
- `icon`: `h-10 w-10`

**Style Variants**:
- `default/primary`: `bg-primary text-primary-foreground hover:bg-primary/90`
- `secondary`: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- `destructive`: `bg-destructive text-destructive-foreground hover:bg-destructive/90`
- `outline`: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`
- `ghost`: `hover:bg-accent hover:text-accent-foreground`
- `link`: `text-primary underline-offset-4 hover:underline`

**Special Features**:
- Loading state support
- Icon left/right support
- Full width option
- Polymorphic (can be button, anchor, or router link)

### 2. IconButton
**Base Component**: Button with `size="icon"`
**Visual Specifications**:
- Fixed dimensions: `h-10 w-10`
- Icon centered
- All button variants apply

### 3. GradientButton
**Base Component**: Enhanced Button
**Additional Specifications**:
- Gradient overlay: `bg-gradient-to-r from-white/20 to-transparent`
- Overlay opacity: `opacity-0 group-hover:opacity-100`
- Overlay transition: `transition-opacity duration-300`
- Group hover effects on children

## Text & Typography Atoms

### 1. Heading
**Base Component**: `<h1>` through `<h6>` (polymorphic)
**Visual Specifications**:

**H1 Variant**:
- Font Weight: `font-black`
- Line Height: `leading-[1.1]`
- Letter Spacing: `tracking-tight`
- Drop Shadow: `drop-shadow-sm`
- Responsive sizes:
  - Compact: `text-3xl sm:text-4xl lg:text-5xl`
  - Default: `text-golden-4xl sm:text-golden-5xl lg:text-6xl xl:text-7xl`
- Gradient text support: `bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent`

**H2 Variant**:
- Font Weight: `font-black`
- Line Height: `leading-[1.2]`
- Letter Spacing: `tracking-tight`
- Drop Shadow: `drop-shadow-sm`
- Responsive sizes:
  - Compact: `text-2xl sm:text-3xl lg:text-4xl`
  - Default: `text-golden-3xl sm:text-golden-4xl lg:text-golden-5xl xl:text-6xl`
- Alternative style: `text-4xl md:text-5xl` with enhanced drop shadow

**H3 Variant**:
- Font Size: `text-2xl`
- Font Weight: `font-bold`
- Color: `text-heading-primary`

**H4 Variant**:
- Font Size: `text-golden-lg`
- Font Weight: `font-bold`

**Small Headings (H3 for sections)**:
- Font Size: `text-sm`
- Font Weight: `font-semibold`
- Text Transform: `uppercase`
- Letter Spacing: `tracking-wider`

### 2. Text
**Base Component**: `<p>` / `<span>` (polymorphic)
**Visual Specifications**:

**Body Text**:
- Color: `text-muted-foreground`
- Line Height: `leading-relaxed`
- Font Weight: `font-medium`
- Responsive sizes:
  - Compact: `text-base sm:text-lg`
  - Default: `text-golden-lg sm:text-golden-xl lg:text-golden-2xl`

**Small Text**:
- Font Size: `text-sm` or `text-xs`
- Color variations: `text-foreground/50`, `text-foreground/60`, `text-foreground/70`

**Display Text (Metrics)**:
- Value: `text-2xl sm:text-3xl font-bold`
- Label: `text-sm font-medium text-muted-foreground`

### 3. Badge
**Base Component**: `<div>`
**Visual Specifications**:
- Base classes: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`

**Variants**:
- `default`: `border-transparent bg-primary text-primary-foreground hover:bg-primary/80`
- `secondary`: `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`
- `destructive`: `border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80`
- `outline`: `text-foreground`

**Enhanced Landing Page Style**:
- Override classes: `bg-card/95 text-foreground border-border font-semibold backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300 text-base px-4 py-2`

## Display & Feedback Atoms

### 1. Icon
**Base Component**: SVG icon wrapper
**Visual Specifications**:
- Display: `inline-block shrink-0`
- Sizes: `size-4` (16px), `size-5` (20px), `size-6` (24px)
- Color: `currentColor` by default
- Hover animations: `group-hover:scale-110 transition-transform duration-300`

**Required Icons** (from Lucide):
- Zap, Sparkles, Feather, Mail, Phone, MapPin
- CheckCircle, ArrowRight, Star, Heart
- Film, Share2, Globe, Palette
- Lightbulb, PenTool, Camera, Music
- ChevronDown, User, LogOut, UserCircle
- Loader2 (for loading states)

### 2. Spinner
**Base Component**: Animated icon
**Visual Specifications**:
- Icon: Loader2
- Animation: `animate-spin`
- Sizes: Follow icon sizing system
- Color: `text-current`

### 3. Dot (Pulsing Indicator)
**Base Component**: `<div>`
**Visual Specifications**:
- Size: `w-4 h-4` (can be configurable)
- Shape: `rounded-full`
- Background: `bg-primary`
- Animation: `animate-pulse`
- Aria: `aria-hidden="true"`

### 4. LoadingFallback
**Base Component**: Container with spinner
**Visual Specifications**:
- Container: `space-y-4 text-center`
- Spinner: Size medium
- Text: `text-sm text-muted-foreground`

## Layout & Structure Atoms

### 1. Card
**Base Component**: `<div>`
**Visual Specifications**:
- Base: `rounded-lg border bg-card text-card-foreground shadow-sm`

**Sub-components**:
- **CardHeader**: `flex flex-col space-y-1.5 p-6`
- **CardTitle**: `text-2xl font-semibold leading-none tracking-tight`
- **CardDescription**: `text-sm text-muted-foreground`
- **CardContent**: `p-6 pt-0`
- **CardFooter**: `flex items-center p-6 pt-0`

### 2. GlassCard
**Base Component**: Enhanced Card
**Visual Specifications**:
- Base: `rounded-xl border transition-all duration-300`

**Variants**:
- `light`: `bg-card/95 backdrop-blur-md border-border/30 shadow-md hover:shadow-lg`
- `heavy`: `bg-card/90 backdrop-blur-lg border-border/30 shadow-lg hover:shadow-xl`
- `elevated`: `surface-elevated backdrop-blur-lg border-border/30 shadow-xl hover:shadow-2xl`

**Hover effect option**: `hover:scale-[1.02]`

### 3. Divider
**Base Component**: `<hr>` or `<div>`
**Visual Specifications**:
- Border: `border-t border-border`
- Margin: Configurable
- Width: `w-full`

## Utility Atoms

### 1. VisuallyHidden (Screen Reader Only)
**Base Component**: `<span>`
**Visual Specifications**:
- Class: `sr-only`
- Purpose: Accessibility content

### 2. Container
**Base Component**: `<div>`
**Visual Specifications**:
- Max width variants
- Padding variants
- Centering: `mx-auto`

## Theme System Integration

All atoms must use CSS variables for colors:
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--background` / `--foreground`
- `--muted` / `--muted-foreground`
- `--card` / `--card-foreground`
- `--destructive` / `--destructive-foreground`
- `--border`
- `--input`
- `--ring`
- `--heading-primary` (custom)

## Spacing System
Custom spacing tokens to implement:
- `best-friends`, `friends`, `acquaintances`, `neighbors`
- Golden ratio sizes: `golden-lg` through `golden-7xl`

## Animation Presets
- `transition-colors duration-200`
- `transition-all duration-300`
- `hover:scale-105`
- `hover:-translate-y-0.5`
- `animate-spin`
- `animate-pulse`

## Accessibility Requirements
All interactive atoms must support:
- `aria-label` / `aria-labelledby`
- `aria-describedby`
- `aria-hidden` for decorative elements
- Focus visible states
- Keyboard navigation
- Screen reader announcements

## Implementation Priority
1. **Core Form**: Input, Label, Button
2. **Typography**: Heading, Text, Badge
3. **Display**: Icon, Spinner, Dot
4. **Layout**: Card (with sub-components)
5. **Enhanced**: GlassCard, GradientButton
6. **Utility**: VisuallyHidden, Container, Divider

This list represents all unique atoms needed for the landing page implementation. Each component should be built as a reusable Vue component with proper TypeScript types and theme system integration.