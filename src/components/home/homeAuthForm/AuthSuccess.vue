<template>
  <div class="flex items-center flex-col justify-center mt-[64px] mx-[24px] mb-[40px]">
    <div class="bg-[#14D81C] w-[53.33px] h-[53.33px] rounded-[50%] flex items-center justify-center mb-[16px]">
      <IconChecked />
    </div>
    <p class="text-[#1A1A1F] font-bold text-[20px] mb-[48px]">წარმატებული ავტორიზაცია</p>
    <button
      class="w-full h-[40px] bg-[#5D37F3] hover:bg-[#512BE7] font-bold text-white text-[14px] rounded-lg py-[10px] px-[20px]"
      @click="modalStore.closeModal"
    >
      კარგი
    </button>
  </div>
</template>
<script>
import IconChecked from '@/components/icons/IconChecked.vue'
import { useModalStore } from '@/stores/ModalStore'
export default {
  setup() {
    const modalStore = useModalStore()
    return {
      modalStore
    }
  },
  components: {
    IconChecked
  }
}
</script>
