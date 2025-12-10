"use client";

import { useParams, useRouter } from "next/navigation";
import { ProfileEditor } from "@/components/forms/ProfileEditor";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuthContext();
  const userId = params.id as string;

  const handleSuccess = () => {
    // Redirigir de vuelta a la lista de usuarios
    router.push("/dashboard/abm/users");
  };

  const handleCancel = () => {
    // Volver a la lista sin guardar
    router.push("/dashboard/abm/users");
  };

  // Verificar que el usuario actual tenga permisos para editar
  if (!currentUser || ![1, 2].includes(currentUser.idRole)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h1>
          <p className="text-gray-400 mb-6">No tienes permisos para editar usuarios.</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProfileEditor
      userId={userId}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}