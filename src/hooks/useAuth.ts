import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth";

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  isAuthenticated: boolean;
  user: LoginResponse | null;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const router = useRouter();

  // Limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Manejar errores de forma consistente
  const handleError = useCallback((err: unknown) => {
    let errorMessage = "Error desconocido";
    
    if (err && typeof err === 'object') {
      if ('message' in err && typeof err.message === 'string') {
        errorMessage = err.message;
      } else if ('body' in err && err.body && typeof err.body === 'object' && 'message' in err.body) {
        errorMessage = String(err.body.message);
      }
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    
    setError(errorMessage);
    throw err;
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    clearError();

    try {
      const loginData: LoginRequest = { email, password };
      const response = await apiPost<LoginResponse, LoginRequest>("auth/login", loginData);
      
      // Guardar token en cookies (para que el middleware pueda leerlo)
      document.cookie = `auth_token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
      
      setUser(response);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  // Logout
  const logout = useCallback(() => {
    // Eliminar token de cookies
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setUser(null);
    setError(null);
    router.push('/Login');
  }, [router]);

  // Verificar si está autenticado
  const isAuthenticated = !!user;

  return {
    login,
    logout,
    loading,
    error,
    clearError,
    isAuthenticated,
    user,
  };
}