import { computed, type Ref, type ComputedRef } from 'vue'
import type { ComponentSize, ComponentVariant } from '~/types'

interface ClassMap {
  sizes: Record<ComponentSize, string>
  variants: Record<ComponentVariant, string>
}

export const useComponentClasses = (
  size: Ref<ComponentSize>,
  variant: Ref<ComponentVariant>,
  classMap: ClassMap
): ComputedRef<string> => {
  return computed(() => {
    const sizeClass = classMap.sizes[size.value] || ''
    const variantClass = classMap.variants[variant.value] || ''
    return `${sizeClass} ${variantClass}`.trim()
  })
}