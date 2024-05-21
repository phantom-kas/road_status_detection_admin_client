// const url = ()=>new URL('/node_modules/pusher-js/dist/node/pusher.js',import.meta.url)
import Pusher, { type Options } from 'pusher-js'
import type { App } from 'vue'

interface aa {
  apiKey: string
  options: Options
}

export default (app: App<Element>, { apiKey, options }: aa) => {
  // const Pusher = Pusher
  app.config.globalProperties.$pusher = new Pusher(apiKey as string, options)
}
