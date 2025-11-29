"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/form/TextInput";
import { Select, OptionItem } from "../components/form/Select";
import { apiPost } from "@/lib/api";
import type { RegisterRequest, RegisterResponse } from "@/types/auth";
import { useLocationData } from "@/hooks/useLocationData";
import { registerSchema } from "@/schemas/registerSchema";

export default function RegisterPage() {
  const router = useRouter();

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
    idRole: 3,
  });

  const [submitting, setSubmitting] = useState(false);

  // Custom hook para manejar la carga de ubicaciones
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  // Generic handler for input changes (text inputs)
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
      // Reset provincia y ciudad cuando cambia el país
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
    result.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
      const field = err.path[0] as string;
      if (field) {
        newErrors[field] = err.message;
      }
    });
    
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

      // Registro OK → redirigimos al login
      router.push("/login?registered=true");
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Crear cuenta</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleRegister} className="grid grid-cols-1 gap-4">
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

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </div>
      </form>
    </div>
  );
}
