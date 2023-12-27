<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <textarea
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="[
        'rounded-xl border w-[600px] resize-none h-[124px] px-4 py-2 text-[#1A1A1F]',
        'focus:outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]',
        {
          'border-gray-300': value === '',
          'border-green-500': !isInvalid && minLengthRule,
          'border-red-500 bg-[#FAF2F3]': !minLengthRule && value !== ''
        }
      ]"
      @blur="wasTouched = true"
    />
    <p :class="minLengthClass">{{ minLengthMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  title: String,
  placeholder: String
})

const { value, errorMessage, setValue } = useField(props.name)
const wasTouched = ref(false)

const onInput = (event) => {
  value.value = event.target.value
}
onMounted(() => {
  const storedData = localStorage.getItem('blogFormData')
  if (storedData) {
    const formData = JSON.parse(storedData)
    const desc = formData.description
    if (desc !== undefined) {
      setValue(desc)
    }
  }
})
const isInvalid = computed(() => errorMessage.value !== undefined)

const minLengthRule = computed(
  () => (value.value || '').length >= 4 || value.value === '' || value.value === undefined
)

const minLengthClass = computed(() => ({
  'text-gray-500': value.value === undefined || value.value === '',
  'text-red-500': !minLengthRule.value && wasTouched,
  'text-green-500': minLengthRule.value && value.value !== undefined && value.value !== ''
}))

const minLengthMessage = computed(() => '• მინიმუმ 4 სიმბოლო')
</script>
