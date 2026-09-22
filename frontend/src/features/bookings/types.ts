export interface CreateBookingPayload {
  spaceId: string;
  guestId: string;
  startUtc: string; // ISO String
  endUtc: string;
}

export enum BookingStatus {
  Pending = 1,
  Confirmed = 2,
  Cancelled = 3,
  Completed = 4,
}

export interface Booking {
  id: string;
  spaceId: string;
  spaceTitle: string;
  spaceCity: string;
  spaceDistrict: string;
  startUtc: string;
  endUtc: string;
  totalHours: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  canBeCancelled: boolean;
}

export interface CreateBookingPayload {
  spaceId: string;
  guestId: string;
  startUtc: string;
  endUtc: string;
}