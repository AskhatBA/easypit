import axios from 'axios';

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
  fieldErrors?: Record<string, string[] | string>;
};

/**
 * Единый конверт ошибок бэкенда: { code, message, details }.
 * details — null, либо объект/массив полевых ошибок при валидации (400).
 */
type ServerErrorBody = {
  code?: string;
  message?: string;
  details?: Record<string, string[] | string> | null;
};

const DEFAULT_MESSAGE = 'Что-то пошло не так. Попробуйте ещё раз.';
const NETWORK_MESSAGE = 'Нет связи с сервером. Проверьте интернет.';

/**
 * Приводит любую ошибку (axios / сеть / рантайм) к одной форме,
 * чтобы экраны и формы не разбирали её каждый раз заново.
 */
export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError<ServerErrorBody>(error)) {
    if (!error.response) {
      return { message: NETWORK_MESSAGE };
    }

    const body = error.response.data;

    return {
      message: body?.message ?? DEFAULT_MESSAGE,
      code: body?.code,
      status: error.response.status,
      fieldErrors: body?.details ?? undefined,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: DEFAULT_MESSAGE };
};

export const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
