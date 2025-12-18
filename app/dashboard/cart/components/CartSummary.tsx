"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { checkoutCart } from "../services/cart.service";
import { useCartStore } from "../store/cartStore";

interface Props {
  cart: any;
}

export default function CartSummary({ cart }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { loadCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cart || !cart.items) return null;

  const itemCount = cart.items.length;
  const subtotal = cart.items.reduce((sum: number, item: any) => {
    return sum + (item.price * item.quantity);
  }, 0);
  const total = cart.total || subtotal;

  const handleCheckout = async () => {
    if (!user || isProcessing) return;

    try {
      setIsProcessing(true);
      await checkoutCart(user.id);
      // Recargar el carrito (debería estar vacío después del checkout)
      await loadCart(user.id);
      // Redirigir a la página de pedidos
      router.push("/orders");
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      alert(error instanceof Error ? error.message : "Error al confirmar el pedido. Por favor, intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Resumen
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-300">
          <span>Productos:</span>
          <span className="font-semibold text-white">{itemCount}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <span>Subtotal:</span>
          <span className="font-semibold text-white">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>

        <div className="border-t border-gray-700 pt-3">
          <div className="flex justify-between text-base">
            <span className="font-semibold text-white">Total:</span>
            <span className="font-bold text-violet-400">
              ${total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isProcessing || !user || itemCount === 0}
        className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${
          isProcessing || !user || itemCount === 0
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700"
        }`}
      >
        {isProcessing ? "Procesando..." : "Confirmar pedido"}
      </button>
    </div>
  );
}
