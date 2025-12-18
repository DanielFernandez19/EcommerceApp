"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getOrdersByUser } from "@/actions/orders.actions";
import type { Order } from "@/types/order";
import { OrderStatus } from "@/types/order";

export default function OrdersPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const userOrders = await getOrdersByUser(user.id);
        setOrders(userOrders);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("Error al cargar los pedidos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case OrderStatus.Pending:
        return {
          text: "Pendiente",
          color: "bg-yellow-600/20 text-yellow-400"
        };
      case OrderStatus.Processing:
        return {
          text: "En proceso",
          color: "bg-blue-600/20 text-blue-400"
        };
      case OrderStatus.Shipped:
        return {
          text: "Enviado",
          color: "bg-indigo-600/20 text-indigo-400"
        };
      case OrderStatus.Delivered:
        return {
          text: "Entregado",
          color: "bg-green-600/20 text-green-400"
        };
      case OrderStatus.Cancelled:
        return {
          text: "Cancelado",
          color: "bg-red-600/20 text-red-400"
        };
      default:
        return {
          text: "Desconocido",
          color: "bg-gray-600/20 text-gray-400"
        };
    }
  };

  if (!user) {
    return (
      <div className="pt-10 p-6 text-center">
        <p className="text-gray-400">Debes iniciar sesión para ver tus pedidos</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-10 p-6 text-center">
        <p className="text-white">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-10 p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="pt-10 p-6 max-w-5xl mx-auto">
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

      <h1 className="text-2xl font-bold text-white mb-6">
        Mis Pedidos
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No tienes pedidos aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Pedido #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(order.status).color}`}>
                  {getStatusInfo(order.status).text}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-400">
                          Cantidad: {item.quantity} × ${item.price.toLocaleString("es-AR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-violet-400 font-semibold">
                          ${item.subtotal.toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No hay items en este pedido</p>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm">
                  Comprar nuevamente
                </button>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-xl font-bold text-violet-400">
                    ${order.totalAmount.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}