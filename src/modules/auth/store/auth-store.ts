import { create } from 'zustand';

import type { Session, User } from '../types';

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: Session) => void;
  setTokens: (token: string, refreshToken: string) => void;
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
  refreshToken: null,
  user: null,
  isAuthenticated: false,

  setSession: ({ token, refreshToken, user }) =>
    set({ token, refreshToken, user, isAuthenticated: true }),

  setTokens: (token, refreshToken) => set({ token, refreshToken }),

  setUser: user => set({ user }),

  clearSession: () =>
    set({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    }),
}));

export const getAuthToken = () => useAuthStore.getState().token;

export const getRefreshToken = () => useAuthStore.getState().refreshToken;

export const clearAuthSession = () => useAuthStore.getState().clearSession();
