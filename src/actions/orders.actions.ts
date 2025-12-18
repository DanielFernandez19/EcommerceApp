"use server";

import { apiClient } from "@/lib/api";
import type { Order } from "@/types/order";

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const orders = await apiClient.get<Order[]>(`Order/GetOrdersByUser/${userId}`);
    return orders;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await apiClient.get<Order[]>(`Order/GetOrders`);
    return orders;
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: number, status: number): Promise<void> {
  try {
    await apiClient.put(`Order/UpdateOrderStatus/${orderId}`, { status });
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error);
    throw error;
  }
}
