"use client";

import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiTrendingUp,
  FiDollarSign,
  FiEye,
  FiEdit,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";

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
  actions?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();

  const dashboardCards: DashboardCard[] = [
    {
      title: "Usuarios",
      description: "Gestión de usuarios y permisos del sistema",
      icon: <FiUsers className="w-8 h-8" />,
      href: "/dashboard/abm/users",
      color: "bg-blue-500",
      stats: {
        label: "Total usuarios",
        value: "1,234",
        trend: "up",
      },
      actions: [
        {
          label: "Nuevo usuario",
          icon: <FiPlus />,
          onClick: () => router.push("/dashboard/abm/users/new"),
          color: "bg-blue-600 hover:bg-blue-700",
        },
        {
          label: "Ver todos",
          icon: <FiEye />,
          onClick: () => router.push("/dashboard/abm/users"),
          color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        },
      ],
    },
    {
      title: "Productos",
      description: "Catálogo de productos y gestión de inventario",
      icon: <FiShoppingBag className="w-8 h-8" />,
      href: "/dashboard/abm/products",
      color: "bg-green-500",
      stats: {
        label: "Total productos",
        value: "456",
        trend: "up",
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
      title: "Stock",
      description: "Gestión de inventario y control de stock",
      icon: <FiPackage className="w-8 h-8" />,
      href: "/dashboard/abm/stock",
      color: "bg-purple-500",
      stats: {
        label: "Productos en stock",
        value: "89",
        trend: "neutral",
      },
      actions: [
        {
          label: "Actualizar stock",
          icon: <FiPlus />,
          onClick: () => router.push("/dashboard/abm/stock/update"),
          color: "bg-purple-600 hover:bg-purple-700",
        },
        {
          label: "Ver todos",
          icon: <FiEye />,
          onClick: () => router.push("/dashboard/abm/stock"),
          color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
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
        value: "$45.2K",
        trend: "up",
      },
      actions: [
        {
          label: "Reporte",
          icon: <FiTrendingUp />,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Bienvenido al panel de administración
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Última actualización: hace 2 min
          </button>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            Actualizar datos
          </button>
        </div>
      </div>

      {/* Stats Grid */}
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

            {/* Card Body */}
            <div className="p-6">
              {/* Stats */}
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
              {card.actions && (
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
              )}
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Acciones rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="flex items-center space-x-3 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <FiPlus className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-medium">Nuevo usuario</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <FiPlus className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-medium">Nuevo producto</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <FiEdit className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-medium">Editar catálogo</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <FiTrendingUp className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-medium">Ver reportes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
