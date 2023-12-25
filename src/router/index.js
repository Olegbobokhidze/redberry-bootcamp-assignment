import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogFormView from '../views/BlogFormView.vue'
import { watchEffect } from 'vue'
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
      watchEffect(() => {
        const authData = localStorage.getItem('auth')
        if (!authData) {
          next('/')
        } else {
          next()
        }
      })
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
