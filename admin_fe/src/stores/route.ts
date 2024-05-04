import { defineStore } from 'pinia'
export const useRTStore = defineStore('RT', {
  state: () => ({
    routTitle: ''
  }),
  getters: {
    getTitle(): string {
      return this.routTitle
    }
  },
  actions: {
    setTitle(v: string): void {
      this.routTitle = v
    }
  }
})
