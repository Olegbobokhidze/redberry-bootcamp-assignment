<script>
import { computed } from 'vue'
import ButtonPageHeader from '../ui/buttons/ButtonPageHeader.vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const onFormPage = computed(() => router.currentRoute.value.name === 'PostBlog')
    return {
      onFormPage
    }
  },
  components: {
    ButtonPageHeader
  }
}
</script>

<template>
  <div
    :class="{
      'w-screen h-[80px] bg-white items-center flex px-[76px] py-[28px] justify-between':
        !onFormPage,
      'w-screen h-[80px] bg-white items-center flex px-[76px] py-[28px] justify-center': onFormPage
    }"
  >
    <img alt="logo" src="../../assets/images/redberrylogo.png" class="w-[150px] h-[24px]" />
    <div v-if="!onFormPage">
      <ButtonPageHeader />
    </div>
  </div>
</template>
