import { api, API_CONFIG, delay, ENDPOINTS } from '@/api';

import { MOCK_WASHES, mockSlots } from './mocks';
import type { Slot, Wash } from './types';

export const fetchWashes = async (search?: string): Promise<Wash[]> => {
  if (API_CONFIG.useMocks) {
    await delay(500);

    if (!search) {
      return MOCK_WASHES;
    }

    const query = search.trim().toLowerCase();

    return MOCK_WASHES.filter(
      wash =>
        wash.name.toLowerCase().includes(query) ||
        wash.address.toLowerCase().includes(query),
    );
  }

  const { data } = await api.get<Wash[]>(ENDPOINTS.washes.list, {
    params: search ? { search } : undefined,
  });

  return data;
};

export const fetchWash = async (washId: string): Promise<Wash> => {
  if (API_CONFIG.useMocks) {
    await delay(300);

    const wash = MOCK_WASHES.find(item => item.id === washId);

    if (!wash) {
      throw new Error('Мойка не найдена');
    }

    return wash;
  }

  const { data } = await api.get<Wash>(ENDPOINTS.washes.byId(washId));

  return data;
};

export const fetchSlots = async (
  washId: string,
  dateKey: string,
): Promise<Slot[]> => {
  if (API_CONFIG.useMocks) {
    await delay(400);
    return mockSlots(dateKey);
  }

  const { data } = await api.get<Slot[]>(ENDPOINTS.washes.slots(washId), {
    params: { date: dateKey },
  });

  return data;
};
