<template>
  <Card 
    :class="widgetClasses"
    v-bind="$attrs"
  >
    <div class="p-6">
      <!-- Widget Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div v-if="icon" class="flex-shrink-0">
            <div :class="iconContainerClasses">
              <Icon :name="icon" :class="iconClasses" />
            </div>
          </div>
          <div>
            <Heading tag="h3" size="h4" class="text-foreground">
              {{ title }}
            </Heading>
            <Text v-if="subtitle" size="sm" class="text-muted-foreground mt-1">
              {{ subtitle }}
            </Text>
          </div>
        </div>
        
        <!-- Header Actions -->
        <div v-if="$slots.actions || showRefresh || showSettings" class="flex items-center gap-2">
          <slot name="actions" />
          
          <Button
            v-if="showRefresh"
            variant="ghost"
            size="sm"
            class="h-8 w-8 p-0"
            :disabled="loading"
            @click="$emit('refresh')"
          >
            <Icon 
              name="lucide:refresh-cw" 
              class="h-4 w-4"
              :class="{ 'animate-spin': loading }"
            />
          </Button>
          
          <Button
            v-if="showSettings"
            variant="ghost"
            size="sm"
            class="h-8 w-8 p-0"
            @click="$emit('settings')"
          >
            <Icon name="lucide:settings" class="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <!-- Widget Content -->
      <div :class="contentClasses">
        <div v-if="loading && showLoadingState" class="space-y-3">
          <!-- Loading skeleton -->
          <div v-for="i in loadingRows" :key="i" class="space-y-2">
            <div class="h-4 bg-muted rounded animate-pulse" :style="`width: ${85 + (i * 5) % 15}%`" />
          </div>
        </div>
        
        <div v-else-if="error && showError" class="text-center py-8">
          <Icon name="lucide:alert-circle" class="h-8 w-8 text-destructive mx-auto mb-2" />
          <Text size="sm" class="text-muted-foreground">
            {{ error }}
          </Text>
          <Button
            v-if="showRefresh"
            variant="outline"
            size="sm"
            class="mt-3"
            @click="$emit('refresh')"
          >
            Try Again
          </Button>
        </div>
        
        <div v-else-if="empty && showEmptyState" class="text-center py-8">
          <Icon :name="emptyIcon" class="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
          <Text size="sm" class="text-muted-foreground mb-1">
            {{ emptyTitle }}
          </Text>
          <Text size="xs" class="text-muted-foreground/70">
            {{ emptyMessage }}
          </Text>
          <div v-if="$slots['empty-action']" class="mt-3">
            <slot name="empty-action" />
          </div>
        </div>
        
        <slot v-else />
      </div>
      
      <!-- Widget Footer -->
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-border/50">
        <slot name="footer" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DashboardWidgetProps {
  // Header
  title: string
  subtitle?: string
  icon?: string
  iconColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'
  
  // States
  loading?: boolean
  error?: string | null
  empty?: boolean
  
  // Loading state
  showLoadingState?: boolean
  loadingRows?: number
  
  // Error state
  showError?: boolean
  
  // Empty state
  showEmptyState?: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptyMessage?: string
  
  // Actions
  showRefresh?: boolean
  showSettings?: boolean
  
  // Styling
  noPadding?: boolean
  compact?: boolean
  transparent?: boolean
}

const props = withDefaults(defineProps<DashboardWidgetProps>(), {
  iconColor: 'primary',
  loading: false,
  error: null,
  empty: false,
  showLoadingState: true,
  loadingRows: 3,
  showError: true,
  showEmptyState: true,
  emptyIcon: 'lucide:inbox',
  emptyTitle: 'No data yet',
  emptyMessage: 'Get started by adding your first item',
  showRefresh: false,
  showSettings: false,
  noPadding: false,
  compact: false,
  transparent: false
})

defineEmits<{
  refresh: []
  settings: []
}>()

// Computed classes
const widgetClasses = computed(() => {
  const classes = [
    'dashboard-widget',
    'border-border/50',
    'transition-all duration-200',
    'hover:shadow-lg hover:shadow-primary/5'
  ]
  
  if (props.transparent) {
    classes.push('bg-transparent')
  } else {
    classes.push('bg-card/50 backdrop-blur-sm')
  }
  
  return classes.join(' ')
})

const iconContainerClasses = computed(() => {
  const base = 'p-2 rounded-lg'
  const colors = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-green-500/10 text-green-500',
    warning: 'bg-yellow-500/10 text-yellow-500',
    destructive: 'bg-destructive/10 text-destructive',
    muted: 'bg-muted text-muted-foreground'
  }
  
  return `${base} ${colors[props.iconColor]}`
})

const iconClasses = computed(() => {
  return props.compact ? 'h-4 w-4' : 'h-5 w-5'
})

const contentClasses = computed(() => {
  if (props.noPadding) return ''
  return props.compact ? '' : 'min-h-[120px]'
})
</script>

<style scoped>
.dashboard-widget {
  container-type: inline-size;
}

/* Responsive adjustments for small widgets */
@container (max-width: 400px) {
  .dashboard-widget :deep(.text-sm) {
    font-size: 0.75rem;
  }
}
</style>