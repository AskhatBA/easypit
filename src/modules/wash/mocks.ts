import type { Slot, Wash } from './types';

const SERVICES = [
  { id: 's-1', title: 'Экспресс-мойка', durationMin: 20, price: 3000 },
  { id: 's-2', title: 'Комплекс: кузов + салон', durationMin: 60, price: 7500 },
  { id: 's-3', title: 'Химчистка салона', durationMin: 120, price: 22000 },
  { id: 's-4', title: 'Полировка кузова', durationMin: 180, price: 35000 },
];

export const MOCK_WASHES: Wash[] = [
  {
    id: 'w-1',
    name: 'EasyPit Абая',
    address: 'пр. Абая, 145',
    rating: 4.8,
    distanceKm: 0.6,
    isOpen: true,
    coordinates: { latitude: 43.2405, longitude: 76.9155 },
    services: SERVICES,
  },
  {
    id: 'w-2',
    name: 'EasyPit Достык',
    address: 'пр. Достык, 89',
    rating: 4.5,
    distanceKm: 2.3,
    isOpen: true,
    coordinates: { latitude: 43.2389, longitude: 76.9556 },
    services: SERVICES.slice(0, 3),
  },
  {
    id: 'w-3',
    name: 'EasyPit Сайран',
    address: 'ул. Толе би, 285',
    rating: 4.2,
    distanceKm: 5.1,
    isOpen: false,
    coordinates: { latitude: 43.2451, longitude: 76.8709 },
    services: SERVICES.slice(0, 2),
  },
];

const SLOT_HOURS = [9, 10, 11, 12, 14, 15, 16, 17, 18];

export const mockSlots = (dateKey: string): Slot[] =>
  SLOT_HOURS.map((hour, index) => {
    const startsAt = new Date(`${dateKey}T00:00:00`);
    startsAt.setHours(hour, 0, 0, 0);

    return {
      id: `slot-${dateKey}-${hour}`,
      startsAt: startsAt.toISOString(),
      // Пара занятых слотов, чтобы UI показывал недоступные состояния.
      isAvailable: index !== 2 && index !== 5,
    };
  });
