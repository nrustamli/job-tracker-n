import { ref, computed } from 'vue'
import { db } from '../firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

const applications = ref([])
const activeFilter = ref('ALL')
let unsubscribe = null

export const STATUSES = [
  { key: 'applied', label: 'Applied', color: 'bg-status-applied' },
  { key: 'phone', label: 'Phone Screen', color: 'bg-status-phone' },
  { key: 'interview', label: 'Interviews', color: 'bg-status-interview' },
  { key: 'offer', label: 'Offer', color: 'bg-status-offer' },
  { key: 'rejected', label: 'Rejected', color: 'bg-status-rejected' },
  { key: 'ghosted', label: 'Ghosted', color: 'bg-status-ghosted' },
]

export const STATUS_LABEL_KEYS = {
  applied: 'applied',
  phone: 'phoneScreen',
  interview: 'interviews',
  offer: 'offer',
  rejected: 'rejected',
  ghosted: 'ghosted',
}

export function useApplications(userId) {
  function subscribe() {
    if (unsubscribe) unsubscribe()
    if (!userId.value) return

    const q = query(
      collection(db, 'applications'),
      where('userId', '==', userId.value),
      orderBy('createdAt', 'desc')
    )

    unsubscribe = onSnapshot(q, (snapshot) => {
      applications.value = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
    })
  }

  function stopListening() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  const filteredApplications = computed(() => {
    if (activeFilter.value === 'ALL') return applications.value
    return applications.value.filter((app) =>
      app.tags?.some((t) => t.toUpperCase() === activeFilter.value.toUpperCase())
    )
  })

  const activeCount = computed(
    () => applications.value.filter((a) => !['rejected', 'ghosted'].includes(a.status)).length
  )

  const pipelineCounts = computed(() => {
    const counts = {}
    for (const s of STATUSES) counts[s.key] = 0
    for (const app of applications.value) {
      if (counts[app.status] !== undefined) counts[app.status]++
    }
    return counts
  })

  const allTags = computed(() => {
    const tagSet = new Set()
    for (const app of applications.value) {
      if (app.tags) app.tags.forEach((t) => tagSet.add(t))
    }
    return [...tagSet].sort()
  })

  async function addApplication(data) {
    await addDoc(collection(db, 'applications'), {
      ...data,
      userId: userId.value,
      createdAt: serverTimestamp(),
    })
  }

  async function updateApplication(id, data) {
    await updateDoc(doc(db, 'applications', id), data)
  }

  async function deleteApplication(id) {
    await deleteDoc(doc(db, 'applications', id))
  }

  return {
    applications,
    filteredApplications,
    activeFilter,
    activeCount,
    pipelineCounts,
    allTags,
    subscribe,
    stopListening,
    addApplication,
    updateApplication,
    deleteApplication,
  }
}
