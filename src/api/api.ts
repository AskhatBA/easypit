import axios from 'axios';

import { API_CONFIG } from './config';
import { HTTP_STATUS } from './constants';

type TokenProvider = () => string | null;
type UnauthorizedHandler = () => void;

let getToken: TokenProvider = () => null;
let onUnauthorized: UnauthorizedHandler = () => {};

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
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.unauthorized) {
        onUnauthorized();
      }
    }

    return Promise.reject(error);
  },
);
