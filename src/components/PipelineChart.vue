<template>
  <div class="bg-white rounded-xl border border-border p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-text-primary">{{ t('pipeline') }}</h2>
      <span class="text-xs text-text-secondary uppercase tracking-wide">{{ total }} {{ t('total') }}</span>
    </div>
    <div class="space-y-2.5">
      <div v-for="s in visibleStatuses" :key="s.key" class="flex items-center gap-3">
        <span class="w-2 h-2 rounded-full shrink-0" :class="s.color"></span>
        <span class="text-sm text-text-primary w-24 shrink-0">{{ t(s.labelKey) }}</span>
        <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="s.barColor"
            :style="{ width: barWidth(s.key) }"
          ></div>
        </div>
        <span class="text-sm text-text-secondary w-6 text-right">{{ counts[s.key] }}</span>
      </div>
    </div>
    <!-- Rejected / Ghosted counts inline -->
    <div class="flex gap-4 mt-3 pt-3 border-t border-border">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-status-rejected"></span>
        <span class="text-xs text-text-secondary">{{ t('rejected') }} {{ counts.rejected }}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-status-ghosted"></span>
        <span class="text-xs text-text-secondary">{{ t('ghosted') }} {{ counts.ghosted }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STATUSES, STATUS_LABEL_KEYS } from '../composables/useApplications'
import { useI18n } from '../i18n'

const { t } = useI18n()

const props = defineProps({
  counts: Object,
  total: Number,
})

const visibleStatuses = computed(() =>
  STATUSES.filter((s) => !['rejected', 'ghosted'].includes(s.key)).map((s) => ({
    ...s,
    labelKey: STATUS_LABEL_KEYS[s.key],
    barColor: {
      applied: 'bg-status-applied',
      phone: 'bg-status-phone',
      interview: 'bg-status-interview',
      offer: 'bg-status-offer',
    }[s.key],
  }))
)

function barWidth(key) {
  if (!props.total) return '0%'
  return Math.round((props.counts[key] / props.total) * 100) + '%'
}
</script>
