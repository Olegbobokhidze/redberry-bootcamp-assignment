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
        if (this.filteredBlogIds.length === 0 && !selectedCategories) {
          this.filteredBlogIds = this.blogs.map((blog) => blog.id)
          this.filteredBlogs = this.blogs
        }
        this.filteredBlogs = this.blogs.filter((blog) => this.filteredBlogIds.includes(blog.id))
      } catch (error) {
        console.error('Error filtering blogs:', error)
      }
    },
    filterRelatedBlogsByCategory(blogId) {
      console.log('Blog ID:', blogId)
      console.log('All Blogs:', this.blogs)

      const currentBlog = this.blogs.find((blog) => blog.id === blogId)
      console.log('Current Blog:', currentBlog)

      if (!currentBlog) {
        console.error('Blog not found')
        return
      }

      const relatedBlogIds = []

      for (const blog of this.blogs) {
        if (blog.id !== blogId) {
          let hasCommonCategory = false

          // Check for common categories
          for (const currentCategory of currentBlog.categories) {
            for (const blogCategory of blog.categories) {
              if (currentCategory.id === blogCategory.id) {
                hasCommonCategory = true
                break
              }
            }
            if (hasCommonCategory) {
              break
            }
          }

          if (hasCommonCategory) {
            relatedBlogIds.push(blog.id)
          }
        }
      }

      console.log('Related Blog IDs:', relatedBlogIds)

      this.filteredBlogs = this.blogs.filter((blog) => relatedBlogIds.includes(blog.id))
      console.log('Filtered Blogs:', this.filteredBlogs)
    }
  }
})
