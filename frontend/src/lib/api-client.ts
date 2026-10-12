import { tokenStorage } from "@/features/auth/token-storage";
import { AuthResponse } from "@/features/auth/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export interface ApiErrorResponse {
  title?: string;
  status?: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

interface CustomRequestInit extends RequestInit {
  _retry?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: CustomRequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Token varsa Authorization başlığını otomatik ekle
  const token = tokenStorage.getAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 401 Yetkisiz Hata durumunda Refresh Token rotasyonu dene
  if (response.status === 401 && !options._retry && !endpoint.includes("/auth/")) {
    const refreshToken = tokenStorage.getRefreshToken();
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const authData = (await refreshResponse.json()) as AuthResponse;
          tokenStorage.setAuthSession(authData);

          // Orijinal isteği yeni token ile tekrar dene
          headers.set("Authorization", `Bearer ${authData.accessToken}`);
          return apiClient<T>(endpoint, {
            ...options,
            headers,
            _retry: true,
          });
        } else {
          tokenStorage.clearAuthSession();
        }
      } catch {
        tokenStorage.clearAuthSession();
      }
    } else {
      tokenStorage.clearAuthSession();
    }
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse = {};
    try {
      errorData = await response.json();
    } catch {
      // JSON dönmeyen hatalar için
    }

    throw new ApiError(
      response.status,
      errorData.detail || errorData.title || "Bir hata oluştu.",
      errorData.errors
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}