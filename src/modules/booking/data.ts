import { api, API_CONFIG, delay, ENDPOINTS } from '@/api';

import { MOCK_BOOKINGS } from './mocks';
import type { Booking, CreateBookingPayload } from './types';

export const fetchBookings = async (): Promise<Booking[]> => {
  if (API_CONFIG.useMocks) {
    await delay(500);
    return MOCK_BOOKINGS;
  }

  const { data } = await api.get<Booking[]>(ENDPOINTS.bookings.list);

  return data;
};

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<Booking> => {
  if (API_CONFIG.useMocks) {
    await delay(700);

    return {
      id: `b-${Date.now()}`,
      washId: payload.washId,
      washName: 'EasyPit',
      serviceIds: payload.serviceIds,
      serviceTitles: [],
      startsAt: new Date().toISOString(),
      totalPrice: 0,
      status: 'pending',
      comment: payload.comment,
    };
  }

  const { data } = await api.post<Booking>(ENDPOINTS.bookings.create, payload);

  return data;
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  if (API_CONFIG.useMocks) {
    await delay(400);
    return;
  }

  await api.post(ENDPOINTS.bookings.cancel(bookingId));
};
