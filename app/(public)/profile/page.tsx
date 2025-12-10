"use client";

import { ProfileEditor } from "@/components/forms/ProfileEditor";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirigir al dashboard después de actualizar
    router.push("/dashboard");
  };

  const handleCancel = () => {
    // Volver al dashboard sin guardar
    router.push("/dashboard");
  };

  return (
    <ProfileEditor
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}