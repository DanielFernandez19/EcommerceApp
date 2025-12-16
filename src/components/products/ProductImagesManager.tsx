"use client";

import { uploadProductImage, deleteProductImage } from "@/actions/productImages.actions";
import type { ProductImage } from "@/types/product";

interface Props {
  productId: number;
  images: ProductImage[];
  onChange: () => void;
}

export default function ProductImagesManager({
  productId,
  images,
  onChange,
}: Props) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    await uploadProductImage(productId, e.target.files[0]);
    onChange();
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleUpload} />

      <div className="grid grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${img.imageUrl}`}
              className="rounded"
            />
            <button
              onClick={() => {
                deleteProductImage(productId, img.id);
                onChange();
              }}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
