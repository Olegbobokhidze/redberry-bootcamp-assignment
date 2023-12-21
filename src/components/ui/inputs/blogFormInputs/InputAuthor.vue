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
        { 'border-gray-300': !isInvalid, 'border-red-500 bg-[#FAF2F3]': isInvalid && wasTouched }
      ]"
      @blur="wasTouched = true"
    />
    <p :class="minLengthClass">{{ minLengthMessage }}</p>
    <p :class="wordCountClass">{{ wordCountMessage }}</p>
    <p :class="englishOnlyClass">{{ englishOnlyMessage }}</p>
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

const minLengthRule = computed(
  () => (value.value || '').length >= 4 || value.value === '' || value.value === undefined
)
const wordCountRule = computed(
  () =>
    (value.value || '').trim().split(/\s+/).length >= 2 ||
    value.value === '' ||
    value.value === undefined
)
const englishOnlyRule = computed(() => /^[A-Za-z\s]*$/.test(value.value || ''))

const minLengthClass = computed(() => ({
  'text-gray-500': minLengthRule.value,
  'text-red-500': !minLengthRule.value && wasTouched
}))

const wordCountClass = computed(() => ({
  'text-gray-500': wordCountRule.value,
  'text-red-500': !wordCountRule.value && wasTouched
}))

const englishOnlyClass = computed(() => ({
  'text-gray-500': englishOnlyRule.value,
  'text-red-500': !englishOnlyRule.value && wasTouched
}))

// Messages to display based on validation
const minLengthMessage = computed(() => '• მინიმუმ 4 სიმბოლო')
const wordCountMessage = computed(() => '• მინიმუმ 2 სიტყვა')
const englishOnlyMessage = computed(() => '• მხოლოდ ქართული ასოები')
</script>
