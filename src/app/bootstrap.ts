import {
  setRefreshHandler,
  setTokenProvider,
  setUnauthorizedHandler,
} from '@/api';
import {
  clearAuthSession,
  getAuthToken,
  getRefreshToken,
  refreshTokens,
  useAuthStore,
} from '@/modules/auth';
import { resetQueryCacheOnLogout } from '@/shared/lib';

// Пока идёт обновление токена, параллельные 401 ждут один и тот же запрос.
let refreshPromise: Promise<string | null> | null = null;

const runRefresh = async (): Promise<string | null> => {
  const refresh = getRefreshToken();

  if (!refresh) {
    return null;
  }

  try {
    const tokens = await refreshTokens(refresh);
    useAuthStore.getState().setTokens(tokens.access, tokens.refresh);
    return tokens.access;
  } catch {
    return null;
  }
};

/**
 * Связывает api-слой с сессией. Вызывается один раз при старте,
 * до первого рендера, иначе первые запросы уйдут без токена.
 */
export const bootstrap = () => {
  setTokenProvider(getAuthToken);

  setUnauthorizedHandler(() => {
    clearAuthSession();
    resetQueryCacheOnLogout();
  });

  setRefreshHandler(() => {
    if (!refreshPromise) {
      refreshPromise = runRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    return refreshPromise;
  });
};
