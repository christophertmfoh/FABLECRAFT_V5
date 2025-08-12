<template>
  <DashboardWidget
    title="Writing Goals"
    subtitle="Track your progress"
    icon="lucide:target"
    icon-color="primary"
  >
    <template #actions>
      <Button
        variant="ghost"
        size="sm"
        class="h-8"
        @click="$emit('view-stats')"
      >
        <Icon name="lucide:bar-chart-2" class="h-4 w-4" />
      </Button>
    </template>
    
    <div class="space-y-4">
      <!-- Daily Goal -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <Text size="sm" class="text-muted-foreground">Daily Goal</Text>
          <Text size="sm" class="font-medium text-foreground">750 / 1000 words</Text>
        </div>
        <div class="h-2 bg-muted rounded-full overflow-hidden">
          <div class="h-full bg-primary transition-all" style="width: 75%"></div>
        </div>
      </div>
      
      <!-- Weekly Goal -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <Text size="sm" class="text-muted-foreground">Weekly Goal</Text>
          <Text size="sm" class="font-medium text-foreground">3,200 / 5000 words</Text>
        </div>
        <div class="h-2 bg-muted rounded-full overflow-hidden">
          <div class="h-full bg-primary transition-all" style="width: 64%"></div>
        </div>
      </div>
      
      <!-- Writing Streak -->
      <div class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div class="flex items-center gap-2">
          <Icon name="lucide:flame" class="h-5 w-5 text-orange-500" />
          <Text size="sm" class="font-medium text-foreground">Writing Streak</Text>
        </div>
        <Text size="lg" class="font-bold text-primary">7 days</Text>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
defineEmits<{
  'view-stats': []
}>()
</script>