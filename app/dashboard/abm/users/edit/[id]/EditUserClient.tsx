"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditUserForm } from "@/components/forms/EditUserForm";
import type { User } from "@/types/user";

interface Props {
  userId: string;
}

export default function EditUserClient({ userId }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetUserById/${userId}`);
        
        if (!res.ok) {
          throw new Error("Usuario no encontrado");
        }
        
        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        setError("Usuario no encontrado");
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-6">{error || "No se pudo cargar el usuario."}</p>
          <button
            onClick={() => router.push("/dashboard/abm/users")}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <EditUserForm user={user} />
        </div>
      </div>
    </div>
  );
}