import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chats/:user',
      name: 'chats',
      component: () => import('../views/ChatsView.vue'),
      props: true
    },
    {
      path: '/chat/:currentUser/:chatId',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      props: true 
    },
    { 
      path: '/active-users/:currentUser',
      name: 'active-users',
      component: () => import ('../views/ActiveUsersView.vue'),
      props: true
    }
  ]
})

export default router
