"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "./store/cartStore";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function CartPage() {
  const { cart, loadCart, loading } = useCartStore();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      loadCart(user.id);
    }
  }, [user, loadCart]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-white">Cargando carrito...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver
        </button>
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Tu carrito está vacío</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="mb-6 flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Volver
      </button>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-white">
            Carrito
          </h1>

          {cart.items.map((item: any) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
