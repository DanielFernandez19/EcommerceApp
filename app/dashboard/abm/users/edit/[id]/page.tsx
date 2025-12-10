import { EditUserForm } from "@/components/forms/EditUserForm";
import { getUserById } from "@/actions/userActions";
import { notFound } from "next/navigation";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id: userId } = await params;

  try {
    // Obtener datos del usuario en el servidor
    const user = await getUserById(userId);

    if (!user) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            {/* Header */}
            <div className="border-b border-gray-700 px-8 py-6">
              <h1 className="text-2xl font-bold text-white">Editar Usuario</h1>
              <p className="text-gray-400 mt-1">
                Modifica la información del usuario seleccionado
              </p>
            </div>

            {/* Formulario - Client Component para la interactividad */}
            <EditUserForm user={user} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading user:", error);
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-6">No se pudo cargar el usuario.</p>
          <a
            href="/dashboard/abm/users"
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Volver a la lista
          </a>
        </div>
      </div>
    );
  }
}