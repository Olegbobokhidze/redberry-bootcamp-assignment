<template>
  <div v-if="modalStore.isModalOpen">
    <div
      class="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-20 top-0 left-0 text-black"
    >
      <div
        class="bg-white w-[480px] relative flex items-center justify-center flex-col h-[300px] rounded-xl z-50 text-black"
      >
        <div
          @click="modalStore.closeModal"
          class="absolute top-[20px] right-[20px] cursor-pointer w-[40px] h-[40px] rounded-[50%] hover:bg-[#F5F4F9] flex items-center justify-center"
        >
          <IconRemove />
        </div>
        <div class="w-full h-full" v-if="!authStore.isAuthenticated && !authStore.loading">
          <AuthForm />
        </div>
        <LoadingSpinner v-if="authStore.loading" />
        <div class="w- ull h-full" v-if="authStore.isAuthenticated"><AuthSuccess /></div>
      </div>
    </div>
  </div>
</template>

<script>
import IconRemove from '@/components/icons/IconRemove.vue'
import { useModalStore } from '@/stores/ModalStore'
import { useAuthStore } from '@/stores/AuthStore'
import AuthForm from './homeAuthForm/AuthForm.vue'
import AuthSuccess from './homeAuthForm/AuthSuccess.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'
export default {
  props: {
    isModalOpen: Boolean,
    name: String,
    title: String,
    placeholder: String,
    type: String
  },
  setup() {
    const modalStore = useModalStore()
    const authStore = useAuthStore()
    return {
      authStore,
      modalStore
    }
  },
  components: { AuthForm, AuthSuccess, IconRemove, LoadingSpinner }
}
</script>
