import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue' 
import BlogFormView from '../views/BlogFormView.vue'

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
    component: BlogFormView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
