import { ref, onMounted } from 'vue'
import { auth, googleProvider } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

const user = ref(null)
const loading = ref(true)

export function useAuth() {
  onMounted(() => {
    onAuthStateChanged(auth, (u) => {
      user.value = u
      loading.value = false
    })
  })

  async function loginWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { user, loading, loginWithGoogle, logout }
}
