import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import { api } from './api';

type CancellablePromise<T> = Promise<T> & { cancel?: () => void };

/**
 * Кастомный инстанс для orval: весь сгенерированный клиент ходит через наш
 * axios `api` (с JWT-интерсептором и обработкой 401). Возвращаем сразу `data`,
 * поэтому хуки react-query отдают тело ответа, а не AxiosResponse.
 */
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): CancellablePromise<T> => {
  const source = Axios.CancelToken.source();

  const promise: CancellablePromise<T> = api({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data as T);

  // react-query отменяет запрос через этот метод при размонтировании.
  promise.cancel = () => source.cancel('Запрос отменён');

  return promise;
};

// orval подставляет тип ошибки в сигнатуры сгенерированных хуков.
export type ErrorType<Error> = AxiosError<Error>;
