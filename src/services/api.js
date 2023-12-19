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
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const fetchCategories = async () => {
  try {
    const token = await getToken();
    setAuthToken(token);
    const response = await axios.get('https://api.blog.redberryinternship.ge/api/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

export const fetchBlogs = async () => {
  try {
    const token = await getToken();
    setAuthToken(token);
    const response = await axios.get('https://api.blog.redberryinternship.ge/api/blogs');
    console.log(response.data);
    return response.data.data;
  }catch (error) {
    console.error('Error:', error);
    throw error;
  }
}