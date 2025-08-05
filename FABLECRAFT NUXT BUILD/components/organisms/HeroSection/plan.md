# Hero Section Migration Plan - React to Nuxt 3

## 📋 **Description**

The Hero Section is the primary landing area that introduces Fablecraft as an "End-to-End Creative Production Suite". It serves as the main conversion point with two call-to-action buttons and establishes the visual hierarchy for the entire landing page.

### **Component Purpose:**

- **Primary Goal**: Convert visitors into users with compelling value proposition
- **Visual Impact**: Create immediate brand recognition and trust
- **User Actions**: Drive users to "Start Creating Free" or "Explore Examples"
- **Accessibility**: Ensure screen reader compatibility and keyboard navigation

### **Current Behavior (React Version):**

- Responsive design across mobile, tablet, and desktop
- Animated gradient text effect on main heading
- Hover animations on buttons with scale and shadow effects
- Theme-aware styling with mathematical spacing system
- SEO-optimized semantic HTML structure

## 🏗️ **Implementation Strategy: Nuxt/Vue vs React Patterns**

### **Migration Approach:**

1. **Composition API Over Options API**: Use `<script setup>` for modern Vue 3 patterns
2. **Reactive Data**: Convert React state to Vue 3 refs and reactive objects
3. **Event Handling**: Replace React onClick with Vue @click patterns
4. **Styling**: Migrate custom CSS classes to Nuxt-compatible design system
5. **Icons**: Use Nuxt Icon module with Lucide icons (already configured)
6. **Accessibility**: Maintain ARIA patterns with Vue 3 syntax

### **Key Differences:**

| React Pattern         | Nuxt/Vue Pattern               |
| --------------------- | ------------------------------ |
| `onClick={handler}`   | `@click="handler"`             |
| `className={cn(...)}` | `:class="computedClasses"`     |
| `interface Props`     | `defineProps<Interface>()`     |
| `React.useState()`    | `ref()` / `reactive()`         |
| `useCallback()`       | `computed()` for derived state |

## 🔧 **Atoms Required**

### **✅ Existing Atoms (Confirmed):**

- `Button.vue` - Core button component with CVA variants
- `AtomIcon.vue` - Icon wrapper for Lucide icons
- `Container.vue` - Responsive container with size variants
- `Badge.vue` - Badge component for styling
- `Text.vue` - Typography component

### **🚀 New Atoms Needed:**

#### **🔸 APulsingDot.vue**

- **Purpose**: Animated dot for badge component
- **Functionality**: CSS-based pulse animation with theme colors
- **Props**: `size`, `color`, `className`
- **Status**: Needs creation

#### **🔸 AGradientText.vue**

- **Purpose**: Themed gradient text effects
- **Functionality**: CSS gradient with theme variable integration
- **Props**: `text`, `variant`, `className`
- **Status**: Needs creation

## 🧬 **Molecules Required**

### **✅ Existing Molecules:**

- None directly applicable

### **🚀 New Molecules Needed:**

#### **🔸 MHeroBadge.vue**

- **Purpose**: Badge with animated pulsing dot
- **Composition**: `APulsingDot` + `Badge`
- **Props**: `text`, `variant`, `className`
- **Status**: Needs creation

#### **🔸 MHeroHeading.vue**

- **Purpose**: Main hero heading with gradient text
- **Composition**: `AGradientText` + semantic heading structure
- **Props**: `title`, `highlightText`, `variant`, `className`
- **Status**: Needs creation

#### **🔸 MHeroActions.vue**

- **Purpose**: Action button group with proper spacing
- **Composition**: Two `Button` components with responsive layout
- **Props**: `primaryText`, `secondaryText`, `onPrimaryClick`, `onSecondaryClick`
- **Status**: Needs creation

## 🦕 **Organism Structure**

### **🔸 OHeroSection.vue**

- **Composition Tree**:
  ```
  OHeroSection
  ├── Container
  │   └── div.hero-content
  │       ├── MHeroBadge
  │       ├── MHeroHeading
  │       ├── Text (description)
  │       └── MHeroActions
  ```

### **Responsive Behavior**:

- **Mobile**: Single column, centered text, stacked buttons
- **Tablet**: Larger typography, side-by-side buttons
- **Desktop**: Maximum impact typography, enhanced animations

## 📡 **Props & Events API Design**

### **Props Interface:**

```typescript
interface HeroSectionProps {
  className?: string
  variant?: 'default' | 'compact'
  badge?: {
    text: string
    variant?: 'default' | 'accent'
  }
  heading?: {
    title: string
    highlight: string
  }
  description?: string
  actions?: {
    primary: {
      text: string
      icon?: string
    }
    secondary: {
      text: string
      icon?: string
    }
  }
}
```

### **Events Interface:**

```typescript
interface HeroSectionEmits {
  (e: 'primary:click'): void
  (e: 'secondary:click'): void
  (e: 'badge:click'): void
}
```

## 🗄️ **State Management Strategy**

### **Local State (Preferred)**

- **Hover States**: Button and text hover effects
- **Animation States**: CSS-based animations managed locally
- **Responsive State**: CSS-based responsive design

### **Composables Usage**

- **`useTheme()`**: Access current theme for dynamic styling
- **`useDevice()`**: Device detection for responsive behavior (if needed)

### **Global State (Pinia)**

- **Not Required**: Hero section is presentational with minimal state needs
- **Future Consideration**: User authentication state for button variants

## 🎨 **Styling Strategy**

### **Design Token Integration**

- **Spacing**: Use existing mathematical spacing system (friends, acquaintances, etc.)
- **Typography**: Implement golden ratio typography classes
- **Colors**: Leverage CSS custom properties for theme integration
- **Animations**: CSS-based hover and transition effects

### **CSS Structure**

```css
/* Component-scoped styles */
.hero-section {
  /* Mathematical spacing */
  @apply section-spacing-hero;
}

.hero-content {
  /* Golden ratio typography */
  @apply text-center heading-group max-w-5xl mx-auto;
}

.hero-glow {
  /* Theme-aware background effects */
  @apply hero-ambient-glow;
}
```

## ♿ **Accessibility Requirements**

### **Semantic HTML**

- `<section>` with `role="banner"`
- `<h1>` for main heading with proper `id`
- `aria-labelledby` connections
- `aria-describedby` for descriptions

### **Keyboard Navigation**

- Tab order: Badge → Primary Button → Secondary Button
- Focus management with visible focus indicators
- Escape key handling (if applicable)

### **Screen Reader Support**

- `aria-label` attributes for icon buttons
- `aria-hidden="true"` for decorative elements
- Descriptive button text beyond "click here"

## 🧪 **Testing Strategy**

### **Unit Tests**

- Component prop validation
- Event emission verification
- Accessibility compliance
- Responsive class application

### **Integration Tests**

- Parent-child component communication
- Theme switching behavior
- Button click navigation

### **Visual Regression Tests**

- Cross-browser compatibility
- Responsive breakpoint behavior
- Animation performance

## 🚀 **Implementation Phases**

### **Phase 1: Atoms (Priority: High)**

1. Create `APulsingDot.vue`
2. Create `AGradientText.vue`
3. Test atomic components in isolation

### **Phase 2: Molecules (Priority: High)**

1. Create `MHeroBadge.vue`
2. Create `MHeroHeading.vue`
3. Create `MHeroActions.vue`
4. Integration testing

### **Phase 3: Organism (Priority: High)**

1. Create `OHeroSection.vue`
2. Implement responsive behavior
3. Accessibility compliance verification

### **Phase 4: Integration (Priority: Medium)**

1. Add to `pages/index.vue`
2. Connect event handlers
3. Final testing and refinement

## 📚 **Research References**

### **Nuxt 3 Best Practices**

- [Nuxt 3 Component Architecture](https://nuxt.com/docs/guide/directory-structure/components)
- [Vue 3 Composition API Guide](https://vuejs.org/guide/typescript/composition-api.html)
- [Accessibility in Vue](https://vuejs.org/guide/best-practices/accessibility.html)

### **Atomic Design Resources**

- [Brad Frost's Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)
- [Component-Driven Development](https://www.componentdriven.org/)

### **Performance Considerations**

- [Vue 3 Performance Best Practices](https://vuejs.org/guide/best-practices/performance.html)
- [Nuxt 3 Bundle Analysis](https://nuxt.com/docs/guide/deploy/performance)

---

## ✅ **Success Criteria**

1. **Visual Parity**: 100% visual match with React version
2. **Performance**: Bundle size ≤ React version
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Responsive**: Works perfectly on all device sizes
5. **Theme Integration**: Seamless theme switching
6. **Code Quality**: TypeScript strict mode, zero linting errors

**Estimated Development Time**: 8-12 hours
**Risk Level**: Low-Medium (well-defined scope, existing patterns)
