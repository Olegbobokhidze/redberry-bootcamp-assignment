<script setup>
import HomeHero from '../components/home/HomeHero.vue'
import HomeBlogFilter from '../components/home/HomeBlogFilter.vue'
import BlogList from '@/components/blog/BlogList.vue'
import HomeAuthModal from '@/components/home/HomeAuthModal.vue'
</script>

<template>
  <div class="px-[76px] w-full pb-[66px] relative">
    <HomeHero />
    <HomeAuthModal />
    <HomeBlogFilter />
    <BlogList />
  </div>
</template>
