"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/products/ProductForm";
import ProductImagesManager from "@/components/products/ProductImagesManager";
import { Product } from "@/types/product";

export default function ProductsManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode") || "view"; // "view", "edit", "new"
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === "new") {
      setLoading(false);
      return;
    }

    if (!id) {
      router.push("/dashboard/abm/products");
      return;
    }

    const loadProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          cache: "no-store"
        });
        
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

    loadProduct();
  }, [id, mode, router]);

  const handleCreate = async (data: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        router.push("/dashboard/abm/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!id) return;
    
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // New product form
  if (mode === "new") {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Nuevo Producto</h1>
          <Link
            href="/dashboard/abm/products"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>
        
        <div className="flex justify-center">
          <ProductForm
            submitLabel="Crear producto"
            onSubmit={handleCreate}
          />
        </div>
      </div>
    );
  }

  // Error states
  if (!product) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link
            href="/dashboard/abm/products"
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  // View mode
  if (mode === "view") {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Detalle del producto
          </h1>
          <Link
            href="/dashboard/abm/products"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div>
            <span className="text-gray-400">Nombre</span>
            <p className="text-lg font-semibold">{product.name}</p>
          </div>

          <div>
            <span className="text-gray-400">Descripción</span>
            <p>{product.description || "-"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Precio</span>
              <p>${product.price}</p>
            </div>

            <div>
              <span className="text-gray-400">Stock</span>
              <p>{product.stock}</p>
            </div>

            <div>
              <span className="text-gray-400">Categoría</span>
              <p>{product.categoryId}</p>
            </div>

            <div>
              <span className="text-gray-400">Descuento</span>
              <p>{product.discountPercentage || 0}%</p>
            </div>
          </div>

          {/* Images */}
          {product.images && product.images.length > 0 && (
            <div>
              <span className="text-gray-400">Imágenes</span>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {product.images.map((image) => (
                  <div key={image.id} className="bg-gray-700 rounded-lg p-2">
                    <img
                      src={image.imageUrl}
                      alt={product.name || "Producto"}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            href={`/dashboard/abm/products/manage?id=${product.id}&mode=edit`}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
          >
            Editar
          </Link>
        </div>
      </div>
    );
  }

  // Edit mode
  if (mode === "edit") {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Editar Producto</h1>
          <Link
            href="/dashboard/abm/products"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>
        
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

  // Fallback
  return <div>Modo no válido</div>;
}