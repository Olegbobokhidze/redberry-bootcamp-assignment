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
import axios from 'axios'
import { getToken, setAuthToken } from '../../services/api.js'

export default {
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    try {
      const token = await getToken()
      setAuthToken(token)
      const response = await axios.get('https://api.blog.redberryinternship.ge/api/categories')
      this.categories = response.data.data
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
</script>
