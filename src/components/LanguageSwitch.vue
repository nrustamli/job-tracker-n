<template>
  <button
    @click="toggle"
    class="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium cursor-pointer select-none"
    :title="lang === 'en' ? 'Switch to Azerbaijani' : 'İngiliscəyə keç'"
  >
    <span class="text-base leading-none">{{ lang === 'en' ? '🇬🇧' : '🇦🇿' }}</span>
    <span class="text-xs text-text-secondary uppercase tracking-wide">{{ lang === 'en' ? 'EN' : 'AZ' }}</span>
  </button>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { lang, toggle } = useLanguage()
</script>
