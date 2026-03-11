<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      @click="$emit('update', 'ALL')"
      :class="[
        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer',
        active === 'ALL'
          ? 'text-primary border-b-2 border-primary'
          : 'text-text-secondary hover:text-text-primary'
      ]"
    >
      All
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      @click="$emit('update', tag.toUpperCase())"
      :class="[
        'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors uppercase tracking-wide cursor-pointer',
        active === tag.toUpperCase()
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
      ]"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  active: String,
  tags: Array,
})
defineEmits(['update'])
</script>
