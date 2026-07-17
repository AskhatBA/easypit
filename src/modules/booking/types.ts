export type BookingStatus = 'pending' | 'confirmed' | 'done' | 'cancelled';

export type Booking = {
  id: string;
  washId: string;
  washName: string;
  serviceIds: string[];
  serviceTitles: string[];
  startsAt: string;
  totalPrice: number;
  status: BookingStatus;
  comment?: string;
};

export type CreateBookingPayload = {
  washId: string;
  serviceIds: string[];
  slotId: string;
  carNumber: string;
  comment?: string;
};

export type BookingDraft = {
  washId: string | null;
  serviceIds: string[];
  slotId: string | null;
  dateKey: string;
};
