"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextInput, Select, ModalSuccess } from "@/components/ui";
import { apiPost } from "@/lib/api";
import type { RegisterRequest, RegisterResponse } from "@/types";
import type { OptionItem } from "@/types/OptionItem";
import { useLocationData } from "@/hooks/useLocationData";
import { registerSchema } from "@/schemas/registerSchema";
import { setTimeout } from "timers";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdminMode = searchParams.get("mode") === "admin";

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    lastName: "",
    email: "",
    emailconfirmed: "",
    password: "",
    phoneNumber: "",
    billingAddress: "",
    billingAddress2: "",
    postalCode: "",
    idCountry: 0,
    idProvince: 0,
    idCity: 0,
    idRole: 3, // User role
  });

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const {
    countries,
    provinces,
    cities,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    resetProvinces,
    resetCities,
  } = useLocationData(form.idCountry, form.idProvince);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  // Handler for select changes - converts values to number for ids
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    const numeric = value === "" || value === "0" ? 0 : Number(value);

    if (name === "idCountry") {
      setForm((prev) => ({
        ...prev,
        idCountry: numeric,
        idProvince: 0,
        idCity: 0,
      }));
      resetProvinces();
      resetCities();
    } else if (name === "idProvince") {
      // Reset ciudad cuando cambia la provincia
      setForm((prev) => ({
        ...prev,
        idProvince: numeric,
        idCity: 0,
      }));
      resetCities();
    } else {
      setForm((prev) => ({ ...prev, [name]: numeric }));
    }
  }

  function validateForm(): boolean {
    // Validar con Zod usando safeParse
    const result = registerSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    // Manejar errores de Zod
    const newErrors: Record<string, string> = {};
    result.error.errors.forEach(
      (err: { path: (string | number)[]; message: string }) => {
        const field = err.path[0] as string;
        if (field) {
          newErrors[field] = err.message;
        }
      },
    );

    setErrors(newErrors);
    return false;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});

    if (!validateForm()) {
      setError("Por favor, completa todos los campos requeridos correctamente");
      return;
    }

    setSubmitting(true);

    try {
      const res: RegisterResponse = await apiPost<
        RegisterResponse,
        RegisterRequest
      >("User/CreateUser", form);

      if (res.id !== null || res.id !== undefined || res.id !== "") {
        setShowSuccess(true);

        setTimeout(() => {
          // Redirigir según el rol del usuario creado
          if (res.role.id === 1 || res.role.id === 2) {
            // Admin o Vendor → Dashboard
            router.push("/dashboard");
          } else {
            // User normal → Login para que inicie sesión
            router.push("/Login");
          }
        }, 3000);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "No se pudo crear el usuario",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Convert options to OptionItem for the Select component
  const countryOptions: OptionItem[] = countries.map((c) => ({
    id: c.id,
    name: c.name,
  }));
  const provinceOptions: OptionItem[] = provinces.map((p) => ({
    id: p.id,
    name: p.name,
  }));
  const cityOptions: OptionItem[] = cities.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  // Helper to convert form value to select value (0 becomes empty string)
  const getSelectValue = (value: number): string => {
    return value === 0 ? "" : String(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
<h1 className="text-3xl font-bold text-white mb-2">
            {isAdminMode ? "Crear usuario" : "Crear cuenta"}
          </h1>
          <p className="text-gray-400">
            {isAdminMode 
              ? "Completa el formulario para crear un nuevo usuario"
              : "Completa el formulario para registrarte"
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showSuccess && (
          <ModalSuccess 
            message={isAdminMode ? "Usuario creado exitosamente" : "Cuenta creada exitosamente"} 
          />
        )}

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <form onSubmit={handleRegister} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="name"
                label="Nombre"
                value={form.name}
                onChange={handleChange}
                required
                error={errors.name}
              />
              <TextInput
                name="lastName"
                label="Apellido"
                value={form.lastName}
                onChange={handleChange}
                required
                error={errors.lastName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="email"
                label="Email"
                value={form.email}
                type="email"
                onChange={handleChange}
                required
                error={errors.email}
              />
              <TextInput
                name="emailconfirmed"
                label="Confirmar email"
                value={form.emailconfirmed}
                type="email"
                onChange={handleChange}
                required
                error={errors.emailconfirmed}
              />
            </div>

            <TextInput
              name="password"
              label="Contraseña"
              value={form.password}
              type="password"
              onChange={handleChange}
              required
              error={errors.password}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="phoneNumber"
                label="Teléfono"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              <TextInput
                name="postalCode"
                label="Código postal"
                value={form.postalCode}
                onChange={handleChange}
              />
            </div>

            <TextInput
              name="billingAddress"
              label="Dirección de facturación"
              value={form.billingAddress}
              onChange={handleChange}
            />
            <TextInput
              name="billingAddress2"
              label="Dirección (detalle)"
              value={form.billingAddress2}
              onChange={handleChange}
            />

            <div className="grid grid-cols-3 gap-4">
              <Select
                name="idCountry"
                label="País"
                value={getSelectValue(form.idCountry)}
                options={countryOptions}
                onChange={handleSelectChange}
                loading={loadingCountries}
                required
                error={errors.idCountry}
              />
              <Select
                name="idProvince"
                label="Provincia"
                value={getSelectValue(form.idProvince)}
                options={provinceOptions}
                onChange={handleSelectChange}
                loading={loadingProvinces}
                required
                disabled={!form.idCountry || loadingProvinces}
                error={errors.idProvince}
              />
              <Select
                name="idCity"
                label="Ciudad"
                value={getSelectValue(form.idCity)}
                options={cityOptions}
                onChange={handleSelectChange}
                loading={loadingCities}
                required
                disabled={!form.idProvince || loadingCities}
                error={errors.idCity}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-violet-600 text-white font-medium py-3 rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    isAdminMode ? "Creando usuario..." : "Creando cuenta..."
                  </span>
                ) : (
isAdminMode ? "Crear usuario" : "Crear cuenta"
                )}
              </button>
            </div>
          </form>
        </div>

{/* Login link - solo mostrar en modo normal */}
        {!isAdminMode && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/Login"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 py-8 px-4 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
