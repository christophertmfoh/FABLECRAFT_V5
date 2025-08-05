<template>
  <div :class="legalLinksClasses" :data-layout="layout">
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
  color: hsl(var(--foreground) / 0.3);
  margin: 0 0.5rem;
  user-select: none;
  font-size: 0.875rem;
}

/* Item styling */
li {
  display: flex;
  align-items: center;
}

/* Horizontal layout specific */
.legal-links[data-layout="horizontal"] li:not(:last-child) .separator {
  display: inline;
}

/* Vertical layout - hide separators */
.legal-links[data-layout="vertical"] .separator,
.legal-links[data-layout="stacked"] .separator {
  display: none;
}

/* Responsive behavior */
@media (max-width: 640px) {
  /* Stack horizontally laid out links vertically on small screens */
  .legal-links[data-layout="horizontal"] ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  /* Hide separators on mobile for horizontal layout */
  .legal-links[data-layout="horizontal"] .separator {
    display: none;
  }
  
  /* Adjust alignment on mobile */
  .legal-links.justify-center[data-layout="vertical"] ul,
  .legal-links.justify-center[data-layout="stacked"] ul {
    align-items: center;
  }
}

/* Focus management */
.legal-links:focus-within {
  outline: none;
}

/* Ensure proper spacing for stacked layout */
.legal-links .space-y-2 > li:not(:last-child) {
  margin-bottom: 0.5rem;
}

/* Accessibility improvements */
nav[aria-label="Legal information"] {
  outline: none;
}

/* Color consistency */
.text-foreground\/30 {
  color: hsl(var(--foreground) / 0.3);
}
</style>