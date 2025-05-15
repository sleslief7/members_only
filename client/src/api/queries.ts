import axios from 'axios';
import type { User, UserSignUpRequest } from '../interfaces/userInterface';
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getAllPosts = async () => {
  try {
    const res = await apiClient.get(`/posts`);
    return res.data;
  } catch (err) {
    console.error('Error fetching posts', err);
    throw err;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const res = await apiClient.post<{ user: User }>(`/login`, {
      username: username,
      password: password,
    });
    return res.data.user;
  } catch (err) {
    console.error('Error logging in', err);
    throw err;
  }
};

export const logout = async () => {
  try {
    await apiClient.post(`/logout`);
  } catch (err) {
    console.error('Error logging out', err);
    throw err;
  }
};

export const checkAuth = async () => {
  try {
    const res = await apiClient.get(`/check-auth`);
    return res.data;
  } catch (err) {
    console.error('Error checking auth', err);
    throw err;
  }
};

export const signup = async (user: UserSignUpRequest) => {
  try {
    await apiClient.post(`/sign-up`, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
    });
  } catch (err) {
    console.error('Error logging out', err);
    throw err;
  }
};
