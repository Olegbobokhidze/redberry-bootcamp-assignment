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
      }
    )

    onMounted(async () => {
      try {
        const blogs = await fetchBlogs()
        blogStore.setBlogs(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    })

    return {
      filteredBlogs
    }
  }
}
</script>