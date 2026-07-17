import { useMutation } from '@tanstack/react-query';

import { toApiError } from '@/api';

import { login, requestCode } from '../data';
import { useAuthStore } from '../store';
import type { LoginPayload, LoginResponse } from '../types';

export const useRequestCode = () =>
  useMutation({
    mutationFn: requestCode,
  });

export const useLogin = () => {
  const setSession = useAuthStore(state => state.setSession);

  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: login,
    onSuccess: setSession,
  });
};

export const useLoginError = (error: unknown) =>
  error ? toApiError(error).message : null;
