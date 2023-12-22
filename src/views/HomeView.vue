<script setup>
import HomeHero from '../components/home/HomeHero.vue'
import HomeBlogFilter from '../components/home/HomeBlogFilter.vue'
import BlogList from '@/components/blog/BlogList.vue';
</script>

<template>
  <div class="px-[76px] w-full pb-[66px]">
    <HomeHero />
    <HomeBlogFilter />
    <BlogList />
  </div>
</template>
