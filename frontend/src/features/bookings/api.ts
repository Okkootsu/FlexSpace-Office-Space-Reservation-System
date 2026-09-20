import { apiClient } from "@/lib/api-client";
import { CreateBookingPayload } from "./types";

export const bookingsApi = {
  create: (payload: CreateBookingPayload): Promise<string> => {
    return apiClient<string>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};