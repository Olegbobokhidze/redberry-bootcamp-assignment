<template>
  <form class="mx-[24px] my-[40px]" @submit="onSubmit">
    <div class="flex flex-col gap-6 w-full items-center justify-center">
      <p class="text-[#1A1A1F] text-[24px] font-bold">შესვლა</p>
      <InputAuthEmail
        :name="'authEmail'"
        :type="'email'"
        :title="'ელ-ფოსტა'"
        :placeholder="'Example@redberry.ge'"
        :error="showApiErrorMessage"
      />
      <button
        class="w-full h-[40px] bg-[#5D37F3] hover:bg-[#512BE7] font-bold text-white text-[14px] rounded-lg py-[10px] px-[20px]"
      >
        შესვლა
      </button>
    </div>
  </form>
</template>

<script>
import { useModalStore } from '@/stores/ModalStore'
import { useAuthStore } from '@/stores/AuthStore'
import InputAuthEmail from '@/components/ui/inputs/secondaryInputs/InputAuthEmail.vue'
import { authenticateWithEmail } from '@/services/api'
import { useForm } from 'vee-validate'
import { authValidationSchema } from './validationSchema/authFormSchema.js'
import { ref } from 'vue'

export default {
  props: {
    isModalOpen: Boolean
  },
  setup() {
    const { values, errors, handleSubmit } = useForm({
      authValidationSchema
    })
    const showApiErrorMessage = ref(false);

    const modalStore = useModalStore()
    const authStore = useAuthStore()
    const onSubmit = handleSubmit(async () => {
      try {
        const result = await authenticateWithEmail(values.authEmail)
        console.log(result)
        if (result.success) {
          console.log('Authentication successful')
          authStore.login({ email: values.authEmail })
          authStore.saveToLocalStorage()
        } else if (result.status === 402) {
          console.error('Email does not exist')
          showApiErrorMessage.value = true
          
        } else {
          console.error('Authentication failed:', result.error)
        }
      } catch (error) {
        showApiErrorMessage.value = true
        console.error('Error during authentication:', error)
      }
    })

    return {
      modalStore,
      authStore,
      values,
      errors,
      onSubmit,
      showApiErrorMessage
    }
  },
  components: { InputAuthEmail }
}
</script>
