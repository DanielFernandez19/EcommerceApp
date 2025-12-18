"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiX,
  FiLogOut,
  FiChevronRight,
  FiDollarSign
} from "react-icons/fi";
import { useAuthContext } from "@/components/providers/AuthProvider";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  onLogout: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <FiHome className="w-5 h-5" />,
    description: "Vista principal"
  },
  {
    title: "Usuarios",
    href: "/dashboard/abm/users",
    icon: <FiUsers className="w-5 h-5" />,
    description: "Gestión de usuarios"
  },
  {
    title: "Productos",
    href: "/dashboard/abm/products",
    icon: <FiShoppingBag className="w-5 h-5" />,
    description: "Catálogo de productos"
  },
  {
    title: "Ventas",
    href: "/dashboard/orders",
    icon: <FiDollarSign className="w-5 h-5" />,
    description: "Gestión de pedidos"
  }
];

export default function Sidebar({ isOpen, onClose, pathname, onLogout }: SidebarProps) {
  const { user } = useAuthContext();
  
  // Filtrar items del menú según el rol del usuario
  // Solo Admin (rol 1) puede ver "Usuarios"
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.href === "/dashboard/abm/users") {
      return user?.idRole === 1; // Solo visible para Admin
    }
    return true; // Mostrar todos los demás items
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                <FiHome className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-violet-900/50 text-violet-300 border-l-4 border-violet-500' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <span className={isActive ? 'text-violet-400' : 'text-gray-400 group-hover:text-gray-300'}>
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                  {isActive && <FiChevronRight className="w-4 h-4 text-violet-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}