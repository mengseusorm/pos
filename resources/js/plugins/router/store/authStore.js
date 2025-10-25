import axios from 'axios';
 
const api = axios.create({
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

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     token: localStorage.getItem('token') || null,
//     isLoading: false,
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.token,
//     isGuest: (state) => !state.token,
//     currentUser: (state) => state.user,
//   },

//   actions: {
//     async login(credentials) {
//       this.isLoading = true;
//       try {
//         const response = await api.post('/login', credentials);
//         this.token = response.data.token;
//         this.user = response.data.user;
        
//         localStorage.setItem('token', this.token);
//         localStorage.setItem('user', JSON.stringify(this.user));
        
//         return response.data;
//       } catch (error) {
//         throw error;
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async register(userData) {
//       this.isLoading = true;
//       try {
//         const response = await api.post('/register', userData);
//         this.token = response.data.token;
//         this.user = response.data.user;
        
//         localStorage.setItem('token', this.token);
//         localStorage.setItem('user', JSON.stringify(this.user));
        
//         return response.data;
//       } catch (error) {
//         throw error;
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async logout() {
//       try {
//         await api.post('/logout');
//       } catch (error) {
//         console.error('Logout error:', error);
//       } finally {
//         this.token = null;
//         this.user = null;
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     },

//     async checkAuth() {
//       if (!this.token) return false;
      
//       try {
//         const response = await api.get('/user');
//         this.user = response.data;
//         localStorage.setItem('user', JSON.stringify(this.user));
//         return true;
//       } catch (error) {
//         this.logout();
//         return false;
//       }
//     }
//   }
// });

// export { api };

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  // A variable ref to store the user data
  const userData = ref(null)

  // A function acts as a setter to set the incoming user data
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
      await api.post('/logout');
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

  return { userData, setUserData, login, logout }
})
