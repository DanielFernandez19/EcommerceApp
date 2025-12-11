"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LocationSelects } from "@/components/forms/LocationSelects";
import type { User } from "@/types/user";
import type { UpdateUserData } from "@/actions/userActions";

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      billingAddress: formData.billingAddress,
      billingAddress2: user.billingAddress2 || "", // Incluir campo faltante
      postalCode: formData.postalCode,
      idCountry: selectedCountryId,
      idProvince: selectedProvinceId,
      idCity: selectedCityId,
      idRole: selectedRole?.id || user.idRole,
      // NO enviar el objeto 'role' completo, solo el idRole
    };

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
          />

          <Input
            name="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
          />

          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            required
          />

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
            onCountryChange={setSelectedCountryId}
            onProvinceChange={setSelectedProvinceId}
            onCityChange={setSelectedCityId}
            disabled={loading}
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
              Rol
            </label>
            <select
              name="role"
              value={selectedRole?.id || ""}
              onChange={(e) => {
                const roleId = Number(e.target.value);
                const selectedRole = roleOptions.find((r) => r.id === roleId);
                setSelectedRole(selectedRole || null);
              }}
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50"
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
          disabled={!formData.name || !formData.email}
        >
          {loading ? "Guardando..." : submitText}
        </Button>
      </div>
    </form>
  );
}
