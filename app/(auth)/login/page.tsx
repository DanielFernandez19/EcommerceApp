"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api_old";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const body: LoginRequest = { email, password };
      const res = await apiPost<LoginResponse, LoginRequest>(
        "Auth/Login",
        body,
      );

      localStorage.setItem("auth", JSON.stringify(res));
      router.push("/dashboard/users");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-8 max-w-sm mx-auto gap-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}
        <button className="bg-violet-600 text-white font-medium py-2 rounded hover:bg-violet-700">
          Entrar
        </button>
      </form>
      <div>
        <p className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-violet-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
      <div>
        <p className="text-center text-sm">
          ¿Olvidaste tu contraseña?{" "}
          <Link
            href="/reset-password"
            className="text-violet-600 hover:underline"
          >
            Recupera aquí
          </Link>
        </p>
      </div>
    </>
  );
}
