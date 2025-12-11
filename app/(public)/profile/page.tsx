"use client";

import { ProfileEditor } from "@/components/forms/ProfileEditor";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleSuccess = () => {
    // NO redirigir - quedarse en la página de perfil
    // El ProfileEditor mostrará el modal de éxito
  };

  const handleCancel = () => {
    // Volver al dashboard sin guardar
    router.push("/dashboard");
  };

  return <ProfileEditor onSuccess={handleSuccess} onCancel={handleCancel} />;
}
