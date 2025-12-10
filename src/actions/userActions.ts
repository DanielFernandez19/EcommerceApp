"use server";

import { serverApiClient } from "@/lib/server-api";
import type { User } from "@/types/user";

// Tipo para datos de actualización
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

// Server Action para obtener usuario por ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    console.log("Fetching user with ID:", userId);
    
    // Obtener datos del usuario usando el server API client
    const user = await serverApiClient.get<User>(`user/GetUserById/${userId}`);
    
    console.log("User fetched:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Server Action para actualizar usuario
export async function updateUser(userId: string, userData: UpdateUserData): Promise<boolean> {
  try {
    // Construir objeto de usuario para la API
    const userUpdate: User = {
      id: userId,
      name: userData.name,
      lastName: userData.lastName || "",
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      billingAddress: userData.billingAddress,
      billingAddress2: userData.billingAddress2,
      postalCode: userData.postalCode,
      idCountry: userData.idCountry || 0,
      idProvince: userData.idProvince || 0,
      idCity: userData.idCity || 0,
      idRole: userData.idRole || 0,
      // Incluir los objetos Dto para el backend
      countryDto: userData.idCountry ? { id: userData.idCountry, name: "" } : undefined,
      provinceDto: userData.idProvince ? { id: userData.idProvince, name: "" } : undefined,
      cityDto: userData.idCity ? { id: userData.idCity, name: "" } : undefined,
    };

    console.log("Enviando actualización de usuario:", userUpdate);

    // Actualizar usuario usando el server API client
    const response = await serverApiClient.post<boolean, User>(`user/UpdateUser`, userUpdate);

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}