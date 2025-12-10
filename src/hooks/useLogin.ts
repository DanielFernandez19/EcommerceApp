import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth";

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    clearError();

    try {
      const loginData: LoginRequest = { email, password };
      const response = await apiPost<LoginResponse, LoginRequest>("auth/login", loginData);
      
      // Guardar token en cookies
      document.cookie = `auth_token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
      
      // Redirigir según el rol
      if ([1, 2].includes(response.idRole)) {
        // Admin (rol 1-2) → Dashboard
        router.push('/dashboard');
      } else {
        // Usuario normal (rol 3) → Landing
        router.push('/');
      }
    } catch (err: unknown) {
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
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    clearError,
  };
}