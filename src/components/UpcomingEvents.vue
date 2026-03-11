<template>
  <div class="bg-white rounded-xl border border-border p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xs font-semibold text-text-secondary uppercase tracking-wide">Upcoming</h2>
      <button
        @click="$emit('addEvent')"
        class="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer"
      >
        + Add Event
      </button>
    </div>
    <div v-if="events.length === 0" class="text-sm text-text-secondary text-center py-4">
      No upcoming events
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
            {{ event.type }} &middot; {{ event.company }}
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
defineProps({
  events: Array,
})
defineEmits(['addEvent'])

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

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
