export default [
  {
    path: 'users',
    name: 'users',
    meta: {
      //       needsAuth: true,
      title: 'Users'
    },

    component: () => import('../views/users/users_base.vue'),

    children: [
      {
        path: '/user-:id',
        name: 'user',
        component: () => import('../views/users/user_base.vue'),
        props: (route: { params: { id: any } }) => ({
          id: route.params.id
        }),
        children: [
          {
            path: 'recent_activity',
            name: 'recent_activity',
            component: () => import('../views/users/recent_activity.vue'),
            props: (route: { params: { id: any } }) => ({
              id: route.params.id
            })
          }
        ]
      }
    ]
  }
]
