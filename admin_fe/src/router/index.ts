import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useRTStore } from '../stores/route.ts'
import camera_routes from './camera_routes.ts'
import logs_routes from './logs_routes.ts'

import user_routes from './user_routes.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        //       needsAuth: true,
        title: 'Welcome'
      },
      component: HomeView,
      children: [
        {
          path: '',
          name: 'base',
          meta: {
            //       needsAuth: true,
            title: 'Welcome'
          },
          component: () => import('../views/home_base.vue'),
          children: [
            {
              path: '',
              name: 'dashboard',
              meta: {
                //       needsAuth: true,
                title: 'Welcome'
              },
              component: () => import('../views/dash_board.vue')
            },
            ...camera_routes,
            ...user_routes,
            ...logs_routes
          ]
        },
        {
          path: '/other',
          name: 'other',

          component: () => import('../views/other_base.vue'),
          children: [
            {
              name: 'login',
              path: '/login',
              component: () => import('../views/login_view.vue')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //const useAlerts = useAlertStore();

  //const loaderStore = useLoaderStore()
  if (to.meta.title) {
    const rt = useRTStore()
    rt.setTitle(to.meta.title as string)
  } else if (to.params.title) {
    const rt = useRTStore()
    // window.alert('Please')
    rt.setTitle(to.params.title as string)
  }
  if (!to.meta.needsAuth) {
    next()
    return
  }
})

export default router
