"use client";

import { useRouter } from "next/navigation";
import { createUser, type CreateUserData } from "@/actions/userActions";
import { UserFormBase } from "@/components/forms/UserFormBase";
import type { User } from "@/types/user";

export default function NewUserPage() {
  const router = useRouter();

  const handleSubmit = async (userData: CreateUserData) => {
    try {
      await createUser(userData);

      // Redirigir a la lista de usuarios
      router.push("/dashboard/abm/users");
    } catch (error) {
      alert("Error al crear el usuario. Por favor, intenta nuevamente.");
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
    />
  );
}