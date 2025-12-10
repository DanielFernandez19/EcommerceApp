"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/userActions";
import { UserFormBase } from "./UserFormBase";
import type { User } from "@/types/user";

interface EditUserFormProps {
  user: User;
}

export function EditUserForm({ user }: EditUserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userData: any) => {
    setLoading(true);

    try {
      await updateUser(user.id, userData);
      
      // Redirigir a la lista de usuarios
      router.push("/dashboard/abm/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar el usuario. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/abm/users");
  };

  // Opciones de rol para admin
  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Super Admin" },
    { id: 3, name: "Usuario" },
  ];

  return (
    <UserFormBase
      user={user}
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      title="Editar Usuario"
      subtitle="Modifica la información del usuario seleccionado"
      submitText="Guardar Cambios"
      cancelText="Volver a la lista"
      showRoleSelector={true}
      initialRole={user.role}
      roleOptions={roleOptions}
    />
  );
}