// src/types/product.ts

export interface ProductImage {
  id: number;
  imageUrl: string;
}

export interface Product {
  id: number;

  name: string | null;
  description: string | null;

  price: number;
  stock: number;

  categoryId: number;
  storeId: number;

  discountPercentage: number | null;

  images: ProductImage[];
}

/**
 * DTO para crear producto
 * (no incluye relaciones ni id)
 */
export interface CreateProductDto {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: number;
  storeId: number;
  discountPercentage?: number | null;
}

/**
 * DTO para update parcial
 */
export interface UpdateProductDto extends Partial<CreateProductDto> {}
