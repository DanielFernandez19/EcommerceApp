"use client";
import { Suspense } from "react";
import { RegisterFormContent } from "@/components/forms/RegisterFormContent";

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
}
