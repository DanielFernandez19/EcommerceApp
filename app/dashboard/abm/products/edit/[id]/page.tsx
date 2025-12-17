"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { getProductById, updateProduct } from "@/actions/products.actions";
import type { Product } from "@/types/product";
import ProductImagesManager from "@/components/products/ProductImagesManager";


export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) {
    return <p className="text-white">Cargando...</p>;
  }

  const handleUpdate = async (data: any) => {
    await updateProduct(product.id, data);
    router.push("/dashboard/abm/products");
  };

  return (
    <div className="space-y-8">
    <div className="flex justify-center">
      <ProductForm
        initialData={product}
        submitLabel="Guardar cambios"
        onSubmit={handleUpdate}
      />
    </div>

    <div className="flex justify-center">
      <ProductImagesManager
        productId={product.id}
        images={product.images}
        onChange={() => getProductById(product.id).then(setProduct)}
      />
    </div>
  </div>
  );
}
