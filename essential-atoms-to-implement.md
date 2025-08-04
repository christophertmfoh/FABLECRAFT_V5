# Essential Atoms to Implement for Molecules/Organisms

This is the prioritized, deduplicated list of actual Vue components needed to build all molecules and organisms for the landing page.

## Priority 1: Core Interactive Components

### 1. Button Component
- **File**: `components/atoms/Button.vue`
- **Variants**: primary, secondary, destructive, outline, ghost, link
- **Sizes**: sm, default, lg, icon
- **Features**: Loading state, icon support, polymorphic (button/link)

### 2. Icon Component  
- **File**: `components/atoms/Icon.vue`
- **Library**: @nuxt/icon with Lucide icons
- **Required Icons**: Zap, Sparkles, Feather, Mail, Phone, MapPin, CheckCircle, ArrowRight, Star, Heart, Film, Share2, Globe, Palette, Lightbulb, PenTool, Camera, Music, ChevronDown, User, LogOut, UserCircle, Loader2, Check, Circle, AlertTriangle, RefreshCw, Home, BookOpen, Users, ChevronRight, Download, X

### 3. Input Component
- **File**: `components/atoms/Input.vue`
- **Types**: text, email, password, number, tel, url, search, date, time, file
- **Features**: Error state, disabled state, v-model support

### 4. Badge Component
- **File**: `components/atoms/Badge.vue`
- **Variants**: default, primary, secondary, destructive, outline
- **Special**: Enhanced landing page style with backdrop blur

### 5. Spinner Component
- **File**: `components/atoms/Spinner.vue`
- **Icon**: Loader2 with animate-spin
- **Sizes**: Follows icon sizing system

## Priority 2: Layout Components

### 6. Card Component
- **File**: `components/atoms/Card.vue`
- **Sub-components**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Base styling**: Rounded corners, border, shadow

### 7. GlassCard Component
- **File**: `components/atoms/GlassCard.vue`
- **Variants**: light (95% opacity), heavy (90% opacity), elevated
- **Features**: Backdrop blur, hover effects

### 8. Container Component
- **File**: `components/atoms/Container.vue`
- **Width variants**: default (max-w-7xl), narrow (max-w-5xl), wide (max-w-screen-2xl), full
- **Padding variants**: default, loose, tight, none
- **Features**: Responsive padding, auto-centering

### 9. Section Component
- **File**: `components/atoms/Section.vue`
- **Spacing variants**: default, hero, compact, custom
- **Features**: Polymorphic (section/div/article/main)

## Priority 3: Typography Components

### 10. Heading Component
- **File**: `components/atoms/Heading.vue`
- **Levels**: h1-h6 (polymorphic)
- **Sizes**: Responsive with golden ratio
- **Features**: Gradient text support, drop shadows

### 11. Text Component
- **File**: `components/atoms/Text.vue`
- **Elements**: p, span (polymorphic)
- **Sizes**: Body, small, display
- **Features**: Muted colors, responsive sizing

### 12. Label Component
- **File**: `components/atoms/Label.vue`
- **Features**: For attribute, peer-disabled styling

## Priority 4: Specialized Components

### 13. GradientButton Component
- **File**: `components/atoms/GradientButton.vue`
- **Extends**: Button with gradient overlay
- **Features**: Customizable gradient colors

### 14. BadgeWithDot Component
- **File**: `components/atoms/BadgeWithDot.vue`
- **Features**: Badge with animated pulsing dot

### 15. Separator Component
- **File**: `components/atoms/Separator.vue`
- **Orientations**: horizontal, vertical
- **Styling**: Border or background

### 16. LoadingFallback Component
- **File**: `components/atoms/LoadingFallback.vue`
- **Features**: Centered spinner with loading text

### 17. IconContainer Component
- **File**: `components/atoms/IconContainer.vue`
- **Sizes**: Small (trust indicators), Large (process steps)
- **Features**: Background, hover effects, icon centering

### 18. ScrollArea Component
- **File**: `components/atoms/ScrollArea.vue`
- **Features**: Custom scrollbar, max-height control

## Priority 5: Form Helper Components

### 19. Checkbox Component
- **File**: `components/atoms/Checkbox.vue`
- **Features**: Custom styling, checked indicator

### 20. Radio Component
- **File**: `components/atoms/Radio.vue`
- **Features**: Custom styling, selected indicator

### 21. FormMessage Component
- **File**: `components/atoms/FormMessage.vue`
- **Types**: error, helper
- **Features**: Icon support, ARIA attributes

## Priority 6: Special Effect Components

### 22. Dot Component (Pulsing Indicator)
- **File**: `components/atoms/Dot.vue`
- **Features**: Animated pulse, configurable size/color

### 23. StarRating Component
- **File**: `components/atoms/StarRating.vue`
- **Features**: 1-5 star display, filled stars

### 24. StepNumber Component
- **File**: `components/atoms/StepNumber.vue`
- **Features**: Circular badge with number

### 25. VisuallyHidden Component
- **File**: `components/atoms/VisuallyHidden.vue`
- **Features**: Screen reader only content

## Components NOT Needed (Use Tailwind/CSS)

❌ The following are NOT components, just CSS classes:
- Min/Max height/width utilities
- Padding/Margin utilities  
- Border utilities
- Shadow utilities
- Text sizing/weight/spacing
- Flexbox/Grid utilities
- Transform/Transition utilities
- Cursor/Selection utilities
- Z-index utilities
- Opacity utilities

## Implementation Notes

1. **All components must**:
   - Use theme CSS variables (no hardcoded colors)
   - Be SSR-safe for Nuxt
   - Support v-model where applicable
   - Include proper TypeScript types
   - Have accessibility attributes

2. **Import existing utilities**:
   - Use `cn()` from Utils.ts for class merging
   - Use `useComponentId()` for unique IDs
   - Use `useComponentClasses()` for variant styling

3. **Follow Nuxt/Vue patterns**:
   - Use `<script setup>` syntax
   - Implement with Composition API
   - No React patterns (useEffect, useState, etc.)

4. **Testing approach**:
   - Add all components to main index page
   - Group by category for easy testing
   - Show all variants and states