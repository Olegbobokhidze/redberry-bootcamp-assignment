<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold text-[#1A1A1F] overflow-x-auto whitespace-nowrap">
      {{ placeholder }}
    </label>
    <div class="relative" @click="toggleDropdown">
      <div
        v-if="selectedCategories.length === 0"
        :class="[
          'flex flex-wrap items-center rounded-xl border w-[288px] h-[44px] px-4 py-2 text-[#1A1A1F] outline-none  bg-[#F9F9FA] cursor-pointer',
          {
            'border-grey-500': selectedCategories.length === 0,
            'border-green-500': selectedCategories.length > 0
          }
        ]"
      >
        <span
          v-for="selectedCategory in selectedCategories"
          :key="selectedCategory.id"
          class="mr-2"
        >
          {{ selectedCategory.title }}
        </span>
        <span v-if="selectedCategories.length === 0" class="opacity-50">{{ placeholder }}</span>
      </div>
      <div
        v-else
        class="rounded-xl border w-[288px] h-[44px] px-4 py-2 text-[#1A1A1F] border-green-500 overflow-hidden flex flex-row outline-none bg-[#F7F7FF] cursor-pointer"
        style="position: relative"
      >
        <div
          class="overflow-x-auto absolute bottom-0 left-0 right-0"
          style="height: auto; max-height: 100px; /* Adjust max-height as needed */"
        >
          <div class="flex flex-row">
            <div
              v-for="selectedCategory in selectedCategories"
              :key="selectedCategory.id"
              class="inline-flex items-center w-fit whitespace-nowrap justify-between gap-2 rounded-[30px] h-[30px] px-[16px] py-[8px] font-bold cursor-pointer mr-2"
              :style="{
                color: selectedCategory.text_color,
                backgroundColor: selectedCategory.background_color
              }"
            >
              {{ selectedCategory.title }}
              <div
                class="w-[20px] h-[20px] hover:bg-[#EBEAEF] hover:text-black flex items-center justify-center rounded-[50%]"
              >
                <span @click.stop="removeCategory(selectedCategory.id)">✕</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="isDropdownOpen"
          class="absolute top-[48px] left-0 bg-white shadow-md rounded-md p-2 z-10"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            @click="toggleCategory(category)"
            class="rounded-[30px] h-[30px] px-[16px] py-[8px] inline-flex items-center justify-center font-bold hover:opacity-[75%] cursor-pointer mt-2 mr-2"
            :style="{ color: category.text_color, backgroundColor: category.background_color }"
          >
            {{ category.title }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useField } from 'vee-validate'
import { fetchCategories } from '../../../../services/api.js'

const props = defineProps({
  name: String,
  type: String,
  title: String,
  placeholder: String
})

const { value, setValue } = useField(props.name)
const categories = ref([])
const selectedCategories = ref([])
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
watchEffect(() => {
  const storedData = localStorage.getItem('blogFormData')
  if (storedData) {
    const formData = JSON.parse(storedData)
    const storedCategoryIds = formData.categories

    if (storedCategoryIds !== undefined) {
      setValue(storedCategoryIds)

      selectedCategories.value = categories.value.filter((category) =>
        storedCategoryIds.includes(category.id)
      )
    }
  }
})

onMounted(() => {
  const storedData = localStorage.getItem('blogFormData')
  if (storedData) {
    const formData = JSON.parse(storedData)
    const storedCategoryIds = formData.category

    if (storedCategoryIds !== undefined) {
      value.value = storedCategoryIds

      selectedCategories.value = categories.value.filter((category) =>
        storedCategoryIds.includes(category.id)
      )
    }
  }
})

const toggleCategory = (category) => {
  if (!selectedCategories.value.some((c) => c.id === category.id)) {
    selectedCategories.value = [...selectedCategories.value, category]
    value.value = selectedCategories.value.map((c) => c.id)
  }
}
const removeCategory = (categoryId) => {
  selectedCategories.value = selectedCategories.value.filter((c) => c.id !== categoryId)
  value.value = selectedCategories.value.map((c) => c.id)
}

onMounted(async () => {
  try {
    categories.value = await fetchCategories()
  } catch (error) {
    console.error('Error:', error)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
