<template>
  <div class="bg-white rounded-xl border border-border p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">{{ t('upcoming') }}</h2>
      <button
        @click="$emit('addEvent')"
        class="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer"
      >
        {{ t('addEvent') }}
      </button>
    </div>
    <div v-if="events.length === 0" class="text-sm text-text-secondary text-center py-4">
      {{ t('noUpcomingEvents') }}
    </div>
    <div v-else class="space-y-3">
      <div
        v-for="event in events"
        :key="event.id"
        class="flex items-center gap-3 p-3 rounded-lg bg-surface"
      >
        <div class="w-1 h-10 rounded-full shrink-0" :class="typeColor(event.type)"></div>
        <div class="min-w-0 flex-1">
          <p class="font-medium text-sm text-text-primary truncate">
            {{ translateEventType(event.type) }} &middot; {{ event.company }}
          </p>
          <p class="text-xs text-text-secondary">
            {{ formatDate(event.date) }} &middot; {{ event.time }}
          </p>
        </div>
        <span class="w-2 h-2 rounded-full shrink-0" :class="typeColor(event.type)"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'
import { useLanguage } from '../composables/useLanguage'
import { EVENT_TYPE_LABEL_KEYS } from '../composables/useEvents'

const { t } = useI18n()
const { lang } = useLanguage()

defineProps({
  events: Array,
})
defineEmits(['addEvent'])

function translateEventType(type) {
  const key = EVENT_TYPE_LABEL_KEYS[type]
  return key ? t(key) : type
}

function typeColor(type) {
  const map = {
    'Phone Screen': 'bg-status-phone',
    'Technical Interview': 'bg-status-interview',
    'Behavioral Interview': 'bg-status-interview',
    'Design Round': 'bg-accent',
    'Final Round': 'bg-status-offer',
    'Take Home': 'bg-status-applied',
    Other: 'bg-gray-400',
  }
  return map[type] || 'bg-gray-400'
}

const AZ_MONTHS_SHORT = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn',
  'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek',
]

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  if (lang.value === 'az') {
    return `${AZ_MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
