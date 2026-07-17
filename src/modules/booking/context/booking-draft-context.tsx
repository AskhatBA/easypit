import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { toDateKey } from '@/shared/lib';

import type { BookingDraft } from '../types';

type BookingDraftContextValue = {
  draft: BookingDraft;
  toggleService: (serviceId: string) => void;
  selectSlot: (slotId: string) => void;
  selectDate: (dateKey: string) => void;
  reset: (washId: string) => void;
  isReady: boolean;
};

const createEmptyDraft = (washId: string | null = null): BookingDraft => ({
  washId,
  serviceIds: [],
  slotId: null,
  dateKey: toDateKey(new Date()),
});

const BookingDraftContext = createContext<BookingDraftContextValue | null>(null);

export const BookingDraftProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<BookingDraft>(() => createEmptyDraft());

  const toggleService = useCallback((serviceId: string) => {
    setDraft(current => ({
      ...current,
      serviceIds: current.serviceIds.includes(serviceId)
        ? current.serviceIds.filter(id => id !== serviceId)
        : [...current.serviceIds, serviceId],
    }));
  }, []);

  const selectSlot = useCallback((slotId: string) => {
    setDraft(current => ({ ...current, slotId }));
  }, []);

  const selectDate = useCallback((dateKey: string) => {
    // Слоты привязаны к дате — при её смене прежний выбор недействителен.
    setDraft(current => ({ ...current, dateKey, slotId: null }));
  }, []);

  const reset = useCallback((washId: string) => {
    setDraft(createEmptyDraft(washId));
  }, []);

  const value = useMemo<BookingDraftContextValue>(
    () => ({
      draft,
      toggleService,
      selectSlot,
      selectDate,
      reset,
      isReady: !!draft.washId && !!draft.slotId && draft.serviceIds.length > 0,
    }),
    [draft, toggleService, selectSlot, selectDate, reset],
  );

  return (
    <BookingDraftContext.Provider value={value}>
      {children}
    </BookingDraftContext.Provider>
  );
};

export const useBookingDraft = () => {
  const context = useContext(BookingDraftContext);

  if (!context) {
    throw new Error('useBookingDraft используется вне BookingDraftProvider');
  }

  return context;
};
