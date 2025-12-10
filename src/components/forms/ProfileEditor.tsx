// src/components/forms/ProfileEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { UserFormBase } from "./UserFormBase";
import type { User } from "@/types/user";

interface ProfileEditorProps {
  userId?: string; // Si no se proporciona, es para el perfil del usuario actual
  title?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProfileEditor({
  userId,
  title = "Editar Perfil",
  onSuccess,
  onCancel,
}: ProfileEditorProps) {
  const router = useRouter();
  const { user: currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Cargar datos del usuario
  const loadUser = async () => {
    try {
      console.log(
        "🔄 INICIO loadUser - userId:",
        userId,
        "currentUser:",
        currentUser?.id,
      );
      setFetchLoading(true);
      const targetUserId = userId || currentUser?.id;

      if (targetUserId) {
        console.log("📡 Llamando a la API con ID:", targetUserId);
        const userData = await apiClient.get<User>(
          `user/GetUserById/${targetUserId}`,
        );
        console.log("✅ Datos del usuario cargados:", userData);
        setUser(userData);
      } else {
        console.log("⚠️ No hay userId ni currentUser");
      }
    } catch (error) {
      console.error("❌ Error loading data:", error);

      // Manejo específico de errores de red
      if (error instanceof Error) {
        if (
          error.message.includes("NetworkError") ||
          error.message.includes("fetch")
        ) {
          alert(
            "Error de conexión: No se puede conectar con el servidor. Por favor, verifica que el backend esté corriendo en http://localhost:5024",
          );
        } else if (error.message.includes("404")) {
          alert("Error: Usuario no encontrado. Por favor, intenta nuevamente.");
        } else {
          alert(`Error al cargar los datos del usuario: ${error.message}`);
        }
      } else {
        alert(
          "Error al cargar los datos del usuario. Por favor, intenta nuevamente.",
        );
      }
    } finally {
      console.log("🏁 FIN loadUser - fetchLoading:", false);
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    const targetUserId = userId || currentUser?.id;

    if (targetUserId && !user) {
      console.log("🔄 useEffect - Cargando usuario:", targetUserId);
      loadUser();
    } else if (!targetUserId) {
      console.log("🔄 useEffect - No hay userId, seteando fetchLoading false");
      setFetchLoading(false);
    } else {
      console.log("🔄 useEffect - Usuario ya cargado, no hacer nada");
    }
  }, [userId, currentUser?.id]); // Solo se ejecuta si cambia el userId

  const handleSubmit = async (userData: User) => {
    setLoading(true);

    try {
      const userUpdate: User = {
        id: user!.id,
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        billingAddress: userData.billingAddress,
        billingAddress2: userData.billingAddress2 || "",
        postalCode: userData.postalCode,
        idCountry: userData.idCountry,
        idProvince: userData.idProvince,
        idCity: userData.idCity,
        idRole: user!.idRole, // No se puede cambiar el rol propio
        role: user!.role,
        // Incluir Dto para compatibilidad
        countryDto: userData.idCountry
          ? { id: userData.idCountry, name: "" }
          : undefined,
        provinceDto: userData.idProvince
          ? { id: userData.idProvince, name: "" }
          : undefined,
        cityDto: userData.idCity
          ? { id: userData.idCity, name: "" }
          : undefined,
      };

      const response = await apiClient.post<boolean, User>(
        `user/UpdateUser`,
        userUpdate,
      );

      if (response) {
        onSuccess?.();
        if (!userId) {
          router.push("/dashboard");
        }
      } else {
        throw new Error("No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar el usuario. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/dashboard");
    }
  };

  if (fetchLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <UserFormBase
            user={user}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            title={title}
            subtitle={
              userId
                ? "Edita la información del usuario"
                : "Edita tu información personal"
            }
            submitText="Guardar Cambios"
            cancelText={onCancel ? "Cancelar" : "Volver al dashboard"}
            showRoleSelector={false} // Los usuarios no pueden cambiar su rol
          >
            {/* Información del rol actual (solo lectura) */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Tu Rol</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <span className="text-gray-300">
                  Rol actual:{" "}
                  <span className="text-violet-400 font-medium">
                    {user.role?.name || "Usuario"}
                  </span>
                </span>
              </div>
            </div>
          </UserFormBase>
        </div>
      </div>
    </div>
  );
}
