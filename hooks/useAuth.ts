// hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api";
import type { LoginRequest, LoginResponse, AuthUser } from "@/types/auth";

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión activa al montar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("auth");
        if (authData) {
          const parsedUser = JSON.parse(authData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<LoginResponse, LoginRequest>(
        "Auth/Login",
        credentials
      );

      const authUser: AuthUser = {
        id: response.id,
        email: response.email,
        token: response.token,
      };

      // Guardar en localStorage (temporal)
      localStorage.setItem("auth", JSON.stringify(authUser));
      setUser(authUser);
    } catch (error) {
      // Propagar error para que el componente lo maneje
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setUser(null);
  }, []);

  // Refresh token (si el backend lo soporta)
  const refreshToken = useCallback(async () => {
    if (!user) return;

    try {
      // Implementar refresh token si el backend lo soporta
      // const response = await apiClient.post<{ token: string }>("Auth/Refresh", {});
      // setUser(prev => prev ? { ...prev, token: response.token } : null);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  }, [user, logout]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshToken,
  };
}