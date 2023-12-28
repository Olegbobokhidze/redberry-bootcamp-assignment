<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="grid grid-cols-3 mt-[72px] gap-y-8 gap-x-14">
    <div v-for="blog in filteredBlogs" :key="blog.id">
      <BlogCard :blog="blog" />
    </div>
  </div>
</template>

<script>
import { useBlogFilter } from '@/composables/useBlogFilter'
import BlogCard from '@/components/shared/BlogCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  components: {
    BlogCard,
    LoadingSpinner
  },
  setup() {
    const { filteredBlogs, isLoading } = useBlogFilter()

    return {
      filteredBlogs,
      isLoading
    }
  }
}
</script>
