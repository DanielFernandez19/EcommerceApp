"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "app/dashboard/cart/store/cartStore";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function CartWidget() {
  const { cart, loadCart } = useCartStore();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      loadCart(user.id);
    }
  }, [user, loadCart]);

  if (!user) return null;

  const itemCount = cart?.items?.length || 0;
  const subtotal = cart?.items?.reduce((sum: number, item: any) => {
    return sum + (item.price * item.quantity);
  }, 0) || 0;
  const total = cart?.total || 0;

  if (itemCount === 0) {
    return (
      <Link
        href="/dashboard/cart"
        className="relative p-2 rounded-lg hover:bg-violet-600/20 transition-all duration-200 text-violet-300 hover:text-white"
        title="Carrito vacío"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href="/dashboard/cart"
      className="relative p-2 rounded-lg hover:bg-violet-600/20 transition-all duration-200 text-violet-300 hover:text-white group"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      
      {/* Badge con cantidad */}
      <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {itemCount}
      </span>

      {/* Tooltip con resumen */}
      <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="space-y-2">
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
          <div className="border-t border-gray-700 pt-2 mt-2">
            <div className="flex justify-between text-base">
              <span className="font-semibold text-white">Total:</span>
              <span className="font-bold text-violet-400">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <span className="text-xs text-violet-400 hover:text-violet-300">
              Ver carrito completo →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
