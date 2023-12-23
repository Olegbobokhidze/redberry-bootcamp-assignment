<template>
  <div class="flex flex-col w-[408px] gap-6 mt-5" :key="blog.id">
    <img :src="blog.image" :alt="blog.title" class="w-full h-[328px] rounded-lg" />
    <div class="flex flex-col gap-3">
      <h2 class="font-bold text-[16px] text-[#1A1A1F]">{{ blog.author }}</h2>
      <h3 class="text-[#85858D] font-bold text-[12px]">{{ blog.publish_date }}</h3>
    </div>
    <h1 class="text-[#1A1A1F] font-bold text-[20px]">{{ blog.title }}</h1>
    <div
      class="grid grid-cols-4 justify-items-center gap-2 place-content-between text-black w-full"
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
    <p class="text-[#404049] text-[16px] line-clamp-2">{{ blog.description }}.</p>
    <div class="text-[#5D37F3] hover:text-[#512BE7] cursor-pointer flex">
      <p class="font-bold">სრულად ნახვა</p>
      <IconFullView />
    </div>
  </div>
</template>

<script>
import IconFullView from '../icons/IconFullView.vue'

export default {
  components: {
    IconFullView
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>
