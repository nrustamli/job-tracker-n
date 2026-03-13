import { ref, computed } from 'vue'

const currentLang = ref(localStorage.getItem('appLang') || 'en')

export function useLanguage() {
  function setLang(lang) {
    currentLang.value = lang
    localStorage.setItem('appLang', lang)
  }

  function toggle() {
    setLang(currentLang.value === 'en' ? 'az' : 'en')
  }

  return {
    lang: currentLang,
    setLang,
    toggle,
  }
}
