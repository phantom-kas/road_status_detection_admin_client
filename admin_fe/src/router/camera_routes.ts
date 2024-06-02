export default [
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
        path: '/camera-:id',
        name: 'camera',
        component: () => import('../views/cameras/camera_base.vue'),
        props: (route: { params: { id: any; lid?: string } }) => ({
          id: route.params.id,
          lid: route.params.lid ?? null
        }),
        children: [
          {
            path: 'logs-:lid?',
            name: 'logs',
            component: () => import('../views/cameras/camera_logs.vue'),
            props: (route: { params: { id: any; lid?: string } }) => ({
              id: route.params.id,
              lid: route.params.lid ?? null
            })
          },
          {
            path: 'cam_feed-:lid?',
            name: 'cam_feed',
            component: () => import('../views/cameras/camera_feed.vue'),
            props: (route: { params: { id: any; lid?: string } }) => ({
              id: route.params.id
            })
          }
        ]
      }
    ]
  }
]
