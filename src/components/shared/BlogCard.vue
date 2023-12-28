<template>
  <div
    :class="{
      'flex flex-col w-full gap-6 mt-5': onHomePage,
      'flex flex-col w-[720px] gap-6 mt-5': onBlogPage && type !== 'carousel',
      'flex flex-col w-[530px] gap-6 mt-5': onBlogPage && type === 'carousel'
    }"
    :key="blog.id"
  >
    <img :src="blog.image" :alt="blog.title" class="w-full h-[328px] rounded-lg" />
    <div class="flex flex-col gap-3">
      <h2 class="font-bold text-[16px] text-[#1A1A1F]">{{ blog.author }}</h2>
      <div class="text-[#85858D] font-bold text-[12px]">
        <span>{{ blog.publish_date }}</span>
        <span v-if="onBlogPage"> • {{ blog.email }}</span>
      </div>
    </div>
    <h1
      :class="{
        'text-[#1A1A1F] font-bold text-[20px]': onHomePage,
        'text-[#1A1A1F] font-bold text-[32px]': onBlogPage
      }"
    >
      {{ blog.title }}
    </h1>
    <div
      :class="{
        'flex flex-wrap gap-[14px] text-black place-items-start': onHomePage,
        'flex flex-wrap gap-3 text-black place-items-start': onBlogPage
      }"
    >
      <div
        class="rounded-[30px] w-fit h-[40px] px-[16px] py-[8px] text-[12px] flex items-center font-bold hover:opacity-[75%] cursor-pointer"
        :style="{
          color: category.text_color,
          backgroundColor: category.background_color
        }"
        v-for="category in blog.categories"
        :key="category.id"
      >
        {{ category.title }}
      </div>
    </div>
    <p
      :class="{
        'text-[#404049] text-[16px] leading-[28px] line-clamp-2': onHomePage || type === 'carousel',
        'text-[#404049] text-[16px] leading-[28px]': onBlogPage
      }"
    >
      {{ blog.description }}.
    </p>

    <div
      v-if="onHomePage || type === 'carousel'"
      class="text-[#5D37F3] hover:text-[#512BE7] cursor-pointer flex"
      @click="goToBlogDetail(blog.id)"
    >
      <p class="font-bold">სრულად ნახვა</p>
      <IconFullView />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IconFullView from '../icons/IconFullView.vue'
import { computed, defineProps } from 'vue'

defineProps({
  blog: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: ''
  }
})
const router = useRouter()
const onBlogPage = computed(() => router.currentRoute.value.name === 'Blog')
const onHomePage = computed(() => router.currentRoute.value.name === 'Home')
const goToBlogDetail = (blogId) => {
  console.log(blogId)
  router.push({ name: 'Blog', params: { id: blogId } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
