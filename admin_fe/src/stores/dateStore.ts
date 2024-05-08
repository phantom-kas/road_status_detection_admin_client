import { defineStore } from 'pinia'

export const useDateStore = defineStore('useDateStore', {
  // state:()=>({
  //   routTitle:''
  // }),
  actions: {
    getLocalTime(dataTime: string) {
      const d = new Date(dataTime + ' UTC')
      //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const text = d.toLocaleString()
      return text
    },
    getLocalTimeInWords(dataTime: string, options = { dateStyle: 'full' }) {
      const d = new Date(dataTime + ' UTC')
      //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const text = d.toLocaleString(undefined, <any>options)
      return text
    }
  }
})
