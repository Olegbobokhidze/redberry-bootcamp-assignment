import axios from 'axios'

const apiUrl = 'https://api.blog.redberryinternship.ge/api'

export const getToken = async () => {
  try {
    const response = await axios.get(`${apiUrl}/token`)
    return response.data.token
  } catch (error) {
    console.error('Error fetching token:', error)
    throw error
  }
}

export const setAuthToken = async (token) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Error setting auth token:', error);
    throw error;
  }
}

export const fetchCategories = async () => {
  try {
    const token = await getToken()
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
    const token = await getToken();
    setAuthToken(token);
    const response = await axios.get(`${apiUrl}/blogs`);
    console.log('Response Status:', response.status);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};