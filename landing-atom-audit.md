# Landing Page Atom Audit

This document catalogs all atomic UI elements found in the legacy React landing page codebase.

## Form Input Atoms

### 1. Email Input (Newsletter)
- **Location**: `footer-section.tsx` (line 129-133)
- **Component**: `<Input />`
- **Type**: `email`
- **Visual Specifications**:
  - Height: `h-10` (40px)
  - Width: `w-full`
  - Border: `border border-input` (1px, uses CSS variable --input)
  - Border Radius: `rounded-md` (6px)
  - Background: `bg-background` (theme-aware)
  - Padding: `px-3 py-2` (12px horizontal, 8px vertical)
  - Font Size: `text-sm` (14px)
  - Text Color: Default text color (inherits)
  - Placeholder: `placeholder:text-muted-foreground`
  - Focus State: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
  - Disabled State: `disabled:cursor-not-allowed disabled:opacity-50`
  - Placeholder Text: "Enter your email"
  - Additional Classes: `text-sm` override

## Button & Clickable Atoms

### 1. Primary CTA Button (Hero Section)
- **Location**: `hero-section.tsx` (lines 92-111)
- **Component**: `<Button />`
- **Visual Specifications**:
  - Size: `size='lg'`
  - Background: `bg-primary hover:bg-primary/90`
  - Text Color: `text-primary-foreground`
  - Padding: `p-neighbors` (custom spacing)
  - Font Size: `text-golden-2xl`
  - Font Weight: `font-semibold`
  - Border Radius: `rounded-xl` (12px)
  - Shadow: `shadow-lg hover:shadow-xl`
  - Transitions: `transition-all duration-300`
  - Hover Effects: `hover:scale-105 hover:-translate-y-0.5`
  - Focus: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
  - Width: `w-full sm:w-auto`
  - Icon: `<Zap />` icon (h-5 w-5, mr-3)
  - Text: "Start Creating Free"
  - Gradient Overlay: `from-white/20 to-transparent` on hover

### 2. Secondary/Outline Button (Hero Section)
- **Location**: `hero-section.tsx` (lines 113-132)
- **Component**: `<Button />`
- **Visual Specifications**:
  - Size: `size='lg'`
  - Variant: `variant='outline'`
  - Border: `border-border`
  - Background: `hover:bg-accent`
  - Text Color: `hover:text-accent-foreground`
  - Padding: `p-neighbors`
  - Font Size: `text-golden-2xl`
  - Font Weight: `font-semibold`
  - Border Radius: `rounded-xl` (12px)
  - Shadow: `shadow-md hover:shadow-lg`
  - Transitions: `transition-all duration-300`
  - Hover Effects: `hover:scale-105 hover:-translate-y-0.5`
  - Focus: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
  - Width: `w-full sm:w-auto`
  - Icon: `<Sparkles />` icon (h-5 w-5, mr-3)
  - Text: "Explore Examples"

### 3. Newsletter Submit Button
- **Location**: `footer-section.tsx` (lines 134-136)
- **Component**: `<Button />`
- **Visual Specifications**:
  - Size: `size='sm'`
  - Classes: `px-4 whitespace-nowrap`
  - Text: Dynamic from `newsletterContent.buttonText` ("Subscribe")
  - Default button styling applies

### 4. Pricing CTA Button
- **Location**: `pricing-section.tsx` (lines 265-270)
- **Component**: `<Button />`
- **Visual Specifications**:
  - Size: `size='lg'`
  - Width: `w-full`
  - Variant: Dynamic based on `tier.highlighted`
  - Text: Dynamic from `tier.cta`

### 5. Footer Link Buttons
- **Location**: `footer-section.tsx` (multiple instances)
- **Component**: Native `<button>`
- **Visual Specifications**:
  - Font Size: `text-sm` (14px)
  - Text Color: `text-foreground/60 hover:text-foreground`
  - Transitions: `transition-colors duration-200`
  - No background, border, or padding
  - Examples: "Privacy Policy", "Terms of Service", "About Us", etc.

### 6. CTA Section Buttons
- **Location**: `cta-section.tsx` (lines 109-131)
- **Two button variants similar to hero section**:
  - Primary button with gradient overlay
  - Outline button variant

### 7. Social Media Icon Buttons
- **Location**: `footer-section.tsx` (lines 166-171, 182-188)
- **Component**: Native `<button>`
- **Visual Specifications**:
  - Classes: `text-foreground/60 hover:text-primary transition-colors duration-200`
  - Icon wrapper for social media icons
  - Aria-label for accessibility

## Text & Typography Atoms

### 1. Hero Heading (H1)
- **Location**: `hero-section.tsx` (lines 59-72)
- **Visual Specifications**:
  - Tag: `<h1>`
  - Font Weight: `font-black` (900)
  - Line Height: `leading-[1.1]`
  - Letter Spacing: `tracking-tight`
  - Drop Shadow: `drop-shadow-sm`
  - Margin Top: `mt-best-friends` (custom spacing)
  - Font Size (Compact): `text-3xl sm:text-4xl lg:text-5xl`
  - Font Size (Default): `text-golden-4xl sm:text-golden-5xl lg:text-6xl xl:text-7xl`
  - Color Structure:
    - First part: `text-foreground`
    - Second part: `bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent`
  - Text Content: "Where Creative Visions Become Reality"

### 2. Hero Description (Paragraph)
- **Location**: `hero-section.tsx` (lines 75-88)
- **Visual Specifications**:
  - Tag: `<p>`
  - Text Color: `text-muted-foreground`
  - Max Width: `max-w-4xl`
  - Margin: `mx-auto`
  - Line Height: `leading-relaxed`
  - Font Weight: `font-medium`
  - Margin Top: `mt-friends`
  - Font Size (Compact): `text-base sm:text-lg`
  - Font Size (Default): `text-golden-lg sm:text-golden-xl lg:text-golden-2xl`

### 3. Section Heading (H2)
- **Location**: `feature-cards.tsx` (lines 143-153)
- **Visual Specifications**:
  - Tag: `<h2>`
  - Font Weight: `font-black`
  - Text Color: `text-foreground`
  - Line Height: `leading-[1.2]`
  - Letter Spacing: `tracking-tight`
  - Drop Shadow: `drop-shadow-sm`
  - Margin Top: `mt-best-friends`
  - Font Size (Compact): `text-2xl sm:text-3xl lg:text-4xl`
  - Font Size (Default): `text-golden-3xl sm:text-golden-4xl lg:text-golden-5xl xl:text-6xl`

### 4. Section Description
- **Location**: `feature-cards.tsx` (lines 155-161)
- **Visual Specifications**:
  - Tag: `<p>`
  - Text Color: `text-muted-foreground`
  - Max Width: `max-w-4xl mx-auto`
  - Line Height: `leading-relaxed`
  - Font Weight: `font-medium`
  - Margin Top: `mt-friends`
  - Font Size (Compact): `text-base sm:text-lg`
  - Font Size (Default): `text-golden-lg sm:text-golden-xl lg:text-golden-2xl`

### 5. Card Title (H4)
- **Location**: `feature-cards.tsx` (lines 268-273)
- **Visual Specifications**:
  - Tag: `<h4>`
  - Font Size: `text-golden-lg`
  - Font Weight: `font-bold`
  - Text Color: `text-foreground group-hover:text-primary`
  - Transition: `transition-colors duration-300`

### 6. Badge Text (Default Variant)
- **Location**: `badge-variants.ts` (lines 10-28)
- **Component**: `<Badge />`
- **Visual Specifications**:
  - Display: `inline-flex items-center`
  - Border Radius: `rounded-full`
  - Border: `border`
  - Padding: `px-2.5 py-0.5` (10px horizontal, 2px vertical)
  - Font Size: `text-xs` (12px)
  - Font Weight: `font-semibold`
  - Transitions: `transition-colors`
  - Focus: `focus:ring-2 focus:ring-ring focus:ring-offset-2`
  - Default Variant: `border-transparent bg-primary text-primary-foreground hover:bg-primary/80`
  - Secondary Variant: `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`
  - Destructive Variant: `border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80`
  - Outline Variant: `text-foreground` (border visible)

### 7. Enhanced Badge (Landing Page Override)
- **Location**: Multiple landing page instances
- **Visual Override Classes**:
  - Background: `bg-card/95`
  - Text Color: `text-foreground`
  - Border: `border-border`
  - Font Weight: `font-semibold` (reinforced)
  - Backdrop Filter: `backdrop-blur-md`
  - Shadow: `shadow-md hover:shadow-lg`
  - Transition: `transition-shadow duration-300`
  - Font Size: `text-base` (16px - override from xs)
  - Padding: `px-4 py-2` (16px horizontal, 8px vertical - override)

### 8. Footer Heading (H3)
- **Location**: `footer-section.tsx` (multiple instances)
- **Visual Specifications**:
  - Tag: `<h3>`
  - Font Size: `text-sm`
  - Font Weight: `font-semibold`
  - Text Color: `text-foreground`
  - Text Transform: `uppercase`
  - Letter Spacing: `tracking-wider`

### 9. Footer Text
- **Location**: `footer-section.tsx` (multiple instances)
- **Visual Specifications**:
  - Font Size: `text-sm` or `text-xs`
  - Text Color: `text-foreground/60` or `text-foreground/70`
  - Line Height: `leading-relaxed` (for descriptions)
  - Various opacity levels: `/50`, `/60`, `/70`

### 10. Logo Text
- **Location**: `footer-section.tsx` (line 58)
- **Visual Specifications**:
  - Tag: `<span>`
  - Font Size: `text-2xl`
  - Font Weight: `font-bold`
  - Text Color: `gradient-primary-text` (custom gradient class)

### 11. Metric Display Text
- **Location**: `feature-cards.tsx` (lines 209-213)
- **Visual Specifications**:
  - Value: `text-2xl sm:text-3xl font-bold text-foreground`
  - Label: `text-sm font-medium text-muted-foreground`
  - Hover: `group-hover:text-primary` and `group-hover:text-foreground`
  - Transition: `transition-colors duration-300`

### 12. Small Print / Disclaimer
- **Location**: Various locations
- **Visual Specifications**:
  - Font Size: `text-xs`
  - Text Color: `text-muted-foreground` or `text-foreground/50`
  - Examples: Newsletter disclaimer, metric descriptions

### 13. Pricing Tier Title (H3)
- **Location**: `pricing-section.tsx` (line 232)
- **Visual Specifications**:
  - Tag: `<h3>`
  - Font Size: `text-2xl`
  - Font Weight: `font-bold`
  - Text Color: `text-heading-primary`

### 14. Pricing Value Display
- **Location**: `pricing-section.tsx` (line 238)
- **Visual Specifications**:
  - Tag: `<div>`
  - Font Size: `text-4xl`
  - Font Weight: `font-bold`
  - Text Color: `text-heading-primary`

### 15. Large Section Heading (H2 - Alternative Style)
- **Location**: `testimonials-section.tsx` (line 132), `pricing-section.tsx` (line 306)
- **Visual Specifications**:
  - Tag: `<h2>`
  - Font Size: `text-4xl md:text-5xl`
  - Font Weight: `font-black`
  - Text Color: `text-heading-primary`
  - Drop Shadow: `drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]`
  - Line Height: `leading-[1.2]`
  - Letter Spacing: `tracking-tight`
  - Margin Top: `mt-best-friends`

### 16. Screen Reader Only Text
- **Location**: `feature-cards.tsx` (lines 177, 235)
- **Visual Specifications**:
  - Class: `sr-only`
  - Purpose: Accessibility labels for screen readers
  - Examples: "Trust indicators", "Key benefits"

## Additional Atoms Found

### BadgeWithDot Component (Molecule)
- **Location**: `badge-with-dot.tsx`
- **Component**: Custom component combining Badge + Dot
- **Visual Specifications**:
  - Wrapper: `flex items-center justify-center gap-2`
  - Dot: `w-4 h-4 rounded-full animate-pulse bg-primary`
  - Badge: Uses enhanced badge styling (see Enhanced Badge above)
  - Note: This is technically a molecule (Badge + Dot indicator)

### Pulsing Dot Atom
- **Location**: Used within BadgeWithDot
- **Visual Specifications**:
  - Size: `w-4 h-4` (16x16px)
  - Shape: `rounded-full`
  - Background: `bg-primary`
  - Animation: `animate-pulse`
  - Aria: `aria-hidden='true'`

### Icons Used
- **Zap** - Hero primary button (5x5)
- **Sparkles** - Hero secondary button (5x5)
- **Feather** - Footer logo (6x6)
- **Mail** - Footer contact
- **Phone** - Footer contact (4x4)
- **MapPin** - Footer location
- **CheckCircle** - Feature cards
- **ArrowRight** - CTA buttons
- **Star** - Testimonials rating
- Various feature icons: Film, Share2, Globe, Palette, Lightbulb, PenTool, Camera, Music

## Color Variables Referenced
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `accent` / `accent-foreground`
- `background`
- `foreground`
- `muted` / `muted-foreground`
- `card` / `card-foreground`
- `border`
- `input`
- `ring`
- `destructive` / `destructive-foreground`
- `heading-primary` (custom for headings)

## Spacing System
- Custom spacing tokens used:
  - `mt-best-friends`
  - `mt-friends`
  - `mt-acquaintances`
  - `p-neighbors`
  - `gap-friends`
- Golden ratio text sizes:
  - `text-golden-lg`
  - `text-golden-xl`
  - `text-golden-2xl`
  - `text-golden-3xl`
  - `text-golden-4xl`
  - `text-golden-5xl`
  - `text-golden-6xl`
  - `text-golden-7xl`

## Animation & Transitions
- Standard duration: `duration-200`, `duration-300`
- Hover transforms: `hover:scale-105`, `hover:scale-110`
- Hover translate: `hover:-translate-y-0.5`
- Transition types: `transition-all`, `transition-colors`, `transition-transform`, `transition-shadow`, `transition-opacity`
- Animations: `animate-pulse`

## Accessibility Attributes
- `aria-label` - Used extensively on buttons and interactive elements
- `aria-labelledby` - Used to associate sections with their headings
- `aria-hidden` - Used on decorative elements like icons
- `sr-only` - Screen reader only text for additional context