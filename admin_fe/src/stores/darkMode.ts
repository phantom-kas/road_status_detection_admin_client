import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useDarkMode = defineStore('darkMode', () => {
  const isDark = useLocalStorage('isDark', ref(true))

  function toggle() {
    isDark.value = !isDark.value
  }

  return { toggle, isDark }
})
