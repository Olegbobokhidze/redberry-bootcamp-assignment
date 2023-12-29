<template>
  <div class="w-full flex justify-center relative px-[76px] py-[33px]">
    <RouteNavigator route="/" />
    <FormWrapper />
    <PostSuccessModal />
  </div>
</template>

<script setup>
import FormWrapper from '@/components/blogForm/FormWrapper.vue'
import PostSuccessModal from '@/components/blogForm/PostSuccessModal.vue'
import RouteNavigator from '@/components/shared/RouteNavigator.vue'
</script>
