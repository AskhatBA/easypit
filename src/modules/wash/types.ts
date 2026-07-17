import type { Coordinates } from '@/shared/types';

export type WashService = {
  id: string;
  title: string;
  durationMin: number;
  price: number;
};

export type Wash = {
  id: string;
  name: string;
  address: string;
  rating: number;
  distanceKm: number;
  isOpen: boolean;
  coordinates: Coordinates;
  services: WashService[];
};

export type Slot = {
  id: string;
  startsAt: string;
  isAvailable: boolean;
};
