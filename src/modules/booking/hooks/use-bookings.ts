import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api';

import { cancelBooking, createBooking, fetchBookings } from '../data';
import type { Booking, CreateBookingPayload } from '../types';

export const useBookings = () =>
  useQuery({
    queryKey: QUERY_KEYS.bookings,
    queryFn: fetchBookings,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, unknown, CreateBookingPayload>({
    mutationFn: createBooking,
    onSuccess: (_booking, payload) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookings });
      // Занятый слот больше не свободен для остальных экранов.
      queryClient.invalidateQueries({
        queryKey: ['washes', payload.washId, 'slots'],
      });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookings });
    },
  });
};
