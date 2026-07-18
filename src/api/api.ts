import axios, { type InternalAxiosRequestConfig } from 'axios';

import { API_CONFIG } from './config';
import { HTTP_STATUS } from './constants';

type TokenProvider = () => string | null;
type UnauthorizedHandler = () => void;
/** Возвращает новый access-токен или null, если обновить не удалось. */
type RefreshHandler = () => Promise<string | null>;

let getToken: TokenProvider = () => null;
let onUnauthorized: UnauthorizedHandler = () => {};
let refreshToken: RefreshHandler | null = null;

/**
 * Хранилище сессии регистрирует себя здесь при старте приложения,
 * чтобы api-слой не импортировал стор напрямую (иначе цикл импортов).
 */
export const setTokenProvider = (provider: TokenProvider) => {
  getToken = provider;
};

export const setUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  onUnauthorized = handler;
};

export const setRefreshHandler = (handler: RefreshHandler) => {
  refreshToken = handler;
};

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

// На эндпоинты авторизации refresh не запускаем — иначе 401 зациклится.
const isAuthEndpoint = (url?: string) =>
  !!url && (url.includes('/auth/login') || url.includes('/auth/token/refresh'));

export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (!axios.isAxiosError(error) || error.response?.status !== HTTP_STATUS.unauthorized) {
      return Promise.reject(error);
    }

    const original = error.config as RetriableConfig | undefined;

    // Пробуем один раз обменять refresh на новый access и повторить запрос.
    if (original && !original._retried && refreshToken && !isAuthEndpoint(original.url)) {
      original._retried = true;

      const newToken = await refreshToken();

      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    onUnauthorized();
    return Promise.reject(error);
  },
);
