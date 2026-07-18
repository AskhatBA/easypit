import { fetchTenantCarwashes } from '@/api/tenant';
import type { TenantCarwash } from '@/api/tenant';

import type { FleetCarwash } from './types';

const mapCarwash = (carwash: TenantCarwash): FleetCarwash => ({
  id: carwash.id,
  name: carwash.name,
  address: carwash.address,
  city: carwash.city?.name ?? '',
  rating: carwash.average_rating ?? 0,
  reviewCount: carwash.review_count,
  boxCount: carwash.box_count,
  operationalBoxCount: carwash.operational_box_count,
  bookingsToday: carwash.bookings_today,
  // 24/7, только если все дни отмечены круглосуточными.
  is24_7:
    carwash.operating_hours.length > 0 &&
    carwash.operating_hours.every(hours => hours.is_24_7),
  amenities: carwash.amenities.map(amenity => amenity.name),
});

/** Список автомоек сети — реальные данные из /v1/tenant/carwash/. */
export const fetchFleet = async (): Promise<FleetCarwash[]> => {
  const carwashes = await fetchTenantCarwashes();
  return carwashes.map(mapCarwash);
};
