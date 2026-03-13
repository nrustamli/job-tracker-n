<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="fixed inset-0 bg-black/40" @click="$emit('close')"></div>
    <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text-primary">{{ t('newEvent') }}</h2>
        <button @click="$emit('close')" class="text-text-secondary hover:text-text-primary cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSave" class="p-6 space-y-4">
        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('eventType') }}</label>
          <select
            v-model="form.type"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option v-for="et in eventTypeOptions" :key="et.value" :value="et.value">{{ et.label }}</option>
          </select>
        </div>

        <!-- Company -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('company') }}</label>
          <select
            v-if="applications.length"
            v-model="form.company"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option value="" disabled>{{ t('selectCompany') }}</option>
            <option v-for="app in uniqueCompanies" :key="app" :value="app">{{ app }}</option>
          </select>
          <input
            v-else
            v-model="form.company"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            :placeholder="t('companyName')"
          />
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('date') }}</label>
          <input
            v-model="form.date"
            type="date"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('time') }}</label>
          <input
            v-model="form.time"
            type="time"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <!-- Note (optional) -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('noteOptional') }}</label>
          <textarea
            v-model="form.note"
            rows="2"
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            :placeholder="t('addNotePlaceholder')"
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm text-text-secondary hover:text-text-primary cursor-pointer"
          >
            {{ t('cancel') }}
          </button>
          <button
            type="submit"
            class="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
          >
            {{ t('addEventBtn') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { EVENT_TYPES, EVENT_TYPE_LABEL_KEYS } from '../composables/useEvents'
import { useI18n } from '../i18n'

const { t } = useI18n()

const props = defineProps({
  applications: Array,
})
const emit = defineEmits(['close', 'save'])

const eventTypeOptions = computed(() =>
  EVENT_TYPES.map((type) => ({
    value: type,
    label: t(EVENT_TYPE_LABEL_KEYS[type]),
  }))
)

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
