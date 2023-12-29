import { defineStore } from 'pinia'

export const useBlogFormModalStore = defineStore('blogFormModal', {
  state: () => ({
    isBlogFormModalOpen: false
  }),
  actions: {
    openBlogFormModal() {
      this.isBlogFormModalOpen = true
    },
    closeBlogFormModal() {
      this.isBlogFormModalOpen = false
    }
  }
})
