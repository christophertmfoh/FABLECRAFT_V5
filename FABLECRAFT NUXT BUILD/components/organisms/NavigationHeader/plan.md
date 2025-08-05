# NavigationHeader Organism - Migration Plan

## Description

**Component Purpose:**
A sticky navigation header that provides primary site navigation, authentication controls, and theme switching. The component adapts its display based on user authentication status and provides contextual navigation options.

**Behavior:**

- Sticky positioning with backdrop blur effect
- Responsive design with mobile-first approach
- Conditional rendering based on authentication state
- Smooth hover transitions and accessibility features
- Dynamic user dropdown with organized sections
- Theme toggle integration

## Implementation Strategy

### Nuxt/Vue Approach vs React Patterns

| React Pattern              | Vue/Nuxt Equivalent               | Rationale                 |
| -------------------------- | --------------------------------- | ------------------------- |
| `useState()`               | `ref()` / `reactive()`            | Vue's reactivity system   |
| `useCallback()`            | `computed()`                      | Cached computed values    |
| `onClick` handlers         | `@click` event handlers           | Vue event syntax          |
| Conditional `&&` rendering | `v-if` / `v-show`                 | Vue's template directives |
| Props destructuring        | `defineProps<T>()`                | Vue 3 Composition API     |
| `React.lazy()`             | Dynamic imports with `<Suspense>` | Nuxt auto-imports         |
| Error boundaries           | `onErrorCaptured()`               | Vue's error handling      |
| `className` prop           | `:class` binding                  | Vue class binding         |

### Key Differences

1. **Auto-imports**: No manual component imports in Nuxt
2. **Composables**: Use `useSupabaseUser()` instead of React context
3. **Routing**: Use `navigateTo()` instead of React Router
4. **SSR-Safe**: Use `useState()` for SSR-compatible state
5. **TypeScript**: Define props with `defineProps<T>()`

## Atoms Required

### ✅ Existing Atoms

- **AtomsButton** (Button.vue) - Primary action buttons
- **AtomsAtomIcon** (AtomIcon.vue) - Lucide icons (Feather, UserCircle, etc.)
- **AtomsDropdownMenu** (DropdownMenu.vue) - Dropdown container
- **AtomsDropdownMenuTrigger** (DropdownMenuTrigger.vue) - Trigger button
- **AtomsDropdownMenuContent** (DropdownMenuContent.vue) - Content wrapper
- **AtomsDropdownMenuItem** (DropdownMenuItem.vue) - Menu items
- **AtomsContainer** (Container.vue) - Layout container

### ❌ Missing Atoms (Need Creation)

1. **ANavigationLogo** - Brand logo with icon and text
   - Props: `onClick?: () => void`
   - Features: Hover animations, accessibility
2. **ANavigationItem** - Individual navigation link
   - Props: `label: string, href?: string, active?: boolean, onClick?: () => void`
   - Features: Active states, hover effects
3. **AThemeToggle** - Theme switching component
   - Props: None (uses useTheme composable)
   - Features: Dropdown with theme options

## Molecules Required

### ❌ Missing Molecules (Need Creation)

1. **MNavigationMenu** - Main navigation links group
   - Composition: 5x ANavigationItem
   - Props: `items: NavigationItem[], onNavigate?: (view: string) => void`
2. **MUserDropdown** - Authenticated user menu
   - Composition: AtomsDropdownMenu + AtomsDropdownMenuItem + AtomsAtomIcon
   - Props: `user: User, onLogout: () => Promise<void>, onNavigate: (view: string) => void`
3. **MAuthButton** - Sign in/up button
   - Composition: AtomsButton + AtomsAtomIcon
   - Props: `text?: string, onClick: () => void`

## Organism Structure

```
ONavigationHeader
├── AtomsContainer (max-w-7xl, padding)
│   └── nav.flex.justify-between
│       ├── ANavigationLogo (brand identity)
│       ├── MNavigationMenu (main nav links) [desktop only]
│       └── div.actions-group
│           ├── MAuthButton | MUserDropdown (conditional)
│           └── AThemeToggle
```

### Responsive Behavior

- **Desktop**: Full navigation menu visible
- **Mobile**: Navigation menu hidden (future: hamburger menu)
- **Sticky**: backdrop-blur, shadow on scroll

## Props & Events

### NavigationHeader Props Interface

```typescript
interface NavigationHeaderProps {
  // Configuration
  showAuthButton?: boolean
  authButtonText?: string
  showNavItems?: boolean

  // User state
  isAuthenticated?: boolean
  user?: {
    username?: string
    email?: string
    id?: string
  } | null

  // Event handlers
  onAuthClick?: () => void
  onLogout?: () => Promise<void>
  onNavigate?: (view: string) => void

  // Styling
  className?: string
}
```

### Emitted Events

```typescript
const emit = defineEmits<{
  'auth:click': []
  'auth:logout': []
  navigate: [view: string]
}>()
```

## State Management

### Local State (ref/reactive)

- Navigation menu visibility (mobile)
- Loading states for logout
- Dropdown open/closed states

### Composables

- `useSupabaseUser()` - User authentication state
- `useTheme()` - Theme management
- `useRouter()` / `navigateTo()` - Navigation

### Pinia (if needed)

- Authentication store for complex auth flows
- Navigation state for multi-step processes

### SSR Considerations

- Use `useState()` for SSR-safe state
- Authentication state from Supabase module
- Theme state from existing useTheme composable

## Accessibility Requirements

1. **Semantic HTML**
   - `<nav>` element with `role="navigation"`
   - `aria-label="Main navigation"`
2. **Keyboard Navigation**
   - Tab order: Logo → Nav items → Auth → Theme
   - Enter/Space for activation
   - Escape to close dropdowns
3. **Screen Readers**
   - `aria-label` for icon buttons
   - `aria-expanded` for dropdown states
   - `aria-current="page"` for active nav items

4. **Focus Management**
   - Visible focus indicators
   - Focus trap in dropdown menus
   - Return focus on dropdown close

## Performance Optimizations

1. **Lazy Loading**
   - Theme toggle dropdown content
   - User dropdown menu items
2. **Event Delegation**
   - Single event handler for navigation items
3. **Computed Properties**
   - Cached class computations
   - Memoized navigation items

## Migration Priority

1. **Phase 1**: Create missing atoms (ANavigationLogo, ANavigationItem, AThemeToggle)
2. **Phase 2**: Build molecules (MNavigationMenu, MUserDropdown, MAuthButton)
3. **Phase 3**: Assemble organism (ONavigationHeader)
4. **Phase 4**: Integration in pages/index.vue
5. **Phase 5**: Testing and refinement

## Technical Notes

- **Backdrop Blur**: Use `backdrop-blur-xl` for modern glass effect
- **Sticky Positioning**: `sticky top-0 z-50` with scroll-based shadow
- **Theme Integration**: Leverage existing CSS custom properties
- **Icon System**: Use Lucide icons via @nuxt/icon
- **Animations**: CSS transitions for hover states and dropdowns
