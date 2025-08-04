# Priority 7 Dropdown Components Implementation Plan

## Overview
Priority 7 includes 8 compound dropdown menu components that work together to create accessible, feature-rich dropdown menus.

## Components to Implement

### 1. DropdownMenu (Root)
- **Purpose**: Root container providing context
- **Key Features**:
  - Context provider for child components
  - Controls open/close state
  - Manages focus restoration
  - Handles outside clicks

### 2. DropdownMenuTrigger
- **Purpose**: Button that toggles dropdown
- **Key Features**:
  - aria-expanded attribute
  - Keyboard activation (Enter/Space)
  - Focus management
  - Forwards ref to button

### 3. DropdownMenuContent
- **Purpose**: Dropdown panel container
- **Key Features**:
  - Focus trap when open
  - Escape key handling
  - Animation support
  - Positioning (via floating-ui)
  - Portal/Teleport support

### 4. DropdownMenuItem
- **Purpose**: Individual clickable item
- **Key Features**:
  - Keyboard navigation
  - Hover states
  - Click handling
  - Disabled state support

### 5. DropdownMenuLabel
- **Purpose**: Non-interactive section label
- **Key Features**:
  - Semantic heading
  - Not focusable
  - Visual distinction

### 6. DropdownMenuSeparator
- **Purpose**: Visual divider
- **Key Features**:
  - Semantic separator
  - Not focusable
  - Proper ARIA role

### 7. DropdownMenuCheckboxItem
- **Purpose**: Checkbox menu item
- **Key Features**:
  - Toggle state
  - Checkbox indicator
  - Space key toggle
  - aria-checked

### 8. DropdownMenuRadioItem
- **Purpose**: Radio menu item
- **Key Features**:
  - Single selection within group
  - Radio indicator
  - aria-checked
  - Role radiogroup

## Technical Architecture

### Context Pattern
```typescript
interface DropdownMenuContext {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  triggerId: string
  contentId: string
}
```

### Keyboard Navigation
- Tab: Move focus in/out
- Arrow Up/Down: Navigate items
- Arrow Left/Right: Navigate submenus
- Enter/Space: Activate item
- Escape: Close menu
- Home/End: First/last item

### Accessibility Requirements
- ARIA roles and properties
- Focus management
- Screen reader announcements
- Keyboard navigation
- High contrast support

### Implementation Order
1. DropdownMenu (context provider)
2. DropdownMenuTrigger
3. DropdownMenuContent
4. DropdownMenuItem
5. DropdownMenuSeparator
6. DropdownMenuLabel
7. DropdownMenuCheckboxItem
8. DropdownMenuRadioItem

## Best Practices
- Use semantic HTML where possible
- Implement roving tabindex for items
- Ensure proper focus restoration
- Support RTL layouts
- Test with screen readers
- Follow WAI-ARIA menu pattern