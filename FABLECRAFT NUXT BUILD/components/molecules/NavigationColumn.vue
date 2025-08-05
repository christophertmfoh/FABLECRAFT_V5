<template>
  <div :class="columnClasses">
    <!-- Column Header -->
    <h3 :class="headerClasses">
      {{ title }}
    </h3>

    <!-- Navigation Links -->
    <nav role="navigation" :aria-label="`${title} navigation`">
      <ul :class="listClasses" role="list">
        <li v-for="link in links" :key="getKey(link)" class="nav-item">
          <FooterLink
            :text="getLinkText(link)"
            :href="getLinkHref(link)"
            @click="handleLinkClick"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Types
type LinkItem = string | { text: string; href?: string; external?: boolean }

// Props interface
interface NavigationColumnProps {
  title: string
  links: LinkItem[]
  variant?: 'default' | 'compact' | 'spaced'
  headerLevel?: 'h2' | 'h3' | 'h4'
  class?: string
}

// Events interface
interface NavigationColumnEmits {
  (e: 'link-click', payload: { text: string; href?: string; category: string }): void
}

// Component setup
const props = withDefaults(defineProps<NavigationColumnProps>(), {
  variant: 'default',
  headerLevel: 'h3',
  class: '',
})

const emit = defineEmits<NavigationColumnEmits>()

// Helper functions
const getKey = (link: LinkItem): string => {
  return typeof link === 'string' ? link : link.text
}

const getLinkText = (link: LinkItem): string => {
  return typeof link === 'string' ? link : link.text
}

const getLinkHref = (link: LinkItem): string | undefined => {
  return typeof link === 'string' ? undefined : link.href
}

// Computed properties
const columnClasses = computed(() => {
  const variantClasses = {
    default: 'space-y-6',
    compact: 'space-y-4',
    spaced: 'space-y-8',
  }

  return cn('navigation-column', variantClasses[props.variant], props.class)
})

const headerClasses = computed(() => {
  return cn('text-sm font-semibold text-foreground uppercase tracking-wider', 'mb-4')
})

const listClasses = computed(() => {
  const variantClasses = {
    default: 'space-y-3',
    compact: 'space-y-2',
    spaced: 'space-y-4',
  }

  return cn('list-none', variantClasses[props.variant])
})

// Event handlers
const handleLinkClick = (payload: { text: string; href?: string }) => {
  emit('link-click', {
    text: payload.text,
    href: payload.href,
    category: props.title,
  })
}
</script>

<style scoped>
/* Navigation column styling */
.navigation-column {
  @apply w-full;
}

/* Remove default list styling */
.nav-item {
  @apply list-none;
}

/* Header styling for accessibility */
h3 {
  @apply text-sm font-semibold text-foreground uppercase tracking-wider;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navigation-column {
    @apply space-y-4;
  }

  h3 {
    @apply text-xs;
  }
}

/* Focus management for keyboard navigation */
.navigation-column:focus-within {
  @apply outline-none;
}

/* Ensure proper contrast for header text */
.text-foreground {
  color: hsl(var(--foreground));
}
</style>
