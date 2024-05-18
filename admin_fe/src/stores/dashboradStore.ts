// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import axios from 'axios'
export const dashboardStore = defineStore('dashboardStore', () => {
  const detectsCount = ref<any>({ cars: 11, people: 0, potholes: 0, animals: 0, debris: 0 })
  const getDashBord = () => {
    axios
      .get('', '')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return { detectsCount }
})
