"use server";

import { apiClient } from "@/lib/api";

export async function uploadProductImage(
  productId: number,
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/images/upload`,
    {
      method: "POST",
      body: formData,
    }
  ).then(res => res.json());
}

export async function deleteProductImage(
  productId: number,
  imageId: number
) {
  return apiClient.delete(
    `/products/${productId}/images/${imageId}`
  );
}
