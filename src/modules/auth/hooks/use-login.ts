import { useMutation } from '@tanstack/react-query';

import { toApiError } from '@/api';

import { login } from '../data';
import { useAuthStore } from '../store';
import type { LoginPayload, Session } from '../types';

export const useLogin = () => {
  const setSession = useAuthStore(state => state.setSession);

  return useMutation<Session, unknown, LoginPayload>({
    mutationFn: login,
    onSuccess: setSession,
  });
};

export const useLoginError = (error: unknown) =>
  error ? toApiError(error).message : null;
