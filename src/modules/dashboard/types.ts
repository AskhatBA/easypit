export type AttentionLevel = 'important' | 'medium';

export type AttentionItem = {
  id: string;
  title: string;
  subtitle: string;
  level: AttentionLevel;
  actionLabel: string;
};

export type RevenuePoint = {
  label: string;
  value: number;
};

export type FeedItem = {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
};

/**
 * Сводка для главного экрана. На вебе собирается из tenant-эндпоинтов
 * (/v1/tenant/bookings/carwash/{id}/?scheduled_date=..., /v1/tenant/carwash/),
 * которых нет в сгенерированном Client API — здесь пока моки той же формы.
 */
export type DashboardSummary = {
  // Пульс · брони сегодня
  bookingsToday: number;
  bookingsChangePct: number;
  projectedRevenue: number;
  pulseTrend: number[];

  // KPI-карточки
  collectedToday: number;
  collectedChangePct: number;
  toCollect: number;
  unpaidCount: number;
  avgRating: number;
  reviewsCount: number;

  attention: AttentionItem[];
  revenueSeries: RevenuePoint[];
  feed: FeedItem[];
};
