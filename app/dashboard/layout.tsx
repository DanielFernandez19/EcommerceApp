"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import Sidebar from "@/components/features/dashboard/Sidebar";
import TopBar from "@/components/features/dashboard/TopBar";
import Navigation from "@/components/features/layout/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, initializing } = useAuthContext();

  // Determinar si es la página del carrito (accesible para todos los usuarios autenticados)
  const isCartPage = pathname.startsWith('/dashboard/cart');

  // Validar acceso y redirigir si es necesario - UN SOLO useEffect
  useEffect(() => {
    if (!initializing) {
      // Si no hay usuario, redirigir al login
      if (!user) {
        router.push('/Login');
        return;
      }

      // Si es la página del carrito, solo verificar que esté autenticado
      if (isCartPage) {
        return;
      }

      // Para otras rutas del dashboard, verificar que tenga permisos de admin
      if (![1, 2].includes(user.idRole)) {
        router.push('/');
        return;
      }
    }
  }, [user, initializing, router, isCartPage]);

  // Si está inicializando, mostrar loading breve
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (la redirección ocurrirá en el useEffect)
  if (!user) {
    return null;
  }

  // Si es la página del carrito, renderizar sin restricciones de admin
  if (isCartPage) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
      </div>
    );
  }

  // Para otras rutas, verificar permisos de admin
  if (![1, 2].includes(user.idRole)) {
    return null;
  }

  // Determinar qué layout mostrar
  const isABMPage = pathname.startsWith('/dashboard/abm');
  const isDashboardHome = pathname === '/dashboard';
  const isOrdersPage = pathname.startsWith('/dashboard/orders');

return (
    <div className="min-h-screen bg-gray-900">
      {/* ===== LAYOUT PARA PÁGINAS ABM ===== */}
      {isABMPage && (
        <div className="flex h-screen">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            pathname={pathname}
            onLogout={logout}
          />
          
          <div className="flex-1 flex flex-col">
            <TopBar 
              pathname={pathname}
              onMenuOpen={() => setSidebarOpen(true)}
              showBreadcrumb={true}
              showMenuButton={true}
            />
             
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      )}

      {/* ===== LAYOUT PARA PÁGINA DE ORDERS ===== */}
      {isOrdersPage && (
        <div className="flex h-screen">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            pathname={pathname}
            onLogout={logout}
          />
          
          <div className="flex-1 flex flex-col">
            <TopBar 
              pathname={pathname}
              onMenuOpen={() => setSidebarOpen(true)}
              showBreadcrumb={true}
              showMenuButton={true}
            />
             
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      )}

      {/* ===== LAYOUT PARA DASHBOARD HOME ===== */}
      {isDashboardHome && (
        <div className="min-h-screen">
          <TopBar 
            pathname={pathname}
            onMenuOpen={() => setSidebarOpen(true)}
            showBreadcrumb={false}
            showMenuButton={false}
          />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardContent>{children}</DashboardContent>;
}