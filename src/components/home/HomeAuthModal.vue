<template>
  <div v-if="store.isModalOpen">
    <div
      class="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-20  top-0 left-0 text-black"
    >
      <div class="bg-red-500 w-[500px] h-[400px] z-50 text-black">
        <p>This is the modal content!</p>
        <button @click="store.closeModal">Close Modal</button>
      </div>
    </div>
  </div>
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
