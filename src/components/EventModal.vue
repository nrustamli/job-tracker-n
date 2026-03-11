<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="fixed inset-0 bg-black/40" @click="$emit('close')"></div>
    <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text-primary">New Event</h2>
        <button @click="$emit('close')" class="text-text-secondary hover:text-text-primary cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSave" class="p-6 space-y-4">
        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Event Type *</label>
          <select
            v-model="form.type"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option v-for="t in EVENT_TYPES" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <!-- Company -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Company *</label>
          <select
            v-if="applications.length"
            v-model="form.company"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option value="" disabled>Select company</option>
            <option v-for="app in uniqueCompanies" :key="app" :value="app">{{ app }}</option>
          </select>
          <input
            v-else
            v-model="form.company"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Company name"
          />
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Date *</label>
          <input
            v-model="form.date"
            type="date"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Time *</label>
          <input
            v-model="form.time"
            type="time"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <!-- Note (optional) -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Note (optional)</label>
          <textarea
            v-model="form.note"
            rows="2"
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            placeholder="Add a note..."
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { EVENT_TYPES } from '../composables/useEvents'

const props = defineProps({
  applications: Array,
})
const emit = defineEmits(['close', 'save'])

const form = reactive({
  type: EVENT_TYPES[0],
  company: '',
  date: '',
  time: '',
  note: '',
})

const uniqueCompanies = computed(() =>
  [...new Set(props.applications.map((a) => a.company))].sort()
)

function handleSave() {
  emit('save', { ...form })
}
</script>
