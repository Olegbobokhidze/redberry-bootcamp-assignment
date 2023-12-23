<template>
  <div class="flex items-center justify-center mt-[40px] relative">
    <RouteNavigator route="/" />
    <BlogCard :blog="blog" />
  </div>
</template>

<script setup>
import BlogCard from '@/components/blog/BlogCard.vue'
import RouteNavigator from '@/components/shared/RouteNavigator.vue';
import { fetchSingleBlog } from '@/services/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const blog = ref({})
onMounted(async () => {
  blog.value = await fetchSingleBlog(Number(route.params.id))
})
</script>
