<template>
  <div>
    <div class="flex flex-wrap gap-5 px-[250px] mt-[64px] items-center justify-center">
      <div
        v-for="category in categories"
        :key="category.id"
        @click="toggleCategory(category.id)"
        :class="{
          'px-[14px] border-2 border-neutral-950': selectedCategories.includes(category.id)
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
import { useCategoryFilter } from '@/composables/useCategoryFilter'

export default {
  setup() {
    const { categories, selectedCategories, toggleCategory } = useCategoryFilter()

    return {
      categories,
      selectedCategories,
      toggleCategory
    }
  }
}
</script>
