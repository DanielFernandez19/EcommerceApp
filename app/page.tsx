"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col p-8 max-w-sm mx-auto gap-4">
        <h1 className="text-2xl font-semibold text-center">E-commerce App</h1>

        <div className="text-center py-8">
          <p className="text-gray-600 mb-6">
            Bienvenido a tu plataforma de e-commerce
          </p>
        </div>

        <Link
          href="/login"
          className="bg-violet-600 text-white font-medium py-2 rounded hover:bg-violet-700 text-center"
        >
          Iniciar Sesión
        </Link>

        <Link
          href="/register"
          className="bg-gray-200 text-gray-800 font-medium py-2 rounded hover:bg-gray-300 text-center"
        >
          Crear Cuenta
        </Link>
      </div>

      <div>
        <p className="text-center text-sm text-gray-600">
          ¿Necesitas ayuda?{" "}
          <Link href="/help" className="text-violet-600 hover:underline">
            Visita nuestro centro de ayuda
          </Link>
        </p>
      </div>
    </>
  );
}
