<template>
  <Card
    :class="cardClasses"
    variant="default"
    role="article"
    :aria-label="`Testimonial from ${name}`"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Hover background effect -->
    <div :class="hoverEffectClasses" aria-hidden="true" />
    
    <div class="p-comfortable relative z-10">
      <!-- Star Rating -->
      <div class="flex justify-center mb-best-friends">
        <StarRating
          :rating="rating"
          :max-rating="5"
          size="base"
          color="warning"
        />
      </div>

      <!-- Quote Content -->
      <blockquote class="text-center mb-best-friends">
        <Text
          :id="`testimonial-quote-${testimonialId}`"
          tag="p"
          size="base"
          class="text-foreground italic leading-relaxed text-center"
        >
          "{{ content }}"
        </Text>
      </blockquote>

      <!-- Author Information -->
      <div class="flex items-center justify-center gap-3">
        <!-- Avatar -->
        <Avatar
          :name="name"
          :initials="initials"
          :src="avatarSrc"
          size="base"
          gradient="true"
          :gradient-from="gradientFrom"
          :gradient-to="gradientTo"
        />
        
        <!-- Author Details -->
        <div class="text-center">
          <Heading
            :id="`testimonial-author-${testimonialId}`"
            tag="h4"
            size="sm"
            class="font-semibold text-foreground leading-tight"
          >
            {{ name }}
          </Heading>
          
          <Text
            tag="p"
            size="sm"
            class="text-muted-foreground leading-tight mt-friends"
          >
            {{ role }}
          </Text>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface TestimonialCardProps {
  content: string
  name: string
  role: string
  rating?: number
  initials?: string
  avatarSrc?: string
  gradientFrom?: string
  gradientTo?: string
  variant?: 'default' | 'compact'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<TestimonialCardProps>(), {
  rating: 5,
  variant: 'default',
  gradientFrom: 'hsl(var(--primary))',
  gradientTo: 'hsl(var(--primary) / 0.6)',
})

// Define emits
const emit = defineEmits<{
  click: [testimonial: TestimonialCardProps]
}>()

// Generate unique ID
const testimonialId = useComponentId('testimonial')

// Computed properties
const isCompact = computed(() => props.variant === 'compact')

// Card classes
const cardClasses = computed(() => [
  'group cursor-pointer transition-all duration-500',
  'hover:shadow-xl hover:scale-105 hover:-translate-y-2',
  'border-border hover:border-primary/50',
  'natural-depth gentle-hover',
  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
  'bg-card/90 backdrop-blur-sm',
  'overflow-hidden relative',
  props.class,
])

// Hover effect classes
const hoverEffectClasses = computed(() => [
  'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700',
  'bg-gradient-to-br from-primary/5 via-primary/3 to-primary/2',
  'pointer-events-none',
])

// Event handlers
const handleClick = () => {
  emit('click', props)
}
</script>