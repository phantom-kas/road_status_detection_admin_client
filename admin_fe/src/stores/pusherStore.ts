// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Pusher from 'pusher-js'
//import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { usePushertore } from './usePuserStore'
import { dashboardStore } from './dashboardStore'
import { useRoute } from 'vue-router'
import { pageFiller } from '../stores/pageFillerStore'

export const pusherStore = defineStore('pusherStore', () => {
  const dash = dashboardStore()
  const route = useRoute()
  const pageContent = pageFiller()
  const pusherStore = usePushertore()
  const pusher = new Pusher('c00790363bec04452136', {
    cluster: 'us3'
  })

  const connectPusher = () => {
    const channel = pusher.subscribe('new_updates')
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('subscription succeeded')
      pusherStore.setScokrt_id(pusher.connection.socket_id)
      console.log('subscription succeeded')
    })

    channel.bind('msg', (msg: any) => {
      console.log(msg)
      console.log(route.name)
      if (route.name == 'all__logs' || route.name == 'all_logs') {
        pageContent.add(msg)
        console.log('---------------------------------------------------')
      }
      dash.updateDashboard(msg)
      dash.key = dash.key + 1
    })
  }

  const disconnetPusher = () => {
    pusher.unsubscribe('new_updates')
  }
  return {
    connectPusher,
    disconnetPusher
  }
})
