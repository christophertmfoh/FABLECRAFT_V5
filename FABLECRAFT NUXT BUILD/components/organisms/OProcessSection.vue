<template>
  <section :class="sectionClasses" aria-label="Process Section">
    <!-- Process Header -->
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

    <!-- Process Steps Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 grid-normal mt-acquaintances relative"
      role="list"
      aria-label="Creative process steps"
    >
      <!-- Connection line for desktop - behind steps and constrained to first/last step -->
      <div
        class="absolute top-16 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 hidden xl:block rounded-full -z-10"
        style="left: calc(100% / 12); right: calc(100% / 12);"
        aria-hidden="true"
      />
      <MProcessStep
        v-for="(step, index) in processSteps"
        :key="`process-step-${index}`"
        :step-number="index + 1"
        :icon="step.icon"
        :title="step.title"
        :description="step.description"
        :detail="step.detail"
        :category="step.category"
        :variant="variant"
        :show-category="isDetailed"
        :step-status="getStepStatus(index)"
        @click="handleStepClick"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProcessStep {
  icon: string
  title: string
  description: string
  detail?: string
  category?: string
}

interface OProcessSectionProps {
  variant?: 'default' | 'compact' | 'detailed'
  customProcessSteps?: ProcessStep[]
  headerBadgeText?: string
  headerTitle?: string
  headerHighlightText?: string
  headerSubtitle?: string
  gradientVariant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'
  activeStep?: number
  class?: string
}

interface OProcessSectionEmits {
  stepClick: [stepNumber: number, stepData: { title: string; description: string; detail?: string; category?: string }]
}

const props = withDefaults(defineProps<OProcessSectionProps>(), {
  variant: 'default',
  headerBadgeText: 'How It Works',
  headerTitle: 'Your Complete Creative Production',
  headerHighlightText: 'Pipeline',
  headerSubtitle:
    'Follow our proven 6-stage multimedia production process used by creative professionals worldwide. Each stage builds seamlessly into the next, ensuring your creative vision stays consistent from initial concept to final publication.',
  gradientVariant: 'primary',
  activeStep: -1,
})

const emit = defineEmits<OProcessSectionEmits>()

// Variant checks
const isCompact = computed(() => props.variant === 'compact')
const isDetailed = computed(() => props.variant === 'detailed')

// Section classes
const sectionClasses = computed(() => [
  'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  isCompact.value ? 'py-12' : 'section-spacing-compact',
  props.class,
])

// Default process steps data - extracted from the old React build
const defaultProcessSteps: ProcessStep[] = [
  {
    icon: 'lucide:lightbulb',
    title: 'Ideation & World Building',
    description: 'From concept to living universes',
    detail: 'Transform inspiration into rich creative concepts with AI-guided brainstorming and interconnected world creation',
    category: 'Foundation',
  },
  {
    icon: 'lucide:pen-tool',
    title: 'Content Creation',
    description: 'Write across multiple formats',
    detail: "Craft novels, screenplays, poetry, and D&D campaigns with AI that understands your world's context",
    category: 'Writing & Scripting',
  },
  {
    icon: 'lucide:palette',
    title: 'Visual Development',
    description: 'From words to visual concepts',
    detail: 'Generate storyboards, concept art, and character designs from your written content',
    category: 'Visual Design',
  },
  {
    icon: 'lucide:camera',
    title: 'Video Production',
    description: 'Bring storyboards to life',
    detail: 'Create professional pre-vis sequences and generate image-to-video content for demos and productions',
    category: 'Video Production',
  },
  {
    icon: 'lucide:music',
    title: 'Audio & Post-Production',
    description: 'Complete with sound and polish',
    detail: 'Generate voices, compose scores, and finalize your multimedia projects with professional editing tools',
    category: 'Audio & Finishing',
  },
  {
    icon: 'lucide:share-2',
    title: 'Publishing & Community',
    description: 'Share and collaborate globally',
    detail: 'Publish across platforms, build communities, and collaborate with creators worldwide',
    category: 'Distribution',
  },
]

// Use custom steps if provided, otherwise use defaults
const processSteps = computed(() => props.customProcessSteps || defaultProcessSteps)

// Determine step status based on activeStep prop
const getStepStatus = (index: number): 'pending' | 'active' | 'completed' => {
  if (props.activeStep === -1) return 'pending' // Default state when no active step
  
  if (index < props.activeStep) return 'completed'
  if (index === props.activeStep) return 'active'
  return 'pending'
}

// Handle step click events
const handleStepClick = (stepNumber: number, stepData: { title: string; description: string; detail?: string; category?: string }) => {
  emit('stepClick', stepNumber, stepData)
}
</script>