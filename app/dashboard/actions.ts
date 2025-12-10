"use server";

import { apiClient } from "@/lib/api";
import type { DashboardData } from "@/types/dashboard";

// Server Action para obtener datos del dashboard
export async function getDashboardData(): Promise<DashboardData> {
  // El serverApiClient ya maneja la autenticación via cookies

  try {
    // Aquí iría la llamada real a tu API/backend
    // const response = await fetch(`${process.env.API_URL}/dashboard/stats`, {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store", // Para datos en tiempo real
    // });
    
    // const data = await response.json();
    
    // Mientras tanto, datos simulados pero desde el servidor
    const data: DashboardData = {
      stats: {
        users: {
          total: 1234,
          trend: "up",
        },
        products: {
          total: 456,
          trend: "up",
        },
        stock: {
          inStock: 89,
          trend: "neutral",
        },
        sales: {
          monthly: "$45.2K",
          trend: "up",
        },
      },
      lastUpdated: new Date().toISOString(),
    };

    return data;
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);
    
    // Datos de fallback en caso de error
    return {
      stats: {
        users: { total: 0, trend: "neutral" },
        products: { total: 0, trend: "neutral" },
        stock: { inStock: 0, trend: "neutral" },
        sales: { monthly: "$0", trend: "neutral" },
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}