// components/forms/RegisterForm.tsx
"use client";

import { useForm } from "@/hooks/useForm";
import { apiClient } from "@/lib/api";
import { registerSchema } from "@/schemas/auth";
import type { RegisterFormData } from "@/schemas/auth";
import type { RegisterResponse } from "@/types/auth";
import { useLocationData } from "@/hooks/useLocationData";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { OptionItem } from "@/types/OptionItem";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      emailConfirmed: "",
      password: "",
      phoneNumber: "",
      billingAddress: "",
      billingAddress2: "",
      postalCode: "",
      idCountry: 0,
      idProvince: 0,
      idCity: 0,
      idRole: 3,
    },
    schema: registerSchema,
    onSubmit: async (values) => {
      try {
        const response = await apiClient.post<RegisterResponse, RegisterFormData>(
          "User/CreateUser",
          values
        );

        if (response.id) {
          // Redirigir al login después de registro exitoso
          router.push("/Login?registered=true");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
  });

  const {
    countries,
    provinces,
    cities,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    resetProvinces,
    resetCities,
  } = useLocationData(form.values.idCountry, form.values.idProvince);

  // Manejar cambios en selects
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const numeric = value === "" || value === "0" ? 0 : Number(value);
    form.setFieldValue("idCountry", numeric);
    form.setFieldValue("idProvince", 0);
    form.setFieldValue("idCity", 0);
    resetProvinces();
    resetCities();
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const numeric = value === "" || value === "0" ? 0 : Number(value);
    form.setFieldValue("idProvince", numeric);
    form.setFieldValue("idCity", 0);
    resetCities();
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const numeric = value === "" || value === "0" ? 0 : Number(value);
    form.setFieldValue("idCity", numeric);
  };

  // Convertir datos para los selects
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

  // Helper para obtener valor del select
  const getSelectValue = (value: number): string => {
    return value === 0 ? "" : String(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Crear cuenta</h1>

      <form onSubmit={form.handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="name"
            label="Nombre"
            value={form.values.name}
            onChange={form.handleChange("name")}
            onBlur={form.handleBlur("name")}
            error={form.touched.name ? form.errors.name : undefined}
            required
          />

          <Input
            name="lastName"
            label="Apellido"
            value={form.values.lastName}
            onChange={form.handleChange("lastName")}
            onBlur={form.handleBlur("lastName")}
            error={form.touched.lastName ? form.errors.lastName : undefined}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            name="emailConfirmed"
            label="Confirmar email"
            type="email"
            value={form.values.emailConfirmed}
            onChange={form.handleChange("emailConfirmed")}
            onBlur={form.handleBlur("emailConfirmed")}
            error={form.touched.emailConfirmed ? form.errors.emailConfirmed : undefined}
            required
            autoComplete="email"
          />
        </div>

        <Input
          name="password"
          label="Contraseña"
          type="password"
          value={form.values.password}
          onChange={form.handleChange("password")}
          onBlur={form.handleBlur("password")}
          error={form.touched.password ? form.errors.password : undefined}
          required
          autoComplete="new-password"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="phoneNumber"
            label="Teléfono"
            type="tel"
            value={form.values.phoneNumber}
            onChange={form.handleChange("phoneNumber")}
            autoComplete="tel"
          />

          <Input
            name="postalCode"
            label="Código postal"
            value={form.values.postalCode}
            onChange={form.handleChange("postalCode")}
            autoComplete="postal-code"
          />
        </div>

        <Input
          name="billingAddress"
          label="Dirección de facturación"
          value={form.values.billingAddress}
          onChange={form.handleChange("billingAddress")}
          autoComplete="street-address"
        />

        <Input
          name="billingAddress2"
          label="Dirección (detalle)"
          value={form.values.billingAddress2}
          onChange={form.handleChange("billingAddress2")}
        />

        <div className="grid grid-cols-3 gap-4">
          <Select
            name="idCountry"
            label="País"
            value={getSelectValue(form.values.idCountry)}
            options={countryOptions}
            onChange={handleCountryChange}
            loading={loadingCountries}
            error={form.touched.idCountry ? form.errors.idCountry : undefined}
            required
          />

          <Select
            name="idProvince"
            label="Provincia"
            value={getSelectValue(form.values.idProvince)}
            options={provinceOptions}
            onChange={handleProvinceChange}
            loading={loadingProvinces}
            disabled={!form.values.idCountry || loadingProvinces}
            error={form.touched.idProvince ? form.errors.idProvince : undefined}
            required
          />

          <Select
            name="idCity"
            label="Ciudad"
            value={getSelectValue(form.values.idCity)}
            options={cityOptions}
            onChange={handleCityChange}
            loading={loadingCities}
            disabled={!form.values.idProvince || loadingCities}
            error={form.touched.idCity ? form.errors.idCity : undefined}
            required
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            loading={form.isSubmitting}
            disabled={!form.isValid}
            fullWidth
          >
            {form.isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </div>
      </form>
    </div>
  );
}