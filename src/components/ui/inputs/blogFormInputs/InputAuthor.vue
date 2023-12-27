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
        {
          'border-gray-300': value === '' || value === undefined,
          'border-green-500':
            value !== '' &&
            value !== undefined &&
            !isInvalid &&
            minLengthRule &&
            wordCountRule &&
            georgianOnlyRule,
          'border-red-500 bg-[#FAF2F3]':
            (!minLengthRule || !wordCountRule || !georgianOnlyRule || isInvalid) && value !== ''
        }
      ]"
      @blur="wasTouched = true"
    />
    <p :class="minLengthClass">{{ minLengthMessage }}</p>
    <p :class="wordCountClass">{{ wordCountMessage }}</p>
    <p :class="georgianOnlyClass">{{ georgianOnlyMessage }}</p>
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
    const author = formData.author
    if (author !== undefined) {
      setValue(author)
    }
  }
})
console.log(value.value)
const isInvalid = computed(() => errorMessage.value !== undefined)

const minLengthRule = computed(
  () => (value.value || '').length >= 4 || value.value === '' || value.value === undefined
)
const wordCountRule = computed(
  () =>
    (typeof value.value === 'string' ? value.value.trim().split(/\s+/).length >= 2 : false) ||
    value.value === '' ||
    value.value === undefined
)
const georgianOnlyRule = computed(() => /^[ა-ჰ\s]*$/.test(value.value || ''));

const minLengthClass = computed(() => ({
  'text-gray-500': value.value === undefined || value.value === '',
  'text-red-500': !minLengthRule.value && wasTouched,
  'text-green-500': minLengthRule.value && value.value !== undefined && value.value !== ''
}))

const wordCountClass = computed(() => ({
  'text-gray-500': value.value === undefined || value.value === '',
  'text-red-500': !wordCountRule.value && wasTouched,
  'text-green-500': wordCountRule.value && value.value !== undefined && value.value !== ''
}))

const georgianOnlyClass = computed(() => ({
  'text-gray-500': value.value === undefined || value.value === '',
  'text-red-500': !georgianOnlyRule.value && wasTouched,
  'text-green-500': georgianOnlyRule.value && value.value !== undefined && value.value !== ''
}))

// Messages to display based on validation
const minLengthMessage = computed(() => '• მინიმუმ 4 სიმბოლო')
const wordCountMessage = computed(() => '• მინიმუმ 2 სიტყვა')
const georgianOnlyMessage = computed(() => '• მხოლოდ ქართული ასოები')
</script>
