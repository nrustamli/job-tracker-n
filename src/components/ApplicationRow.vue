<template>
  <div
    @click="$emit('click')"
    class="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
  >
    <div class="min-w-0">
      <h3 class="font-semibold text-text-primary truncate">{{ application.title }}</h3>
      <div class="flex items-center gap-2 mt-0.5">
        <span class="text-sm text-text-secondary">{{ application.company }}</span>
        <span
          v-for="tag in application.tags"
          :key="tag"
          class="text-[10px] font-bold uppercase tracking-wider text-accent"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0 ml-4">
      <span
        class="w-2.5 h-2.5 rounded-full"
        :class="statusColor"
      ></span>
      <span class="text-sm text-text-secondary hidden sm:inline">{{ statusLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STATUSES } from '../composables/useApplications'

const props = defineProps({
  application: Object,
})
defineEmits(['click'])

const status = computed(() => STATUSES.find((s) => s.key === props.application.status))
const statusColor = computed(() => status.value?.color || 'bg-gray-400')
const statusLabel = computed(() => status.value?.label || props.application.status)
</script>
