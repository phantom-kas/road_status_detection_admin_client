import { defineStore } from 'pinia'
export const usePushertore = defineStore('pusher', {
  state: () => ({
    socket_id: ''
  }),
  getters: {
    getsocket_id(): string {
      return this.socket_id
    }
  },
  actions: {
    setScokrt_id(v: string) {
      this.socket_id = v
    }
  }
})
