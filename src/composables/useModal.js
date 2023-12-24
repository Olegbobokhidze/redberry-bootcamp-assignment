import { ref } from 'vue'

const useModal = () => {
  const isModalOpen = ref(false)

  const openModal = () => {
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal
  }
}

export default useModal
