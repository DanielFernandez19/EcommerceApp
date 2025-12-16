"use server";

import { apiClient } from "@/lib/api";
import type { User } from "@/types/user";
import { formatApiError } from "@/utils/errorMessages";

// Tipo para datos de creación (lo que envía el frontend)
export type CreateUserData = {
  name: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  idCountry?: number;
  idProvince?: number;
  idCity?: number;
  idRole?: number;
};

// Tipo para datos de actualización (lo que envía el frontend)
export type UpdateUserData = {
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  idCountry?: number;
  idProvince?: number;
  idCity?: number;
  idRole?: number;
};

// DTOs que espera el backend
export interface RoleDto {
  id: number;
  name: string;
}

export interface CityDto {
  id: number;
  name: string;
}

export interface ProvinceDto {
  id: number;
  name: string;
}

export interface CountryDto {
  id: number;
  name: string;
}

// Tipo que espera el backend (UserDto)
export type UserDto = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  role: RoleDto;
  cityDto?: CityDto;
  provinceDto?: ProvinceDto;
  countryDto?: CountryDto;
};

// Server Action para obtener usuario por ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    console.log("Fetching user with ID:", userId);

    // Obtener datos del usuario usando el server API client
    const user = await apiClient.get<User>(`user/GetUserById/${userId}`);

    console.log("User fetched:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Server Action para obtener el total de usuarios
export async function getUsersCount(): Promise<number> {
  try {
    const count = await apiClient.get<number>(`user/GetUsersCount`);
    return count;
  } catch (error) {
    return 0;
  }
}

// Server Action para actualizar usuario
export async function updateUser(
  userId: string,
  userData: UpdateUserData,
): Promise<boolean> {

  try {
    // Construir objeto UserDto completo para el backend
    const userUpdate: UserDto = {
      id: userId,
      name: userData.name,
      lastName: userData.lastName || "",
      email: userData.email,
      phoneNumber: userData.phoneNumber || "",
      billingAddress: userData.billingAddress || "",
      billingAddress2: userData.billingAddress2 || "",
      postalCode: userData.postalCode,

      // El backend espera objetos completos, no solo IDs
      role: {
        id: userData.idRole || 3,
        name: "", // El backend probablemente ignora el nombre
      },

      // Siempre enviar los objetos (el backend maneja IDs = 0)
      countryDto: {
        id: userData.idCountry || 0,
        name: "",
      },

      provinceDto: {
        id: userData.idProvince || 0,
        name: "",
      },

      cityDto: {
        id: userData.idCity || 0,
        name: "",
      },
    };

    console.log("🚀 Enviando a la API:", userUpdate);

    // El backend devuelve {message: string}, no un boolean
    const response = await apiClient.put<
      { message: string },
      typeof userUpdate
    >(`user/UpdateUser`, userUpdate);

    console.log("✅ Respuesta del backend:", response);

    // Devolver true si la actualización fue exitosa
    return (
      response.message.includes("Updated") ||
      response.message.includes("successfully")
    );
  } catch (error) {
    console.error("❌ Error updating user:", error);
    
    // Formatear el error a un mensaje amigable
    const friendlyMessage = formatApiError(error);
    throw new Error(friendlyMessage);
  }
}

// Server Action para crear usuario
export async function createUser(userData: CreateUserData): Promise<boolean> {
  try {
    // Construir objeto completo para el backend (incluye password)
    // Asegurarse de que los valores numéricos se pasen correctamente
    const idRole = userData.idRole !== undefined && userData.idRole !== null ? userData.idRole : 3;
    const idCountry = userData.idCountry !== undefined && userData.idCountry !== null ? userData.idCountry : 0;
    const idProvince = userData.idProvince !== undefined && userData.idProvince !== null ? userData.idProvince : 0;
    const idCity = userData.idCity !== undefined && userData.idCity !== null ? userData.idCity : 0;

    const userCreate = {
      id: "0", // El backend asignará el ID real
      name: userData.name,
      lastName: userData.lastName || "",
      email: userData.email,
      password: userData.password || "", // Incluir password
      phoneNumber: userData.phoneNumber || "",
      billingAddress: userData.billingAddress || "",
      billingAddress2: userData.billingAddress2 || "",
      postalCode: userData.postalCode,
      
      // Enviar IDs directamente (como en Register)
      idCountry: idCountry,
      idProvince: idProvince,
      idCity: idCity,
      idRole: idRole,

      // También enviar los objetos DTO (por si el backend los necesita)
      role: {
        id: idRole,
        name: "", // El backend probablemente ignora el nombre
      },

      countryDto: {
        id: idCountry,
        name: "",
      },

      provinceDto: {
        id: idProvince,
        name: "",
      },

      cityDto: {
        id: idCity,
        name: "",
      },
    };

    console.log("🔍 Valores recibidos en createUser:", {
      idRole: userData.idRole,
      idCountry: userData.idCountry,
      idProvince: userData.idProvince,
      idCity: userData.idCity,
      tipoIdRole: typeof userData.idRole,
      tipoIdCountry: typeof userData.idCountry,
    });
    console.log("🚀 Objeto completo a enviar:", JSON.stringify(userCreate, null, 2));
    console.log("🚀 Valores procesados:", {
      idRole,
      idCountry,
      idProvince,
      idCity,
    });

    // El backend puede devolver el usuario creado (con id) o un objeto con message
    const response = await apiClient.post<any, typeof userCreate>(
      `user/CreateUser`,
      userCreate
    );

    console.log("✅ Respuesta del backend:", response);

    // Verificar si la respuesta indica éxito
    // El backend puede devolver:
    // 1. Un objeto con id (usuario creado) - como RegisterResponse
    // 2. Un objeto con message (confirmación)
    if (response && typeof response === "object") {
      // Si tiene id, el usuario fue creado exitosamente
      if ("id" in response && (response.id !== null && response.id !== undefined && response.id !== "")) {
        return true;
      }
      
      // Si tiene message, verificar el mensaje
      if ("message" in response && response.message) {
        const message = String(response.message);
        return (
          message.includes("Created") ||
          message.includes("successfully") ||
          message.includes("creado") ||
          message.includes("exitoso")
        );
      }
    }

    // Si llegamos aquí y no hubo error, asumir éxito
    // (el usuario se creó pero la respuesta no tiene el formato esperado)
    return true;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    
    // Formatear el error a un mensaje amigable
    const friendlyMessage = formatApiError(error);
    throw new Error(friendlyMessage);
  }
}
