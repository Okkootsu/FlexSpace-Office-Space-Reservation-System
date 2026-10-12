export enum UserRole {
  User = 1,
  Admin = 2,
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresUtc: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}
