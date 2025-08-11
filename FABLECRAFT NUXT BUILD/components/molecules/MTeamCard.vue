<template>
  <div class="group relative">
    <!-- Card Container -->
    <div class="relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-500 group-hover:opacity-20"
           :class="gradientClasses" />
      
      <!-- Glass Card -->
      <GlassCard variant="light" class="relative p-6 h-full natural-depth">
        <!-- Avatar Section -->
        <div class="flex flex-col items-center text-center">
          <!-- Avatar Container with animation -->
          <div class="relative mb-4 transform transition-transform duration-500 group-hover:scale-110">
            <!-- Avatar Background -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-background/50 shadow-xl">
                <img 
                  v-if="avatar" 
                  :src="avatar" 
                  :alt="`${name} - ${role}`"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gradient-to-br flex items-center justify-center"
                     :class="gradientClasses">
                  <Icon :name="avatarIcon" class="h-12 w-12 text-background/80" />
                </div>
              </div>
              
              <!-- Status Indicator -->
              <div v-if="showStatus" 
                   class="absolute bottom-1 right-1 w-7 h-7 rounded-full border-2 border-background flex items-center justify-center transition-all duration-300"
                   :class="statusClasses">
                <Icon name="lucide:check" class="h-3.5 w-3.5 text-background" />
              </div>
            </div>
            
            <!-- Hover Ring Effect -->
            <div class="absolute inset-0 rounded-full border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/30 group-hover:scale-110" />
          </div>
          
          <!-- Name -->
          <Heading tag="h3" size="h5" class="text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
            {{ name }}
          </Heading>
          
          <!-- Role -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 transition-all duration-300"
               :class="roleClasses">
            <Icon v-if="roleIcon" :name="roleIcon" class="h-3.5 w-3.5" />
            <Text size="sm" class="font-semibold">{{ role }}</Text>
          </div>
          
          <!-- Bio -->
          <Text size="sm" class="text-muted-foreground leading-relaxed mb-4">
            {{ bio }}
          </Text>
          
          <!-- Social Links -->
          <div v-if="socials && socials.length > 0" class="flex items-center gap-2">
            <button
              v-for="social in socials"
              :key="social.platform"
              :aria-label="`${name}'s ${social.platform} profile`"
              @click="handleSocialClick(social)"
              class="w-9 h-9 rounded-full bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
            >
              <Icon :name="getSocialIcon(social.platform)" class="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </button>
          </div>
          
          <!-- Experience Badge (optional) -->
          <div v-if="experience" class="mt-4 pt-4 border-t border-border/20 w-full">
            <div class="flex items-center justify-center gap-2">
              <Icon name="lucide:award" class="h-4 w-4 text-primary/60" />
              <Text size="xs" class="text-muted-foreground">{{ experience }}</Text>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute -top-2 -right-2 w-20 h-20 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
         :class="decorativeClasses" />
    <div class="absolute -bottom-2 -left-2 w-24 h-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-20"
         :class="decorativeClasses" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Social {
  platform: 'linkedin' | 'twitter' | 'github' | 'email' | 'website'
  url: string
}

interface TeamCardProps {
  name: string
  role: string
  bio: string
  avatar?: string
  avatarIcon?: string
  roleIcon?: string
  experience?: string
  socials?: Social[]
  variant?: 'primary' | 'accent' | 'secondary'
  showStatus?: boolean
}

const props = withDefaults(defineProps<TeamCardProps>(), {
  avatarIcon: 'lucide:user',
  variant: 'primary',
  showStatus: true
})

const emit = defineEmits<{
  'social:click': [social: Social]
}>()

// Computed classes based on variant
const gradientClasses = computed(() => {
  const variants = {
    primary: 'from-primary/20 to-accent/20',
    accent: 'from-accent/20 to-secondary/20',
    secondary: 'from-secondary/20 to-primary/20'
  }
  return variants[props.variant]
})

const roleClasses = computed(() => {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20'
  }
  return variants[props.variant]
})

const statusClasses = computed(() => {
  const variants = {
    primary: 'bg-success',
    accent: 'bg-success',
    secondary: 'bg-success'
  }
  return variants[props.variant]
})

const decorativeClasses = computed(() => {
  const variants = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    secondary: 'bg-secondary'
  }
  return variants[props.variant]
})

// Get social icon based on platform
const getSocialIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    linkedin: 'lucide:linkedin',
    twitter: 'lucide:twitter',
    github: 'lucide:github',
    email: 'lucide:mail',
    website: 'lucide:globe'
  }
  return icons[platform] || 'lucide:link'
}

// Handle social click
const handleSocialClick = (social: Social) => {
  emit('social:click', social)
  if (social.url) {
    window.open(social.url, '_blank', 'noopener,noreferrer')
  }
}
</script>