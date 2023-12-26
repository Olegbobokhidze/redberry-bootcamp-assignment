<template>
  <div class="flex items-center flex-col justify-center mt-[40px] relative ">
    <RouteNavigator route="/" />
    <BlogCard :blog="blog" />
    <div class="flex flex-row w-screen">
      <RelatedBlogsCarousel :blogs="relatedBlogs" />
    </div>
  </div>
</template>

<script setup>
import BlogCard from '@/components/blog/BlogCard.vue'
import RouteNavigator from '@/components/shared/RouteNavigator.vue'
import { fetchBlogs, fetchSingleBlog } from '@/services/api'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import RelatedBlogsCarousel from '@/components/blog/carousel/RelatedBlogsCarousel.vue'
import { useBlogStore } from '@/stores/BlogStore'
const route = useRoute()
const blog = ref({})
const blogStore = useBlogStore()
const relatedBlogs = ref([])

onMounted(async () => {
  const blogs = await fetchBlogs()
  blogStore.setBlogs(blogs)
  blog.value = await fetchSingleBlog(Number(route.params.id))
  blogStore.filterRelatedBlogsByCategory(Number(route.params.id))

  relatedBlogs.value = blogStore.filteredBlogs

  console.log('relatedBlogs', relatedBlogs.value)
})
</script>
