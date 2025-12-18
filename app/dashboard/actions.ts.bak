"use server";

import type { DashboardData } from "@/types/dashboard";
import { getUsersCount } from "@/actions/userActions";
import { getProducts } from "@/actions/products.actions";
import { getAllOrders } from "@/actions/orders.actions";

// Server Action para obtener datos del dashboard
export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Obtener datos reales en paralelo
    const [usersCount, products, orders] = await Promise.all([
      getUsersCount().catch(() => 0),
      getProducts().catch(() => []),
      getAllOrders().catch(() => []),
    ]);

    // Calcular cantidad total de stock (suma de todos los stocks)
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

    // Calcular ventas del mes actual
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear &&
        order.status !== 5 // Excluir cancelados
      );
    });

    const monthlySales = monthlyOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Formatear ventas mensuales
    const formattedSales = monthlySales >= 1000 
      ? `$${(monthlySales / 1000).toFixed(1)}K`
      : `$${monthlySales.toLocaleString("es-AR")}`;

    const data: DashboardData = {
      stats: {
        users: {
          total: usersCount,
          trend: "neutral", // Podríamos calcular la tendencia comparando con el mes anterior
        },
        products: {
          total: products.length,
          trend: "neutral",
        },
        stock: {
          inStock: totalStock,
          trend: "neutral",
        },
        sales: {
          monthly: formattedSales,
          trend: "neutral",
        },
      },
      lastUpdated: new Date().toISOString(),
    };

    return data;
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);
    
    // Datos de fallback en caso de error
    return {
      stats: {
        users: { total: 0, trend: "neutral" },
        products: { total: 0, trend: "neutral" },
        stock: { inStock: 0, trend: "neutral" },
        sales: { monthly: "$0", trend: "neutral" },
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}