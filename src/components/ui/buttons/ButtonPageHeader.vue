<template>
  <button
    @click="store.openModal"
    class="bg-[#5D37F3] rounded-[8px] text-white w-[93px] h-[40px] hover:bg-[#512BE7]"
  >
    შესვლა
  </button>
</template>
<script>
import { useModalStore } from '@/stores/ModalStore'

export default {
  setup() {
    const store = useModalStore()
    return {
      store
    }
  }
}
</script>
