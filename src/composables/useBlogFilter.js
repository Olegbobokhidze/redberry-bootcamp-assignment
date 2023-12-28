import { ref, onMounted, watch } from 'vue'
import { useBlogStore } from '@/stores/BlogStore.js'
import { fetchBlogs } from '@/services/api.js'

export function useBlogFilter() {
  const blogStore = useBlogStore()
  const filteredBlogs = ref([])
  const isLoading = ref(true)

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
      const selectedCategories = JSON.parse(storedCategories)

      isLoading.value = true
      const blogs = await fetchBlogs()

      if (blogStore.blogs.length === 0) {
        blogStore.setBlogs(blogs)
      }

      if (storedCategories) {
        blogStore.filterBlogsByCategory(selectedCategories)
      } else if (!storedFilteredBlogIds) {
        localStorage.setItem(
          'filteredBlogIds',
          JSON.stringify(blogStore.blogs.map((blog) => blog.id))
        )
        blogStore.setBlogs(blogs)
      } else if (!storedCategories) {
        blogStore.setBlogs(blogs)
      }

      isLoading.value = false
    } catch (error) {
      console.error('Error fetching or filtering blogs:', error)
    }
  })

  return {
    filteredBlogs,
    isLoading
  }
}
