<template>
  <div :class="legalLinksClasses">
    <nav 
      role="navigation" 
      aria-label="Legal information"
    >
      <ul :class="listClasses" role="list">
        <li 
          v-for="(link, index) in links" 
          :key="getKey(link)"
          :class="itemClasses"
        >
          <FooterLink
            :text="getLinkText(link)"
            :href="getLinkHref(link)"
            variant="legal"
            :size="linkSize"
            @click="handleLinkClick"
          />
          
          <!-- Separator between links -->
          <span 
            v-if="showSeparators && index < links.length - 1"
            class="separator"
            aria-hidden="true"
          >
            {{ separator }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Types
type LegalLinkItem = string | { text: string; href?: string; external?: boolean }

// Props interface
interface LegalLinksProps {
  links: LegalLinkItem[]
  layout?: 'horizontal' | 'vertical' | 'stacked'
  separator?: string
  showSeparators?: boolean
  linkSize?: 'sm' | 'md' | 'lg'
  alignment?: 'left' | 'center' | 'right'
  class?: string
}

// Events interface
interface LegalLinksEmits {
  (e: 'link-click', payload: { text: string; href?: string; type: 'legal' }): void
}

// Component setup
const props = withDefaults(defineProps<LegalLinksProps>(), {
  layout: 'horizontal',
  separator: '•',
  showSeparators: true,
  linkSize: 'sm',
  alignment: 'left',
  class: ''
})

const emit = defineEmits<LegalLinksEmits>()

// Helper functions
const getKey = (link: LegalLinkItem): string => {
  return typeof link === 'string' ? link : link.text
}

const getLinkText = (link: LegalLinkItem): string => {
  return typeof link === 'string' ? link : link.text
}

const getLinkHref = (link: LegalLinkItem): string | undefined => {
  return typeof link === 'string' ? undefined : link.href
}

// Computed properties
const legalLinksClasses = computed(() => {
  const alignmentClasses = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right'
  }

  return cn(
    'legal-links',
    'w-full',
    alignmentClasses[props.alignment],
    props.class
  )
})

const listClasses = computed(() => {
  const layoutClasses = {
    horizontal: 'flex flex-row flex-wrap items-center',
    vertical: 'flex flex-col',
    stacked: 'flex flex-col space-y-2'
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return cn(
    'list-none m-0 p-0',
    layoutClasses[props.layout],
    alignmentClasses[props.alignment],
    props.layout === 'horizontal' && 'gap-2',
    props.layout === 'vertical' && 'space-y-1'
  )
})

const itemClasses = computed(() => {
  return cn(
    'flex items-center',
    props.layout === 'horizontal' && 'flex-row',
    props.layout !== 'horizontal' && 'flex-col'
  )
})

// Event handlers
const handleLinkClick = (payload: { text: string; href?: string }) => {
  emit('link-click', {
    text: payload.text,
    href: payload.href,
    type: 'legal'
  })
  
  // Track legal link clicks for compliance
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'legal_link_click', {
      'link_text': payload.text,
      'link_url': payload.href
    })
  }
}
</script>

<style scoped>
/* Legal links container styling */
.legal-links {
  @apply w-full;
}

/* List reset */
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Separator styling */
.separator {
  @apply text-foreground/30 mx-2 select-none;
  font-size: 0.875rem;
}

/* Item styling */
li {
  @apply flex items-center;
}

/* Horizontal layout specific */
.legal-links .flex-row li:not(:last-child) .separator {
  @apply inline;
}

/* Vertical layout - hide separators */
.legal-links .flex-col .separator {
  @apply hidden;
}

/* Responsive behavior */
@media (max-width: 640px) {
  /* Stack horizontally laid out links vertically on small screens */
  .legal-links .flex-row {
    @apply flex-col items-start space-y-1;
  }
  
  /* Hide separators on mobile for horizontal layout */
  .legal-links .flex-row .separator {
    @apply hidden;
  }
  
  /* Adjust alignment on mobile */
  .legal-links.justify-center .flex-col {
    @apply items-center;
  }
}

/* Focus management */
.legal-links:focus-within {
  @apply outline-none;
}

/* Ensure proper spacing for stacked layout */
.legal-links .space-y-2 > li:not(:last-child) {
  margin-bottom: 0.5rem;
}

/* Accessibility improvements */
nav[aria-label="Legal information"] {
  @apply outline-none;
}

/* Color consistency */
.text-foreground\/30 {
  color: hsl(var(--foreground) / 0.3);
}
</style>