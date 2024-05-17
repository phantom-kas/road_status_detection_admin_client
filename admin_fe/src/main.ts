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
  faTrashCan,
  faArrowRightFromBracket,
  faLock,
  faUser,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
  faXmark,
  faUsers,
  faPlus,
  faFileCircleXmark,
  faCamera,
  faSliders
} from '@fortawesome/free-solid-svg-icons'

import { faCircleUser, faCircleCheck, faFile } from '@fortawesome/free-regular-svg-icons'

import {} from '@fortawesome/free-brands-svg-icons'

library.add(
  faSliders,
  faCamera,
  faFileCircleXmark,
  faXmark,
  faFile,
  faPlus,
  faUsers,
  faCircleInfo,
  faTriangleExclamation,
  faCircleXmark,
  faChevronRight,
  faTrash,
  faEllipsisVertical,
  fasVideo,
  fasHouse,
  faChevronLeft,
  faSun,
  faMoon,
  faPencil,
  faTrashCan,
  faCircleUser,
  faArrowRightFromBracket,
  faLock,
  faUser,
  faCircleCheck
)

import App from './App.vue'
import router from './router'
import './interceptors/axios.ts'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
