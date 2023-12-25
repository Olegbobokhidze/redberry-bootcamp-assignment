<template>
  <router-link
    :to="route"
    class="w-[44px] h-[44px] cursor-pointer left-[76px] top-[40px] absolute rounded-[50%] bg-[#E4E3EB] hover:bg-[#D9D8E0] flex items-center justify-center"
  >
    <IconArrowLeft />
  </router-link>
</template>
<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { defineProps } from 'vue'
defineProps({
  route: {
    type: String,
    required: true
  }
})
</script>
