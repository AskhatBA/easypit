import { fetchTenantBookings, fetchTenantCarwashes } from '@/api/tenant';

import { buildDashboardSummary } from './aggregate';
import type { DashboardSummary } from './types';

/**
 * Сводка главного экрана — реальные данные из tenant-эндпоинтов:
 * список моек (/v1/tenant/carwash/) + брони по каждой мойке
 * (/v1/tenant/bookings/carwash/{id}/). KPI, пульс, выручка и лента
 * считаются из броней на клиенте (buildDashboardSummary).
 */
export const fetchDashboard = async (): Promise<DashboardSummary> => {
  const carwashes = await fetchTenantCarwashes();

  const bookingLists = await Promise.all(
    carwashes.map(carwash => fetchTenantBookings(carwash.id)),
  );

  return buildDashboardSummary(carwashes, bookingLists.flat());
};
