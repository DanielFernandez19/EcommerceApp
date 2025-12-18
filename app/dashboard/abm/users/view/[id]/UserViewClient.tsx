"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";

interface Props {
  id: string;
}

export default function UserViewClient({ id }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetUserById/${id}`);
        
        if (!res.ok) {
          throw new Error("Usuario no encontrado");
        }
        
        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        setError("Error al cargar el usuario");
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <div className="text-center">
          <p className="text-lg">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white">
        <h1 className="text-2xl font-bold mb-6">Usuario no encontrado</h1>
        <Link
          href="/dashboard/abm/users"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg inline-block"
        >
          Volver
        </Link>
      </div>
    );
  }

  const getRoleName = (idRole: number) => {
    switch (idRole) {
      case 1:
        return "Administrador";
      case 2:
        return "Vendor";
      case 3:
        return "Cliente";
      default:
        return "Desconocido";
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

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">
        Detalle del Usuario
      </h1>

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

          {user.phoneNumber && (
            <div>
              <span className="text-gray-400 text-sm">Teléfono</span>
              <p className="text-white">{user.phoneNumber}</p>
            </div>
          )}
        </div>

        {hasAddressInfo && (
          <div className="border-t border-gray-700 pt-4 space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Dirección</h3>
            
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

            {(user.country || user.countryDto) && (
              <div>
                <span className="text-gray-400 text-sm">País</span>
                <p className="text-white">
                  {user.country?.name || user.countryDto?.name || "-"}
                </p>
              </div>
            )}

            {(user.province || user.provinceDto) && (
              <div>
                <span className="text-gray-400 text-sm">Provincia</span>
                <p className="text-white">
                  {user.province?.name || user.provinceDto?.name || "-"}
                </p>
              </div>
            )}

            {(user.city || user.cityDto) && (
              <div>
                <span className="text-gray-400 text-sm">Ciudad</span>
                <p className="text-white">
                  {user.city?.name || user.cityDto?.name || "-"}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-gray-700 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 text-sm">Rol</span>
              <p className="text-white font-semibold">
                {getRoleName(userRoleId)}
                {user.role && ` (${user.role.name})`}
              </p>
            </div>

            <div>
              <span className="text-gray-400 text-sm">ID</span>
              <p className="text-white text-xs font-mono">{user.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          href={`/dashboard/abm/users/edit/${user.id}`}
          className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Editar
        </Link>

        <Link
          href="/dashboard/abm/users"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}