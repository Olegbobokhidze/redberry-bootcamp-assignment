// YourVueComponent.vue

<template>
  <div>
    <div class="grid grid-cols-7 gap-5 mt-[64px]">
      <div
        v-for="category in categories"
        :key="category.id"
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
import { fetchCategories } from '../../services/api.js';

export default {
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    try {
      this.categories = await fetchCategories();
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
</script>

