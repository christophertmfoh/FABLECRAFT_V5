<template>
  <DashboardWidget
    title="Daily Inspiration"
    subtitle="AI-generated content for writers"
    icon="lucide:sparkles"
    icon-color="primary"
  >
    <div class="space-y-4">
      <div class="p-4 bg-muted/30 rounded-lg">
        <Text size="sm" class="text-muted-foreground mb-2">Writing Tip</Text>
        <Text size="base" class="text-foreground">
          "The first draft is just you telling yourself the story." - Terry Pratchett
        </Text>
      </div>
      <div class="flex justify-center">
        <Button variant="ghost" size="sm">
          <Icon name="lucide:refresh-cw" class="h-4 w-4 mr-2" />
          Generate New
        </Button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
// Placeholder for AI content widget
</script>