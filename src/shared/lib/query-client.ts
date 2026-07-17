import { QueryClient } from '@tanstack/react-query';
import { HTTP_STATUS, toApiError } from '@/api';

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const { status } = toApiError(error);

        // 4xx не лечится повтором — это мы неправильно спросили.
        if (status && status >= 400 && status < 500) {
          return false;
        }

        return failureCount < MAX_RETRIES;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

export const resetQueryCacheOnLogout = () => {
  queryClient.removeQueries();
};

export const isUnauthorized = (error: unknown) =>
  toApiError(error).status === HTTP_STATUS.unauthorized;
