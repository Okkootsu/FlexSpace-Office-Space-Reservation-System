import { apiClient } from "@/lib/api-client";
import { Booking, CreateBookingPayload } from "./types";

export const bookingsApi = {
  create: (payload: CreateBookingPayload): Promise<string> => {
    return apiClient<string>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMyBookings: (): Promise<Booking[]> => {
    return apiClient<Booking[]>("/bookings/my-bookings", {
      cache: "no-store",
    });
  },

  cancel: (bookingId: string): Promise<void> => {
    return apiClient<void>(`/bookings/${bookingId}/cancel`, {
      method: "DELETE",
    });
  },
};