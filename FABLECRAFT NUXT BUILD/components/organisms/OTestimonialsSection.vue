<template>
  <section :class="sectionClasses" aria-label="Testimonials Section">
    <!-- Testimonials Header -->
    <MFeatureHeader
      :badge-text="headerBadgeText"
      :title="headerTitle"
      :highlight-text="headerHighlightText"
      :subtitle="headerSubtitle"
      :badge-size="isCompact ? 'sm' : 'base'"
      :heading-size="isCompact ? 'sm' : 'lg'"
      :heading-variant="isCompact ? 'compact' : 'default'"
      :gradient-variant="gradientVariant"
    />

    <!-- Testimonials Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-normal mt-acquaintances"
      role="region"
      aria-label="Customer testimonials"
    >
      <MTestimonialCard
        v-for="(testimonial, index) in testimonials"
        :key="`testimonial-${index}`"
        :content="testimonial.content"
        :name="testimonial.name"
        :role="testimonial.role"
        :rating="testimonial.rating"
        :initials="testimonial.initials"
        :avatar-src="testimonial.avatarSrc"
        :variant="variant"
        @click="handleTestimonialClick"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Testimonial interface
interface Testimonial {
  id: string
  name: string
  role: string
  initials: string
  rating: number
  content: string
  avatarSrc?: string
}

// Component props
interface TestimonialsSectionProps {
  variant?: 'default' | 'compact'
  customTestimonials?: Testimonial[]
  headerBadgeText?: string
  headerTitle?: string
  headerHighlightText?: string
  headerSubtitle?: string
  gradientVariant?: 'primary' | 'secondary' | 'accent'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<TestimonialsSectionProps>(), {
  variant: 'default',
  headerBadgeText: 'Trusted by Creators',
  headerTitle: 'What Our Users',
  headerHighlightText: 'Are Saying',
  headerSubtitle: 'Join thousands of creators who have transformed their storytelling with Fablecraft\'s comprehensive creative suite.',
  gradientVariant: 'primary',
})

// Define emits
const emit = defineEmits<{
  testimonialClick: [testimonial: Testimonial]
}>()

// Default testimonials data from old build
const defaultTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'Multimedia Creator',
    initials: 'SC',
    rating: 5,
    content: 'Fablecraft replaced my entire creative workflow. From writing my novel to generating storyboards and creating promotional videos, everything is connected. The AI understands my world so well, it feels like having a creative partner who never forgets anything.',
  },
  {
    id: 'testimonial-2',
    name: 'Marcus Rivera',
    role: 'Screenwriter',
    initials: 'MR',
    rating: 5,
    content: 'Finally, a platform that gets the creative process. The world bible feature keeps all my storylines consistent, and the collaboration tools let my writing partner contribute seamlessly.',
  },
  {
    id: 'testimonial-3',
    name: 'Alex Thompson',
    role: 'Graphic Novelist',
    initials: 'AT',
    rating: 5,
    content: 'The visual storytelling features are incredible. I can generate consistent character art and storyboards that perfectly match my written descriptions. It\'s like having a whole creative team.',
  },
]

// Computed properties
const isCompact = computed(() => props.variant === 'compact')

const testimonials = computed(() => props.customTestimonials || defaultTestimonials)

// Section classes
const sectionClasses = computed(() => [
  'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  props.class,
])

// Event handlers
const handleTestimonialClick = (testimonial: any) => {
  const testimonialData = testimonials.value.find(t => 
    t.name === testimonial.name && t.role === testimonial.role
  )
  
  if (testimonialData) {
    emit('testimonialClick', testimonialData)
  }
}
</script>