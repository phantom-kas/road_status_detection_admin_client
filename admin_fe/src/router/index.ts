import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useRTStore } from '../stores/route.ts'
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
            {
              path: 'cameras',
              name: 'cameras',
              meta: {
                //       needsAuth: true,
                title: 'Cameras'
              },

              component: () => import('../views/cameras/cameras_base.vue'),

              children: [
                {
                  path: '/camera',
                  name: 'camera',
                  component: () => import('../views/cameras/camera_base.vue')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/other',
      name: 'other',

      component: () => import('../views/other_base.vue')
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
