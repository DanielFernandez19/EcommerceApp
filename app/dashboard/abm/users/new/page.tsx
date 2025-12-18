"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, type CreateUserData } from "@/actions/apiUtils";
import { UserFormBase } from "@/components/forms/UserFormBase";
import { ModalError } from "@/components/ui/ModalError";
import { getFriendlyErrorMessage } from "@/utils/errorMessages";
import type { User } from "@/types/user";

export default function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (userData: CreateUserData) => {
    try {
      setError(null); // Limpiar error anterior
      await createUser(userData);

      // Redirigir a la lista de usuarios
      router.push("/dashboard/abm/users");
    } catch (error) {
      // Obtener mensaje de error amigable
      const errorMessage = getFriendlyErrorMessage(error);
      setError(errorMessage);
      
      // Auto-ocultar el error después de 5 segundos
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/abm/users");
  };

  // Crear un usuario vacío para el formulario
  const emptyUser: User = {
    id: "0",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    billingAddress: "",
    postalCode: "",
    countryDto: undefined,
    provinceDto: undefined,
    cityDto: undefined,
    role: { id: 3, name: "User" }, // Default role
    idCountry: 0,
    idProvince: 0,
    idCity: 0,
    idRole: 3
  };

  // Opciones de rol: 1=admin, 2=vendor, 3=user
  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Vendor" },
    { id: 3, name: "User" },
  ];

  return (
    <div className="relative">
      {/* Mostrar error si existe */}
      {error && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-5">
          <ModalError 
            message={error} 
            onClose={() => setError(null)}
          />
        </div>
      )}

      <UserFormBase
        user={emptyUser}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        title="Nuevo Usuario"
        subtitle="Crea un nuevo usuario en el sistema"
        submitText="Crear Usuario"
        cancelText="Volver a la lista"
        showRoleSelector={true}
        initialRole={{ id: 3, name: "User" }}
        roleOptions={roleOptions}
        isNewUser={true}
      />
    </div>
  );
}