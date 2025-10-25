import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);  

export const useAuthStore = defineStore('authStore', () => { 
  const userData = ref(null) 
  const setUserData = (newUserData) => {
    userData.value = newUserData
  }

  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')))

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      token.value = response.data.token;
      user.value = response.data.user;

      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));

      return {
        success: true,
        ...response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.'
      };
    } 
  }

  const logout = async () => {
    try {
      await api.post('/admin/logout');
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed. Please try again.'
      };
    }
  }

  return { userData, setUserData, login, logout, api }
})
