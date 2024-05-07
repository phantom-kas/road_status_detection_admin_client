// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
export const useAlertStore = defineStore('alerts', () => {
  interface alert {
    status: string
    message: string
    type: string
    key: number
    lgo: string | undefined
  }
  const alerts = ref<alert[]>(<alert[]>(<unknown>useLocalStorage('alerts', [])))

  const alerts_id = ref(useLocalStorage('alerts_id', 0))

  const getgetalerts = computed(() => alerts.value)

  const addAlert = (message: string, status: string, type: string, lgo?: string) => {
    const id = ++alerts_id.value
    if (id > 100000000000) {
      alerts_id.value = 0
    }
    alerts.value.unshift({ status: status, message: message, type: type, key: id, lgo: 'd' })
  }

  const remove = (index: number) => {
    alerts.value.splice(index, 1)
  }
  return { alerts, remove, getgetalerts, addAlert, alerts_id }
})
