import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  params: {
    id: string;
  };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al cargar el producto");
  }

  return res.json();
}

export default async function ProductViewPage({ params }: Props) {
    const { id } = await params;  // desestructuramos después de await
    const product = await getProduct(id);

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

