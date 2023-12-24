<template>
  <div v-if="store.isModalOpen">
    <div
      class="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-20 top-0 left-0 text-black"
    >
      <div
        class="bg-white w-[480px] relative flex items-center justify-center flex-col px-6 py-[40px] h-[300px] rounded-xl z-50 text-black"
      >
        <div
          @click="store.closeModal"
          class="absolute top-[20px] right-[20px] cursor-pointer w-[40px] h-[40px] rounded-[50%] hover:bg-[#F5F4F9] flex items-center justify-center"
        >
          <IconRemove />
        </div>
        <div class="flex flex-col gap-6 w-full items-center justify-center">
          <p class="text-[#1A1A1F] text-[24px] font-bold">შესვლა</p>
          <InputAuthEmail
            name="email"
            type="email"
            title="ელ-ფოსტა"
            placeholder="Example@redberry.ge"
          />
          <button
            class="w-full h-[40px] bg-[#5D37F3] hover:bg-[#512BE7] font-bold text-white text-[14px] rounded-lg py-[10px] px-[20px]"
            @click="store.closeModal"
          >
            შესვლა
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/ModalStore'
import IconRemove from '../icons/IconRemove.vue'
import InputAuthEmail from '../ui/inputs/secondaryInputs/InputAuthEmail.vue'
export default {
  props: {
    isModalOpen: Boolean,
    name: String,
    title: String,
    placeholder: String,
    type: String
  },
  setup() {
    const store = useModalStore()
    return {
      store
    }
  },
  components: { IconRemove, InputAuthEmail }
}
</script>
