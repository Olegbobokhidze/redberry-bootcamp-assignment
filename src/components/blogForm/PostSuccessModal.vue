<template>
  <div v-if="(openedModal = true)">
    <div
      class="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-20 top-0 left-0 text-black"
    >
      <div
        class="flex items-center rounded-xl flex-col relative justify-center mt-[64px] mx-[24px] mb-[40px] bg-white w-[480px] h-[300px] px-6 py-10"
      >
        <div
          class="bg-[#14D81C] w-[53.33px] h-[53.33px] rounded-[50%] flex items-center justify-center mb-[16px]"
        >
          <IconChecked />
        </div>
        <div
          @click="closeModal"
          class="absolute top-[20px] right-[20px] cursor-pointer w-[40px] h-[40px] rounded-[50%] hover:bg-[#F5F4F9] flex items-center justify-center"
        >
          <IconRemove />
        </div>
        <p class="text-[#1A1A1F] font-bold text-[20px] mb-[48px]">ჩანაწერი წარმატებით დაემატა</p>
        <button
          class="w-full h-[40px] bg-[#5D37F3] hover:bg-[#512BE7] font-bold text-white text-[14px] rounded-lg py-[10px] px-[20px]"
          @click="closeModalPathHome"
        >
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import IconRemove from '@/components/icons/IconRemove.vue'
import { useBlogFormModalStore } from '@/stores/BlogFormModalStore'
import { useRouter } from 'vue-router'
import IconChecked from '@/components/icons/IconChecked.vue'
export default {
  setup() {
    const blogFormModalStore = useBlogFormModalStore()
    const closeModal = blogFormModalStore.closeBlogFormModal
    const openedModal = blogFormModalStore.isBlogFormModalOpen
    const router = useRouter()
    const closeModalPathHome = () => {
      closeModal()
      router.push('/')
    }
    return {
      closeModal,
      openedModal,
      closeModalPathHome
    }
  },
  components: { IconRemove, IconChecked }
}
</script>
