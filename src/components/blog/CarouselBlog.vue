<template>
  <div class="flex gap-5 items-center justify-between">
    <h3 class="text-[32px] font-bold text-[#1A1A1F]">მსგავსი სტატიები</h3>
    <div class="flex gap-6">
      <div
        @click="prev"
        class="bg-[#E4E3EB] group flex items-center justify-center hover:bg-[#512BE7] w-[44px] h-[44px] rounded-[50%] cursor-pointer"
      >
        <IconArrowLeft />
      </div>
      <div
        @click="next"
        class="bg-[#E4E3EB] group flex items-center justify-center hover:bg-[#512BE7] w-[44px] h-[44px] rounded-[50%] cursor-pointer"
      >
        <IconArrowRight />
      </div>
    </div>
  </div>
  <div class="flex max-w-[1768px] overflow-x-hidden m-0">
    <div
      class="flex flex-row gap-10"
      :style="{ transform: 'translateX(' + -currentIndex * (530 + 40) + 'px)' }"
    >
      <BlogCard v-for="(blog, index) in props.blogs" :key="index" :blog="blog" type="carousel" />
    </div>
  </div>
</template>
<script setup>
import BlogCard from '@/components/shared/BlogCard.vue'
import { ref } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const props = defineProps(['blogs'])
const currentIndex = ref(0)
const next = () => {
  if (props.blogs) {
    currentIndex.value = (currentIndex.value + 1) % props.blogs.length
  }
}

const prev = () => {
  if (props.blogs) {
    currentIndex.value = (currentIndex.value - 1 + props.blogs.length) % props.blogs.length
  }
}
</script>
