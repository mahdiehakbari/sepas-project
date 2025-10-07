import { create } from 'zustand';
import Cookies from 'js-cookie';
import { IAuthState } from './types';

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  token: Cookies.get('token') || null,
  isLoggedIn: !!Cookies.get('token'),

  setAuth: (token, user) => {
    Cookies.set('token', token);
    set({ token, user, isLoggedIn: true });
  },

  logout: () => {
    Cookies.remove('token');
    set({ token: null, user: null, isLoggedIn: false });
  },
}));
