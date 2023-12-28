import { ref, watch, onMounted } from 'vue'
import { useBlogStore } from '@/stores/BlogStore.js'
import { fetchCategories } from '@/services/api.js'

export function useCategoryFilter() {
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
      const storedCategories = localStorage.getItem('selectedCategories')
      selectedCategories.value = storedCategories ? JSON.parse(storedCategories) : []

      const fetchedCategories = await fetchCategories()
      blogStore.setCategories(fetchedCategories)

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
    toggleCategory,
  }
}
