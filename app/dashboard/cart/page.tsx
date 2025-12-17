"use client";

import { useEffect } from "react";
import { useCartStore } from "./store/cartStore";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

export default function CartPage() {
  const { cart, loadCart, loading } = useCartStore();

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return <p className="text-white p-6">Cargando carrito...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 text-gray-400">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-white">
          Carrito
        </h1>

        {cart.items.map((item: any) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <CartSummary total={cart.total} />
    </div>
  );
}
