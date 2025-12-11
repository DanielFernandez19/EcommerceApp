"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types/auth";
import { getAuthUser } from "@/utils/auth";

interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  initializing: boolean;
  setUser: (user: LoginResponse | null) => void;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();



// Helper para leer cookies
  const getAuthToken = (): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  // Helper para leer datos del usuario de cookies
  const getAuthUser = (): LoginResponse | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_user=`);
    if (parts.length === 2) {
      try {
        const userData = parts.pop()?.split(';').shift();
        if (userData) {
          return JSON.parse(decodeURIComponent(userData));
        }
      } catch (error) {
        console.error('Error parsing auth_user cookie:', error);
      }
    }
    return null;
  };

// Inicializar estado desde cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAuthToken();
        
        if (token) {
          // Intentar obtener datos del usuario de las cookies
          const userData = getAuthUser();
          if (userData) {

            setUser(userData);
          } else {
            // Token inválido o expirado - limpiar y redirigir
            setUser(null);
            router.push("/Login");
          }
        }
        } catch (error) {
          console.error('Error en inicialización:', error);
          // Error al leer cookies - limpiar estado
          setUser(null);
        } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  // Logout
  const logout = () => {
    // Limpiar cookies de autenticación
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Limpiar estado
    setUser(null);
    
    // Redirigir al login
    router.push("/Login");
  };

  // Refresh auth - forzar re-lectura de cookies
  const refreshAuth = () => {
    const token = getAuthToken();
    
    if (token) {
      // Intentar obtener datos del usuario de las cookies
      const userData = getAuthUser();
      if (userData) {
        setUser(userData);
      } else {
        // Token inválido o expirado - limpiar y redirigir
        setUser(null);
        router.push("/Login");
      }
    } else {
      setUser(null);
    }
  };

  // Verificar si está autenticado
  const isAuthenticated = !!user;

  // Verificar si es admin (rol 1 o 2)
  const isAdmin = user ? [1, 2].includes(user.idRole) : false;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin,
    initializing,
    setUser,
    logout,
    refreshAuth,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuthContext() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthenticationProvider",
    );
  }
  return context;
}
