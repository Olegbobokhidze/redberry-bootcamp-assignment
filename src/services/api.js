import axios from 'axios'

const apiUrl = 'https://api.blog.redberryinternship.ge/api'

// export const getToken = async () => {
//   try {
//     const response = await axios.get(`${apiUrl}/token`)
//     return response.data.token
//   } catch (error) {
//     console.error('Error fetching token:', error)
//     throw error
//   }
// }
const token = 'c6ccf285bfe578ab4976014965972a8dd038d2aecdc2dbd1f8d07dfdab19578d'

export const setAuthToken = async (token) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } catch (error) {
    console.error('Error setting auth token:', error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    // const token = await getToken()
    setAuthToken(token)
    const response = await axios.get(`${apiUrl}/categories`)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const fetchBlogs = async () => {
  try {
    // const token = await getToken()
    setAuthToken(token)
    const response = await axios.get(`${apiUrl}/blogs`)
    console.log('Response Status:', response.status)
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}
export const fetchSingleBlog = async (id) => {
  try {
    // const token = await getToken()
    setAuthToken(token)
    const response = await axios.get(`${apiUrl}/blogs/${id}`)
    console.log('Response Status:', response.status)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

export const postBlog = async (blogData) => {
  try {
    // const token = await getToken()
    setAuthToken(token)
    const response = await axios.post(`${apiUrl}/blogs`, blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json'
      }
    })
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
