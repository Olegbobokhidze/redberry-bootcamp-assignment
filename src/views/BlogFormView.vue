<template>
  <div class="w-full flex justify-center relative px-[76px] py-[33px]">
    <div
      class="w-[44px] h-[44px] cursor-pointer left-[76px] absolute rounded-[50%] bg-[#E4E3EB] hover:bg-[#D9D8E0] flex items-center justify-center "
    >
      <IconArrowLeft />
    </div>
    <FormWrapper />
  </div>
</template>

<script setup>
import FormWrapper from '@/components/blogForm/FormWrapper.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
</script>
