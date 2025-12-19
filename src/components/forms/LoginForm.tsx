// components/forms/LoginForm.tsx
"use client";

import { useForm } from "@/hooks/useForm";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { loginSchema } from "@/schemas/auth";
import type { LoginFormData } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api";

export function LoginForm() {
  const router = useRouter();
  const { setUser, refreshAuth } = useAuthContext();

  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    schema: loginSchema,
onSubmit: async (values) => {
      try {
        console.log("🔥 LOGIN INICIADO");
        
        // Hacer login directo con la API
        const response = await apiClient.post<any, LoginFormData>("auth/login", values);
        
        console.log("📡 RESPONSE API:", response);
        
        // Guardar token en cookie
        document.cookie = `auth_token=${response.token}; path=/; max-age=86400; secure; samesite=strict`;
        
        // Guardar datos del usuario en cookie
        const userData = {
          id: response.id,
          email: response.email,
          fullName: response.fullName || response.email,
          idRole: response.idRole || 1, // Default a 1 si no viene
          token: response.token
        };
        
        console.log("👤 USER DATA PARA COOKIES:", userData);
        console.log("🔢 ROL DEL USUARIO:", userData.idRole);
        
        document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400; secure; samesite=strict`;
        
        // Guardar en localStorage para consistencia (aunque no se use mucho)
        localStorage.setItem("auth", JSON.stringify(userData));
        
        console.log("🍪 COOKIES SETEADAS");
        console.log("💾 LOCALSTORAGE SETEADO");
        
        // Actualizar el contexto
        setUser(userData);
        
        console.log("🔄 CONTEXTO ACTUALIZADO CON setUser");
        
        // Forzar refresh del contexto para asegurar sincronización
        refreshAuth();
        
        console.log("🔄 REFRESH AUTH EJECUTADO");
        
        // Pequeña demora para asegurar que el contexto se actualice antes de la navegación
        setTimeout(() => {
          console.log("⏰ TIMEOUT EJECUTADO - VERIFICANDO REDIRECCIÓN");
          console.log("🎯 ROL PARA REDIRECCIÓN:", userData.idRole);
          
          // Redirigir según el rol
          if (userData.idRole === 1 || userData.idRole === 2) {
            console.log("🚀 REDIRIGIENDO A DASHBOARD");
            // Admin o Vendor → Dashboard
            router.push("/dashboard");
          } else {
            console.log("🏠 REDIRIGIENDO A PROFILE");
            // User normal → Perfil o Landing
            router.push("/profile");
          }
        }, 100);
      } catch (error) {
        console.error("❌ LOGIN FAILED:", error);
        throw error; // Dejar que el useForm maneje el error
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