<template>
  <div class="dashboard-widget relative">
    <Card class="h-full">
      <!-- Header -->
      <div class="p-4 border-b border-border/50">
        <div class="flex items-start justify-between">
          <div class="flex items-start gap-3">
            <div v-if="icon" class="mt-0.5">
              <Icon 
                :name="icon" 
                class="h-5 w-5"
                :class="iconColorClass"
              />
            </div>
            <div>
              <Heading tag="h3" size="h5" class="text-foreground">
                {{ title }}
              </Heading>
              <Text v-if="subtitle" size="xs" class="text-muted-foreground mt-0.5">
                {{ subtitle }}
              </Text>
            </div>
          </div>
          <div v-if="$slots.actions" class="flex items-center gap-1">
            <slot name="actions" />
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-8">
          <Icon name="lucide:loader-2" class="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8">
          <Icon name="lucide:alert-circle" class="h-8 w-8 text-destructive mx-auto mb-2" />
          <Text size="sm" class="text-destructive">
            {{ error }}
          </Text>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="empty" class="text-center py-8">
          <Icon 
            :name="emptyIcon || 'lucide:inbox'" 
            class="h-8 w-8 text-muted-foreground/50 mx-auto mb-3"
          />
          <Text size="sm" class="font-medium text-muted-foreground mb-1">
            {{ emptyTitle || 'No data' }}
          </Text>
          <Text size="xs" class="text-muted-foreground/70 mb-3">
            {{ emptyMessage || 'Nothing to show yet' }}
          </Text>
          <div v-if="$slots['empty-action']" class="mt-4">
            <slot name="empty-action" />
          </div>
        </div>
        
        <!-- Main Content -->
        <div v-else>
          <slot />
        </div>
      </div>
      
      <!-- Footer -->
      <div v-if="$slots.footer" class="px-4 pb-4">
        <slot name="footer" />
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon?: string
  iconColor?: 'primary' | 'secondary' | 'destructive' | 'muted'
  loading?: boolean
  error?: string | null
  empty?: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
  loading: false,
  error: null,
  empty: false
})

const iconColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    destructive: 'text-destructive',
    muted: 'text-muted-foreground'
  }
  return colors[props.iconColor]
})
</script>

<style scoped>
.dashboard-widget {
  @apply transition-all;
}

.dashboard-widget:hover {
  @apply scale-[1.01];
}
</style>