// src/actions/products.actions.ts
"use server";

import { apiClient } from "@/lib/api";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";

/**
 * Obtener todos los productos
 */
export async function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>("/products");
}

/**
 * Obtener producto por id
 */
export async function getProductById(id: number): Promise<Product> {
  return apiClient.get<Product>(`/products/${id}`);
}

/**
 * Crear producto
 */
export async function createProduct(
  data: CreateProductDto
): Promise<Product> {
  return apiClient.post<Product, CreateProductDto>("/products", data);
}

/**
 * Actualizar producto
 */
export async function updateProduct(
  id: number,
  data: UpdateProductDto
): Promise<Product> {
  return apiClient.put<Product, UpdateProductDto>(
    `/products/${id}`,
    data
  );
}

/**
 * Eliminar producto
 */
export async function deleteProduct(id: number): Promise<void> {
  return apiClient.delete(`/products/${id}`);
}
