export interface CreateBookingPayload {
  spaceId: string;
  guestId: string;
  startUtc: string; // ISO String
  endUtc: string;
}