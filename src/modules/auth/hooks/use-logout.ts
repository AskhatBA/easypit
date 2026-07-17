import { useCallback } from 'react';

import { resetQueryCacheOnLogout } from '@/shared/lib';

import { useAuthStore } from '../store';

export const useLogout = () => {
  const clearSession = useAuthStore(state => state.clearSession);

  return useCallback(() => {
    clearSession();
    resetQueryCacheOnLogout();
  }, [clearSession]);
};
