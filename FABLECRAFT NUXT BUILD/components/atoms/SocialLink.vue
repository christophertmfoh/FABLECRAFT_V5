<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="linkClasses"
    :aria-label="computedAriaLabel"
  >
    <Icon
      :name="iconName"
      :class="iconClasses"
    />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface SocialLinkProps {
  platform?: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'discord' | 'custom'
  href: string
  icon?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'outline' | 'brand'
  rounded?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<SocialLinkProps>(), {
  platform: 'custom',
  size: 'md',
  variant: 'ghost',
  rounded: true
})

// Platform icon mappings
const platformIcons = {
  twitter: 'lucide:twitter',
  facebook: 'lucide:facebook',
  instagram: 'lucide:instagram',
  linkedin: 'lucide:linkedin',
  github: 'lucide:github',
  youtube: 'lucide:youtube',
  tiktok: 'lucide:video',
  discord: 'lucide:message-circle',
  custom: 'lucide:link'
}

// Platform labels
const platformLabels = {
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  discord: 'Discord',
  custom: 'Social'
}

// Platform brand colors
const brandColors = {
  twitter: 'hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]',
  facebook: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  instagram: 'hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]',
  linkedin: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
  github: 'hover:bg-[#181717] hover:text-white hover:border-[#181717]',
  youtube: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
  tiktok: 'hover:bg-[#000000] hover:text-white hover:border-[#000000]',
  discord: 'hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]',
  custom: ''
}

// Size mappings
const sizeClasses = {
  sm: {
    button: 'h-8 w-8',
    icon: 'h-4 w-4'
  },
  md: {
    button: 'h-10 w-10',
    icon: 'h-5 w-5'
  },
  lg: {
    button: 'h-12 w-12',
    icon: 'h-6 w-6'
  }
}

// Variant mappings
const variantClasses = {
  default: 'bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  brand: 'transition-all duration-200'
}

// Computed icon name
const iconName = computed(() => {
  return props.icon || platformIcons[props.platform] || platformIcons.custom
})

// Computed aria label
const computedAriaLabel = computed(() => {
  if (props.label) return props.label
  
  const platformName = platformLabels[props.platform] || 'Social media'
  return `Visit our ${platformName} page`
})

// Computed classes
const linkClasses = computed(() => {
  return cn(
    'inline-flex items-center justify-center transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[props.size].button,
    variantClasses[props.variant],
    props.variant === 'brand' && brandColors[props.platform],
    props.rounded ? 'rounded-full' : 'rounded-md',
    props.class
  )
})

const iconClasses = computed(() => {
  return cn(
    sizeClasses[props.size].icon
  )
})
</script>