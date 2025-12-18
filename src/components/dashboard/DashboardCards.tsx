"use client";

import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiEye,
  FiEdit,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import type { DashboardData } from "@/types/dashboard";
import { useAuthContext } from "@/components/providers/AuthProvider";

interface DashboardCardsProps {
  data: DashboardData;
}

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  stats?: {
    label: string;
    value: string;
    trend?: "up" | "down" | "neutral";
  };
  actions: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color: string;
  }[];
}

export function DashboardCards({ data }: DashboardCardsProps) {
  const router = useRouter();
  const { user } = useAuthContext();

  // Definir las cards con datos reales del servidor
  const dashboardCards: DashboardCard[] = [
    // Card de Usuarios - Solo visible para Admin (rol 1)
    ...(user?.idRole === 1 ? [{
      title: "Usuarios",
      description: "Gestión de usuarios y permisos del sistema",
      icon: <FiUsers className="w-8 h-8" />,
      href: "/dashboard/abm/users",
      color: "bg-blue-500",

      actions: [
        {
          label: "Nuevo usuario",
          icon: <FiPlus />,
          onClick: () => router.push("/Register?mode=admin"),
          color: "bg-blue-600 hover:bg-blue-700",
        },
        {
          label: "Ver todos",
          icon: <FiEye />,
          onClick: () => router.push("/dashboard/abm/users"),
          color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        },
      ],
    }] : []),
    {
      title: "Productos",
      description: "Catálogo de productos y gestión de inventario",
      icon: <FiShoppingBag className="w-8 h-8" />,
      href: "/dashboard/abm/products",
      color: "bg-green-500",
      stats: {
        label: "Total productos",
        value: data.stats.products.total.toLocaleString(),
        trend: data.stats.products.trend,
      },
      actions: [
        {
          label: "Nuevo producto",
          icon: <FiPlus />,
          onClick: () => router.push("/dashboard/abm/products/new"),
          color: "bg-green-600 hover:bg-green-700",
        },
        {
          label: "Ver todos",
          icon: <FiEye />,
          onClick: () => router.push("/dashboard/abm/products"),
          color: "bg-green-100 text-green-700 hover:bg-green-200",
        },
      ],
    },
    {
      title: "Ventas",
      description: "Reportes de ventas y análisis financiero",
      icon: <FiDollarSign className="w-8 h-8" />,
      href: "/dashboard/sales",
      color: "bg-orange-500",
      stats: {
        label: "Ventas mes",
        value: data.stats.sales.monthly,
        trend: data.stats.sales.trend,
      },
      actions: [
        {
          label: "Reporte",
          icon: <FiEdit />,
          onClick: () => router.push("/dashboard/sales/reports"),
          color: "bg-orange-600 hover:bg-orange-700",
        },
        {
          label: "Ver detalles",
          icon: <FiEye />,
          onClick: () => router.push("/dashboard/sales"),
          color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
        },
      ],
    },
  ];

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardCards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden hover:shadow-xl hover:border-gray-600 transition-all duration-300 cursor-pointer group"
          onClick={() => handleCardClick(card.href)}
        >
          {/* Card Header */}
          <div className={`${card.color} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="text-white mb-3">{card.icon}</div>
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="text-white/80 text-sm mt-1">{card.description}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Stats - solo si existen */}
            {card.stats && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {card.stats.label}
                  </span>
                  {card.stats.trend && (
                    <span
                      className={`
                      inline-flex items-center text-xs font-medium
                      ${
                        card.stats.trend === "up"
                          ? "text-green-400"
                          : card.stats.trend === "down"
                            ? "text-red-400"
                            : "text-gray-400"
                      }
                    `}
                    >
                      {card.stats.trend === "up" && "↑"}
                      {card.stats.trend === "down" && "↓"}
                      {card.stats.trend === "neutral" && "→"}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-white">
                  {card.stats.value}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              {card.actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${action.color}
                  `}
                >
                  <span className="flex items-center space-x-2">
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      ))}
    </div>
  );
}
