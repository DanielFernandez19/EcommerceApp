// lib/api.ts
import type { ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5024/api";

/**
 * Cliente HTTP mejorado con error handling consistente
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/$/, "");
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}/${path.replace(/^\//, "")}`;

    // Configurar headers por defecto
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // TEMPORALMENTE DESHABILITADO - No usamos tokens para autorización
    // let token: string | undefined;

    // // Try server-side first (Server Components/Actions)
    // try {
    //   const { cookies } = await import("next/headers");
    //   const cookieStore = await cookies();
    //   token = cookieStore.get("auth_token")?.value;
    //   console.log("🔐 Server-side token encontrado:", !!token);
    // } catch {
    //   // Fallback to client-side (Client Components)
    //   const value = `; ${document.cookie}`;
    //   const parts = value.split(`; auth_token=`);
    //   if (parts.length === 2) {
    //     token = parts.pop()?.split(';').shift();
    //   }
    //   console.log("🔐 Client-side token encontrado:", !!token);
    // }

    // if (token) {
    //   defaultHeaders["Authorization"] = `Bearer ${token}`;
    //   console.log("🔑 Authorization header set");
    // } else {
    //   console.log("⚠️ No token found - request will be unauthenticated");
    // }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const error: ApiError = {
          status: response.status,
          message: data?.message || `HTTP ${response.status}`,
          body: data,
        };
        throw error;
      }

      return data as T;
    } catch (error) {
      // Si ya es un ApiError, relanzarlo
      if (error && typeof error === "object" && "status" in error) {
        throw error;
      }

      // Si es un error de red u otro
      const networkError: ApiError = {
        status: 0,
        message: error instanceof Error ? error.message : "Network error",
      };

      
      throw networkError;
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "GET" });
  }

  /**
   * POST request
   */
  async post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
  ): Promise<TResponse> {
    return this.request<TResponse>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * PUT request
   */
  async put<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
  ): Promise<TResponse> {
    return this.request<TResponse>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" });
  }
}

// Exportar instancia única
export const apiClient = new ApiClient(API_BASE);

// Exportar funciones por compatibilidad (deprecated)
export const apiGet = <T>(path: string) => apiClient.get<T>(path);
export const apiPost = <TResponse, TBody = unknown>(
  path: string,
  body: TBody,
) => apiClient.post<TResponse, TBody>(path, body);
