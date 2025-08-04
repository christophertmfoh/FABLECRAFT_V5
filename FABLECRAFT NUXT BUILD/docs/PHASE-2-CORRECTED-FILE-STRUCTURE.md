# 🚀 PHASE 2: CORRECTED NUXT FILE STRUCTURE
## Based on Actual Project Directory

### 📁 **ACTUAL PROJECT STRUCTURE**

```
FABLECRAFT NUXT BUILD/
├── components/
│   ├── atoms/              # Atomic components (NOT base/)
│   │   ├── Badge.vue       # Already exists (empty)
│   │   ├── Button.vue      # Already exists (empty)
│   │   ├── Card.vue        # Already exists (empty)
│   │   ├── Icon.vue        # Already exists (empty)
│   │   ├── Input.vue       # Already exists (empty)
│   │   └── Utils.ts        # Already exists (empty)
│   ├── effects/            # Visual effects components
│   ├── molecules/          # Composite components
│   └── organisms/          # Complex components
├── composables/            # Vue composables
├── constants/              # Constants and data
├── types/                  # TypeScript types
│   └── index.ts           # Already exists
├── assets/                 # CSS and static assets
│   └── css/
├── plugins/               # Nuxt plugins
└── utils/                 # DOES NOT EXIST - Need to create

```

### 📋 **CORRECTED ATOMS LIST FOR `components/atoms/`**

```
components/
└── atoms/                          # All atomic components go here
    ├── Badge.vue                   # UPDATE existing file
    ├── BadgeWithDot.vue           # NEW
    ├── Button.vue                  # UPDATE existing file
    ├── Card.vue                    # UPDATE existing file
    ├── Divider.vue                # NEW
    ├── GradientButton.vue         # NEW
    ├── Heading.vue                # NEW
    ├── Icon.vue                    # UPDATE existing file
    ├── Input.vue                   # UPDATE existing file
    ├── Label.vue                  # NEW
    ├── Link.vue                   # NEW
    ├── Spinner.vue                # NEW
    ├── Text.vue                   # NEW
    ├── Avatar.vue                 # NEW
    ├── Container.vue              # NEW
    ├── Section.vue                # NEW
    ├── SectionContent.vue         # NEW
    ├── FormMessage.vue            # NEW
    ├── Alert.vue                  # NEW
    ├── Image.vue                  # NEW
    └── Utils.ts                   # UPDATE existing file
```

### 🔧 **UTILITIES STRUCTURE**

Since `utils/` doesn't exist at root level, we have two options:

**Option 1: Create utils directory**
```bash
mkdir utils
```

**Option 2: Use the existing Utils.ts in atoms**
```
components/atoms/Utils.ts  # Contains cn() and other utilities
```

### 📂 **WHERE TO PUT WHAT**

#### **Type Definitions**
```typescript
// types/index.ts (UPDATE existing file)
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'

export interface BaseComponentProps {
  class?: string
  id?: string
}
```

#### **Utility Functions**
```typescript
// components/atoms/Utils.ts (UPDATE existing file)
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### **Composables**
```typescript
// composables/useId.ts (NEW file)
export function useId(prefix = 'fc'): string {
  const instance = getCurrentInstance()
  return `${prefix}-${instance?.uid || Math.random().toString(36).substring(2, 9)}`
}

// composables/useComponentClasses.ts (NEW file)
// composables/useVariants.ts (NEW file)
```

### ⚠️ **IMPORTANT NOTES**

1. **No "Base" prefix** - Components are named simply (Button.vue, not BaseButton.vue)
2. **atoms/ directory** - Not base/ directory
3. **Existing files** - Some atoms already exist but are empty
4. **Auto-imports** - Nuxt auto-imports from `~/components/atoms/`
5. **Utils location** - Utils.ts is in atoms/, not a separate utils/ directory

### 📝 **UPDATED IMPORT EXAMPLES**

```vue
<!-- In any component -->
<template>
  <!-- Auto-imported, no need for explicit imports -->
  <Button variant="primary">Click me</Button>
  <Icon name="Zap" size="md" />
  <Badge variant="success">Active</Badge>
</template>

<script setup lang="ts">
// Import utilities from atoms
import { cn } from '~/components/atoms/Utils'

// Import types
import type { ComponentSize, ComponentVariant } from '~/types'

// Composables are auto-imported
const id = useId('button')
</script>
```

### 🎯 **IMPLEMENTATION ORDER (UPDATED)**

1. **Update types/index.ts** with component types
2. **Update components/atoms/Utils.ts** with utility functions
3. **Create composables** (useId, useComponentClasses, etc.)
4. **Update existing atoms** (Badge, Button, Card, Icon, Input)
5. **Create new atoms** in priority order

This reflects the ACTUAL project structure, not what I assumed before!