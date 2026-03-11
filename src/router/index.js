import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCurrentUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub()
      resolve(user)
    })
  })
}

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser()
    const isGuest = sessionStorage.getItem('guestMode') === 'true'
    if (!user && !isGuest) return { name: 'Login' }
  }
  if (to.name === 'Login') {
    const user = await getCurrentUser()
    if (user) return { name: 'Dashboard' }
  }
})

export default router
