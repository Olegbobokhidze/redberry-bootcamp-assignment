import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [],
    filteredBlogs: [],
    categories: [],
    filteredBlogIds: []
  }),

  actions: {
    setBlogs(blogs) {
      this.blogs = blogs
      this.filteredBlogs = blogs
    },

    setCategories(categories) {
      this.categories = categories
    },

    filterBlogsByCategory(selectedCategories) {
      try {
        if (selectedCategories.length === 0) {
          // If no categories are selected, include all blogs
          this.filteredBlogIds = this.blogs.map((blog) => blog.id)
        } else {
          // Filter blogs based on selected categories
          this.filteredBlogIds = this.blogs.reduce((ids, blog) => {
            const hasCategory = blog.categories.some((category) =>
              selectedCategories.includes(category.id)
            )

            if (hasCategory) {
              ids.push(blog.id)
            }

            return ids
          }, [])
        }
        if(this.filteredBlogIds.length === 0 && !selectedCategories) {
          this.filteredBlogIds = this.blogs.map((blog) => blog.id)
          this.filteredBlogs = this.blogs
        }
        this.filteredBlogs = this.blogs.filter((blog) => this.filteredBlogIds.includes(blog.id))
      } catch (error) {
        console.error('Error filtering blogs:', error)
      }
    }
  }
})
