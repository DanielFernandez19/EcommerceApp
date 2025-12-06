"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/features/dashboard/Sidebar";
import TopBar from "@/components/features/dashboard/TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

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