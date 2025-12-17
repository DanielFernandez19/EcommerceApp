import type { Product } from "@/types/product";
import { useCartStore } from "app/dashboard/cart/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!.replace("/api", "");

  const imageUrl = product.images?.[0]?.imageUrl
    ? `${API_BASE_URL}${product.images[0].imageUrl}`
    : "/placeholder.png";
//const imageUrl = product.images?.[0]?.imageUrl ?? "/placeholder.png";
  const { addProduct } = useCartStore();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-violet-500 transition-all duration-300 group">
      
      {/* Contenedor de imagen */}
      <div className="relative h-64 overflow-hidden bg-gray-800">
        <img
          src={imageUrl}
          alt={product.name ?? "Producto"}
          className="w-full h-full object-cover"
        />

       {product.stock > 0 && product.stock <= 10 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full">
          ¡Últimas {product.stock} unidades!
        </div>
      )}

      {product.stock === 0 && (
        <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs rounded-full">
          Sin stock
        </div>
      )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
          {product.name ?? "Sin nombre"}
        </h3>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description ?? ""}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-violet-400">
              ${product.price.toLocaleString("es-AR")}
            </span>
            <span className="text-xs text-gray-500 ml-1">ARS</span>
          </div>

       <button
        disabled={product.stock === 0}
        onClick={() => addProduct(product.id)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${
            product.stock === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
      >
        Agregar
      </button>

        </div>
      </div>
    </div>
  );
}
