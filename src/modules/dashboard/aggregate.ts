import type { TenantBooking, TenantCarwash } from '@/api/tenant';
import { formatPrice, toDateKey } from '@/shared/lib';

import type {
  AttentionItem,
  DashboardSummary,
  FeedItem,
  RevenuePoint,
} from './types';

const CANCELLED = new Set(['cancelled', 'canceled', 'no_show']);

const STATUS_RU: Record<string, string> = {
  pending: 'ожидает',
  confirmed: 'подтверждена',
  arrived: 'прибыл',
  in_progress: 'в работе',
  in_service: 'в работе',
  completed: 'завершена',
  cancelled: 'отменена',
  no_show: 'не пришёл',
};

const dayKeyOffset = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return toDateKey(date);
};

const timeAgo = (iso: string) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);

  if (mins < 1) {
    return 'только что';
  }
  if (mins < 60) {
    return `${mins} мин назад`;
  }
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    return `${hours} ч назад`;
  }
  return `${Math.floor(hours / 24)} дн назад`;
};

const pctChange = (current: number, previous: number) => {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return Math.round(((current - previous) / previous) * 100);
};

const sum = (items: TenantBooking[], pick: (b: TenantBooking) => number) =>
  items.reduce((total, booking) => total + pick(booking), 0);

export const buildDashboardSummary = (
  carwashes: TenantCarwash[],
  bookings: TenantBooking[],
): DashboardSummary => {
  const today = dayKeyOffset(0);
  const yesterday = dayKeyOffset(-1);
  const active = bookings.filter(booking => !CANCELLED.has(booking.status));

  const onDay = (day: string) =>
    active.filter(booking => booking.scheduled_date === day);

  const todayBookings = onDay(today);
  const yesterdayBookings = onDay(yesterday);

  const bookingsToday = todayBookings.length;
  const collectedToday = sum(todayBookings, b => b.amount_paid_kzt);
  const collectedYesterday = sum(yesterdayBookings, b => b.amount_paid_kzt);

  const unpaid = active.filter(booking => booking.payment_status === 'unpaid');
  const toCollect = sum(unpaid, b => b.total_price_kzt - b.amount_paid_kzt);

  // Пульс: количество броней по дням (последние 11 дней).
  const pulseTrend = Array.from({ length: 11 }, (_, index) =>
    onDay(dayKeyOffset(-(10 - index))).length,
  );

  // Поток выручки: сумма по дням (последние 14 дней).
  const revenueSeries: RevenuePoint[] = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    const key = toDateKey(date);
    return {
      label: String(date.getDate()),
      value: sum(onDay(key), b => b.total_price_kzt),
    };
  });

  const totalReviews = carwashes.reduce((s, c) => s + c.review_count, 0);
  const weightedRating = carwashes.reduce(
    (s, c) => s + (c.average_rating ?? 0) * c.review_count,
    0,
  );

  const feed: FeedItem[] = active
    .slice()
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 4)
    .map(booking => ({
      id: booking.id,
      title: `${booking.vehicle?.plate ?? 'Авто'} · ${
        STATUS_RU[booking.status] ?? booking.status
      }`,
      subtitle: booking.carwash_name,
      timeAgo: timeAgo(booking.updated_at),
    }));

  const attention = buildAttention(active, unpaid.length, toCollect);

  return {
    bookingsToday,
    bookingsChangePct: pctChange(bookingsToday, yesterdayBookings.length),
    projectedRevenue: sum(todayBookings, b => b.total_price_kzt),
    pulseTrend,

    collectedToday,
    collectedChangePct: pctChange(collectedToday, collectedYesterday),
    toCollect,
    unpaidCount: unpaid.length,
    avgRating: totalReviews ? weightedRating / totalReviews : 0,
    reviewsCount: totalReviews,

    attention,
    revenueSeries,
    feed,
  };
};

const buildAttention = (
  active: TenantBooking[],
  unpaidCount: number,
  toCollect: number,
): AttentionItem[] => {
  const items: AttentionItem[] = [];

  const pending = active.filter(b => b.status === 'pending').length;
  if (pending > 0) {
    items.push({
      id: 'pending',
      title: 'Ожидание подтверждения',
      subtitle: `${pending} броней ждут подтверждения`,
      level: 'important',
      actionLabel: 'Брони',
    });
  }

  if (unpaidCount > 0) {
    items.push({
      id: 'unpaid',
      title: 'Деньги к получению',
      subtitle: `${formatPrice(toCollect)} · ${unpaidCount} неоплаченных броней`,
      level: 'medium',
      actionLabel: 'Принять',
    });
  }

  const inQueue = active.filter(
    b => (b.queue_position ?? 0) > 0 && b.status !== 'completed',
  ).length;
  if (inQueue > 0) {
    items.push({
      id: 'queue',
      title: 'Очередь стоит',
      subtitle: `${inQueue} авто в очереди`,
      level: 'medium',
      actionLabel: 'Очередь',
    });
  }

  if (items.length === 0) {
    items.push({
      id: 'ok',
      title: 'Всё в порядке',
      subtitle: 'Ничего не требует внимания',
      level: 'medium',
      actionLabel: 'Ок',
    });
  }

  return items;
};
