"use server";

import { apiClient } from "@/lib/api";
import type { User } from "@/types/user";

// Tipo para datos de creación (lo que envía el frontend)
export type CreateUserData = {
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
    throw error;
  }
}

// Server Action para crear usuario
export async function createUser(userData: CreateUserData): Promise<boolean> {
  try {
    // Construir objeto UserDto completo para el backend
    const userCreate: UserDto = {
      id: "0", // El backend asignará el ID real
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

    console.log("🚀 Creando usuario:", userCreate);

    // El backend devuelve {message: string}, no un boolean
    const response = await apiClient.post<
      { message: string },
      typeof userCreate
    >(`user/CreateUser`, userCreate);

    console.log("✅ Respuesta del backend:", response);

    // Devolver true si la creación fue exitosa
    return (
      response.message.includes("Created") ||
      response.message.includes("successfully")
    );
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
}
