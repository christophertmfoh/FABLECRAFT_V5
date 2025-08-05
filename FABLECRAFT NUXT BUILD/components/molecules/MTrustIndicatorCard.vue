<template>
  <Card
    :class="[
      'group bg-card hover:bg-accent/50 border-border transition-all duration-500',
      'natural-depth gentle-hover',
      'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
    ]"
    role="article"
    :aria-label="`${number} ${label}`"
  >
    <div class="p-6 text-center space-y-4">
      <!-- Icon Container -->
      <div
        :class="[
          'w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-xl',
          'flex items-center justify-center mx-auto transition-all duration-300',
          'group-hover:scale-110 group-hover:rotate-3'
        ]"
      >
        <Icon
          :name="icon"
          class="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        />
      </div>

      <!-- Content -->
      <div class="mt-best-friends space-y-1">
        <!-- Number -->
        <div class="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {{ number }}
        </div>
        
        <!-- Label -->
        <div class="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {{ label }}
        </div>
        
        <!-- Optional Description -->
        <p 
          v-if="showDescription && description"
          class="text-xs text-muted-foreground mt-2"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
interface MTrustIndicatorCardProps {
  number: string
  label: string
  icon: string
  description?: string
  showDescription?: boolean
}

const props = withDefaults(defineProps<MTrustIndicatorCardProps>(), {
  showDescription: false
})
</script>