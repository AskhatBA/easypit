// Ручные пути для модулей на моках (auth уже ходит через сгенерированный клиент).
export const ENDPOINTS = {
  washes: {
    list: '/washes',
    byId: (washId: string) => `/washes/${washId}`,
    services: (washId: string) => `/washes/${washId}/services`,
    slots: (washId: string) => `/washes/${washId}/slots`,
  },
  bookings: {
    list: '/bookings',
    create: '/bookings',
    byId: (bookingId: string) => `/bookings/${bookingId}`,
    cancel: (bookingId: string) => `/bookings/${bookingId}/cancel`,
  },
} as const;

export const QUERY_KEYS = {
  washes: (search?: string) => ['washes', search ?? ''] as const,
  wash: (washId: string) => ['washes', washId] as const,
  washServices: (washId: string) => ['washes', washId, 'services'] as const,
  washSlots: (washId: string, date: string) =>
    ['washes', washId, 'slots', date] as const,
  bookings: ['bookings'] as const,
} as const;

export const HTTP_STATUS = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
} as const;
