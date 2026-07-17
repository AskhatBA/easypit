import { api, API_CONFIG, delay, ENDPOINTS } from '@/api';
import { normalizePhone } from '@/shared/lib';

import { MOCK_LOGIN_CODE, mockLoginResponse } from './mocks';
import type { LoginPayload, LoginResponse, User } from './types';

export const requestCode = async (phone: string): Promise<void> => {
  if (API_CONFIG.useMocks) {
    await delay(400);
    return;
  }

  await api.post(ENDPOINTS.auth.requestCode, { phone: normalizePhone(phone) });
};

export const login = async ({
  phone,
  code,
}: LoginPayload): Promise<LoginResponse> => {
  if (API_CONFIG.useMocks) {
    await delay(600);

    if (code !== MOCK_LOGIN_CODE) {
      throw new Error(`Неверный код. Для моков подойдёт ${MOCK_LOGIN_CODE}.`);
    }

    return mockLoginResponse(normalizePhone(phone));
  }

  const { data } = await api.post<LoginResponse>(ENDPOINTS.auth.login, {
    phone: normalizePhone(phone),
    code,
  });

  return data;
};

export const fetchMe = async (): Promise<User> => {
  if (API_CONFIG.useMocks) {
    await delay(200);
    return mockLoginResponse('77071234567').user;
  }

  const { data } = await api.get<User>(ENDPOINTS.auth.me);

  return data;
};
