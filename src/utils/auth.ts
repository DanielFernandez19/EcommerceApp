import { apiPost } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth";

/**
 * Función simple para hacer login
 */
export async function AuthLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {

  const loginData: LoginRequest = { email, password };
  const response = await apiPost<LoginResponse, LoginRequest>(
    "auth/login",
    loginData,
  );



  // Guardar token en cookies
  document.cookie = `auth_token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;


  return response;
}

/**
 * Función para eliminar el token (logout)
 */
export function removeAuthToken(): void {
  document.cookie =
    "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie = "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

/**
 * Función para obtener los datos del usuario de las cookies
 */
export function getAuthUser(): LoginResponse | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; auth_user=`);
  if (parts.length === 2) {
    try {
      const userData = parts.pop()?.split(";").shift();
      if (userData) {
        return JSON.parse(decodeURIComponent(userData));
      }
    } catch (error) {
      console.error("Error parsing auth_user cookie:", error);
    }
  }
  return null;
}

/**
 * Función simple para hacer login
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const loginData: LoginRequest = { email, password };
  const response = await apiPost<LoginResponse, LoginRequest>(
    "auth/login",
    loginData,
  );

  // Guardar token en cookies
  document.cookie = `auth_token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;

  // Guardar datos del usuario en cookies (temporal hasta tener /auth/me)
  const userData = {
    id: response.id,
    email: response.email,
    fullName: response.fullName,
    idRole: response.idRole,
  };
  document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;

  return response;
}
