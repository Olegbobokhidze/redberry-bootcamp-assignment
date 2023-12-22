<template>
  <div class="flex flex-col gap-2 self-start">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <input
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="[
        'rounded-xl border w-[288px] h-[44px] px-4 py-2 text-[#1A1A1F]',
        'focus:outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]',
        { 'border-gray-300': !isInvalid, 'border-red-500 bg-[#FAF2F3]': isInvalid && wasTouched }
      ]"
      @blur="wasTouched = true"
    />
    <p :class="validationClass">{{ validationMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  title: String,
  placeholder: String
})

const { value, errorMessage } = useField(props.name)
const wasTouched = ref(false)

const onInput = (event) => {
  value.value = event.target.value
}

const isInvalid = computed(() => errorMessage.value !== undefined)

const endsWithRedberryRule = computed(() => {
    if(value.value !== undefined) {
        return value.value.endsWith('@redberry.ge') || value.value === ''
    }
  return false
})

const validationClass = computed(() => ({
  'text-gray-500': endsWithRedberryRule.value,
  'text-red-500': !endsWithRedberryRule.value && wasTouched.value
}))

const validationMessage = computed(() => {
  if (!endsWithRedberryRule.value) {
    return 'ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge'
  }
  return ''
})
</script>
