"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LocationSelects } from "@/components/forms/LocationSelects";
import type { User } from "@/types/user";
import type { UpdateUserData } from "@/actions/userActions";
import { newUserSchema, editUserSchema } from "@/schemas/userFormSchema";

interface UserFormBaseProps {
  user: User;
  loading?: boolean;
  onSubmit: (userData: User | UpdateUserData) => Promise<void>;
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  title?: string;
  subtitle?: string;
  showRoleSelector?: boolean;
  initialRole?: { id: number; name: string };
  roleOptions?: { id: number; name: string }[];
  children?: React.ReactNode; // Para contenido adicional
  isNewUser?: boolean; // Indica si es un usuario nuevo (para mostrar campo password)
}

export function UserFormBase({
  user,
  loading = false,
  onSubmit,
  onCancel,
  submitText = "Guardar Cambios",
  cancelText = "Cancelar",
  title,
  subtitle,
  showRoleSelector = false,
  initialRole,
  roleOptions = [],
  children,
  isNewUser = false,
}: UserFormBaseProps) {
  // Extraer IDs de los objetos anidados
  const userCountryId = user.countryDto?.id || user.idCountry || 0;
  const userProvinceId = user.provinceDto?.id || user.idProvince || 0;
  const userCityId = user.cityDto?.id || user.idCity || 0;

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: user.name,
    lastName: user.lastName || "",
    email: user.email,
    password: "", // Campo password solo para nuevos usuarios
    phoneNumber: user.phoneNumber || "",
    billingAddress: user.billingAddress || "",
    postalCode: user.postalCode || "",
  });

  // Inicializar estados directamente con los datos del usuario para evitar effects
  const [selectedCountryId, setSelectedCountryId] =
    useState<number>(userCountryId);
  const [selectedProvinceId, setSelectedProvinceId] =
    useState<number>(userProvinceId);
  const [selectedCityId, setSelectedCityId] = useState<number>(userCityId);
  const [selectedRole, setSelectedRole] = useState<{
    id: number;
    name: string;
  } | null>(initialRole || null);

  // Estado para errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparar datos para validación
    const baseValidationData = {
      name: formData.name.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber || "",
      billingAddress: formData.billingAddress || "",
      billingAddress2: user.billingAddress2 || "",
      postalCode: formData.postalCode || "",
      idCountry: selectedCountryId || 0,
      idProvince: selectedProvinceId || 0,
      idCity: selectedCityId || 0,
      idRole: selectedRole?.id || 0,
    };

    // Agregar password solo si es un usuario nuevo
    const validationData = isNewUser
      ? { ...baseValidationData, password: formData.password }
      : baseValidationData;

    // Usar el schema apropiado según si es nuevo usuario o edición
    const schema = isNewUser ? newUserSchema : editUserSchema;
    const result = schema.safeParse(validationData);

    if (!result.success) {
      // Manejar errores de validación
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (field) {
          newErrors[field] = err.message;
        }
      });
      setErrors(newErrors);

      // Mostrar alert con resumen de errores
      const errorMessages = Object.values(newErrors).join("\n");
      alert(`Por favor, corrige los siguientes errores:\n\n${errorMessages}`);
      return;
    }

    // Si la validación es exitosa, limpiar errores y enviar
    setErrors({});

    // Asegurarse de que los valores numéricos siempre se envíen como números
    const userData: any = {
      name: validationData.name,
      lastName: validationData.lastName,
      email: validationData.email,
      phoneNumber: validationData.phoneNumber,
      billingAddress: validationData.billingAddress,
      billingAddress2: validationData.billingAddress2,
      postalCode: validationData.postalCode,
      // Asegurar que siempre sean números, no undefined
      idCountry: Number(validationData.idCountry) || 0,
      idProvince: Number(validationData.idProvince) || 0,
      idCity: Number(validationData.idCity) || 0,
      idRole: Number(validationData.idRole) || 0,
    };

    // Incluir password solo si es un usuario nuevo
    if (isNewUser && formData.password) {
      userData.password = formData.password;
    }

    // Debug: verificar valores antes de enviar
    console.log("🔍 Valores del formulario antes de enviar:", {
      selectedCountryId,
      selectedProvinceId,
      selectedCityId,
      selectedRole,
      userData,
    });

    await onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      {/* Header */}
      {(title || subtitle) && (
        <div className="border-b border-gray-700 pb-6">
          {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
          {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Información Personal */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Información Personal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            required
            error={errors.name}
          />

          <Input
            name="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
            required
            error={errors.lastName}
          />

          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            required
            error={errors.email}
          />

          {isNewUser && (
            <Input
              name="password"
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              required
              autoComplete="new-password"
              error={errors.password}
            />
          )}

          <Input
            name="phoneNumber"
            label="Teléfono"
            type="tel"
            value={formData.phoneNumber}
            onChange={(value) => handleInputChange("phoneNumber", value)}
          />
        </div>
      </div>

      {/* Dirección */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Dirección de Facturación
        </h2>
        <div className="space-y-6">
          <Input
            name="billingAddress"
            label="Dirección"
            value={formData.billingAddress}
            onChange={(value) => handleInputChange("billingAddress", value)}
          />

          <LocationSelects
            initialCountryId={selectedCountryId}
            initialProvinceId={selectedProvinceId}
            initialCityId={selectedCityId}
            onCountryChange={(id) => {
              setSelectedCountryId(id);
              if (errors.idCountry) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.idCountry;
                  return newErrors;
                });
              }
            }}
            onProvinceChange={(id) => {
              setSelectedProvinceId(id);
              if (errors.idProvince) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.idProvince;
                  return newErrors;
                });
              }
            }}
            onCityChange={(id) => {
              setSelectedCityId(id);
              if (errors.idCity) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.idCity;
                  return newErrors;
                });
              }
            }}
            disabled={loading}
            required={true}
            countryError={errors.idCountry}
            provinceError={errors.idProvince}
            cityError={errors.idCity}
          />

          <Input
            name="postalCode"
            label="Código Postal"
            value={formData.postalCode}
            onChange={(value) => handleInputChange("postalCode", value)}
          />
        </div>
      </div>

      {/* Rol - Solo si se muestra */}
      {showRoleSelector && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Rol de Usuario
          </h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Rol <span className="text-violet-400">*</span>
            </label>
            <select
              name="role"
              value={selectedRole?.id || ""}
              onChange={(e) => {
                const roleId = Number(e.target.value);
                const selectedRole = roleOptions.find((r) => r.id === roleId);
                setSelectedRole(selectedRole || null);
                if (errors.idRole) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.idRole;
                    return newErrors;
                  });
                }
              }}
              disabled={loading}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50 ${
                errors.idRole
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600"
              }`}
            >
              <option value="" className="bg-gray-700">
                Seleccione...
              </option>
              {roleOptions.map((role) => (
                <option
                  key={String(role.id)}
                  value={role.id}
                  className="bg-gray-700"
                >
                  {role.name}
                </option>
              ))}
            </select>
            {errors.idRole && (
              <p role="alert" className="text-sm text-red-400 mt-1">
                {errors.idRole}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Contenido adicional */}
      {children}

      {/* Botones */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
        <Button
          type="button"
          onClick={onCancel}
          disabled={loading}
          variant="secondary"
        >
          {cancelText}
        </Button>

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Guardando..." : submitText}
        </Button>
      </div>
    </form>
  );
}
