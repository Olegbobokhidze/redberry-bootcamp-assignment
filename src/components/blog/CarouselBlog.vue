<template>
  <div class="flex gap-5 items-center justify-between">
    <h3 class="text-[32px] font-bold text-[#1A1A1F]">მსგავსი სტატიები</h3>
    <div class="flex gap-6">
      <div
        :class="[
          'flex items-center justify-center bg-[#5D37F3] hover:bg-[#512BE7]  w-[44px] h-[44px] rounded-[50%] cursor-pointer',
          {
            'opacity-50 cursor-not-allowed hover:bg-[#E4E3EB] bg-[#E4E3EB]': currentIndex === 0
          }
        ]"
        @click="prev"
        :disabled="currentIndex === 0"
      >
        <IconArrowLeft />
      </div>
      <div
        :class="[
          'flex items-center justify-center bg-[#5D37F3] hover:bg-[#512BE7] w-[44px] h-[44px] rounded-[50%] cursor-pointer',
          {
            'opacity-50 hover:bg-[#E4E3EB] cursor-not-allowed bg-[#E4E3EB]':
              currentIndex >= props.blogs.length - 3
          }
        ]"
        @click="next"
        :disabled="currentIndex >= props.blogs.length - 3"
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
import { ref, watch } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const props = defineProps(['blogs'])
const currentIndex = ref(0)

const next = () => {
  if (props.blogs && currentIndex.value < props.blogs.length - 1) {
    const lastVisibleIndex = currentIndex.value + 2 // Assuming 3 blogs are visible
    if (lastVisibleIndex < props.blogs.length - 1) {
      currentIndex.value += 1
    }
  }
}

const prev = () => {
  if (props.blogs && currentIndex.value > 0) {
    currentIndex.value -= 1
  }
}

watch(
  () => props.blogs,
  () => {
    // Reset currentIndex to 0 when blogs change
    currentIndex.value = 0
  }
)
</script>
