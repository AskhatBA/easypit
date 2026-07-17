import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api';

import { fetchSlots, fetchWash, fetchWashes } from '../data';

export const useWashes = (search?: string) =>
  useQuery({
    queryKey: QUERY_KEYS.washes(search),
    queryFn: () => fetchWashes(search),
  });

export const useWash = (washId: string) =>
  useQuery({
    queryKey: QUERY_KEYS.wash(washId),
    queryFn: () => fetchWash(washId),
    enabled: !!washId,
  });

export const useSlots = (washId: string, dateKey: string) =>
  useQuery({
    queryKey: QUERY_KEYS.washSlots(washId, dateKey),
    queryFn: () => fetchSlots(washId, dateKey),
    enabled: !!washId && !!dateKey,
    // Слоты разбирают другие пользователи — держим свежими.
    staleTime: 15_000,
  });
