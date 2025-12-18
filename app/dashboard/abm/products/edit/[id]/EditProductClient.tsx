"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types/product";
import ProductImagesManager from "@/components/products/ProductImagesManager";

interface Props {
  id: string;
}

export default function EditProductClient({ id }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        router.push("/dashboard/abm/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Producto no encontrado</p>
      </div>
    );
  }

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
          images={product.images || []}
          onChange={() => {
            // Refresh product data
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
              .then(res => res.json())
              .then(setProduct);
          }}
        />
      </div>
    </div>
  );
}