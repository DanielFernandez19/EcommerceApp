"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import Sidebar from "@/components/features/dashboard/Sidebar";
import TopBar from "@/components/features/dashboard/TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, initializing } = useAuthContext();

  // Validar acceso y redirigir si es necesario - UN SOLO useEffect
  useEffect(() => {
    if (!initializing) {
      // Si no hay usuario o no tiene permisos de admin
      if (!user || ![1, 2].includes(user.idRole)) {
        router.push('/');
        return;
      }
    }
  }, [user, initializing, router]);

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

  // Si no hay usuario o no tiene permisos, no renderizar nada (la redirección ocurrirá en el useEffect)
  if (!user || ![1, 2].includes(user.idRole)) {
    return null;
  }

  // Determinar qué layout mostrar
  const isABMPage = pathname.startsWith('/dashboard/abm');
  const isDashboardHome = pathname === '/dashboard';

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