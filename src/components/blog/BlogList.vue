<template></template>

<script>
import { fetchBlogs } from '../../services/api.js'
export default {
  data() {
    return {
      blogs: []
    }
  },
  async mounted() {
    try {
      this.blogs = await fetchBlogs()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
</script>
