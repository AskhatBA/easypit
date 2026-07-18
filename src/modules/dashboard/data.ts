import { delay } from '@/api';

import { MOCK_DASHBOARD } from './mocks';
import type { DashboardSummary } from './types';

/**
 * Сводка главного экрана. На вебе агрегируется из tenant-эндпоинтов
 * (/v1/tenant/carwash/, /v1/tenant/bookings/carwash/{id}/?scheduled_date=today).
 * Их нет в сгенерированном Client API, поэтому пока отдаём мок той же формы —
 * когда появится tenant-клиент, заменить тело функции на реальные вызовы.
 */
export const fetchDashboard = async (): Promise<DashboardSummary> => {
  await delay(400);
  return MOCK_DASHBOARD;
};
