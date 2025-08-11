<template>
  <DashboardWidget
    :title="currentContent.category"
    :subtitle="currentContent.subtitle"
    :icon="currentContent.icon"
    :icon-color="iconColor"
    :loading="loading"
    show-refresh
    @refresh="refreshContent"
  >
    <!-- Content Display -->
    <div class="space-y-4">
      <!-- Main Content -->
      <div class="relative">
        <div class="prose prose-sm dark:prose-invert max-w-none">
          <div v-if="currentContent.type === 'word-of-day'" class="space-y-3">
            <div>
              <Heading tag="h4" size="h3" class="text-foreground mb-1">
                {{ currentContent.word }}
              </Heading>
              <Text size="sm" class="text-muted-foreground italic">
                {{ currentContent.pronunciation }}
              </Text>
            </div>
            <Text size="base" class="text-foreground leading-relaxed">
              {{ currentContent.definition }}
            </Text>
            <div class="p-3 bg-muted/30 rounded-lg">
              <Text size="sm" class="text-muted-foreground">
                <span class="font-medium">Example:</span> {{ currentContent.example }}
              </Text>
            </div>
          </div>
          
          <div v-else-if="currentContent.type === 'writing-prompt'" class="space-y-3">
            <Text size="base" class="text-foreground leading-relaxed font-medium">
              "{{ currentContent.prompt }}"
            </Text>
            <div v-if="currentContent.genre" class="flex items-center gap-2">
              <Badge variant="outline" class="text-xs">
                {{ currentContent.genre }}
              </Badge>
              <Badge v-if="currentContent.difficulty" variant="outline" class="text-xs">
                {{ currentContent.difficulty }}
              </Badge>
            </div>
          </div>
          
          <div v-else class="space-y-3">
            <Text size="base" class="text-foreground leading-relaxed">
              {{ currentContent.content }}
            </Text>
            <div v-if="currentContent.author" class="text-right">
              <Text size="sm" class="text-muted-foreground italic">
                — {{ currentContent.author }}
              </Text>
            </div>
          </div>
        </div>
        
        <!-- Fade Animation -->
        <Transition name="fade">
          <div 
            v-if="transitioning" 
            class="absolute inset-0 bg-background/50 backdrop-blur-sm"
          />
        </Transition>
      </div>
      
      <!-- Category Pills -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.type"
          class="px-3 py-1 text-xs rounded-full transition-all"
          :class="[
            currentCategory === cat.type
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
          ]"
          @click="selectCategory(cat.type)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>
    
    <!-- Footer -->
    <template #footer>
      <div class="flex items-center justify-between">
        <Text size="xs" class="text-muted-foreground">
          Updates every {{ updateInterval / 60000 }} minutes
        </Text>
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            class="h-7 w-7 p-0"
            @click="previousContent"
          >
            <Icon name="lucide:chevron-left" class="h-4 w-4" />
          </Button>
          <Text size="xs" class="text-muted-foreground px-2">
            {{ currentIndex + 1 }} / {{ contentPool.length }}
          </Text>
          <Button
            variant="ghost"
            size="sm"
            class="h-7 w-7 p-0"
            @click="nextContent"
          >
            <Icon name="lucide:chevron-right" class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type ContentType = 'history-fact' | 'writing-joke' | 'writing-prompt' | 'word-of-day' | 'writing-tip' | 'today-in-history'

interface AIContent {
  type: ContentType
  category: string
  subtitle: string
  icon: string
  content?: string
  word?: string
  pronunciation?: string
  definition?: string
  example?: string
  prompt?: string
  genre?: string
  difficulty?: string
  author?: string
}

// Content pools for each category
const contentData: Record<ContentType, AIContent[]> = {
  'history-fact': [
    {
      type: 'history-fact',
      category: 'Writing History',
      subtitle: 'Fascinating facts from literary history',
      icon: 'lucide:book-open',
      content: 'The first novel ever written is often credited to be "The Tale of Genji" by Murasaki Shikibu, a Japanese noblewoman, written around 1010 CE.',
      author: 'Literary Archives'
    },
    {
      type: 'history-fact',
      category: 'Writing History',
      subtitle: 'Fascinating facts from literary history',
      icon: 'lucide:book-open',
      content: 'Agatha Christie is the best-selling novelist of all time, with her books having sold over 2 billion copies worldwide.',
      author: 'Publishing Records'
    },
    {
      type: 'history-fact',
      category: 'Writing History',
      subtitle: 'Fascinating facts from literary history',
      icon: 'lucide:book-open',
      content: 'The shortest story ever written is attributed to Ernest Hemingway: "For sale: baby shoes, never worn." Just six words.',
      author: 'Literary Legend'
    }
  ],
  'writing-joke': [
    {
      type: 'writing-joke',
      category: 'Writing Humor',
      subtitle: 'A laugh for your creative break',
      icon: 'lucide:smile',
      content: 'A writer died and was given the choice between heaven and hell. Hell was a room full of writers typing away. Heaven was the same. "What\'s the difference?" he asked. "In heaven, you get published."'
    },
    {
      type: 'writing-joke',
      category: 'Writing Humor',
      subtitle: 'A laugh for your creative break',
      icon: 'lucide:smile',
      content: 'Why do writers always feel cold? Because they\'re surrounded by drafts!'
    },
    {
      type: 'writing-joke',
      category: 'Writing Humor',
      subtitle: 'A laugh for your creative break',
      icon: 'lucide:smile',
      content: 'The past, present, and future walked into a bar. It was tense.'
    }
  ],
  'writing-prompt': [
    {
      type: 'writing-prompt',
      category: 'Writing Prompt',
      subtitle: 'Spark your creativity',
      icon: 'lucide:sparkles',
      prompt: 'You wake up one morning to find that everyone in the world has vanished except you and one other person you\'ve never met.',
      genre: 'Science Fiction',
      difficulty: 'Intermediate'
    },
    {
      type: 'writing-prompt',
      category: 'Writing Prompt',
      subtitle: 'Spark your creativity',
      icon: 'lucide:sparkles',
      prompt: 'Write about a character who can only tell the truth for 24 hours, starting at the worst possible moment.',
      genre: 'Contemporary',
      difficulty: 'Beginner'
    },
    {
      type: 'writing-prompt',
      category: 'Writing Prompt',
      subtitle: 'Spark your creativity',
      icon: 'lucide:sparkles',
      prompt: 'A vintage camera you bought at a yard sale shows glimpses of the future in every photo it takes.',
      genre: 'Mystery',
      difficulty: 'Advanced'
    }
  ],
  'word-of-day': [
    {
      type: 'word-of-day',
      category: 'Word of the Day',
      subtitle: 'Expand your vocabulary',
      icon: 'lucide:book',
      word: 'Petrichor',
      pronunciation: '/ˈpetrɪkɔːr/',
      definition: 'The pleasant, earthy smell that accompanies the first rain after a dry spell.',
      example: 'The petrichor rising from the garden path transported her back to childhood summers.'
    },
    {
      type: 'word-of-day',
      category: 'Word of the Day',
      subtitle: 'Expand your vocabulary',
      icon: 'lucide:book',
      word: 'Sonder',
      pronunciation: '/ˈsɒndər/',
      definition: 'The realization that each passerby has a life as vivid and complex as your own.',
      example: 'Standing in the busy station, she was struck by a moment of sonder.'
    },
    {
      type: 'word-of-day',
      category: 'Word of the Day',
      subtitle: 'Expand your vocabulary',
      icon: 'lucide:book',
      word: 'Ephemeral',
      pronunciation: '/ɪˈfemərəl/',
      definition: 'Lasting for a very short time; transient.',
      example: 'The ephemeral beauty of cherry blossoms makes them all the more precious.'
    }
  ],
  'writing-tip': [
    {
      type: 'writing-tip',
      category: 'Writing Tip',
      subtitle: 'Improve your craft',
      icon: 'lucide:lightbulb',
      content: 'Show, don\'t tell. Instead of "Sarah was angry," try "Sarah slammed the door so hard the pictures rattled on the wall."',
      author: 'Writing 101'
    },
    {
      type: 'writing-tip',
      category: 'Writing Tip',
      subtitle: 'Improve your craft',
      icon: 'lucide:lightbulb',
      content: 'Read your dialogue out loud. If it sounds unnatural when spoken, it will feel unnatural to readers.',
      author: 'Dialogue Mastery'
    },
    {
      type: 'writing-tip',
      category: 'Writing Tip',
      subtitle: 'Improve your craft',
      icon: 'lucide:lightbulb',
      content: 'The first draft is just you telling yourself the story. Don\'t aim for perfection—aim for completion.',
      author: 'Terry Pratchett'
    }
  ],
  'today-in-history': [
    {
      type: 'today-in-history',
      category: 'Today in Writing History',
      subtitle: 'What happened on this day',
      icon: 'lucide:calendar',
      content: `On this day in 1847, Charlotte Brontë's "Jane Eyre" was first published under the pseudonym Currer Bell, revolutionizing the Victorian novel.`,
      author: 'Historical Records'
    },
    {
      type: 'today-in-history',
      category: 'Today in Writing History',
      subtitle: 'What happened on this day',
      icon: 'lucide:calendar',
      content: 'On this day in 1922, James Joyce\'s "Ulysses" was published in Paris, forever changing the landscape of modern literature.',
      author: 'Literary Timeline'
    },
    {
      type: 'today-in-history',
      category: 'Today in Writing History',
      subtitle: 'What happened on this day',
      icon: 'lucide:calendar',
      content: 'On this day in 1960, Harper Lee\'s "To Kill a Mockingbird" was published, becoming one of the most influential American novels.',
      author: 'Publishing History'
    }
  ]
}

// Categories configuration
const categories = [
  { type: 'history-fact' as ContentType, label: 'History' },
  { type: 'writing-joke' as ContentType, label: 'Humor' },
  { type: 'writing-prompt' as ContentType, label: 'Prompt' },
  { type: 'word-of-day' as ContentType, label: 'Word' },
  { type: 'writing-tip' as ContentType, label: 'Tip' },
  { type: 'today-in-history' as ContentType, label: 'Today' }
]

// State
const currentCategory = ref<ContentType>('writing-prompt')
const currentIndex = ref(0)
const loading = ref(false)
const transitioning = ref(false)
const updateInterval = 300000 // 5 minutes
let intervalId: NodeJS.Timeout | null = null

// Computed
const contentPool = computed(() => {
  return contentData[currentCategory.value] || []
})

const currentContent = computed(() => {
  return contentPool.value[currentIndex.value] || contentPool.value[0]
})

const iconColor = computed(() => {
  const colorMap: Record<ContentType, any> = {
    'history-fact': 'secondary',
    'writing-joke': 'success',
    'writing-prompt': 'primary',
    'word-of-day': 'warning',
    'writing-tip': 'primary',
    'today-in-history': 'secondary'
  }
  return colorMap[currentCategory.value] || 'primary'
})

// Methods
const selectCategory = (type: ContentType) => {
  if (type === currentCategory.value) return
  
  transitioning.value = true
  setTimeout(() => {
    currentCategory.value = type
    currentIndex.value = 0
    transitioning.value = false
  }, 150)
}

const nextContent = () => {
  transitioning.value = true
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % contentPool.value.length
    transitioning.value = false
  }, 150)
}

const previousContent = () => {
  transitioning.value = true
  setTimeout(() => {
    currentIndex.value = currentIndex.value === 0 
      ? contentPool.value.length - 1 
      : currentIndex.value - 1
    transitioning.value = false
  }, 150)
}

const refreshContent = () => {
  loading.value = true
  setTimeout(() => {
    // In production, this would fetch new content from AI API
    nextContent()
    loading.value = false
  }, 500)
}

const rotateContent = () => {
  // Auto-rotate through categories and content
  const categoryIndex = categories.findIndex(c => c.type === currentCategory.value)
  const nextCategoryIndex = (categoryIndex + 1) % categories.length
  
  // Move to next content in current category, or switch category
  if (currentIndex.value < contentPool.value.length - 1) {
    nextContent()
  } else {
    selectCategory(categories[nextCategoryIndex].type)
  }
}

// Lifecycle
onMounted(() => {
  // Set up auto-rotation
  intervalId = setInterval(rotateContent, updateInterval)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>