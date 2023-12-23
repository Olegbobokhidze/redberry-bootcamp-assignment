// YourVueComponent.vue

<template>
  <div>
    <div class="grid grid-cols-7 gap-5 mt-[64px]">
      <div
        v-for="category in categories"
        :key="category.id"
        @click="filterByCategory(category.id)"
        class="rounded-[30px] h-[30px] px-[16px] py-[8px] flex items-center justify-center font-bold hover:opacity-[75%] cursor-pointer"
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

    const filterByCategory = (categoryId) => {
      blogStore.filterBlogsByCategory(categoryId)
    }

    watch(
      () => blogStore.categories,
      (newCategories) => {
        categories.value = newCategories
      }
    )

    onMounted(async () => {
      try {
        const fetchedCategories = await fetchCategories()
        blogStore.setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error:', error)
      }
    })

    return {
      categories,
      filterByCategory
    }
  }
}
</script>
