"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/features/products/ProductGrid";
import { getProducts } from "@/actions/apiUtils";
import type { Product } from "@/types/product";

export default function CollectionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-10 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-transparent"></div>
        </div>
        <p className="text-white text-lg relative z-10">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-10 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver
        </button>

        <ProductGrid
          products={products}
          title="Nuestra Colección Completa"
        />
      </div>
    </div>
  );
}
