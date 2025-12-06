import Image from "next/image";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-violet-500 transition-all duration-300 group">
      {/* Contenedor de imagen */}
      <div className="relative h-64 overflow-hidden bg-gray-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock <= 10 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full">
            ¡Últimas {product.stock} unidades!
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-violet-400">
              ${product.price.toLocaleString("es-AR")}
            </span>
            <span className="text-xs text-gray-500 ml-1">ARS</span>
          </div>
          
          <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors text-sm font-medium">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}