import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/verrassingskalender',
      name: 'Verrassingskalender',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ScratchView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const UserStore = useUserStore()
  if (UserStore.getName === '' && to.path !== '/') {
    // redirect the user to the login page
    return '/'
  }
})

export default router
