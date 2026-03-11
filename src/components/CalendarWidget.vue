<template>
  <div class="bg-white rounded-xl border border-border p-5">
    <!-- Month header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-text-primary">{{ monthLabel }}</h2>
      <div class="flex gap-1">
        <button @click="changeMonth(-1)" class="p-1 hover:bg-gray-100 rounded cursor-pointer">
          <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="changeMonth(1)" class="p-1 hover:bg-gray-100 rounded cursor-pointer">
          <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Day headers -->
    <div class="grid grid-cols-7 text-center text-xs text-text-secondary font-medium mb-2">
      <span v-for="d in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="d">{{ d }}</span>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 text-center text-sm">
      <div v-for="(day, i) in calendarDays" :key="i" class="py-1.5 relative">
        <template v-if="day">
          <span
            :class="[
              'inline-flex items-center justify-center w-7 h-7 rounded-full text-sm',
              day.isToday ? 'bg-primary text-white font-semibold' : '',
              day.isWeekend && !day.isToday ? 'text-text-secondary/50' : '',
            ]"
          >
            {{ day.number }}
          </span>
          <!-- Event dots -->
          <div v-if="day.events.length" class="flex justify-center gap-0.5 mt-0.5">
            <span
              v-for="(evt, j) in day.events.slice(0, 3)"
              :key="j"
              class="w-1 h-1 rounded-full"
              :class="eventDotColor(evt)"
            ></span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: Array,
  eventsForDate: Function,
})

const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const monthLabel = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

function changeMonth(delta) {
  const d = new Date(currentYear.value, currentMonth.value + delta)
  currentMonth.value = d.getMonth()
  currentYear.value = d.getFullYear()
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const today = new Date()

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayOfWeek = new Date(currentYear.value, currentMonth.value, d).getDay()
    days.push({
      number: d,
      dateStr,
      isToday:
        d === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear(),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      events: props.eventsForDate(dateStr),
    })
  }
  return days
})

function eventDotColor(evt) {
  const map = {
    'Phone Screen': 'bg-status-phone',
    'Technical Interview': 'bg-status-interview',
    'Behavioral Interview': 'bg-status-interview',
    'Design Round': 'bg-accent',
    'Final Round': 'bg-status-offer',
    'Take Home': 'bg-status-applied',
    Other: 'bg-gray-400',
  }
  return map[evt.type] || 'bg-gray-400'
}
</script>
