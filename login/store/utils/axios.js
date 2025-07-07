import axios from 'axios';
import useAuthStore from '../authStore.';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // change if needed
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🛫 Request Interceptor — attach access token from Zustand
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧼 Response Interceptor — handle 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
