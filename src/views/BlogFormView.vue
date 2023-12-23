<template>
  <div class="w-full flex justify-center relative px-[76px] py-[33px]">
    <RouteNavigator route="/" />
    <FormWrapper />
  </div>
</template>

<script setup>
import FormWrapper from '@/components/blogForm/FormWrapper.vue'
import RouteNavigator from '@/components/shared/RouteNavigator.vue'
</script>
