"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { createProduct } from "@/actions/apiUtils";

export default function NewProductPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createProduct(data);
    router.push("/dashboard/abm/products");
  };

  return (
    <div className="flex justify-center">
      <ProductForm
        submitLabel="Crear producto"
        onSubmit={handleCreate}
      />
    </div>
  );
}
