export default [
  {
    path: '/all_logs:lid?',
    name: 'all_logs',
    meta: {
      //       needsAuth: true,
      title: 'Logs'
    },
    component: () => import('../views/logs/logs_view.vue'),
    props: (route: { params: { lid?: string } }) => ({
      lid: route.params.lid ?? null
    }),
    children: [
      {
        path: '',
        name: 'all__logs',
        component: () => import('../views/cameras/camera_logs.vue'),
        props: (route: { params: { lid?: string } }) => ({
          lid: route.params.lid ?? null
        })
      }
    ]
  }
]
