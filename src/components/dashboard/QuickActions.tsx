"use client";

import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiEdit,
  FiTrendingUp,
} from "react-icons/fi";

export function QuickActions() {
  const router = useRouter();

  const quickActions = [
    {
      icon: <FiPlus className="w-5 h-5 text-violet-400" />,
      label: "Nuevo usuario",
      onClick: () => router.push("/dashboard/abm/users/new"),
    },
    {
      icon: <FiPlus className="w-5 h-5 text-violet-400" />,
      label: "Nuevo producto",
      onClick: () => router.push("/dashboard/abm/products/new"),
    },
    {
      icon: <FiEdit className="w-5 h-5 text-violet-400" />,
      label: "Editar catálogo",
      onClick: () => router.push("/dashboard/abm/products"),
    },
    {
      icon: <FiTrendingUp className="w-5 h-5 text-violet-400" />,
      label: "Ver reportes",
      onClick: () => router.push("/dashboard/sales/reports"),
    },
  ];

  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center space-x-3 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}