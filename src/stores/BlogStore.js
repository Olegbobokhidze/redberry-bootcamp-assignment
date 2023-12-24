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

    filterBlogsByCategory(selectedCategories) {
      if (selectedCategories.length === 0) {
        this.filteredBlogs = this.blogs;
      } else {
        this.filteredBlogs = this.blogs.filter((blog) => {
          return blog.categories.some((category) =>
            selectedCategories.includes(category.id)
          );
        });
      }
    }
  }
})
