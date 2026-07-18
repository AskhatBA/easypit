import { api } from '../api';
import type { Paginated, TenantBooking, TenantCarwash } from './types';

const PAGE_SIZE = 100;

// Бэкенд отдаёт денежные поля как строки-децималы ("6000.00") или числа —
// приводим к number, иначе сложение конкатенирует строки.
const toNumber = (value: unknown): number => {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeBooking = (booking: TenantBooking): TenantBooking => ({
  ...booking,
  total_price_kzt: toNumber(booking.total_price_kzt),
  amount_paid_kzt: toNumber(booking.amount_paid_kzt),
});

/** GET /v1/tenant/carwash/ — автомойки сети владельца. */
export const fetchTenantCarwashes = async (): Promise<TenantCarwash[]> => {
  const { data } = await api.get<Paginated<TenantCarwash>>(
    '/v1/tenant/carwash/',
    { params: { page: 1, page_size: PAGE_SIZE } },
  );

  return data.results;
};

type TenantBookingsParams = {
  scheduledDate?: string;
};

/** GET /v1/tenant/bookings/carwash/{id}/ — брони по мойке (опц. за дату). */
export const fetchTenantBookings = async (
  carwashId: string,
  params: TenantBookingsParams = {},
): Promise<TenantBooking[]> => {
  const { data } = await api.get<Paginated<TenantBooking>>(
    `/v1/tenant/bookings/carwash/${carwashId}/`,
    {
      params: {
        page_size: PAGE_SIZE,
        ordering: 'scheduled_date',
        ...(params.scheduledDate
          ? { scheduled_date: params.scheduledDate }
          : {}),
      },
    },
  );

  return data.results.map(normalizeBooking);
};
