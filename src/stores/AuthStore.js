import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login({ email }) {
      this.isAuthenticated = true
      this.user = email
      this.saveToLocalStorage()
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
      this.removeFromLocalStorage()
    },
    initializeFromLocalStorage() {
      const authData = localStorage.getItem('auth')
      if (authData) {
        const { isAuthenticated, user } = JSON.parse(authData)
        this.isAuthenticated = isAuthenticated
        this.user = user
      }
    },
    saveToLocalStorage() {
      const authData = JSON.stringify({
        isAuthenticated: this.isAuthenticated,
        user: this.user
      })
      localStorage.setItem('auth', authData)
    },
    removeFromLocalStorage() {
      localStorage.removeItem('auth')
    }
  },
  // Automatically initialize the state from localStorage on component mount
  onMounted() {
    this.initializeFromLocalStorage()
  },
  // Automatically save the state to localStorage before the component is destroyed
  onBeforeUnmount() {
    this.saveToLocalStorage()
  }
})
