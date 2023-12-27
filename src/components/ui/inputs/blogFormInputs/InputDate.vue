<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <input
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="[
        'rounded-xl border w-[288px] h-[44px] px-4 py-2 text-[#1A1A1F]',
        'focus:outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]',
        { 'border-green-500': value !== '' && value !== undefined }
      ]"
      @blur="wasTouched = true"
    />
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { onMounted, ref } from 'vue'

const props = defineProps({
  name: String,
  type: String,
  title: String,
  placeholder: String
})

const { value, setValue } = useField(props.name)
const wasTouched = ref(false)
onMounted(() => {
  const storedData = localStorage.getItem('blogFormData')
  if (storedData) {
    const formData = JSON.parse(storedData)
    const date = formData.publish_date
    if (date !== undefined) {
      setValue(date)
    }
  }
})
const onInput = (event) => {
  value.value = event.target.value
}
</script>
