"use client";

import Link from "next/link";
import { FiMenu, FiSettings } from "react-icons/fi";
import DashboardUserDropdown from "./DashboardUserDropdown";

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
  showMenuButton = false,
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

          {/* Logo - Igual que el landing */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">MiEcommerce</h2>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>

          {/* Breadcrumb */}
          {showBreadcrumb && (
            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-400 ml-8">
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">
                {menuItems.find((item) => item.href === pathname)?.title ||
                  "Página actual"}
              </span>
            </nav>
          )}
        </div>

        {/* User section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-700 relative text-gray-300"></button>
          <DashboardUserDropdown />
        </div>
      </div>
    </header>
  );
}
