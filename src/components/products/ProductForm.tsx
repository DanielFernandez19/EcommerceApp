"use client";

import { useState } from "react";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types/product";

interface Props {
  initialData?: Product;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  submitLabel: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel,
}: Props) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    stock: initialData?.stock ?? 0,
    categoryId: initialData?.categoryId ?? 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6 max-w-xl"
    >
      <h2 className="text-xl font-bold text-white">
        {submitLabel}
      </h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
        required
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
        required
      />

      <input
        type="number"
        name="categoryId"
        placeholder="Categoría ID"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
