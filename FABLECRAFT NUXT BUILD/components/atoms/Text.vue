<template>
  <component :is="as" :class="textClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Text variants using CVA
const textVariants = cva(
  'text-foreground',
  {
    variants: {
      size: {
        // Body text sizes
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        
        // Golden ratio sizes
        'golden-sm': 'text-golden-sm',
        'golden-base': 'text-golden-base',
        'golden-lg': 'text-golden-lg',
        'golden-xl': 'text-golden-xl',
        'golden-2xl': 'text-golden-2xl',
        
        // Responsive sizes
        'body-compact': 'text-base sm:text-lg',
        'body-default': 'text-golden-lg sm:text-golden-xl lg:text-golden-2xl',
        
        // Display sizes
        'display-value': 'text-2xl sm:text-3xl',
        'display-label': 'text-sm',
      },
      variant: {
        default: '',
        muted: 'text-muted-foreground',
        'muted-50': 'text-foreground/50',
        'muted-60': 'text-foreground/60',
        'muted-70': 'text-foreground/70',
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        black: 'font-black',
      },
      leading: {
        none: 'leading-none',
        tight: 'leading-tight',
        snug: 'leading-snug',
        normal: 'leading-normal',
        relaxed: 'leading-relaxed',
        loose: 'leading-loose',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      transform: {
        none: '',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
      weight: 'normal',
      leading: 'normal',
      align: 'left',
      transform: 'none',
    },
  }
)

// Component props
interface TextProps {
  as?: 'p' | 'span' | 'div' | 'strong' | 'em' | 'small' | 'mark' | 'del' | 'ins' | 'sub' | 'sup'
  size?: 
    | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    | 'golden-sm' | 'golden-base' | 'golden-lg' | 'golden-xl' | 'golden-2xl'
    | 'body-compact' | 'body-default'
    | 'display-value' | 'display-label'
  variant?: 'default' | 'muted' | 'muted-50' | 'muted-60' | 'muted-70' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
  align?: 'left' | 'center' | 'right' | 'justify'
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<TextProps>(), {
  as: 'p',
  size: 'base',
  variant: 'default',
  weight: 'normal',
  leading: 'normal',
  align: 'left',
  transform: 'none',
})

// Compute text classes
const textClasses = computed(() => {
  return cn(
    textVariants({
      size: props.size,
      variant: props.variant,
      weight: props.weight,
      leading: props.leading,
      align: props.align,
      transform: props.transform,
    }),
    props.class
  )
})
</script>