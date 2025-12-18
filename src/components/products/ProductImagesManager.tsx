"use client";

import { uploadProductImage, deleteProductImage } from "@/actions/apiUtils";
import type { ProductImage } from "@/types/product";

interface Props {
  productId: number;
  images: ProductImage[];
  onChange: () => void;
}

export default function ProductImagesManager({ productId, images, onChange }: Props) {

  // Subir imagen
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    await uploadProductImage(productId, e.target.files[0]);
    onChange(); // recarga las imágenes
  };

  // Borrar imagen
  const handleDelete = async (imageId: number) => {
    await deleteProductImage(imageId);
    onChange(); // recarga las imágenes
  };

  return (
    <div className="space-y-4">
    {/* Botón para seleccionar imagen */}
    <div className="flex justify-center mb-6">
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
        Seleccionar imagen
        <input
            type="file"
            className="hidden"
            onChange={handleUpload}
        />
        </label>
    </div>

    {/* Galería de imágenes */}
    <div className="grid grid-cols-4 gap-4">
        {images.map(img => (
        <div key={img.id} className="relative aspect-square">
            <img
            src={`${process.env.NEXT_PUBLIC_STATIC_URL}${img.imageUrl}`}
            alt="Producto"
            className="rounded w-full h-full object-cover"
            />
            <button
            onClick={() => handleDelete(img.id)}
            className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
            >
            X
            </button>
        </div>
        ))}
    </div>
    </div>

  );
}
