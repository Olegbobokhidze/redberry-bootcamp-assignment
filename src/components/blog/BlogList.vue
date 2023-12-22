<template>
  <div class="grid grid-cols-3 mt-[72px] gap-y-8 gap-x-14">
    <div v-for="blog in blogs" :key="blog.id">
      <BlogCard :blog="blog" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { fetchBlogs } from '../../services/api.js'
import BlogCard from './BlogCard.vue'

export default {
  components: {
    BlogCard
  },
  setup() {
    const blogs = ref([])
    console.log('firstblog: ', blogs)
    onMounted(async () => {
      try {
        blogs.value = await fetchBlogs()
        console.log('Fetched blogs:', blogs.value) // Add this line to check the fetched data
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    })

    return {
      blogs
    }
  }
}
</script>
