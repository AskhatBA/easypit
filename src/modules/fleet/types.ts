export type FleetCarwash = {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  boxCount: number;
  operationalBoxCount: number;
  bookingsToday: number;
  is24_7: boolean;
  amenities: string[];
};

export type FleetSummary = {
  locations: number;
  operationalBoxes: number;
  totalBoxes: number;
  operationalPct: number;
  avgRating: number;
  totalReviews: number;
  bookingsToday: number;
  bookingsChangePct: number;
};
