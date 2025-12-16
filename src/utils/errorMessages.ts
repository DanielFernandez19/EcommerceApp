// utils/errorMessages.ts
import type { ApiError } from "@/types/api";

/**
 * Formatea mensajes de error de la API a mensajes amigables para el usuario
 */
export function formatApiError(error: unknown): string {
  // Si es un Error estándar, devolver su mensaje
  if (error instanceof Error) {
    return error.message;
  }

  // Si es un ApiError del tipo definido
  if (
    error &&
    typeof error === "object" &&
    "status" in error
  ) {
    const apiError = error as ApiError;
    const status = apiError.status;
    const body = apiError.body;
    const message = apiError.message;

    // Mensajes según el código de estado HTTP
    switch (status) {
      case 400:
        return (
          body?.error ||
          body?.message ||
          "Los datos enviados no son válidos. Por favor, verifica la información e intenta nuevamente."
        );

      case 401:
        return (
          body?.error ||
          body?.message ||
          "No tienes autorización para realizar esta acción. Por favor, inicia sesión nuevamente."
        );

      case 403:
        return (
          body?.error ||
          body?.message ||
          "No tienes permisos para realizar esta acción."
        );

      case 404:
        return (
          body?.error ||
          body?.message ||
          "El recurso solicitado no fue encontrado."
        );

      case 422:
        // Errores de validación
        const errorText = body?.error?.toLowerCase() || "";
        if (errorText.includes("user") && (errorText.includes("exist") || errorText.includes("ready"))) {
          return "El usuario ya existe en el sistema. Por favor, verifica el email ingresado.";
        }
        if (errorText.includes("email")) {
          return "El email ingresado no es válido o ya está en uso.";
        }
        if (errorText.includes("password")) {
          return "La contraseña no cumple con los requisitos de seguridad.";
        }
        return (
          body?.error ||
          body?.message ||
          "Los datos proporcionados no son válidos. Por favor, verifica la información e intenta nuevamente."
        );

      case 500:
        return (
          body?.error ||
          body?.message ||
          "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde."
        );

      case 503:
        return (
          body?.error ||
          body?.message ||
          "El servicio no está disponible en este momento. Por favor, intenta más tarde."
        );

      default:
        // Si hay un mensaje en el body, usarlo
        if (body?.error) {
          return String(body.error);
        }
        if (body?.message) {
          return String(body.message);
        }
        // Si hay un mensaje en el error, usarlo
        if (message && message !== `HTTP ${status}`) {
          return message;
        }
        // Mensaje genérico según el código
        return `Ocurrió un error (${status}). Por favor, intenta nuevamente.`;
    }
  }

  // Si es un objeto con mensaje
  if (
    error &&
    typeof error === "object" &&
    "message" in error
  ) {
    const errorObj = error as { message: string };
    return String(errorObj.message);
  }

  // Error genérico
  return "Ocurrió un error inesperado. Por favor, intenta nuevamente.";
}

/**
 * Obtiene un mensaje de error amigable basado en el tipo de error
 */
export function getFriendlyErrorMessage(error: unknown): string {
  const message = formatApiError(error);

  // Limpiar mensajes técnicos comunes
  let friendlyMessage = message
    .replace(/HTTP \d+/g, "")
    .replace(/Error:/g, "")
    .replace(/error:/g, "")
    .trim();

  // Si el mensaje está vacío después de limpiar, usar mensaje genérico
  if (!friendlyMessage) {
    friendlyMessage = "Ocurrió un error. Por favor, intenta nuevamente.";
  }

  // Capitalizar primera letra
  friendlyMessage =
    friendlyMessage.charAt(0).toUpperCase() + friendlyMessage.slice(1);

  return friendlyMessage;
}
