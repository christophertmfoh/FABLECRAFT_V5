<template>
  <div
    class="text-center relative group cursor-pointer"
    role="listitem"
    tabindex="0"
    :aria-labelledby="`step-title-${stepId}`"
    :aria-describedby="`step-description-${stepId} step-detail-${stepId}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Step Number -->
    <div class="absolute -top-2 -left-2 z-20">
      <StepNumber
        :step="stepNumber"
        :status="stepStatus"
        :variant="stepNumberVariant"
        :size="stepNumberSize"
      />
    </div>

    <!-- Icon Container -->
    <div
      :class="iconContainerClasses"
    >
      <!-- Hover background effect -->
      <div class="absolute inset-0 rounded-2xl lg:rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <!-- Icon Background -->
      <div
        :class="iconBackgroundClasses"
      >
        <AtomIcon 
          :name="icon"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="group-hover:-translate-y-1 transition-transform duration-300">
      <!-- Title -->
      <Heading
        :id="`step-title-${stepId}`"
        :as="titleTag"
        :size="titleSize"
        :class="titleClasses"
      >
        {{ title }}
      </Heading>

      <!-- Description -->
      <Text
        :id="`step-description-${stepId}`"
        :size="descriptionSize"
        :class="descriptionClasses"
      >
        {{ description }}
      </Text>

      <!-- Detail (appears on hover) -->
      <Text
        v-if="detail"
        :id="`step-detail-${stepId}`"
        :size="detailSize"
        :class="detailClasses"
      >
        {{ detail }}
      </Text>

      <!-- Category Badge -->
      <Badge
        v-if="category && showCategory"
        variant="secondary"
        :class="categoryClasses"
      >
        {{ category }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MProcessStepProps {
  stepNumber: number
  icon: string
  title: string
  description: string
  detail?: string
  category?: string
  stepId?: string
  variant?: 'default' | 'compact'
  stepStatus?: 'pending' | 'active' | 'completed'
  stepNumberVariant?: 'default' | 'outline' | 'solid'
  stepNumberSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
  descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  detailSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  showCategory?: boolean
  class?: string
}

interface MProcessStepEmits {
  click: [stepNumber: number, stepData: { title: string; description: string; detail?: string; category?: string }]
}

const props = withDefaults(defineProps<MProcessStepProps>(), {
  variant: 'default',
  stepId: '',
  stepStatus: 'pending',
  stepNumberVariant: 'solid',
  stepNumberSize: 'sm',
  titleTag: 'h3',
  titleSize: 'lg',
  descriptionSize: 'sm',
  detailSize: 'xs',
  showCategory: false,
})

const emit = defineEmits<MProcessStepEmits>()

// Generate unique step ID if not provided
const stepId = computed(() => props.stepId || useComponentId(`step-${props.stepNumber}`))

// Computed classes for different elements
const isCompact = computed(() => props.variant === 'compact')

const iconContainerClasses = computed(() => [
  'w-24 h-24 lg:w-28 lg:h-28 bg-card/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl',
  'flex items-center justify-center mx-auto shadow-lg border border-border',
  'transition-all duration-500 cursor-pointer relative z-10',
  'group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-3',
  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
  props.class
])

const iconBackgroundClasses = computed(() => [
  'w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 hover:bg-primary/20 rounded-xl lg:rounded-2xl',
  'flex items-center justify-center shadow-md transition-all duration-500',
  'group-hover:shadow-lg group-hover:scale-110'
])

const iconClasses = computed(() => [
  'w-6 h-6 lg:w-8 lg:h-8 text-primary group-hover:scale-110 transition-transform duration-300'
])

const titleClasses = computed(() => [
  'font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mt-best-friends'
])

const descriptionClasses = computed(() => [
  'text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium leading-relaxed mt-best-friends'
])

const detailClasses = computed(() => [
  'text-muted-foreground transition-all duration-500 font-medium leading-relaxed mt-friends',
  'opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
])

const categoryClasses = computed(() => [
  'text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-best-friends'
])

// Handle click events
const handleClick = () => {
  emit('click', props.stepNumber, {
    title: props.title,
    description: props.description,
    detail: props.detail,
    category: props.category
  })
}
</script>