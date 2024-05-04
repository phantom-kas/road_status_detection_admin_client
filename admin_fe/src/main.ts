import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronRight,
  faHouse as fasHouse,
  faChevronLeft,
  faSun,
  faMoon,
  faVideo as fasVideo,
  faEllipsisVertical,
  faTrash,
  faPencil,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import {} from '@fortawesome/free-regular-svg-icons'

import {} from '@fortawesome/free-brands-svg-icons'

library.add(
  faChevronRight,
  faTrash,
  faEllipsisVertical,
  fasVideo,
  fasHouse,
  faChevronLeft,
  faSun,
  faMoon,
  faPencil,
  faTrashCan
)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
