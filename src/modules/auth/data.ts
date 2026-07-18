import {
  authLoginCreate,
  authMeRetrieve,
  authTokenRefreshCreate,
} from '@/api/generated/authentication/authentication';
import type { User as ApiUser } from '@/api/generated/model';

import type { LoginPayload, Session, User } from './types';

const mapUser = (user: ApiUser): User => ({
  id: user.id,
  name: user.full_name,
  phone: user.phone,
  email: user.email,
  roles: user.roles,
});

export const login = async ({
  identifier,
  password,
}: LoginPayload): Promise<Session> => {
  const response = await authLoginCreate({
    identifier: identifier.trim(),
    password,
  });

  return {
    token: response.access,
    refreshToken: response.refresh,
    user: mapUser(response.user),
  };
};

export const fetchMe = async (): Promise<User> => {
  const response = await authMeRetrieve();
  return mapUser(response.user);
};

/**
 * Обмен refresh-токена на новый access. Бэкенд может вернуть и новый refresh
 * (скользящая сессия) — если нет, продолжаем использовать старый.
 */
export const refreshTokens = async (
  refresh: string,
): Promise<{ access: string; refresh: string }> => {
  const response = await authTokenRefreshCreate({ refresh });

  return {
    access: response.access,
    refresh: response.refresh ?? refresh,
  };
};
