export const API_CONFIG = {
  // Пути в сгенерированном клиенте уже содержат /v1, поэтому здесь только хост.
  baseURL: 'https://api.easypit.kz',
  timeout: 15_000,
  /**
   * Пока нет бэкенда — модули отдают фикстуры из своих mocks.ts.
   * Переключить на false, когда появится реальный API.
   */
  useMocks: true,
} as const;
