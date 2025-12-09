// components/forms/LoginForm.tsx
"use client";

import { useForm } from "@/hooks/useForm";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/schemas/auth";
import type { LoginFormData } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    schema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        router.push("/dashboard/users");
      } catch (error) {
        // El error ya se maneja en el hook useAuth
        // Podríamos mostrar un toast aquí
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={form.handleSubmit} className="flex flex-col gap-4 p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <Input
          name="email"
          label="Email"
          type="email"
          value={form.values.email}
          onChange={form.handleChange("email")}
          onBlur={form.handleBlur("email")}
          error={form.touched.email ? form.errors.email : undefined}
          required
          autoComplete="email"
        />

        <Input
          name="password"
          label="Contraseña"
          type="password"
          value={form.values.password}
          onChange={form.handleChange("password")}
          onBlur={form.handleBlur("password")}
          error={form.touched.password ? form.errors.password : undefined}
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          loading={form.isSubmitting}
          disabled={!form.isValid}
          fullWidth
        >
          {form.isSubmitting ? "Iniciando sesión..." : "Entrar"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link 
            href="/register" 
            className="text-blue-600 hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
        
        <p className="text-sm text-gray-600">
          ¿Olvidaste tu contraseña?{" "}
          <Link 
            href="/reset-password" 
            className="text-blue-600 hover:underline font-medium"
          >
            Recupera aquí
          </Link>
        </p>
      </div>
    </div>
  );
}