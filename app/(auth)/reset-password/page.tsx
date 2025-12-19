"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserByEmail, resetPassword } from "@/actions/apiUtils";
import { resetPasswordSchema } from "@/schemas/auth";
import type { ResetPasswordFormData } from "@/schemas/auth";

function ResetPasswordContent() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Validar campos en tiempo real
  const validatePassword = (value: string) => {
    if (!value || value.trim() === "") {
      setPasswordError("La contraseña es requerida");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value || value.trim() === "") {
      setConfirmPasswordError("Debes confirmar tu contraseña");
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      return false;
    }
    setConfirmPasswordError(null);
    return true;
  };

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validar email básico
      if (!email || !email.includes("@")) {
        setError("Por favor, ingresa un email válido");
        setLoading(false);
        return;
      }

      // Buscar el usuario por email y obtener su ID
      const user = await getUserByEmail(email);

      if (user && user.id) {
        // Email existe, guardar el ID y pasar al siguiente paso
        setUserId(user.id);
        setStep("password");
      } else {
        // Email no existe
        setError("Email no registrado");
      }
    } catch (err: unknown) {
      let errorMessage = "Error desconocido";
      
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message;
        } else if ('body' in err && err.body && typeof err.body === 'object' && 'message' in err.body) {
          errorMessage = String(err.body.message);
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    // Validar que los campos no estén vacíos
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      setLoading(false);
      return;
    }

    try {
      // Validar datos del formulario con el schema
      const formData: ResetPasswordFormData = {
        email,
        password,
        confirmPassword,
      };

      const validationResult = resetPasswordSchema.safeParse(formData);
      
      if (!validationResult.success) {
        // Mostrar errores específicos por campo
        validationResult.error.errors.forEach((err) => {
          if (err.path[0] === "password") {
            setPasswordError(err.message);
          } else if (err.path[0] === "confirmPassword") {
            setConfirmPasswordError(err.message);
          } else {
            setError(err.message);
          }
        });
        setLoading(false);
        return;
      }

      // Verificar que tenemos el ID del usuario
      if (!userId) {
        setError("Error: No se pudo identificar al usuario. Por favor, vuelve a ingresar tu email.");
        setStep("email");
        setLoading(false);
        return;
      }

      // Resetear la contraseña usando el ID del usuario
      const success = await resetPassword(userId, password);

      if (success) {
        setSuccess(true);
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError("No se pudo resetear la contraseña. Por favor, intenta nuevamente.");
      }
    } catch (err: unknown) {
      let errorMessage = "Error desconocido";
      
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message;
        } else if ('body' in err && err.body && typeof err.body === 'object' && 'message' in err.body) {
          errorMessage = String(err.body.message);
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Contraseña actualizada!</h2>
            <p className="text-gray-400 mb-6">Tu contraseña ha sido cambiada exitosamente.</p>
            <p className="text-gray-500 text-sm">Redirigiendo al login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === "email" ? "Recuperar Contraseña" : "Nueva Contraseña"}
          </h1>
          <p className="text-gray-400">
            {step === "email" 
              ? "Ingresa tu email para verificar tu cuenta" 
              : "Ingresa tu nueva contraseña"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 text-white font-medium py-3 rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  "Verificar Email"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (confirmPassword) {
                      validateConfirmPassword(confirmPassword);
                    }
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    passwordError ? "border-red-500" : "border-gray-600"
                  }`}
                  required
                  disabled={loading}
                  minLength={6}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-400">{passwordError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                  onBlur={(e) => validateConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    confirmPasswordError ? "border-red-500" : "border-gray-600"
                  }`}
                  required
                  disabled={loading}
                  minLength={6}
                />
                {confirmPasswordError && (
                  <p className="mt-1 text-sm text-red-400">{confirmPasswordError}</p>
                )}
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError(null);
                    setPassword("");
                    setConfirmPassword("");
                    setPasswordError(null);
                    setConfirmPasswordError(null);
                    setUserId(null);
                  }}
                  disabled={loading}
                  className="flex-1 bg-gray-700 text-white font-medium py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword || password.length < 6 || password !== confirmPassword}
                  className="flex-1 bg-violet-600 text-white font-medium py-3 rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cambiando...
                    </span>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <ResetPasswordContent />;
}
