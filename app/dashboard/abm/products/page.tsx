"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import type { Product } from "@/types/product";
import { getProducts, deleteProduct } from "@/actions/apiUtils";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de productos</h1>
          <p className="text-gray-400 mt-1">
            Administra los productos del catálogo
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => router.push("/dashboard/abm/products/new")}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Nuevo producto
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <Table<Product>
          data={products}
          columns={["id", "name", "price", "stock"]}
          actions={[
            {
              label: "Editar",
              color: "bg-blue-600 hover:bg-blue-700",
              icon: <FaEdit />,
              onClick: (product) =>
                router.push(`/dashboard/abm/products/edit/${product.id}`),
            },
            {
              label: "Ver",
              color: "bg-green-600 hover:bg-green-700",
              icon: <FaEye />,
              onClick: (product) =>
                router.push(`/dashboard/abm/products/view/${product.id}`),
            },
            {
              label: "Borrar",
              color: "bg-red-600 hover:bg-red-700",
              icon: <FaTrash />,
              onClick: async (product) => {
                if (
                  window.confirm(
                    `¿Eliminar el producto "${product.name}"?`
                  )
                ) {
                  await deleteProduct(product.id);
                  setProducts((prev) =>
                    prev.filter((p) => p.id !== product.id)
                  );
                }
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
