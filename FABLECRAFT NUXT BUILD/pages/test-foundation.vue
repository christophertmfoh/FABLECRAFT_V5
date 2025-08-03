<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Foundation Setup Test</h1>
    
    <!-- Test cn utility -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing cn() utility</h2>
      <div :class="testClasses">
        This div uses cn() to merge classes
      </div>
      <p class="text-sm text-muted-foreground mt-2">
        Classes: {{ testClasses }}
      </p>
    </section>

    <!-- Test formatCurrency utility -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing formatCurrency()</h2>
      <p>USD: {{ formattedUSD }}</p>
      <p>EUR: {{ formattedEUR }}</p>
      <p>JPY: {{ formattedJPY }}</p>
    </section>

    <!-- Test useComponentId -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing useComponentId()</h2>
      <p>Generated ID 1: {{ id1 }}</p>
      <p>Generated ID 2: {{ id2 }}</p>
      <p>Generated ID 3: {{ id3 }}</p>
    </section>

    <!-- Test Icon from @nuxt/icon -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing @nuxt/icon</h2>
      <div class="flex gap-4">
        <Icon name="i-lucide-check" class="text-success" />
        <Icon name="i-lucide-x" class="text-danger" />
        <Icon name="i-lucide-info" class="text-primary" />
        <Icon name="i-lucide-alert-triangle" class="text-warning" />
      </div>
    </section>

    <!-- Test types -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Testing Types</h2>
      <p>Size: {{ testSize }} (type: ComponentSize)</p>
      <p>Variant: {{ testVariant }} (type: ComponentVariant)</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { cn, formatCurrency } from '~/components/atoms/Utils'
import { useComponentId } from '~/composables/useComponentId'
import type { ComponentSize, ComponentVariant } from '~/types'

// Test cn utility
const testClasses = cn(
  'p-4 rounded-lg',
  'bg-primary text-primary-foreground',
  { 'opacity-50': false, 'shadow-lg': true },
  ['border', 'border-primary']
)

// Test formatCurrency
const formattedUSD = formatCurrency(1234.56)
const formattedEUR = formatCurrency(1234.56, { currency: 'EUR', locale: 'de-DE' })
const formattedJPY = formatCurrency(1234, { currency: 'JPY', locale: 'ja-JP' })

// Test useComponentId
const id1 = useComponentId('test')
const id2 = useComponentId('test')
const id3 = useComponentId()

// Test types
const testSize: ComponentSize = 'md'
const testVariant: ComponentVariant = 'primary'
</script>