<template>
  <div class="min-h-screen bg-surface">
    <!-- Header -->
    <header class="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl sm:text-3xl font-bold text-primary">My Path</h1>
          <span class="text-xs text-text-secondary font-medium tracking-wide uppercase">
            {{ activeCount }} Active
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="handleAddClick"
            class="bg-accent hover:bg-accent-light text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline">Add Application</span>
          </button>
          <!-- Signed-in: avatar menu -->
          <div v-if="user" class="relative" ref="menuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium cursor-pointer"
            >
              {{ user.displayName?.[0] || '?' }}
            </button>
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-1 z-50"
            >
              <p class="px-4 py-2 text-sm text-text-secondary truncate">{{ user.email }}</p>
              <hr class="border-border" />
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
          <!-- Guest: sign in button -->
          <button
            v-else
            @click="goToLogin"
            class="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Panel: Applications List -->
        <div class="lg:w-3/5">
          <!-- Filter Tabs -->
          <FilterTabs
            :active="activeFilter"
            :tags="allTags"
            @update="activeFilter = $event"
          />

          <!-- Application List -->
          <div class="mt-4 bg-white rounded-xl border border-border divide-y divide-border">
            <ApplicationRow
              v-for="app in filteredApplications"
              :key="app.id"
              :application="app"
              @click="openEditModal(app)"
            />
            <div
              v-if="filteredApplications.length === 0"
              class="px-6 py-12 text-center text-text-secondary"
            >
              <p class="text-lg">No applications yet</p>
              <p class="text-sm mt-1">Click "Add Application" to get started</p>
            </div>
          </div>
        </div>

        <!-- Right Panel: Pipeline + Calendar -->
        <div class="lg:w-2/5 space-y-6">
          <PipelineChart
            :counts="pipelineCounts"
            :total="applications.length"
          />
          <CalendarWidget
            :events="events"
            :eventsForDate="eventsForDate"
          />
          <UpcomingEvents
            :events="upcomingEvents"
            @addEvent="showEventModal = true"
          />
        </div>
      </div>
    </main>

    <!-- Modals -->
    <ApplicationModal
      v-if="showAddModal"
      :allTags="allTags"
      @close="showAddModal = false"
      @save="handleAddApplication"
    />
    <ApplicationModal
      v-if="showEditModal"
      :application="editingApp"
      :allTags="allTags"
      @close="showEditModal = false"
      @save="handleUpdateApplication"
      @delete="handleDeleteApplication"
    />
    <EventModal
      v-if="showEventModal"
      :applications="applications"
      @close="showEventModal = false"
      @save="handleAddEvent"
    />
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAuth } from '../composables/useAuth'
import { useApplications } from '../composables/useApplications'
import { useEvents } from '../composables/useEvents'
import { useRouter } from 'vue-router'
import FilterTabs from '../components/FilterTabs.vue'
import ApplicationRow from '../components/ApplicationRow.vue'
import PipelineChart from '../components/PipelineChart.vue'
import CalendarWidget from '../components/CalendarWidget.vue'
import UpcomingEvents from '../components/UpcomingEvents.vue'
import ApplicationModal from '../components/ApplicationModal.vue'
import EventModal from '../components/EventModal.vue'

const router = useRouter()
const { user, logout: authLogout } = useAuth()
const userId = ref(user.value?.uid)

const {
  applications,
  filteredApplications,
  activeFilter,
  activeCount,
  pipelineCounts,
  allTags,
  subscribe: subApps,
  stopListening: stopApps,
  addApplication,
  updateApplication,
  deleteApplication,
} = useApplications(userId)

const {
  events,
  upcomingEvents,
  eventsForDate,
  subscribe: subEvents,
  stopListening: stopEvents,
  addEvent,
} = useEvents(userId)

watch(user, (u) => {
  userId.value = u?.uid
  if (u) {
    subApps()
    subEvents()
  } else {
    stopApps()
    stopEvents()
  }
}, { immediate: true })

onUnmounted(() => {
  stopApps()
  stopEvents()
})

const showAddModal = ref(false)
const showEditModal = ref(false)
const showEventModal = ref(false)
const showUserMenu = ref(false)
const editingApp = ref(null)
const menuRef = ref(null)

onClickOutside(menuRef, () => { showUserMenu.value = false })

function openEditModal(app) {
  editingApp.value = app
  showEditModal.value = true
}

async function handleAddApplication(data) {
  await addApplication(data)
  showAddModal.value = false
}

async function handleUpdateApplication(data) {
  const id = editingApp.value.id
  await updateApplication(id, data)
  showEditModal.value = false
  editingApp.value = null
}

async function handleDeleteApplication() {
  const id = editingApp.value.id
  await deleteApplication(id)
  showEditModal.value = false
  editingApp.value = null
}

async function handleAddEvent(data) {
  await addEvent(data)
  showEventModal.value = false
}

function handleAddClick() {
  if (!user.value) {
    router.push('/login')
    return
  }
  showAddModal.value = true
}

function goToLogin() {
  sessionStorage.removeItem('guestMode')
  router.push('/login')
}

async function logout() {
  await authLogout()
  router.push('/login')
}
</script>
