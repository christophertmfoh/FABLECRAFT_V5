<template>
  <DashboardWidget
    title="Writing Goals"
    subtitle="Track your progress"
    icon="lucide:target"
    icon-color="success"
    :loading="loading"
    :error="error"
    show-settings
    @settings="showSettings = true"
  >
    <!-- Main Content -->
    <div class="space-y-4">
      <!-- Writing Streak -->
      <div class="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-full bg-primary/20">
              <Icon name="lucide:flame" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <Text size="sm" class="text-muted-foreground">
                Writing Streak
              </Text>
              <div class="flex items-baseline gap-2">
                <Heading tag="h3" size="h3" class="text-foreground">
                  {{ currentStreak }}
                </Heading>
                <Text size="sm" class="text-muted-foreground">
                  day{{ currentStreak !== 1 ? 's' : '' }}
                </Text>
              </div>
            </div>
          </div>
          
          <!-- Streak Calendar -->
          <div class="flex gap-1">
            <div
              v-for="day in streakDays"
              :key="day.date"
              class="w-2 h-8 rounded-sm transition-all"
              :class="[
                day.written 
                  ? 'bg-primary' 
                  : day.isToday 
                    ? 'bg-primary/30 animate-pulse' 
                    : 'bg-muted'
              ]"
              :title="`${day.label}: ${day.written ? 'Complete' : 'Incomplete'}`"
            />
          </div>
        </div>
      </div>
      
      <!-- Daily Goal -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <Text size="sm" class="text-muted-foreground font-medium">
              Daily Goal
            </Text>
            <div class="flex items-baseline gap-2 mt-1">
              <Text size="lg" class="text-foreground font-semibold">
                {{ todayWords }} / {{ dailyGoal }}
              </Text>
              <Text size="sm" class="text-muted-foreground">
                words
              </Text>
            </div>
          </div>
          
          <div class="text-right">
            <Text size="xs" class="text-muted-foreground">
              {{ dailyPercentage }}% complete
            </Text>
            <Text v-if="dailyRemaining > 0" size="xs" class="text-primary mt-1">
              {{ dailyRemaining }} to go
            </Text>
            <Text v-else size="xs" class="text-green-500 mt-1 font-medium">
              Goal achieved! 🎉
            </Text>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="relative h-3 bg-muted rounded-full overflow-hidden">
          <div 
            class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
            :style="`width: ${Math.min(100, dailyPercentage)}%`"
          />
          <div 
            v-if="dailyPercentage > 100"
            class="absolute inset-y-0 bg-green-500/30 rounded-full animate-pulse"
            :style="`left: 100%; width: ${dailyPercentage - 100}%`"
          />
        </div>
      </div>
      
      <!-- Weekly Goal -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <Text size="sm" class="text-muted-foreground font-medium">
              Weekly Goal
            </Text>
            <div class="flex items-baseline gap-2 mt-1">
              <Text size="lg" class="text-foreground font-semibold">
                {{ weeklyWords }} / {{ weeklyGoal }}
              </Text>
              <Text size="sm" class="text-muted-foreground">
                words
              </Text>
            </div>
          </div>
          
          <div class="text-right">
            <Text size="xs" class="text-muted-foreground">
              {{ weeklyPercentage }}% complete
            </Text>
            <Text size="xs" class="text-muted-foreground/70 mt-1">
              {{ daysLeftInWeek }} days left
            </Text>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            class="h-full bg-secondary transition-all duration-500"
            :style="`width: ${Math.min(100, weeklyPercentage)}%`"
          />
        </div>
      </div>
      
      <!-- Monthly Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 rounded-lg bg-card/50 border border-border/50">
          <Text size="xs" class="text-muted-foreground">
            This Month
          </Text>
          <Text size="lg" class="text-foreground font-semibold mt-1">
            {{ formatNumber(monthlyWords) }}
          </Text>
          <Text size="xs" class="text-muted-foreground">
            words written
          </Text>
        </div>
        
        <div class="p-3 rounded-lg bg-card/50 border border-border/50">
          <Text size="xs" class="text-muted-foreground">
            Best Day
          </Text>
          <Text size="lg" class="text-foreground font-semibold mt-1">
            {{ formatNumber(bestDayWords) }}
          </Text>
          <Text size="xs" class="text-muted-foreground">
            words
          </Text>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <template #footer>
      <div class="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          class="h-7 text-xs"
          @click="$emit('view-stats')"
        >
          <Icon name="lucide:bar-chart-2" class="h-3 w-3 mr-1" />
          View Stats
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="h-7 text-xs"
          @click="editGoals"
        >
          <Icon name="lucide:edit" class="h-3 w-3 mr-1" />
          Edit Goals
        </Button>
      </div>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface WritingGoal {
  daily: number
  weekly: number
  monthly: number
}

interface WritingStats {
  today: number
  week: number
  month: number
  streak: number
  bestDay: number
  history: DayStats[]
}

interface DayStats {
  date: string
  words: number
  goal_met: boolean
}

// Emits
defineEmits<{
  'view-stats': []
}>()

// State
const loading = ref(false)
const error = ref<string | null>(null)
const showSettings = ref(false)

// Goals
const goals = ref<WritingGoal>({
  daily: 500,
  weekly: 3500,
  monthly: 15000
})

// Stats (mock data for now)
const stats = ref<WritingStats>({
  today: 342,
  week: 2156,
  month: 8743,
  streak: 7,
  bestDay: 1247,
  history: [
    { date: new Date(Date.now() - 6 * 86400000).toISOString(), words: 523, goal_met: true },
    { date: new Date(Date.now() - 5 * 86400000).toISOString(), words: 612, goal_met: true },
    { date: new Date(Date.now() - 4 * 86400000).toISOString(), words: 489, goal_met: false },
    { date: new Date(Date.now() - 3 * 86400000).toISOString(), words: 701, goal_met: true },
    { date: new Date(Date.now() - 2 * 86400000).toISOString(), words: 567, goal_met: true },
    { date: new Date(Date.now() - 86400000).toISOString(), words: 922, goal_met: true },
    { date: new Date().toISOString(), words: 342, goal_met: false }
  ]
})

// Computed
const dailyGoal = computed(() => goals.value.daily)
const weeklyGoal = computed(() => goals.value.weekly)
const todayWords = computed(() => stats.value.today)
const weeklyWords = computed(() => stats.value.week)
const monthlyWords = computed(() => stats.value.month)
const currentStreak = computed(() => stats.value.streak)
const bestDayWords = computed(() => stats.value.bestDay)

const dailyPercentage = computed(() => {
  return Math.round((todayWords.value / dailyGoal.value) * 100)
})

const dailyRemaining = computed(() => {
  return Math.max(0, dailyGoal.value - todayWords.value)
})

const weeklyPercentage = computed(() => {
  return Math.round((weeklyWords.value / weeklyGoal.value) * 100)
})

const daysLeftInWeek = computed(() => {
  const today = new Date().getDay()
  return today === 0 ? 1 : 7 - today
})

const streakDays = computed(() => {
  const days = []
  const today = new Date()
  
  // Show last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayStats = stats.value.history.find(h => 
      h.date.startsWith(dateStr)
    )
    
    days.push({
      date: dateStr,
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      written: dayStats?.goal_met || false,
      isToday: i === 0
    })
  }
  
  return days
})

// Methods
const loadStats = async () => {
  loading.value = true
  error.value = null
  
  try {
    // TODO: Replace with Supabase fetch
    await new Promise(resolve => setTimeout(resolve, 500))
    // Stats already loaded from mock data
  } catch (err: any) {
    error.value = 'Failed to load writing stats'
    console.error('Error loading stats:', err)
  } finally {
    loading.value = false
  }
}

const editGoals = () => {
  // TODO: Implement goal editing modal
  showSettings.value = true
  console.log('Edit goals')
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toLocaleString()
}

// Lifecycle
onMounted(() => {
  loadStats()
})
</script>