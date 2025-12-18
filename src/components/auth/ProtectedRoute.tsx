"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: number[]; // Roles permitidos, por defecto [1, 2]
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles = [1, 2] 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, initializing } = useAuthContext();

  useEffect(() => {
    if (!initializing && user) {
      if (!requiredRoles.includes(user.idRole)) {
        // Redirigir según el rol
        if (user.idRole === 3) {
          router.push('/'); // Usuario normal al landing
        } else {
          router.push('/Login'); // Otros roles al login
        }
      }
    }
  }, [user, initializing, router, requiredRoles]);

  // Mientras se inicializa, mostrar loading
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario o no tiene permisos, no renderizar
  if (!user || !requiredRoles.includes(user.idRole)) {
    return null;
  }

  return <>{children}</>;
}