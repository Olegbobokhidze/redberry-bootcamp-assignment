import axiosInstance from '@/plugins/axios'

export const fetchCategories = async () => {
  try {
    console.log(import.meta.env.VITE_API_BASE_URL)
    const response = await axiosInstance.get(`/categories`)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const fetchBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/blogs`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}
export const fetchSingleBlog = async (id) => {
  try {
    const response = await axiosInstance.get(`/blogs/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

export const postBlog = async (blogData) => {
  try {
    const response = await axiosInstance.post(`/blogs`, blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json'
      }
    })
    console.log(response.request)
    console.log(blogData, 'from api')
    console.log('Response Status:', response.status)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please provide a valid token.')
      throw new Error('Unauthorized access. Please provide a valid token.')
    } else {
      console.error('Error creating blog:', error)
      throw error
    }
  }
}
export const authenticateWithEmail = async (email) => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email: email
    })

    console.log('Response Status:', response.status)
    console.log(response.data)

    if (response.status === 204) {
      console.log('User logged in successfully')
      console.log(response.data.token)

      return { success: true }
    } else {
      console.error('Unexpected response status:', response.status)
      throw new Error('Unexpected response status')
    }
  } catch (error) {
    console.error('Error during email authentication:', error)
    throw error
  }
}
