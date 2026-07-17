import { setTokenProvider, setUnauthorizedHandler } from '@/api';
import { clearAuthSession, getAuthToken } from '@/modules/auth';
import { resetQueryCacheOnLogout } from '@/shared/lib';

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
};
