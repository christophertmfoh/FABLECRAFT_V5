<template>
  <div class="mb-8">
    <!-- Section Header -->
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent/5 transition-colors"
    >
      <div class="flex items-center gap-3">
        <Icon 
          :name="isOpen ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
          class="w-5 h-5 text-muted-foreground"
        />
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <Badge v-if="count" variant="secondary" class="ml-2">
          {{ count }} {{ count === 1 ? 'component' : 'components' }}
        </Badge>
      </div>
      <span class="text-sm text-muted-foreground">
        {{ isOpen ? 'Click to collapse' : 'Click to expand' }}
      </span>
    </button>

    <!-- Section Content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform opacity-0 max-h-0"
      enter-to-class="transform opacity-100 max-h-[5000px]"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform opacity-100 max-h-[5000px]"
      leave-to-class="transform opacity-0 max-h-0"
    >
      <div v-show="isOpen" class="mt-4 p-6 bg-card/50 rounded-lg border border-border/50 overflow-hidden">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  count?: number
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false
})

const isOpen = ref(props.defaultOpen)
</script>