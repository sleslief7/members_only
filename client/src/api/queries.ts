import axios from 'axios';
import type { User, UserSignUpRequest } from '../interfaces/userInterface';
import type { CreatePost } from '@/interfaces/postInterface';
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

export const updateUserMembership = async (
  id: number,
  isMember: boolean,
  isAdmin: boolean
) => {
  try {
    const updatedUser = await apiClient.post(`/users/${id}`, {
      isMember,
      isAdmin,
    });
    return updatedUser.data;
  } catch (err) {
    console.error('Error updating user', err);
  }
};

export const deletePost = async (id: number) => {
  try {
    const updatedUser = await apiClient.delete(`/posts/${id}`);
    return updatedUser.data;
  } catch (err) {
    console.error('Error deleting user', err);
  }
};

export const createPost = async (post: CreatePost) => {
  try {
    const newPost = await apiClient.post(`/posts`, {
      title: post.title,
      content: post.content,
      userId: post.user_id,
    });
    return newPost.data;
  } catch (err) {
    console.error('Error creating post', err);
    throw err;
  }
};
