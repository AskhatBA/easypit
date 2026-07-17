import type { Booking } from './types';

const inDays = (days: number, hour: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);

  return date.toISOString();
};

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    washId: 'w-1',
    washName: 'EasyPit Абая',
    serviceIds: ['s-2'],
    serviceTitles: ['Комплекс: кузов + салон'],
    startsAt: inDays(1, 11),
    totalPrice: 7500,
    status: 'confirmed',
  },
  {
    id: 'b-2',
    washId: 'w-2',
    washName: 'EasyPit Достык',
    serviceIds: ['s-1'],
    serviceTitles: ['Экспресс-мойка'],
    startsAt: inDays(-3, 16),
    totalPrice: 3000,
    status: 'done',
  },
];
