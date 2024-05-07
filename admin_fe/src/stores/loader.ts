import { defineStore } from 'pinia'
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false,
    loading2: false,
    duration: 200,
    min: 'dsadas'
  }),
  getters: {
    isLoading(): boolean {
      return this.loading
    },
    isLoading2(): boolean {
      return this.loading2
    },
    getDuration(): number {
      return this.duration
    }
  },
  actions: {
    start() {
      this.loading = true
    },
    start2() {
      this.loading2 = true
    },
    stop() {
      this.loading = false
    },
    stop2() {
      this.loading2 = false
    }
  }
})
