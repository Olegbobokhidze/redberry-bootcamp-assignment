<template>
  <form class="mx-[24px] my-[40px] ">
    <div class="flex flex-col gap-6 w-full items-center justify-center">
      <p class="text-[#1A1A1F] text-[24px] font-bold">შესვლა</p>
      <InputAuthEmail
        name="authEmail"
        type="email"
        title="ელ-ფოსტა"
        placeholder="Example@redberry.ge"
      />
      <button
        class="w-full h-[40px] bg-[#5D37F3] hover:bg-[#512BE7] font-bold text-white text-[14px] rounded-lg py-[10px] px-[20px]"
        @click="onSubmit"
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
export default {
  props: {
    isModalOpen: Boolean,
    name: String,
    title: String,
    placeholder: String,
    type: String
  },
  setup() {
    const { values, errors, defineField, handleSubmit } = useForm({
      authValidationSchema
    })
    const modalStore = useModalStore()
    const authStore = useAuthStore()
    const [email, emailProps] = defineField('authEmail')
    const onSubmit = handleSubmit(async (values) => {
      try {
        const result = await authenticateWithEmail(values.authEmail)
        if (result.success) {
          console.log('Authentication successful')
          authStore.login({ email: values.authEmail })
        } else {
          console.error('Authentication failed:', result.error)
        }
      } catch (error) {
        console.error('Error during authentication:', error)
      }
    })
    return {
      modalStore,
      authStore,
      onSubmit
    }
  },
  components: { InputAuthEmail }
}
</script>
