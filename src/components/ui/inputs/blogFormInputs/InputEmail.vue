<template>
  <div class="flex flex-col gap-2 self-start">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <input
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="[
        'rounded-xl w-[288px] h-[44px] focus:bg-[#F7F7FF] border px-4 py-2 text-[#1A1A1F] outline-none focus:border-purple-500',
        {
          'border-gray-300': value === '' || value === undefined,
          'border-green-500':
            value !== '' && value !== undefined && !isInvalid && endsWithRedberryRule,
          'border-red-500 bg-[#FAF2F3]':
            !endsWithRedberryRule && value !== '' && value !== undefined
        }
      ]"
      @blur="wasTouched = true"
    />
    <div v-if="showValidationMessage" class="flex gap-2">
      <IconError />
      <p class="text-red-500">{{ validationMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'
import IconError from '@/components/icons/IconError.vue'

const props = defineProps({
  name: String,
  type: String,
  title: String,
  placeholder: String
})

const { value, errorMessage, setValue } = useField(props.name, (value = '') => value)
const wasTouched = ref(false)

const onInput = (event) => {
  value.value = event.target.value
}

const isInvalid = computed(() => errorMessage.value !== undefined)
onMounted(() => {
  const storedData = localStorage.getItem('blogFormData');
  if (storedData) {
    const formData = JSON.parse(storedData);
    const email = formData.email;
    if (email !== undefined) {
      setValue(email);
    } else {
      setValue('');
    }
  }
});
const endsWithRedberryRule = computed(() => {
  if (value.value === '') {
    setValue(''); 
    return true; 
  }

  if (value.value !== undefined && value.value !== '') {
    return value.value.endsWith('@redberry.ge')
  }
  return false
})

const showValidationMessage = computed(
  () => wasTouched.value && !endsWithRedberryRule.value && value.value !== ''
)
const validationMessage = computed(() => {
  return endsWithRedberryRule.value ? '' : 'უნდა მთავრდებოდეს @redberry.ge'
})
</script>
