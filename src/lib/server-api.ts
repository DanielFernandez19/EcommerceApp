// lib/server-api.ts - Para usar en Server Actions
import { cookies } from "next/headers";
import type { ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5024/api";

/**
 * Cliente HTTP para Server Actions (se ejecuta en el servidor)
 */
class ServerApiClient {
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

    // Obtener token de las cookies del SERVIDOR
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

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

        // Loguear error para debugging
        console.error(`Server API Error [${options.method || "GET"} ${path}]:`, error);

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

      console.error(
        `Server Network Error [${options.method || "GET"} ${path}]:`,
        error,
      );
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

// Exportar instancia única para Server Actions
export const serverApiClient = new ServerApiClient(API_BASE);