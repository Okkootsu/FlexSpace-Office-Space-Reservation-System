"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginPayload, RegisterPayload } from "./types";
import { tokenStorage } from "./token-storage";
import { authApi } from "./api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client-side oturum kontrolü
    const storedUser = tokenStorage.getUser();
    if (storedUser && tokenStorage.isAuthenticated()) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const authData = await authApi.login(payload);
    setUser({
      id: authData.userId,
      fullName: authData.fullName,
      email: authData.email,
      role: authData.role,
    });
  };

  const register = async (payload: RegisterPayload) => {
    const authData = await authApi.register(payload);
    setUser({
      id: authData.userId,
      fullName: authData.fullName,
      email: authData.email,
      role: authData.role,
    });
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
