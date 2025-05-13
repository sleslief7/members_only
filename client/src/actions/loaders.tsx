import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (err) {
    console.error('Error fetching posts', err);
    throw err;
  }
};
