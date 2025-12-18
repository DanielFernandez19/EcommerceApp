"use client";

import { useState, useEffect } from "react";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";
import { getCategories, type Category } from "@/actions/apiUtils";

interface Props {
  initialData?: Product;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  submitLabel: string;
}

const STORE_ID = 1; //tienda existente en la DB

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
        // Si no hay categoría seleccionada y hay categorías disponibles, seleccionar la primera
        if (!initialData?.categoryId && cats.length > 0) {
          setForm(prev => ({ ...prev, categoryId: cats[0].id }));
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      storeId: STORE_ID, //HARDCODEADO
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-5 max-w-xl"
    >
      <h2 className="text-xl font-bold text-white">
        {submitLabel}
      </h2>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Nombre del producto
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
          placeholder="Ej: Remera oversize"
          required
        />
      </div>

      {/* Descripción */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Descripción
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
          placeholder="Detalle del producto"
          rows={3}
        />
      </div>

      {/* Precio */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Precio
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
          placeholder="Ej: 19999"
          required
        />
      </div>

      {/* Stock */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Stock disponible
        </label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
          placeholder="Ej: 10"
          required
        />
      </div>

      {/* Categoría */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">
          Categoría
        </label>
        {loadingCategories ? (
          <div className="w-full p-2 rounded bg-gray-900 text-gray-400 border border-gray-700">
            Cargando categorías...
          </div>
        ) : (
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-violet-500"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
