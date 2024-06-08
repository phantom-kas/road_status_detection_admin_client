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
          },
          {
            path: 'premissions',
            name: 'premissions',
            component: () => import('../components/premissions_component.vue'),
            props: (route: { params: { id: any } }) => ({
              id: route.params.id
            })
          },
          {
            path: 'edit_user',
            name: 'edit_user',
            component: () => import('../components/form_components/edit_user_form.vue'),
            props: (route: { params: { id: any } }) => ({
              id: route.params.id
            })
          },
          {
            path: 'user_info',
            name: 'user_info',
            component: () => import('../views/users/user_profile.vue'),
            props: (route: { params: { id: any } }) => ({
              id: route.params.id
            })
          }
        ]
      }
    ]
  },
  {
    path: 'add_user',
    name: 'add_user',
    meta: {
      //       needsAuth: true,
      title: 'Add User'
    },
    component: () => import('../views/users/add_user.vue')
  },
  {
    path: 'profile_info',
    name: 'profile_info',
    meta: {
      //       needsAuth: true,
      title: 'User Profile'
    },
    component: () => import('../views/users/user_profile.vue')
    // props: (route: { params: { id: any } }) => ({
    //   id: route.params.id
    // })
  },
  {
    path: 'edit_profile_info',
    name: 'edit_profile_info',
    meta: {
      //       needsAuth: true,
      title: 'Edit User Info'
    },
    component: () => import('../components/form_components/edit_user_form.vue')
    // props: (route: { params: { id: any } }) => ({
    //   id: route.params.id
    // })
  }
]
