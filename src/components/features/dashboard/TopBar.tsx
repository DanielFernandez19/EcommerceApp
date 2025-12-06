"use client";

import Link from "next/link";
import { FiMenu, FiSettings } from "react-icons/fi";

interface TopBarProps {
  pathname: string;
  onMenuOpen: () => void;
  showBreadcrumb?: boolean;
  showMenuButton?: boolean;
}

export default function TopBar({ 
  pathname, 
  onMenuOpen, 
  showBreadcrumb = false, 
  showMenuButton = false 
}: TopBarProps) {
  const menuItems = [
    {
      title: "Usuarios",
      href: "/dashboard/abm/users",
    },
    {
      title: "Productos",
      href: "/dashboard/abm/products",
    },
    {
      title: "Stock",
      href: "/dashboard/abm/stock",
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Menu button for mobile */}
          {showMenuButton && (
            <button
              onClick={onMenuOpen}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              <FiMenu className="w-5 h-5" />
            </button>
          )}
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <FiSettings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </div>

          {/* Breadcrumb */}
          {showBreadcrumb && (
            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-400 ml-8">
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">
                {menuItems.find(item => item.href === pathname)?.title || 'Página actual'}
              </span>
            </nav>
          )}
        </div>

        {/* User section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-700 relative text-gray-300">
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
            <FiSettings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-gray-400">admin@urbanstyle.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}