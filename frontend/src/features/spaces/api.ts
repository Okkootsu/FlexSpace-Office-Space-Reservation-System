import { apiClient } from "@/lib/api-client";
import { CreateSpacePayload, GetSpacesParams, Space } from "./types";

export const spacesApi = {
  getAll: (params?: GetSpacesParams): Promise<Space[]> => {
    const query = new URLSearchParams();
    if (params?.city) query.append("city", params.city);
    if (params?.type) query.append("type", params.type.toString());
    if (params?.minCapacity)
      query.append("minCapacity", params.minCapacity.toString());

    const queryString = query.toString();
    return apiClient<Space[]>(
      `/spaces${queryString ? `?${queryString}` : ""}`,
      {
        // Next.js ISR/Cache kontrolü (60 saniye):
        next: { revalidate: 60 },
      },
    );
  },

  getById: (id: string): Promise<Space> => {
    return apiClient<Space>(`/spaces/${id}`, {
      cache: "no-store", // Rezervasyon anında güncel veri için
    });
  },

  create: (payload: CreateSpacePayload): Promise<string> => {
    return apiClient<string>("/spaces", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
