import { apiClient } from "@/lib/api-client";
import { Booking, CreateBookingPayload } from "./types";

export const bookingsApi = {
  create: (payload: CreateBookingPayload): Promise<string> => {
    return apiClient<string>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMyBookings: (guestId: string): Promise<Booking[]> => {
    return apiClient<Booking[]>(`/bookings/my-bookings?guestId=${guestId}`, {
      cache: "no-store",
    });
  },

  cancel: (bookingId: string, guestId: string): Promise<void> => {
    return apiClient<void>(`/bookings/${bookingId}/cancel?guestId=${guestId}`, {
      method: "DELETE",
    });
  },
};