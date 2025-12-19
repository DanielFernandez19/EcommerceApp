"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EditUserForm } from "@/components/forms/EditUserForm";
import type { User } from "@/types/user";
import { UserFormBase } from "@/components/forms/UserFormBase";
import { createUser, updateUser } from "@/actions/apiUtils";
import type { UpdateUserData } from "@/actions/apiUtils";

export default function UsersManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode") || "view"; // "view", "edit", "new"
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === "new") {
      setLoading(false);
      return;
    }

    if (!id) {
      router.push("/dashboard/abm/users");
      return;
    }

    const loadUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetUserById/${id}`, {
          cache: "no-store"
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, mode, router]);

  const handleCreate = async (userData: User) => {
    try {
      await createUser(userData);
      router.push("/dashboard/abm/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdate = async (userData: UpdateUserData) => {
    if (!id) return;
    
    try {
      await updateUser(id, userData);
      router.push("/dashboard/abm/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // New user form
  if (mode === "new") {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Nuevo Usuario</h1>
          <Link
            href="/dashboard/abm/users"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>
        
        <div className="min-h-screen bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <UserFormBase
                user={{} as User}
                onSubmit={(userData: User | UpdateUserData) => handleCreate(userData as User)}
                onCancel={() => router.push("/dashboard/abm/users")}
                submitText="Crear Usuario"
                cancelText="Cancelar"
                showRoleSelector={true}
                isNewUser={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error states
  if (!user) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Usuario no encontrado</h1>
          <Link
            href="/dashboard/abm/users"
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  const getRoleName = (idRole: number) => {
    switch (idRole) {
      case 1: return "Administrador";
      case 2: return "Vendor";
      case 3: return "Cliente";
      default: return "Desconocido";
    }
  };

  const userRoleId = user.idRole || user.role?.id || 0;
  
  const hasAddressInfo = 
    user.billingAddress || 
    user.billingAddress2 || 
    user.postalCode ||
    user.country || 
    user.countryDto || 
    user.province || 
    user.provinceDto || 
    user.city || 
    user.cityDto;

  // View mode
  if (mode === "view") {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Detalle del Usuario
          </h1>
          <Link
            href="/dashboard/abm/users"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <span className="text-gray-400 text-sm">Nombre completo</span>
              <p className="text-lg font-semibold text-white">
                {user.name} {user.lastName}
              </p>
            </div>

            <div>
              <span className="text-gray-400 text-sm">Email</span>
              <p className="text-white">{user.email}</p>
            </div>

            <div>
              <span className="text-gray-400 text-sm">Teléfono</span>
              <p className="text-white">{user.phoneNumber || "No especificado"}</p>
            </div>

            <div>
              <span className="text-gray-400 text-sm">Rol</span>
              <p className="text-white">{getRoleName(userRoleId)}</p>
            </div>

            {hasAddressInfo && (
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">Dirección</h3>
                
                <div className="space-y-2">
                  {user.billingAddress && (
                    <div>
                      <span className="text-gray-400 text-sm">Dirección</span>
                      <p className="text-white">{user.billingAddress}</p>
                    </div>
                  )}
                  
                  {user.billingAddress2 && (
                    <div>
                      <span className="text-gray-400 text-sm">Dirección 2</span>
                      <p className="text-white">{user.billingAddress2}</p>
                    </div>
                  )}
                  
                  {user.postalCode && (
                    <div>
                      <span className="text-gray-400 text-sm">Código Postal</span>
                      <p className="text-white">{user.postalCode}</p>
                    </div>
                  )}
                  
                  {user.countryDto && (
                    <div>
                      <span className="text-gray-400 text-sm">País</span>
                      <p className="text-white">{user.countryDto.name}</p>
                    </div>
                  )}
                  
                  {user.provinceDto && (
                    <div>
                      <span className="text-gray-400 text-sm">Provincia</span>
                      <p className="text-white">{user.provinceDto.name}</p>
                    </div>
                  )}
                  
                  {user.cityDto && (
                    <div>
                      <span className="text-gray-400 text-sm">Ciudad</span>
                      <p className="text-white">{user.cityDto.name}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            href={`/dashboard/abm/users/manage?id=${user.id}&mode=edit`}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
          >
            Editar
          </Link>
        </div>
      </div>
    );
  }

  // Edit mode
  if (mode === "edit") {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Editar Usuario</h1>
          <Link
            href="/dashboard/abm/users"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </Link>
        </div>
        
        <div className="min-h-screen bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <EditUserForm user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return <div className="text-white">Modo no válido</div>;
}