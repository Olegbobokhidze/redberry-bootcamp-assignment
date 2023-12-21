<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <select
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="[
        'rounded-xl border w-[288px] h-[44px] px-4 py-2 text-[#1A1A1F] ',
        'focus:outline-none focus:border-[#5D37F3] bg-[#F7F7FF]',
        { 'border-gray-300': !isInvalid, 'border-red-500 bg-[#FAF2F3]': isInvalid && wasTouched }
      ]"
      @blur="wasTouched = true"
    >
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
        class="rounded-[30px] h-[30px] px-[16px] py-[8px] flex items-center justify-center font-bold hover:opacity-[75%] cursor-pointer"
        :style="{
          color: category.text_color,
          backgroundColor: category.background_color
        }"
      >
        {{ category.title }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'
import { fetchCategories } from '../../../../services/api.js'

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

const categories = ref([])

onMounted(async () => {
  try {
    categories.value = await fetchCategories()
  } catch (error) {
    console.error('Error:', error)
  }
})
</script>
