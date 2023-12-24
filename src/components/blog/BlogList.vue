<template>
  <div class="grid grid-cols-3 mt-[72px] gap-y-8 gap-x-14">
    <div v-for="blog in filteredBlogs" :key="blog.id">
      <BlogCard :blog="blog" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useBlogStore } from '../../stores/BlogStore.js'
import { fetchBlogs } from '../../services/api.js'
import BlogCard from './BlogCard.vue'

export default {
  components: {
    BlogCard
  },
  setup() {
    const blogStore = useBlogStore()
    const filteredBlogs = ref([])

    watch(
      () => blogStore.filteredBlogs,
      (newFilteredBlogs) => {
        filteredBlogs.value = newFilteredBlogs
        localStorage.setItem(
          'filteredBlogIds',
          JSON.stringify(newFilteredBlogs.map((blog) => blog.id))
        )
      }
    )
    onMounted(async () => {
      try {
        const storedCategories = localStorage.getItem('selectedCategories')
        const storedFilteredBlogIds = localStorage.getItem('filteredBlogIds')
        const filteredBlogIds = JSON.parse(storedFilteredBlogIds)
        const selectedCategories = JSON.parse(storedCategories)
        const blogs = await fetchBlogs()
        if (blogStore.blogs.length === 0) {
          blogStore.setBlogs(blogs)
        }
        if (storedCategories) {
          blogStore.filterBlogsByCategory(selectedCategories)
        } else if (filteredBlogIds.length === 0) {
          localStorage.setItem(
            'filteredBlogIds',
            JSON.stringify(blogStore.blogs.map((blog) => blog.id))
          )
        }else if(!storedCategories){
          blogStore.setBlogs(blogs)
        }
      } catch (error) {
        console.error('Error fetching or filtering blogs:', error)
      }
    })

    return {
      filteredBlogs
    }
  }
}
</script>
