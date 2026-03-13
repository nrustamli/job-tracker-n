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

const events = ref([])
let unsubscribe = null

export const EVENT_TYPES = [
  'Phone Screen',
  'Technical Interview',
  'Behavioral Interview',
  'Design Round',
  'Final Round',
  'Take Home',
  'Other',
]

export const EVENT_TYPE_LABEL_KEYS = {
  'Phone Screen': 'phoneScreen',
  'Technical Interview': 'technicalInterview',
  'Behavioral Interview': 'behavioralInterview',
  'Design Round': 'designRound',
  'Final Round': 'finalRound',
  'Take Home': 'takeHome',
  'Other': 'other',
}

export function useEvents(userId) {
  function subscribe() {
    if (unsubscribe) unsubscribe()
    if (!userId.value) return

    const q = query(
      collection(db, 'events'),
      where('userId', '==', userId.value),
      orderBy('date', 'asc')
    )

    unsubscribe = onSnapshot(q, (snapshot) => {
      events.value = snapshot.docs.map((d) => ({
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

  const upcomingEvents = computed(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return events.value
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  function eventsForDate(dateStr) {
    return events.value.filter((e) => e.date === dateStr)
  }

  async function addEvent(data) {
    await addDoc(collection(db, 'events'), {
      ...data,
      userId: userId.value,
      createdAt: serverTimestamp(),
    })
  }

  async function updateEvent(id, data) {
    await updateDoc(doc(db, 'events', id), data)
  }

  async function deleteEvent(id) {
    await deleteDoc(doc(db, 'events', id))
  }

  return {
    events,
    upcomingEvents,
    eventsForDate,
    subscribe,
    stopListening,
    addEvent,
    updateEvent,
    deleteEvent,
  }
}
