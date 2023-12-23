import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [],
    filteredBlogs: [],
    categories: [] 
  }),

  actions: {
    setBlogs(blogs) {
      this.blogs = blogs
      this.filteredBlogs = blogs
    },

    setCategories(categories) {
      this.categories = categories
    },

    filterBlogsByCategory(categoryId) {
      if (categoryId === null) {
        this.filteredBlogs = this.blogs
      } else {
        this.filteredBlogs = this.blogs.filter((blog) =>
          blog.categories.some((category) => category.id === categoryId)
        )
      }
    }
  }
})
