<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="fixed inset-0 bg-black/40" @click="$emit('close')"></div>
    <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text-primary">
          {{ application ? t('editApplication') : t('newApplication') }}
        </h2>
        <button @click="$emit('close')" class="text-text-secondary hover:text-text-primary cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSave" class="p-6 space-y-4">
        <!-- Job Title -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('jobTitle') }}</label>
          <input
            v-model="form.title"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            :placeholder="t('jobTitlePlaceholder')"
          />
        </div>

        <!-- Company -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('company') }}</label>
          <input
            v-model="form.company"
            required
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            :placeholder="t('companyPlaceholder')"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('status') }}</label>
          <select
            v-model="form.status"
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option v-for="s in STATUSES" :key="s.key" :value="s.key">{{ t(STATUS_LABEL_KEYS[s.key]) }}</option>
          </select>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('tags') }}</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
            >
              {{ tag }}
              <button type="button" @click="removeTag(tag)" class="hover:text-red-500 cursor-pointer">&times;</button>
            </span>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              class="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              :placeholder="t('addTagPlaceholder')"
            />
            <button
              type="button"
              @click="addTag"
              class="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              {{ t('add') }}
            </button>
          </div>
          <!-- Suggested tags from existing -->
          <div v-if="suggestedTags.length" class="flex flex-wrap gap-1 mt-2">
            <button
              v-for="tag in suggestedTags"
              :key="tag"
              type="button"
              @click="form.tags.push(tag)"
              class="text-xs px-2 py-0.5 bg-gray-50 border border-border rounded-full text-text-secondary hover:bg-gray-100 cursor-pointer"
            >
              + {{ tag }}
            </button>
          </div>
        </div>

        <!-- Salary Range -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">{{ t('minSalary') }}</label>
            <input
              v-model.number="form.salaryMin"
              type="number"
              class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="e.g. 120000"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">{{ t('maxSalary') }}</label>
            <input
              v-model.number="form.salaryMax"
              type="number"
              class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="e.g. 160000"
            />
          </div>
        </div>

        <!-- URL -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('jobUrl') }}</label>
          <input
            v-model="form.url"
            type="url"
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="https://..."
          />
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">{{ t('notes') }}</label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            :placeholder="t('notesPlaceholder')"
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-2">
          <button
            v-if="application"
            type="button"
            @click="$emit('delete')"
            class="text-sm text-red-500 hover:text-red-700 cursor-pointer"
          >
            {{ t('deleteApplication') }}
          </button>
          <span v-else></span>
          <div class="flex gap-2">
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
              {{ application ? t('update') : t('add') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { STATUSES, STATUS_LABEL_KEYS } from '../composables/useApplications'
import { useI18n } from '../i18n'

const { t } = useI18n()

const props = defineProps({
  application: Object,
  allTags: Array,
})
const emit = defineEmits(['close', 'save', 'delete'])

const form = reactive({
  title: props.application?.title || '',
  company: props.application?.company || '',
  status: props.application?.status || 'applied',
  tags: [...(props.application?.tags || [])],
  salaryMin: props.application?.salaryMin || null,
  salaryMax: props.application?.salaryMax || null,
  url: props.application?.url || '',
  notes: props.application?.notes || '',
})

const newTag = ref('')

const suggestedTags = computed(() =>
  (props.allTags || []).filter((t) => !form.tags.includes(t))
)

function addTag() {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  newTag.value = ''
}

function removeTag(tag) {
  form.tags = form.tags.filter((t) => t !== tag)
}

function handleSave() {
  emit('save', { ...form })
}
</script>
