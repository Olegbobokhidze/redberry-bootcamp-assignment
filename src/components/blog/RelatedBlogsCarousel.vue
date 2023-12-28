<template>
  <div class="flex flex-col w-full px-[76px] h-[1000px] overflow-x-visible py-[98px]">
    <CarouselBlog :blogs="props.blogs" />
  </div>
</template>

<script setup>
import CarouselBlog from './CarouselBlog.vue' // Create this component
const props = defineProps(['blogs'])
</script>
