import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue' 
import BlogFormView from '../views/BlogFormView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/blog/:id', 
    name: 'Blog',
    component: BlogView,
    props: true 
  },
  {
    path: '/post-blog',
    name: 'PostBlog',
    component: BlogFormView,
    beforeEnter: (to, from, next) => {
      if (useAuthStore.isAuthenticated) {
        next(); // Allow access
      } else {
        next('/');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
