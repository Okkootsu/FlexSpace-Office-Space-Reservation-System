import { AuthResponse, User } from "./types";

const ACCESS_TOKEN_KEY = "flexspace_token";
const REFRESH_TOKEN_KEY = "flexspace_refresh_token";
const USER_KEY = "flexspace_user";

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(val || "");
    }
  }
  return null;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export const tokenStorage = {
  setAuthSession: (auth: AuthResponse) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);

    const user: User = {
      id: auth.userId,
      fullName: auth.fullName,
      email: auth.email,
      role: auth.role,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Next.js Middleware ve SSR erişimi için çerezlere de yazıyoruz
    setCookie(ACCESS_TOKEN_KEY, auth.accessToken, 7);
    setCookie(REFRESH_TOKEN_KEY, auth.refreshToken, 7);
    setCookie(USER_KEY, JSON.stringify(user), 7);
  },

  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY) || getCookie(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY) || getCookie(REFRESH_TOKEN_KEY);
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(USER_KEY) || getCookie(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  clearAuthSession: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
    deleteCookie(USER_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};
