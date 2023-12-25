<template>
  <div>
    <div class="flex flex-wrap gap-5 px-[250px]  mt-[64px] items-center justify-center">
      <div
        v-for="category in categories"
        :key="category.id"
        @click="toggleCategory(category.id)"
        :class="{
          'h-[31px] border-2 border-neutral-950': selectedCategories.includes(category.id)
        }"
        class="rounded-[30px] h-[30px] w-fit px-[16px] py-[8px] flex items-center justify-center font-bold hover:opacity-[75%] cursor-pointer"
        :style="{
          color: category.text_color,
          backgroundColor: category.background_color
        }"
      >
        <p>{{ category.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useBlogStore } from '../../stores/BlogStore.js'
import { fetchCategories } from '../../services/api.js'

export default {
  setup() {
    const blogStore = useBlogStore()
    const categories = ref([])
    const selectedCategories = ref([])

    const toggleCategory = (categoryId) => {
      try {
        const index = selectedCategories.value.indexOf(categoryId)
        if (index === -1) {
          selectedCategories.value.push(categoryId)
        } else {
          selectedCategories.value.splice(index, 1)
        }

        blogStore.filterBlogsByCategory(selectedCategories.value)
        if (selectedCategories.value.length === 0) {
          localStorage.removeItem('selectedCategories')
        } else {
          localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories.value))
        }
      } catch (error) {
        console.error('Error toggling category:', error)
      }
    }

    watch(
      () => blogStore.categories,
      (newCategories) => {
        categories.value = newCategories
      }
    )
    

    onMounted(async () => {
      try {
        // Load selected categories from local storage
        const storedCategories = localStorage.getItem('selectedCategories')
        selectedCategories.value = storedCategories ? JSON.parse(storedCategories) : []

        const fetchedCategories = await fetchCategories()
        blogStore.setCategories(fetchedCategories)

        // If there are selected categories, filter blogs
        if (selectedCategories.value.length > 0) {
          blogStore.filterBlogsByCategory(selectedCategories.value)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    })
    return {
      categories,
      selectedCategories,
      toggleCategory
    }
  }
}
</script>
