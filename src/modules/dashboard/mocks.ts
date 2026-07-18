import type { DashboardSummary } from './types';

const DAYS = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
const REVENUE = [
  42_000, 51_000, 38_000, 61_000, 47_000, 55_000, 49_000, 72_000, 58_000,
  64_000, 79_750,
];

export const MOCK_DASHBOARD: DashboardSummary = {
  bookingsToday: 11,
  bookingsChangePct: 1000,
  projectedRevenue: 251_200,
  pulseTrend: [2, 3, 2, 4, 3, 5, 4, 6, 5, 8, 11],

  collectedToday: 79_750,
  collectedChangePct: 478,
  toCollect: 123_900,
  unpaidCount: 5,
  avgRating: 4.4,
  reviewsCount: 16,

  attention: [
    {
      id: 'a-1',
      title: 'Ожидание фиксации цены',
      subtitle: '3 клиента не зафиксировали цену',
      level: 'important',
      actionLabel: 'Брони',
    },
    {
      id: 'a-2',
      title: 'Деньги к получению',
      subtitle: '123 900 ₸ · 5 неоплаченных броней',
      level: 'medium',
      actionLabel: 'Принять',
    },
    {
      id: 'a-3',
      title: 'Очередь стоит',
      subtitle: 'QazWash Аль-Фараби · 4 авто',
      level: 'medium',
      actionLabel: 'Очередь',
    },
  ],

  revenueSeries: DAYS.map((label, index) => ({ label, value: REVENUE[index] })),

  feed: [
    {
      id: 'f-1',
      title: '419 MXX 02 подтверждена',
      subtitle: 'QazWash Достык',
      timeAgo: '4 часа назад',
    },
    {
      id: 'f-2',
      title: 'Новый отзыв ★ 5',
      subtitle: 'QazWash Аль-Фараби',
      timeAgo: '5 часов назад',
    },
    {
      id: 'f-3',
      title: '777 ABC 02 в работе',
      subtitle: 'QazWash Достык',
      timeAgo: '6 часов назад',
    },
  ],
};
