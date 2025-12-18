"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useAuthContext } from "@/components/providers/AuthProvider";

interface Props {
  item: any;
}

export default function CartItem({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const { removeItem, updateQuantity } = useCartStore();
  const { user } = useAuthContext();

  // Sincronizar cantidad cuando cambia el item
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRemove = () => {
    if (user) {
      removeItem(user.id, item.id);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (!user || isUpdating) return;
    
    // Validar que la cantidad sea al menos 1
    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await updateQuantity(user.id, item.id, newQuantity);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      // Revertir cantidad en caso de error
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir escribir libremente, solo actualizar el estado local
    // Si está vacío, mantener el valor actual para que el usuario pueda borrar y escribir
    if (value === "") {
      setQuantity(1);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue > 0) {
        setQuantity(numValue);
      } else {
        // Si no es un número válido, mantener el valor anterior
        setQuantity(item.quantity);
      }
    }
  };

  const handleInputBlur = () => {
    // Cuando se pierde el foco, validar y actualizar la cantidad en el backend
    const finalQuantity = quantity < 1 ? 1 : quantity;
    
    if (finalQuantity !== quantity) {
      setQuantity(finalQuantity);
    }
    
    // Solo actualizar si cambió respecto al valor original del item
    if (finalQuantity !== item.quantity && user) {
      handleQuantityChange(finalQuantity);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Actualizar cuando se presiona Enter
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const subtotal = (item.price * quantity).toLocaleString("es-AR");

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold text-white mb-2">{item.productName}</p>
          
          {/* Controles de cantidad */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Cantidad:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1 || isUpdating}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  quantity <= 1 || isUpdating
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                disabled={isUpdating}
                className="w-16 h-8 text-center bg-gray-900 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:border-violet-500 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={handleIncrease}
                disabled={isUpdating}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isUpdating
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Precio unitario:</p>
            <p className="text-violet-400 font-semibold">
              ${item.price.toLocaleString("es-AR")}
            </p>
            <p className="text-sm text-gray-400 mt-1">Subtotal:</p>
            <p className="text-violet-400 font-bold text-lg">
              ${subtotal}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-400 hover:text-red-300 transition-colors p-2"
            title="Eliminar del carrito"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
