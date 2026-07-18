/**
 * Ручной типизированный слой для tenant/business-эндпоинтов
 * (`/v1/tenant/...`). Их нет в сгенерированном Client API и негде взять
 * tenant-схему, поэтому описываем только используемые поля руками.
 * Запросы идут через тот же axios `api` (JWT-интерсептор).
 */
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type TenantAmenity = {
  id: string;
  name: string;
};

export type TenantOperatingHours = {
  day_of_week: number;
  is_24_7: boolean;
  open_time: string | null;
  close_time: string | null;
};

export type TenantCity = {
  id: string;
  name: string;
};

export type TenantCarwash = {
  id: string;
  name: string;
  address: string;
  city: TenantCity | null;
  is_active: boolean;
  box_count: number;
  operational_box_count: number;
  average_rating: number | null;
  review_count: number;
  bookings_today: number;
  operating_hours: TenantOperatingHours[];
  amenities: TenantAmenity[];
};

export type TenantBookingVehicle = {
  plate: string | null;
  brand: string | null;
  model: string | null;
};

export type TenantBooking = {
  id: string;
  carwash_id: string;
  carwash_name: string;
  scheduled_date: string;
  scheduled_time: string | null;
  status: string;
  payment_status: string;
  total_price_kzt: number;
  amount_paid_kzt: number;
  primary_service_name: string | null;
  vehicle: TenantBookingVehicle | null;
  queue_position: number | null;
  updated_at: string;
  created_at: string;
};
