import axios from 'axios'

const apiUrl = 'https://api.blog.redberryinternship.ge/api'


export async function getToken() {
  try {
    const response = await axios.get(`${apiUrl}/token`)
    return response.data.token
  } catch (error) {
    console.error('Error fetching token:', error)
    throw error
  }
}


export function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
