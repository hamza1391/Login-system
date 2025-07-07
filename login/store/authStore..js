import { create } from 'zustand';
import api from './utils/axios';


const useAuthStore = create((set) => ({
  userId: null,
  email: null,
  acessToken: null,
  refreshToken: null,
  isLoading: false,

  // LOGIN
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/login', { email, password });
      const { userId, email: userEmail, acessToken ,refreshToken } = res.data;
      set({ userId, email: userEmail, acessToken ,refreshToken });
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      throw message;
    } finally {
      set({ isLoading: false });
    }
  },

  // SIGNUP
  signup: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/signup', { email, password });
      const { userId, email: userEmail, refreshToken } = res.data;
      set({ userId, email: userEmail, refreshToken });
    } catch (err) {
      const message = err?.response?.data?.message || 'Signup failed';
      throw message;
    } finally {
      set({ isLoading: false });
    }
  },

  // LOGOUT
  logout: () => {
    set({ userId: null, email: null, acessToken:null ,refreshToken: null });
  },
  getProtectedData: async () => {
    try {
      const res = await api.get('/protected');
      return res.data;
    } catch (err) {
      throw err?.response?.data?.message || 'Access denied';
    }
  }
  
}));

export default useAuthStore;
