"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import UserDropdown from "./UserDropdown";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, initializing, user } = useAuthContext();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-white font-bold text-lg">MiEcommerce</span>
          </Link>

          {/* Estado de autenticación */}
          <div className="flex items-center space-x-4">
            {initializing ? (
              // Skeleton loading mientras inicializa
              <div className="flex items-center space-x-4">
                <div className="w-20 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-24 h-8 bg-violet-600 rounded-lg animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              // Usuario logueado - mostrar dropdown
              <UserDropdown />
            ) : (
              // Usuario no logueado - mostrar botones de login/register
              <>
                <Link
                  href="/login"
                  className="text-violet-300 hover:text-white px-4 py-2 rounded-lg hover:bg-violet-600/20 transition-all duration-200 font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-all duration-200 font-medium shadow-lg hover:shadow-violet-500/25"
                >
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
