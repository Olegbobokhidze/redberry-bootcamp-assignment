<template>
  <button
    v-if="!authStore.isAuthenticated"
    @click="openModal"
    class="bg-[#5D37F3] rounded-[8px] text-white w-[93px] h-[40px] hover:bg-[#512BE7]"
  >
    შესვლა
  </button>
  <router-link
    v-if="authStore.isAuthenticated"
    to="/post-blog"
    class="bg-[#5D37F3] rounded-[8px] flex items-center justify-center cursor-pointer text-white w-[153px] h-[40px] hover:bg-[#512BE7]"
  >
    დაამატე ბლოგი
  </router-link>
</template>
<script>
import { useAuthStore } from '@/stores/AuthStore'
import { useModalStore } from '@/stores/ModalStore'

export default {
  setup() {
    const store = useModalStore()
    const authStore = useAuthStore()
    authStore.initializeFromLocalStorage()
    const openModal = () => {
      store.openModal()
    }
    return {
      store,
      openModal,
      authStore
    }
  }
}
</script>
