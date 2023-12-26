<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="flex items-center flex-col justify-center mt-[40px] relative">
    <RouteNavigator route="/" />
    <BlogCard :blog="blog" />
    <div class="flex flex-row w-screen">
      <RelatedBlogsCarousel :blogs="relatedBlogs" />
    </div>
  </div>
</template>

<script setup>
import BlogCard from '@/components/blog/BlogCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import RouteNavigator from '@/components/shared/RouteNavigator.vue'
import { fetchBlogs, fetchSingleBlog } from '@/services/api'
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import RelatedBlogsCarousel from '@/components/blog/carousel/RelatedBlogsCarousel.vue'
import { useBlogStore } from '@/stores/BlogStore'
const route = useRoute()
const blog = ref({})
const blogStore = useBlogStore()
const relatedBlogs = ref([])
const isLoading = ref(true)
const fetchData = async () => {
  try {
    const blogs = await fetchBlogs()
    console.log('Fetched blogs:', blogs)
    blogStore.setBlogs(blogs)

    const singleBlog = await fetchSingleBlog(Number(route.params.id))
    console.log('Fetched single blog:', singleBlog)
    blog.value = singleBlog

    blogStore.filterRelatedBlogsByCategory(Number(route.params.id))
    relatedBlogs.value = blogStore.filteredBlogs

    console.log('Related blogs:', relatedBlogs.value)

    isLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    isLoading.value = false
    // You may want to set an error state here for the user
  }
}

// Use beforeRouteUpdate to trigger a refresh when the route changes
onBeforeRouteUpdate((to, from, next) => {
  fetchData()
  next()
})

// Initial fetch on component mount
fetchData()
</script>
