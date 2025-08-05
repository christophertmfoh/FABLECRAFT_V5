<template>
  <div :class="contactInfoClasses">
    <AtomIcon :name="icon" :class="iconClasses" aria-hidden="true" />
    <span :class="textClasses">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface ContactInfoProps {
  icon: string // Icon name (e.g., 'lucide:mail')
  text: string // Contact text (email, phone, address)
  type?: 'email' | 'phone' | 'address' | 'generic'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

// Component setup
const props = withDefaults(defineProps<ContactInfoProps>(), {
  type: 'generic',
  size: 'md',
  class: '',
})

// Computed properties
const contactInfoClasses = computed(() => {
  const sizeClasses = {
    sm: 'gap-2 text-xs',
    md: 'gap-3 text-sm',
    lg: 'gap-4 text-base',
  }

  return cn(
    'flex items-center',
    'text-foreground/60',
    'transition-colors duration-200',
    'hover:text-foreground/80',
    sizeClasses[props.size],
    props.class
  )
})

const iconClasses = computed(() => {
  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return cn('flex-shrink-0', 'text-current', iconSizeClasses[props.size])
})

const textClasses = computed(() => {
  return cn(
    'text-current',
    'leading-relaxed',
    // Make text selectable for copy/paste
    'select-text',
    // Break long text appropriately
    'break-words'
  )
})
</script>

<style scoped>
/* Ensure good contrast for contact info */
.text-foreground\/60 {
  color: hsl(var(--foreground) / 0.6);
}

.hover\:text-foreground\/80:hover {
  color: hsl(var(--foreground) / 0.8);
}

/* Special handling for email and phone links if needed in future */
.contact-info[data-type='email']:hover,
.contact-info[data-type='phone']:hover {
  cursor: pointer;
}
</style>
