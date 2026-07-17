import { create } from 'zustand';

import type { LoginResponse, User } from '../types';

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: LoginResponse) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
};

/**
 * Сессия живёт только в памяти: после перезапуска приложения нужен новый вход.
 * Для persist подключить @react-native-async-storage/async-storage
 * и обернуть стор в zustand/middleware persist.
 */
export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setSession: ({ token, user }) => set({ token, user, isAuthenticated: true }),

  setUser: user => set({ user }),

  clearSession: () => set({ token: null, user: null, isAuthenticated: false }),
}));

export const getAuthToken = () => useAuthStore.getState().token;

export const clearAuthSession = () => useAuthStore.getState().clearSession();
