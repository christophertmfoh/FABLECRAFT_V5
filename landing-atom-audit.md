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

### 3. Checkbox (Found in DropdownMenu)
**Base Component**: `<input type="checkbox">`
**Visual Specifications**:
- Container: `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2`
- Font Size: `text-sm`
- Focus: `focus:bg-accent focus:text-accent-foreground`
- Disabled: `data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- Check indicator position: `absolute left-2`

### 4. Radio (Found in DropdownMenu)
**Base Component**: `<input type="radio">`
**Visual Specifications**:
- Container: `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2`
- Font Size: `text-sm`
- Focus: `focus:bg-accent focus:text-accent-foreground`
- Disabled: `data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- Circle indicator position: `absolute left-2`

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

### 4. Dropdown Menu Label
**Base Component**: `<div>` label in dropdown
**Visual Specifications**:
- Padding: `px-2 py-1.5`
- Font Size: `text-sm`
- Font Weight: `font-semibold`
- Inset variant: `pl-8` when `inset` prop is true
- Used as section headers in dropdowns

### 5. Section Label
**Base Component**: `<div>` uppercase label
**Visual Specifications**:
- Font Size: `text-xs`
- Font Weight: `font-semibold`
- Color: `text-muted-foreground`
- Text Transform: `uppercase`
- Letter Spacing: `tracking-wider`
- Margin: `mb-2`
- Used in navigation dropdown sections

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

### 5. Icon Container (Display Box)
**Base Component**: `<div>` wrapper for icons
**Visual Specifications**:
- **Small variant** (Trust Indicators):
  - Size: `w-12 h-12`
  - Background: `bg-primary/10 hover:bg-primary/20`
  - Border Radius: `rounded-xl`
  - Display: `flex items-center justify-center mx-auto`
  - Transitions: `transition-all duration-300`
  - Hover: `group-hover:scale-110 group-hover:rotate-3`
  - Icon inside: `w-6 h-6 text-primary`

- **Large variant** (Process Steps):
  - Container: `w-24 h-24 lg:w-28 lg:h-28`
  - Background: `bg-card/90 backdrop-blur-sm`
  - Border Radius: `rounded-2xl lg:rounded-3xl`
  - Border: `border border-border`
  - Shadow: `shadow-lg`
  - Hover: `group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-3`
  - Inner icon box: `w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 hover:bg-primary/20 rounded-xl lg:rounded-2xl`
  - Icon inside: `w-6 h-6 lg:w-8 lg:h-8 text-primary`

### 6. Step Number Indicator
**Base Component**: `<div>`
**Visual Specifications**:
- Position: `absolute -top-2 -left-2`
- Size: `w-6 h-6`
- Background: `bg-primary`
- Text Color: `text-primary-foreground`
- Shape: `rounded-full`
- Display: `flex items-center justify-center`
- Font: `text-xs font-bold`
- Z-index: `z-20`

### 7. Star Rating
**Base Component**: Array of Star icons
**Visual Specifications**:
- Icon: Lucide `Star`
- Size: `w-5 h-5`
- Fill: `fill-primary`
- Color: `text-primary`
- Container: `flex space-x-1`
- Renders based on rating number (1-5)

## Media & Visual Atoms

### 1. Icon (Base SVG Wrapper)
**Already documented in Display & Feedback Atoms**

### 2. Social Media Icon Button
**Base Component**: `<button>` with icon
**Visual Specifications**:
- Button classes: `text-foreground/60 hover:text-primary transition-colors duration-200`
- Icon inside: `w-4 h-4`
- Group hover support
- Aria-label for accessibility

### 3. Feature Icon Display
**Base Component**: Icon with enhanced container
**Visual Specifications**:
- Uses Icon Container (Display Box) as wrapper
- Icon classes vary by context
- Supports group hover animations
- Always includes `aria-hidden="true"`

### 4. Logo Icon
**Base Component**: Feather icon
**Visual Specifications**:
- Size: `w-6 h-6`
- Color: `text-primary-foreground`
- Used in footer branding

## Progress & Loading Atoms

### 1. Spinner (Loading Indicator)
**Base Component**: `<div>` with CSS animation
**Visual Specifications**:
- Size: `w-8 h-8`
- Border: `border-2 border-primary border-t-transparent`
- Shape: `rounded-full`
- Animation: `animate-spin`
- Center: `mx-auto`

### 2. LoadingFallback Component
**Base Component**: Container with spinner and text
**Visual Specifications**:
- Container: `flex items-center justify-center py-20`
- Inner wrapper: `space-y-4 text-center`
- Contains: Spinner (as above) + Loading text
- Text: `text-sm text-muted-foreground`
- Text content: "Loading content..."

### 3. Hover Progress Effects
**Base Component**: CSS-based visual feedback
**Visual Specifications**:
- Background overlay: `absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100`
- Transition: `transition-opacity duration-500`
- Used on interactive elements to show hover state

### 4. Animated Pulse (BadgeWithDot)
**Base Component**: `<div>` with pulse animation
**Visual Specifications**:
- Size: `w-4 h-4`
- Shape: `rounded-full`
- Background: `bg-primary`
- Animation: `animate-pulse`
- Used alongside badges for attention

## Visual Effects & Overlays

### 1. Gradient Overlay (Glass Effect)
**Base Component**: `<div>` with gradient
**Visual Specifications**:
- Position: `absolute inset-0`
- Background: Various gradients using HSL with opacity
- Example: `linear-gradient(135deg, hsl(var(--orb-primary) / 0.05) 0%, hsl(var(--orb-secondary) / 0.03) 50%, hsl(var(--orb-primary) / 0.02) 100%)`
- Used on cards for visual depth

### 2. Backdrop Blur
**Base Component**: CSS backdrop-filter
**Visual Specifications**:
- Classes: `backdrop-blur-sm`, `backdrop-blur-md`, `backdrop-blur-lg`
- Often combined with semi-transparent backgrounds
- Example: `bg-card/90 backdrop-blur-sm`

### 3. Shadow Effects
**Base Component**: CSS box-shadow
**Visual Specifications**:
- Base: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- Hover states: `hover:shadow-lg`, `hover:shadow-xl`, `hover:shadow-2xl`
- Drop shadows for text: `drop-shadow-sm`, `drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)]`

### 4. Firefly/Spark Effect
**Base Component**: `<div>` with animation
**Visual Specifications**:
- Class: `spark` (with variants `spark-small`, `spark-bright`)
- Container: `idea-sparks`
- Position: Absolute with left percentage
- Animation delay: Inline style with varying delays (0s to 36.1s)
- Creates floating light effect across the page
- Aria-hidden for accessibility

### 5. Progress Line
**Base Component**: `<div>` with gradient
**Visual Specifications**:
- Position: `absolute top-16 left-0 right-0`
- Height: `h-1`
- Background: `bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20`
- Shape: `rounded-full`
- Display: `hidden lg:block`
- Used to connect process steps visually

### 6. Gradient Text Effect
**Base Component**: `<span>` with gradient clip
**Visual Specifications**:
- Background: `bg-gradient-to-r from-primary via-primary/80 to-primary/60`
- Text effect: `bg-clip-text text-transparent`
- Alternative: `from-foreground via-foreground/90 to-foreground/70`
- Used for emphasis in headings

### 7. Avatar/Profile Image Container
**Base Component**: `<div>` with gradient background
**Visual Specifications**:
- Size: `w-10 h-10`
- Background: `bg-gradient-to-br from-primary to-primary/60`
- Shape: `rounded-full`
- Display: `flex items-center justify-center`
- Contains initials or icon

### 8. Surface Elevation Effect
**Base Component**: Class modifier
**Visual Specifications**:
- Class: `surface-elevated`
- Combined with: `backdrop-blur-lg`
- Creates elevated card appearance
- Used on testimonial and pricing cards

### 9. Button Gradient Overlay
**Base Component**: `<div>` overlay
**Visual Specifications**:
- Position: `absolute inset-0`
- Background: `bg-gradient-to-r from-white/20 to-transparent`
- Opacity: `opacity-0 group-hover:opacity-100`
- Transition: `transition-opacity duration-300`
- Shape: Matches button border radius
- Z-index consideration for text visibility

## Status Indicators

### 1. Trust Indicator Card
**Base Component**: Card with icon and metrics
**Visual Specifications**:
- Uses standard Card component
- Contains: Icon Container + Metric Display
- Metric number: `text-2xl sm:text-3xl font-bold text-foreground`
- Metric label: `text-sm font-medium text-muted-foreground`
- Description: `text-xs text-muted-foreground mt-2`
- Hover effects on all text elements

### 2. Process Step Card
**Base Component**: Interactive card with number badge
**Visual Specifications**:
- Contains: Step Number Indicator + Icon Container + Content
- Title: `font-bold text-base lg:text-lg text-foreground`
- Description: `text-sm text-muted-foreground`
- Category badge: Uses standard Badge component
- Group hover effects throughout

### 3. Metric Display Pattern
**Base Component**: Text-based metric display
**Visual Specifications**:
- Value: Large, bold text with hover color change
- Label: Smaller, muted text below
- Pattern used in multiple contexts (trust indicators, pricing, etc.)

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

### 4. Separator/Divider
**Base Component**: `<hr>` or `<div>`
**Visual Specifications**:
- Height: `h-px`
- Background: `bg-muted`
- Margin: `-mx-1 my-1` (in dropdowns)
- Alternative: `border-t border-border` (general use)
- Width: `w-full`

### 5. Dropdown Menu Container
**Base Component**: `<div>` portal
**Visual Specifications**:
- Background: `bg-card/95`
- Backdrop: `backdrop-blur-xl`
- Border: `border border-border`
- Shadow: `shadow-xl`
- Border Radius: `rounded-xl`
- Margin Top: `mt-2`
- Width variants: `w-64` (common)

### 6. Dropdown Menu Item
**Base Component**: `<div>` interactive item
**Visual Specifications**:
- Padding: `py-3 px-4`
- Border Radius: `rounded-lg`
- Cursor: `cursor-pointer`
- Hover: `hover:bg-accent/10`
- Transition: `transition-colors`
- Focus: `focus:bg-accent focus:text-accent-foreground`
- With icon: Icon has `mr-3 h-4 w-4 text-primary`

### 7. Scroll Area
**Base Component**: Custom scrollable container
**Visual Specifications**:
- Max Height: `max-h-96`
- Width: `w-full`
- Type: `always` (always show scrollbar)
- Used in theme toggle dropdown

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

### 3. Logo Container
**Base Component**: `<div>` with gradient
**Visual Specifications**:
- Size: `w-12 h-12`
- Background: `gradient-primary-br` (gradient to bottom-right)
- Border Radius: `rounded-xl`
- Display: `flex items-center justify-center`
- Shadow: `shadow-lg`
- Hover: `group-hover:shadow-xl group-hover:scale-105`
- Transition: `transition-all duration-300`

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
- `hover:rotate-180` (for chevron icons)

## Accessibility Requirements
All interactive atoms must support:
- `aria-label` / `aria-labelledby`
- `aria-describedby`
- `aria-hidden` for decorative elements
- Focus visible states
- Keyboard navigation
- Screen reader announcements
- `sr-only` class for screen reader only content

## Implementation Priority
1. **Core Form**: Input, Label, Button, Checkbox, Radio
2. **Typography**: Heading, Text, Badge, Labels
3. **Display**: Icon, Spinner, Dot, Icon Container
4. **Layout**: Card (with sub-components), Separator, Dropdown components
5. **Enhanced**: GlassCard, GradientButton, Visual Effects
6. **Utility**: VisuallyHidden, Container, Divider, Logo Container

## Animation Atoms

### 1. Spin Animation
**Base Component**: CSS animation class
**Visual Specifications**:
- Class: `animate-spin`
- Used on loading spinners
- Continuous rotation

### 2. Pulse Animation
**Base Component**: CSS animation class
**Visual Specifications**:
- Class: `animate-pulse`
- Used on dots and indicators
- Creates attention-grabbing effect

### 3. Scale Transform
**Base Component**: CSS transform
**Visual Specifications**:
- Base: `scale-100` (implicit)
- Hover: `hover:scale-105`, `hover:scale-110`
- Group hover: `group-hover:scale-105`, `group-hover:scale-110`
- Often combined with transitions

### 4. Translate Transform
**Base Component**: CSS transform
**Visual Specifications**:
- Hover up: `hover:-translate-y-0.5`, `hover:-translate-y-1`, `hover:-translate-y-2`
- Group hover: `group-hover:-translate-y-1`, `group-hover:-translate-y-2`
- Creates lifting effect on hover

### 5. Rotate Transform
**Base Component**: CSS transform
**Visual Specifications**:
- Hover: `hover:rotate-3`, `group-hover:rotate-3`
- Adds playful tilt on interaction
- Often combined with scale

### 6. Transition Timing
**Base Component**: CSS transition
**Visual Specifications**:
- Fast: `duration-200` (200ms)
- Standard: `duration-300` (300ms)
- Slow: `duration-500` (500ms)
- Very slow: `duration-700` (700ms)
- Applied to: `transition-all`, `transition-colors`, `transition-transform`, `transition-opacity`, `transition-shadow`

## Special Visual Patterns

### 1. Group Hover Pattern
**Usage**: Parent-child hover relationships
**Implementation**:
- Parent: `group` class
- Child: `group-hover:*` modifiers
- Enables coordinated hover effects

### 2. Focus Ring Pattern
**Visual Specifications**:
- Classes: `focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2`
- Alternative: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
- Provides keyboard navigation feedback

### 3. Natural Depth Pattern
**Visual Specifications**:
- Class combinations: `natural-depth gentle-hover`
- Creates subtle 3D effect
- Used on cards and interactive elements

### 4. Enhanced Button Pattern
**Visual Specifications**:
- Classes: `btn-enhanced gradient-primary`
- Additional: `shadow-xl hover:shadow-2xl`
- Creates premium button appearance

## Additional Implementation Notes

### Gradient Utilities
The codebase uses several gradient utility classes that should be implemented:
- `gradient-primary`: Primary color gradient
- `gradient-primary-br`: Primary gradient to bottom-right
- `gradient-primary-text`: Gradient text effect

### Dropdown Patterns
Dropdown menus follow a consistent pattern:
- Trigger button with chevron that rotates on hover
- Backdrop blur on the dropdown content
- Section headers with uppercase labels
- Items with icon + text layout
- Hover states on individual items

### Navigation Patterns
Navigation header includes:
- Logo with hover scale effect
- Theme toggle button
- User menu dropdown with sections
- Responsive design considerations

This list represents all unique atoms needed for the landing page implementation. Each component should be built as a reusable Vue component with proper TypeScript types and theme system integration.