export const API_CONFIG = {
  baseURL: 'https://api.easypit.app/v1',
  timeout: 15_000,
  /**
   * Пока нет бэкенда — модули отдают фикстуры из своих mocks.ts.
   * Переключить на false, когда появится реальный API.
   */
  useMocks: true,
} as const;
