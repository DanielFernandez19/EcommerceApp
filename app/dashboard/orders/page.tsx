"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { getAllOrders, updateOrderStatus } from "@/actions/orders.actions";
import type { Order } from "@/types/order";
import { OrderStatus } from "@/types/order";

export default function DashboardOrdersPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  useEffect(() => {
    // Verificar que sea admin (roles 1 o 2)
    if (!user) {
      setLoading(false);
      return;
    }

    // Validar que tenga rol de admin (1 o 2)
    if (![1, 2].includes(user.idRole)) {
      router.push("/dashboard");
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const allOrders = await getAllOrders();
        setOrders(allOrders || []);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("Error al cargar los pedidos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, router]);

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

  // Validar transiciones de estado
  const getAvailableStatuses = (currentStatus: number): number[] => {
    const available: number[] = [];

    // Siempre se puede cancelar desde cualquier estado
    if (currentStatus !== OrderStatus.Cancelled) {
      available.push(OrderStatus.Cancelled);
    }

    switch (currentStatus) {
      case OrderStatus.Pending:
        // De Pendiente solo puede ir a En proceso o Cancelado
        available.push(OrderStatus.Processing);
        break;
      
      case OrderStatus.Processing:
        // De En proceso puede ir a Enviado o Cancelado
        available.push(OrderStatus.Shipped);
        break;
      
      case OrderStatus.Shipped:
        // De Enviado puede ir a Entregado o Cancelado
        available.push(OrderStatus.Delivered);
        break;
      
      case OrderStatus.Delivered:
        // Entregado es estado final, solo se puede cancelar (pero ya está cancelado)
        break;
      
      case OrderStatus.Cancelled:
        // Cancelado es estado final
        break;
    }

    return available;
  };

  const handleStatusChange = async (orderId: number, newStatus: number) => {
    if (updatingOrderId === orderId) return;

    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      // Actualizar el estado local
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      alert("Error al actualizar el estado del pedido. Por favor, intenta nuevamente.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  // Validar que tenga rol de admin (1 o 2)
  if (!user || ![1, 2].includes(user.idRole)) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400">No tienes permisos para acceder a esta página</p>
        <p className="text-gray-400 text-sm mt-2">Solo administradores pueden ver esta página</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-white">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        Gestión de Pedidos
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No hay pedidos</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const availableStatuses = getAvailableStatuses(order.status);
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <div key={order.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Pedido #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Cliente: {order.userName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.text}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
                      disabled={updatingOrderId === order.id || availableStatuses.length === 0}
                      className="bg-gray-900 border border-gray-600 rounded-md text-white text-sm px-3 py-1 focus:outline-none focus:border-violet-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
                    >
                      <option value={order.status}>{statusInfo.text} (Actual)</option>
                      {availableStatuses.map((status) => {
                        const info = getStatusInfo(status);
                        return (
                          <option key={status} value={status}>
                            {info.text}
                          </option>
                        );
                      })}
                    </select>
                    {updatingOrderId === order.id && (
                      <span className="text-xs text-gray-400">Actualizando...</span>
                    )}
                  </div>
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

                <div className="flex justify-end items-center pt-4 border-t border-gray-700">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-xl font-bold text-violet-400">
                      ${order.totalAmount.toLocaleString("es-AR")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
