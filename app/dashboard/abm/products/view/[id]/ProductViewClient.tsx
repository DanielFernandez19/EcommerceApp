"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

interface Props {
  id: string;
}

export default function ProductViewClient({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Error al cargar el producto");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="text-center">
          <p className="text-lg">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400 mb-6">{error || "Producto no encontrado"}</p>
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

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">
        Detalle del producto
      </h1>

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
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          href={`/dashboard/abm/products/edit/${product.id}`}
          className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
        >
          Editar
        </Link>

        <Link
          href="/dashboard/abm/products"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}