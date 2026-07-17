import type { LoginResponse } from './types';

export const MOCK_LOGIN_CODE = '0000';

export const mockLoginResponse = (phone: string): LoginResponse => ({
  token: 'mock-token',
  user: {
    id: 'u-1',
    name: 'Асхат',
    phone,
    carNumber: '777 ABC 02',
  },
});
