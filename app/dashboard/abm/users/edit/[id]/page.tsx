import { EditUserForm } from "@/components/forms/EditUserForm";
import { getUserById } from "@/actions/userActions";
import { notFound } from "next/navigation";
import type { User } from "@/types/user";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id: userId } = await params;

  let user: User | null = null;
  let hasError = false;

  try {
    // Obtener datos del usuario en el servidor
    user = await getUserById(userId);
    
    if (!user) {
      notFound();
    }
  } catch (error) {
    console.error("Error loading user:", error);
    hasError = true;
  }

  if (hasError) {
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

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          {/* Formulario - Client Component para la interactividad */}
          <EditUserForm user={user!} />
        </div>
      </div>
    </div>
  );
}
